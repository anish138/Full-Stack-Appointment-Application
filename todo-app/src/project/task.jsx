
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import UserContext from "./indexcontext";

const TASK_API = "https://full-stack-appointment-application.onrender.com/Task";

export function Task() {
    const context = useContext(UserContext);

    const {toggle} = useContext(UserContext)
    const [localTasks, setLocalTasks] = useState([]);
    const tasks = context?.tasks ?? localTasks;
    const updateTasksList = (val) => {
        if (context?.setTasks) context.setTasks(val);
        setLocalTasks(val);
    };

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const { data } = await axios.get(TASK_API);
                updateTasksList(data.tasks || []);
            } catch (error) {
                console.error("Unable to load tasks:", error);
            }
        };
        fetchTasks();
    }, []);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("All tasks");
    const [showForm, setShowForm] = useState(false);

    const [form, setForm] = useState({
        title: "",
        project: "",
        dueDate: "",
        priority: "Medium",
    });

    // Filter Tasks
    const filteredTasks = tasks.filter((task) => {
        const searchMatch = task.title.toLowerCase().includes(search.toLowerCase());

        const statusMatch =
            status === "All tasks" ||
            (status === "Completed" && task.completed) ||
            (status === "Pending" && !task.completed);

        return searchMatch && statusMatch;
    });

    // Task Statistics
    const completedTasks = tasks.filter((task) => task.completed).length;
    const pendingTasks = tasks.filter((task) => !task.completed).length;

    // Add Task
    const addTask = async (e) => {
        e.preventDefault();

        if (!form.title.trim()) return;

        try {
            const { data } = await axios.post(TASK_API, { ...form, completed: false });
            updateTasksList([data.task, ...tasks]);
        } catch (error) {
            alert(error.response?.data?.message || "Unable to create task");
            return;
        }

        setForm({
            title: "",
            project: "",
            dueDate: "",
            priority: "Medium",
        });

        setShowForm(false);
    };

    // Toggle Task Status
    const toggleTask = async (id) => {
        const selectedTask = tasks.find((task) => task._id === id);
        if (!selectedTask) return;

        try {
            const { data } = await axios.patch(`${TASK_API}/${id}`, {
                completed: !selectedTask.completed,
            });
            updateTasksList(tasks.map((task) => task._id === id ? data.task : task));
        } catch (error) {
            alert(error.response?.data?.message || "Unable to update task");
        }
    };

    // Format Date
    const formatDate = (date) => {
        if (!date) return "No due date";

        return new Date(date + "T00:00:00").toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });
    };

    return (
        <main className={`container-fluid py-4 px-3  min-vh-100 ${toggle ? 'bg-dark bg-body-secondary' : 'bg-white'}`}>

            {/* Header */}
            <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
                <div>
                    <h2 className="fw-bold mb-1">Tasks</h2>
                    <p className="text-secondary mb-0">
                        Manage your tasks and track your daily progress.
                    </p>
                </div>

                <button
                    className="btn btn-primary"
                    onClick={() => setShowForm(!showForm)}
                >
                    {showForm ? "Close" : "+ New Task"}
                </button>
            </div>

            {/* Add Task Form */}
            {showForm && (
                <form className="card border-0 shadow-sm mb-4" onSubmit={addTask}>
                    <div className="card-body p-4">

                        <h5 className="fw-bold mb-3">Create New Task</h5>

                        <div className="row g-3">

                            <div className="col-md-3">
                                <label className="form-label">Task Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter task name"
                                    value={form.title}
                                    onChange={(e) =>
                                        setForm({ ...form, title: e.target.value })
                                    }
                                    required
                                />
                            </div>

                            <div className="col-md-3">
                                <label className="form-label">Project</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Project name"
                                    value={form.project}
                                    onChange={(e) =>
                                        setForm({ ...form, project: e.target.value })
                                    }
                                />
                            </div>

                            <div className="col-md-3">
                                <label className="form-label">Due Date</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    value={form.dueDate}
                                    onChange={(e) =>
                                        setForm({ ...form, dueDate: e.target.value })
                                    }
                                />
                            </div>

                            <div className="col-md-3">
                                <label className="form-label">Priority</label>
                                <select
                                    className="form-select"
                                    value={form.priority}
                                    onChange={(e) =>
                                        setForm({ ...form, priority: e.target.value })
                                    }
                                >
                                    <option>Low</option>
                                    <option>Medium</option>
                                    <option>High</option>
                                </select>
                            </div>

                        </div>

                        <div className="text-end mt-3">
                            <button type="submit" className="btn btn-primary">
                                Create Task
                            </button>
                        </div>

                    </div>
                </form>
            )}

            {/* Statistics */}
            <div className="row g-3 mb-4">

                <div className="col-md-4">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body">
                            <p className="text-secondary mb-1">Total Tasks</p>
                            <h3 className="fw-bold mb-0">{tasks.length}</h3>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body">
                            <p className="text-secondary mb-1">Completed</p>
                            <h3 className="fw-bold text-success mb-0">
                                {completedTasks}
                            </h3>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body">
                            <p className="text-secondary mb-1">Pending</p>
                            <h3 className="fw-bold text-warning mb-0">
                                {pendingTasks}
                            </h3>
                        </div>
                    </div>
                </div>

            </div>

            {/* Task List */}
            <div className="card border-0 shadow-sm">
                <div className="card-body p-3 p-md-4">

                    <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">

                        <h5 className="fw-bold mb-0">All Tasks</h5>

                        <div className="d-flex flex-wrap gap-2">

                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search tasks..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />

                            <select
                                className="form-select"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option>All tasks</option>
                                <option>Pending</option>
                                <option>Completed</option>
                            </select>

                        </div>

                    </div>

                    {/* Tasks */}
                    <div className="table-responsive">
                        <table className="table align-middle">

                            <thead className="table-light">
                                <tr>
                                    <th>Task</th>
                                    <th>Project</th>
                                    <th>Priority</th>
                                    <th>Due Date</th>
                                    <th>Status</th>
                                </tr>
                            </thead>

                            <tbody>

                                {filteredTasks.length > 0 ? (
                                    filteredTasks.map((task) => (

                                        <tr key={task._id}>

                                            <td>
                                                <div className="d-flex align-items-center gap-2">
                                                    <input
                                                        type="checkbox"
                                                        className="form-check-input mt-0"
                                                        checked={task.completed}
                                                        onChange={() => toggleTask(task._id)}
                                                    />

                                                    <span className={
                                                        task.completed
                                                            ? "text-secondary text-decoration-line-through"
                                                            : "fw-medium"
                                                    }>
                                                        {task.title}
                                                    </span>
                                                </div>
                                            </td>

                                            <td>{task.project || "-"}</td>

                                            <td>
                                                <span className={`badge ${
                                                    task.priority === "High"
                                                        ? "text-bg-danger"
                                                        : task.priority === "Medium"
                                                        ? "text-bg-warning"
                                                        : "text-bg-success"
                                                }`}>
                                                    {task.priority}
                                                </span>
                                            </td>

                                            <td>{formatDate(task.dueDate)}</td>

                                            <td>
                                                <span className={`badge ${
                                                    task.completed
                                                        ? "text-bg-success"
                                                        : "text-bg-warning"
                                                }`}>
                                                    {task.completed ? "Completed" : "Pending"}
                                                </span>
                                            </td>

                                        </tr>

                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="text-center py-5">
                                            <h6>No Tasks Found</h6>
                                            <p className="text-secondary mb-0">
                                                Try another search or create a new task.
                                            </p>
                                        </td>
                                    </tr>
                                )}

                            </tbody>

                        </table>
                    </div>

                </div>
            </div>

        </main>
    );
}
