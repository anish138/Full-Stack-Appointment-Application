
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import UserContext from "./indexcontext";

const REPORT_API = "https://full-stack-appointment-application.onrender.com/Report";

export function Report() {
    const { users,toggle } = useContext(UserContext);
    const [reports, setReports] = useState([]);
    const [summary, setSummary] = useState({
        totalProjects: 0,
        completedProjects: 0,
        inProgressProjects: 0,
        totalTasks: 0,
        completedTasks: 0,
        pendingTasks: 0,
        overdueTasks: 0,
        averageProgress: 0,
        totalAppointments: 0,
        upcomingAppointments: 0
    });
    const [priorities, setPriorities] = useState({ High: 0, Medium: 0, Low: 0 });
    const [filter, setFilter] = useState("All");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!users?.username) {
            setReports([]);
            setSummary({ totalProjects: 0, completedProjects: 0, inProgressProjects: 0, totalTasks: 0, completedTasks: 0, pendingTasks: 0, overdueTasks: 0, averageProgress: 0, totalAppointments: 0, upcomingAppointments: 0 });
            setPriorities({ High: 0, Medium: 0, Low: 0 });
            setLoading(false);
            return;
        }

        const fetchReport = async () => {
            setLoading(true);
            setError("");
            try {
                const { data } = await axios.get(`${REPORT_API}/${users.username}`, { withCredentials: true });
                setReports(data.projects || []);
                setSummary(data.summary || {});
                setPriorities(data.priorities || { High: 0, Medium: 0, Low: 0 });
            } catch (requestError) {
                setError(requestError.response?.data?.message || "Unable to load report data");
            } finally {
                setLoading(false);
            }
        };

        fetchReport();
    }, [users?.username]);

    const filteredReports = reports.filter((report) => filter === "All" || report.status === filter);
    const totalProjects = summary.totalProjects || 0;
    const totalTasks = summary.totalTasks || 0;
    const completedTasks = summary.completedTasks || 0;
    const pendingTasks = summary.pendingTasks || 0;
    const completedProjects = summary.completedProjects || 0;

    return (
        <main className={`container-fluid py-4 px-3 bg-light min-vh-100 ${toggle ? 'bg-dark bg-body-secondary' : 'bg-white'}`}>

            {/* Header */}
            <div className="mb-4">
                <h2 className="fw-bold mb-1">Reports</h2>
                <p className="text-secondary mb-0">
                    Track project performance and task progress.
                </p>
            </div>

            {loading && <div className="alert alert-info">Loading report data...</div>}
            {!loading && error && <div className="alert alert-danger" role="alert">{error}</div>}

            {/* Statistics */}
            <div className="row g-3 mb-4">

                <div className="col-sm-6 col-xl-3">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body">
                            <p className="text-secondary mb-1">Total Projects</p>
                            <h3 className="fw-bold mb-0">{totalProjects}</h3>
                        </div>
                    </div>
                </div>

                <div className="col-sm-6 col-xl-3">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body">
                            <p className="text-secondary mb-1">Total Tasks</p>
                            <h3 className="fw-bold mb-0">{totalTasks}</h3>
                        </div>
                    </div>
                </div>

                <div className="col-sm-6 col-xl-3">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body">
                            <p className="text-secondary mb-1">Completed Tasks</p>
                            <h3 className="fw-bold text-success mb-0">
                                {completedTasks}
                            </h3>
                        </div>
                    </div>
                </div>

                <div className="col-sm-6 col-xl-3">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body">
                            <p className="text-secondary mb-1">Pending Tasks</p>
                            <h3 className="fw-bold text-warning mb-0">
                                {pendingTasks}
                            </h3>
                        </div>
                    </div>
                </div>

                <div className="col-sm-6 col-xl-3">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body">
                            <p className="text-secondary mb-1">Overdue Tasks</p>
                            <h3 className="fw-bold text-danger mb-0">{summary.overdueTasks || 0}</h3>
                        </div>
                    </div>
                </div>

                <div className="col-sm-6 col-xl-3">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body">
                            <p className="text-secondary mb-1">Average Project Progress</p>
                            <h3 className="fw-bold text-primary mb-0">{summary.averageProgress || 0}%</h3>
                        </div>
                    </div>
                </div>

                <div className="col-sm-6 col-xl-3">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body">
                            <p className="text-secondary mb-1">Upcoming Appointments</p>
                            <h3 className="fw-bold mb-0">{summary.upcomingAppointments || 0}</h3>
                            <small className="text-secondary">of {summary.totalAppointments || 0} total</small>
                        </div>
                    </div>
                </div>

            </div>

            {/* Task Summary */}
            <div className="row g-3 mb-4">

                <div className="col-lg-6">
                    <div className="card border-0 shadow-sm h-100">
                        <div className="card-body p-4">

                            <h5 className="fw-bold mb-3">Task Summary</h5>

                            <div className="d-flex justify-content-between mb-2">
                                <span className="text-secondary">Completed Tasks</span>
                                <span className="fw-semibold">{completedTasks}</span>
                            </div>

                            <div className="progress mb-3">
                                <div
                                    className="progress-bar bg-success"
                                    style={{
                                        width: `${totalTasks ? (completedTasks / totalTasks) * 100 : 0}%`
                                    }}
                                ></div>
                            </div>

                            <div className="d-flex justify-content-between mb-2">
                                <span className="text-secondary">Pending Tasks</span>
                                <span className="fw-semibold">{pendingTasks}</span>
                            </div>

                            <div className="progress">
                                <div
                                    className="progress-bar bg-warning"
                                    style={{
                                        width: `${totalTasks ? (pendingTasks / totalTasks) * 100 : 0}%`
                                    }}
                                ></div>
                            </div>

                        </div>
                    </div>
                </div>

                <div className="col-lg-6">
                    <div className="card border-0 shadow-sm h-100">
                        <div className="card-body p-4">

                            <h5 className="fw-bold mb-3">Project Summary</h5>

                            <div className="d-flex justify-content-between mb-3">
                                <span className="text-secondary">Total Projects</span>
                                <span className="fw-bold">{totalProjects}</span>
                            </div>

                            <div className="d-flex justify-content-between mb-3">
                                <span className="text-secondary">Completed Projects</span>
                                <span className="fw-bold text-success">
                                    {completedProjects}
                                </span>
                            </div>

                            <div className="d-flex justify-content-between mb-4">
                                <span className="text-secondary">In Progress / Planning</span>
                                <span className="fw-bold text-primary">
                                    {summary.inProgressProjects || 0}
                                </span>
                            </div>

                            <h6 className="fw-semibold mb-3">Tasks by Priority</h6>
                            {[{ label: "High", color: "danger" }, { label: "Medium", color: "warning" }, { label: "Low", color: "success" }].map(({ label, color }) => (
                                <div className="d-flex justify-content-between mb-2" key={label}>
                                    <span className="text-secondary">{label}</span>
                                    <span className={`fw-semibold text-${color}`}>{priorities[label] || 0}</span>
                                </div>
                            ))}

                        </div>
                    </div>
                </div>

            </div>

            {/* Project Reports */}
            <div className="card border-0 shadow-sm">

                <div className="card-body p-3 p-md-4">

                    <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">

                        <h5 className="fw-bold mb-0">Project Reports</h5>

                        <select
                            className="form-select w-auto"
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                        >
                            <option>All</option>
                            <option>Planning</option>
                            <option>In progress</option>
                            <option>Completed</option>
                        </select>

                    </div>

                    <div className="table-responsive">

                        <table className="table align-middle">

                            <thead className="table-light">
                                <tr>
                                    <th>Project Name</th>
                                    <th>Total Tasks</th>
                                    <th>Completed</th>
                                    <th>Progress</th>
                                    <th>Status</th>
                                </tr>
                            </thead>

                            <tbody>

                                {filteredReports.length > 0 ? (

                                    filteredReports.map((report) => (

                                        <tr key={report._id}>

                                            <td className="fw-semibold">
                                                {report.project}
                                            </td>

                                            <td>{report.totalTasks}</td>

                                            <td>{report.completedTasks}</td>

                                            <td style={{ minWidth: "130px" }}>

                                                <div className="d-flex justify-content-between small mb-1">
                                                    <span>{report.progress}%</span>
                                                </div>

                                                <div className="progress">
                                                    <div
                                                        className={`progress-bar ${report.progress === 100
                                                            ? "bg-success"
                                                            : "bg-primary"
                                                            }`}
                                                        style={{
                                                            width: `${report.progress}%`
                                                        }}
                                                    ></div>
                                                </div>

                                            </td>

                                            <td>
                                                <span className={`badge ${report.status === "Completed"
                                                    ? "text-bg-success"
                                                    : "text-bg-primary"
                                                    }`}>
                                                    {report.status}
                                                </span>
                                            </td>

                                        </tr>

                                    ))

                                ) : (

                                    <tr>
                                        <td colSpan="5" className="text-center py-4">
                                            No Reports Found
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
