import axios from "axios";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import UserContext from "./indexcontext";
import { useContext } from "react";

export function ProjectsAdd() {
    const { users, getprojects } = useContext(UserContext);
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            userId: users?._id || "",
            name: "",
            description: "",
            status: "Planning",
            progress: 0,
            dueDate: "",
            tasks: 0,
            completedTasks: 0
        },
        enableReinitialize: true,
        onSubmit: async (values, { resetForm }) => {
            try {
                const payload = {
                    ...values,
                    userId: values.userId || users?._id
                };

                let res = await axios.post("https://full-stack-appointment-application.onrender.com/Project", payload, { withCredentials: true });
                alert(res.data.message || "Project created successfully");

                if (getprojects && users?.username) {
                    await getprojects(users.username);
                }

                resetForm();
                navigate("/Dashboard/project");
            } catch (error) {
                if (!error.response) {
                    alert("Network Error Pleass Try Again")
                } else if (error.response) {
                    alert(error.response.data.message);
                } else {
                    alert("server error");
                }
            }
        }
    });

    return (
        <div className="container py-4">
            {/* Header */}
            <div className="mb-4">
                <div className="d-flex align-items-center gap-3">
                    <div
                        className="bg-primary text-white rounded-3 d-flex align-items-center justify-content-center"
                        style={{ width: "50px", height: "50px" }}
                    >
                        <i className="bi bi-folder-plus fs-4"></i>
                    </div>

                    <div>
                        <h2 className="fw-bold mb-1">Add Project</h2>
                        <p className="text-secondary mb-0">
                            Create a new project and manage your team goals.
                        </p>
                    </div>
                </div>
            </div>

            <div className="row g-4">
                {/* Form */}
                <div className="col-lg-8">
                    <div className="card border-0 shadow-sm rounded-4">
                        <div className="card-body p-4 p-md-5">
                            <form onSubmit={formik.handleSubmit}>
                                {/* Select User */}
                                {users && (
                                    <div className="mb-4">
                                        <label className="form-label fw-semibold">
                                            <i className="bi bi-person me-2"></i>
                                            Project Owner / User
                                        </label>
                                        <select
                                            name="userId"
                                            className="form-select form-select-lg"
                                            value={formik.values.userId}
                                            onChange={formik.handleChange}
                                        >
                                            <option value={users._id}>
                                                {users.username} ({users.email})
                                            </option>
                                        </select>
                                    </div>
                                )}

                                {/* Project Name */}
                                <div className="mb-4">
                                    <label className="form-label fw-semibold">
                                        <i className="bi bi-folder me-2"></i>
                                        Project Name <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        className="form-control form-control-lg"
                                        placeholder="Enter project name"
                                        value={formik.values.name}
                                        onChange={formik.handleChange}
                                        required
                                    />
                                </div>

                                {/* Description */}
                                <div className="mb-4">
                                    <label className="form-label fw-semibold">
                                        <i className="bi bi-text-paragraph me-2"></i>
                                        Description
                                    </label>
                                    <textarea
                                        rows="3"
                                        name="description"
                                        className="form-control form-control-lg"
                                        placeholder="Enter project description"
                                        value={formik.values.description}
                                        onChange={formik.handleChange}
                                    ></textarea>
                                </div>

                                {/* Status & Progress */}
                                <div className="row g-3 mb-4">
                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold">
                                            <i className="bi bi-flag me-2"></i>
                                            Status
                                        </label>
                                        <select
                                            name="status"
                                            className="form-select form-select-lg"
                                            value={formik.values.status}
                                            onChange={formik.handleChange}
                                        >
                                            <option value="Planning">Planning</option>
                                            <option value="In progress">In progress</option>
                                            <option value="Completed">Completed</option>
                                        </select>
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold">
                                            <i className="bi bi-percent me-2"></i>
                                            Progress ({formik.values.progress}%)
                                        </label>
                                        <input
                                            type="number"
                                            min="0"
                                            max="100"
                                            name="progress"
                                            className="form-control form-control-lg"
                                            value={formik.values.progress}
                                            onChange={formik.handleChange}
                                        />
                                    </div>
                                </div>

                                {/* Due Date */}
                                <div className="mb-4">
                                    <label className="form-label fw-semibold">
                                        <i className="bi bi-calendar-event me-2"></i>
                                        Due Date
                                    </label>
                                    <input
                                        type="date"
                                        name="dueDate"
                                        className="form-control form-control-lg"
                                        value={formik.values.dueDate}
                                        onChange={formik.handleChange}
                                    />
                                </div>

                                {/* Tasks Counts */}
                                <div className="row g-3 mb-4">
                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold">
                                            <i className="bi bi-list-task me-2"></i>
                                            Total Tasks
                                        </label>
                                        <input
                                            type="number"
                                            min="0"
                                            name="tasks"
                                            className="form-control form-control-lg"
                                            value={formik.values.tasks}
                                            onChange={formik.handleChange}
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label fw-semibold">
                                            <i className="bi bi-check2-circle me-2"></i>
                                            Completed Tasks
                                        </label>
                                        <input
                                            type="number"
                                            min="0"
                                            name="completedTasks"
                                            className="form-control form-control-lg"
                                            value={formik.values.completedTasks}
                                            onChange={formik.handleChange}
                                        />
                                    </div>
                                </div>

                                {/* Buttons */}
                                <div className="d-flex justify-content-end gap-2 pt-2">
                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary px-4"
                                        onClick={() => navigate("/Dashboard/project")}
                                    >
                                        <i className="bi bi-x-lg me-2"></i>
                                        Cancel
                                    </button>

                                    <button type="submit" className="btn btn-primary px-4">
                                        <i className="bi bi-check-lg me-2"></i>
                                        Save Project
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
                            <div className="text-center mb-4">
                                <div
                                    className="bg-primary bg-opacity-10 text-primary rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                                    style={{ width: "70px", height: "70px" }}
                                >
                                    <i className="bi bi-folder2-open fs-2"></i>
                                </div>
                                <h5 className="fw-bold">Project Overview</h5>
                                <p className="text-secondary small">
                                    Track progress and manage deliverables efficiently.
                                </p>
                            </div>

                            <div className="border rounded-3 p-3 mb-3">
                                <div className="d-flex align-items-center gap-3">
                                    <i className="bi bi-info-circle text-primary fs-4"></i>
                                    <div>
                                        <small className="text-secondary">Status</small>
                                        <div className="fw-semibold">Planning or In Progress</div>
                                    </div>
                                </div>
                            </div>

                            <div className="border rounded-3 p-3 mb-3">
                                <div className="d-flex align-items-center gap-3">
                                    <i className="bi bi-bar-chart-line text-success fs-4"></i>
                                    <div>
                                        <small className="text-secondary">Progress</small>
                                        <div className="fw-semibold">0% to 100% completion</div>
                                    </div>
                                </div>
                            </div>

                            <div className="border rounded-3 p-3">
                                <div className="d-flex align-items-center gap-3">
                                    <i className="bi bi-calendar-check text-warning fs-4"></i>
                                    <div>
                                        <small className="text-secondary">Timeline</small>
                                        <div className="fw-semibold">Set targeted due dates</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
