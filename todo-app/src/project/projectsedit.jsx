import { useContext, useEffect, useState } from "react";
import UserContext from "./indexcontext";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export function ProjectsEdit() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { users, projects, getprojects } = useContext(UserContext);

    const [currentProject, setCurrentProject] = useState(() => {
        return projects?.find((item) => (item._id || item.id) === id) || null;
    });

    useEffect(() => {
        // Fetch fresh project details from backend if not already available
        const fetchProject = async () => {
            try {
                let res = await axios.get(`https://full-stack-appointment-application.onrender.com/Project/${id}`, { withCredentials: true });
                if (res.data.project) {
                    setCurrentProject(res.data.project);
                }
            } catch (err) {
                console.log("Error loading project:", err);
            }
        };

        if (!currentProject || !currentProject.name) {
            fetchProject();
        }
    }, [id]);

    const formattedDate = currentProject?.dueDate
        ? new Date(currentProject.dueDate).toLocaleDateString("en-CA")
        : "";

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: currentProject?.name || "",
            description: currentProject?.description || "",
            status: currentProject?.status || "Planning",
            progress: currentProject?.progress !== undefined ? currentProject.progress : 0,
            dueDate: formattedDate || "",
            tasks: currentProject?.tasks !== undefined ? currentProject.tasks : 0,
            completedTasks: currentProject?.completedTasks !== undefined ? currentProject.completedTasks : 0
        },
        onSubmit: async (values) => {
            try {
                let res = await axios.put(`https://full-stack-appointment-application.onrender.com/Project/${id}`, values, { withCredentials: true });
                alert(res.data.message || "Project updated successfully");

                if (getprojects && users?.username) {
                    await getprojects(users.username);
                }

                navigate("/Dashboard/project");
            } catch (error) {
                if (error.response) {
                    alert(error.response.data.message);
                } else {
                    alert("server error");
                }
            }
        }
    });

    return (
        <div className="container-fluid py-4">
            {/* Header */}
            <div className="d-flex align-items-center gap-3 mb-4">
                <div
                    className="bg-primary text-white rounded-3 d-flex align-items-center justify-content-center"
                    style={{ width: "45px", height: "45px" }}
                >
                    <i className="bi bi-pencil-square fs-4"></i>
                </div>

                <div>
                    <h3 className="fw-bold mb-0">Edit Project</h3>
                    <small className="text-secondary">Update project details and progress</small>
                </div>
            </div>

            <div className="row g-4">
                {/* Form */}
                <div className="col-lg-8">
                    <div className="card border-0 shadow-sm rounded-4">
                        <div className="card-body p-4">
                            <form onSubmit={formik.handleSubmit}>
                                {/* Project Name */}
                                <div className="mb-3">
                                    <label className="form-label fw-semibold">Project Name</label>
                                    <div className="input-group">
                                        <span className="input-group-text bg-body">
                                            <i className="bi bi-folder"></i>
                                        </span>
                                        <input
                                            type="text"
                                            name="name"
                                            className="form-control"
                                            value={formik.values.name}
                                            onChange={formik.handleChange}
                                            required
                                            placeholder="Enter project name"
                                        />
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="mb-3">
                                    <label className="form-label fw-semibold">Description</label>
                                    <div className="input-group">
                                        <span className="input-group-text bg-body">
                                            <i className="bi bi-text-paragraph"></i>
                                        </span>
                                        <textarea
                                            rows="3"
                                            name="description"
                                            className="form-control"
                                            value={formik.values.description}
                                            onChange={formik.handleChange}
                                            placeholder="Enter project description"
                                        ></textarea>
                                    </div>
                                </div>

                                {/* Status & Progress */}
                                <div className="row g-3 mb-3">
                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold">Status</label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-body">
                                                <i className="bi bi-flag"></i>
                                            </span>
                                            <select
                                                name="status"
                                                className="form-select"
                                                value={formik.values.status}
                                                onChange={formik.handleChange}
                                            >
                                                <option value="Planning">Planning</option>
                                                <option value="In progress">In progress</option>
                                                <option value="Completed">Completed</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold">
                                            Progress ({formik.values.progress}%)
                                        </label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-body">
                                                <i className="bi bi-percent"></i>
                                            </span>
                                            <input
                                                type="number"
                                                min="0"
                                                max="100"
                                                name="progress"
                                                className="form-control"
                                                value={formik.values.progress}
                                                onChange={formik.handleChange}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Due Date */}
                                <div className="mb-3">
                                    <label className="form-label fw-semibold">Due Date</label>
                                    <div className="input-group">
                                        <span className="input-group-text bg-body">
                                            <i className="bi bi-calendar3"></i>
                                        </span>
                                        <input
                                            type="date"
                                            name="dueDate"
                                            className="form-control"
                                            value={formik.values.dueDate}
                                            onChange={formik.handleChange}
                                        />
                                    </div>
                                </div>

                                {/* Tasks Counts */}
                                <div className="row g-3 mb-4">
                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold">Total Tasks</label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-body">
                                                <i className="bi bi-list-task"></i>
                                            </span>
                                            <input
                                                type="number"
                                                min="0"
                                                name="tasks"
                                                className="form-control"
                                                value={formik.values.tasks}
                                                onChange={formik.handleChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold">Completed Tasks</label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-body">
                                                <i className="bi bi-check2-circle"></i>
                                            </span>
                                            <input
                                                type="number"
                                                min="0"
                                                name="completedTasks"
                                                className="form-control"
                                                value={formik.values.completedTasks}
                                                onChange={formik.handleChange}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Buttons */}
                                <div className="d-flex gap-2">
                                    <button type="submit" className="btn btn-success px-4">
                                        <i className="bi bi-check-lg me-2"></i>
                                        Save Changes
                                    </button>

                                    <button
                                        type="button"
                                        className="btn btn-danger px-4"
                                        onClick={() => navigate("/Dashboard/project")}
                                    >
                                        <i className="bi bi-x-lg me-2"></i>
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Right Side Info */}
                <div className="col-lg-4">
                    <div className="card border-0 shadow-sm rounded-4 h-100">
                        <div className="card-body p-4">
                            <div
                                className="bg-primary bg-opacity-10 text-primary rounded-3 d-flex align-items-center justify-content-center mb-3"
                                style={{ width: "50px", height: "50px" }}
                            >
                                <i className="bi bi-info-circle fs-4"></i>
                            </div>

                            <h5 className="fw-bold">Edit Project</h5>
                            <p className="text-secondary small">
                                Modify project specifications, adjust task progress, and keep timelines accurate.
                            </p>

                            <hr />

                            <div className="d-flex align-items-center gap-2 mb-3">
                                <i className="bi bi-check-circle text-success"></i>
                                <span className="small">Keep progress percentage updated</span>
                            </div>

                            <div className="d-flex align-items-center gap-2 mb-3">
                                <i className="bi bi-calendar-check text-primary"></i>
                                <span className="small">Update deadline and deliverables</span>
                            </div>

                            <div className="d-flex align-items-center gap-2">
                                <i className="bi bi-shield-check text-warning"></i>
                                <span className="small">Changes persist in MongoDB database</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
