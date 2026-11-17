import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "./indexcontext";
import axios from "axios";

export function Project() {

    const navigate = useNavigate();
    const { users, projects = [], setProjects, getprojects, toggle } = useContext(UserContext);

    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("All projects");

    useEffect(() => {
        if (getprojects) {
            getprojects(users?.username);
        }
    }, [users?.username]);

    // Delete project
    const deleteProject = async (id) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this project?");
        if (!isConfirmed) return;

        try {
            let res = await axios.delete(`https://full-stack-appointment-application.onrender.com/Project/${id}`, { withCredentials: true });
            alert(res.data.message || "Project deleted successfully");

            if (getprojects && users?.username) {
                await getprojects(users.username);
            } else if (setProjects) {
                setProjects(prev => prev.filter((p) => p._id !== id));
            }
        } catch (error) {
            if (error.response) {
                alert(error.response.data.message);
            } else {
                alert("server error");
            }
        }
    };

    // Filter Projects
    const filteredProjects = projects.filter((project) => {
        const searchMatch = (project.name || "").toLowerCase().includes(search.toLowerCase());
        const statusMatch = status === "All projects" || project.status === status;
        return searchMatch && statusMatch;
    });

    // Dashboard Statistics
    const activeProjects = projects.filter(
        (project) => project.status === "In progress"
    ).length;

    const completedTasks = projects.reduce(
        (total, project) => total + (Number(project.completedTasks) || 0), 0
    );

    const totalTasks = projects.reduce(
        (total, project) => total + (Number(project.tasks) || 0), 0
    );

    // Format Date
    const formatDate = (date) => {
        if (!date) return "No due date";
        return new Date(date).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });
    };

    return (
        <main className={`container-fluid py-4 px-3 min-vh-100 ${toggle ? "bg-dark bg-body-secondary text-light" : "bg-white text-dark"}`}>
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 className="fw-bold mb-1">Projects</h2>
                    <p className="text-secondary mb-0">
                        Manage and track your projects.
                    </p>
                </div>

                <button
                    className="btn btn-primary"
                    onClick={() => navigate("/Dashboard/addproject")}
                >
                    <i className="bi bi-plus-lg me-2"></i>+ New Project
                </button>
            </div>

            {/* Statistics */}
            <div className="row g-3 mb-4">
                <div className="col-md-4">
                    <div className="card border-0">
                        <div className="card-body rounded-3 shadow-sm border">
                            <p className="text-secondary mb-1">Total Projects</p>
                            <h3 className="fw-bold mb-0">{projects.length}</h3>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body">
                            <p className="text-secondary mb-1">In Progress</p>
                            <h3 className="fw-bold mb-0">{activeProjects}</h3>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body">
                            <p className="text-secondary mb-1">Tasks Completed</p>
                            <h3 className="fw-bold mb-0">
                                {completedTasks} / {totalTasks}
                            </h3>
                        </div>
                    </div>
                </div>
            </div>

            {/* Project List */}
            <div className="card border-0 shadow-sm">
                <div className="card-body p-4">
                    <div className="d-flex flex-wrap justify-content-between gap-3 mb-4">
                        <h5 className="fw-bold mb-0">Your Projects</h5>

                        <div className="d-flex gap-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search projects..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />

                            <select
                                className="form-select"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option>All projects</option>
                                <option>In progress</option>
                                <option>Planning</option>
                                <option>Completed</option>
                            </select>
                        </div>
                    </div>

                    <div className="row g-3">
                        {filteredProjects.length > 0 ? (
                            filteredProjects.map((project) => (
                                <div className="col-md-6 col-xl-4" key={project._id}>
                                    <div className="card h-100 shadow-sm">
                                        <div className="card-body p-4 d-flex flex-column justify-content-between">
                                            <div>
                                                <div className="d-flex justify-content-between align-items-start mb-3">
                                                    <h5 className="fw-bold mb-0 text-truncate" style={{ maxWidth: "70%" }}>
                                                        {project.name}
                                                    </h5>

                                                    <span className={`badge ${
                                                        project.status === "In progress"
                                                            ? "text-bg-success"
                                                            : project.status === "Completed"
                                                            ? "text-bg-primary"
                                                            : "text-bg-warning"
                                                    }`}>
                                                        {project.status || "Planning"}
                                                    </span>
                                                </div>

                                                <p className="text-secondary small mb-3">
                                                    {project.description || "No description provided."}
                                                </p>

                                                <div className="d-flex justify-content-between mb-2">
                                                    <span className="small text-secondary">Progress</span>
                                                    <span className="small fw-semibold">{project.progress || 0}%</span>
                                                </div>

                                                <div className="progress mb-3" style={{ height: "7px" }}>
                                                    <div
                                                        className={`progress-bar ${
                                                            (project.progress || 0) >= 100 ? "bg-success" : "bg-primary"
                                                        }`}
                                                        style={{ width: `${project.progress || 0}%` }}
                                                    ></div>
                                                </div>

                                                <div className="d-flex justify-content-between text-secondary small">
                                                    <span>
                                                        <i className="bi bi-list-check me-1"></i>
                                                        {project.completedTasks || 0}/{project.tasks || 0} Tasks
                                                    </span>

                                                    <span>
                                                        <i className="bi bi-calendar3 me-1"></i>
                                                        {formatDate(project.dueDate)}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Action Buttons: Edit and Delete */}
                                            <div className="pt-3 mt-3 border-top d-flex justify-content-end gap-2">
                                                <button
                                                    className="btn btn-outline-warning btn-sm"
                                                    onClick={() => navigate(`/Dashboard/editproject/${project._id}`)}
                                                    title="Edit Project"
                                                >
                                                    <i className="bi bi-pencil-square me-1"></i> Edit
                                                </button>

                                                <button
                                                    className="btn btn-outline-danger btn-sm"
                                                    onClick={() => deleteProject(project._id)}
                                                    title="Delete Project"
                                                >
                                                    <i className="bi bi-trash me-1"></i> Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-5">
                                <div
                                    className="bg-primary bg-opacity-10 text-primary rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                                    style={{ width: "65px", height: "65px" }}
                                >
                                    <i className="bi bi-folder-x fs-2"></i>
                                </div>
                                <h5>No Projects Found</h5>
                                <p className="text-secondary mb-3">
                                    Try another search or create a new project.
                                </p>
                                <button
                                    className="btn btn-primary"
                                    onClick={() => navigate("/Dashboard/addproject")}
                                >
                                    <i className="bi bi-plus-lg me-1"></i> Create Project
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
