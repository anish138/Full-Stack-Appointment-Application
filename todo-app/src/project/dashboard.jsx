import UserContext from "./indexcontext";
import { useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "./dashboard.css";


export function Dashboard() {

    const { toggle, users } = useContext(UserContext);

    const navigate = useNavigate()

    

    return (
        <div className={`${toggle ? "bg-dark text-light" : "bg-light text-dark"} min-vh-100`}>

            <div className="container-fluid">

                <div className="row g-0">

                    <div
                        className={`${toggle
                            ? "bg-dark text-light"
                            : "bg-light text-dark"
                            } col-2 min-vh-100 border-end`}
                    >

                        <div className="p-3">

                            <div
                                className={`${toggle
                                    ? "bg-body-secondary"
                                    : "bg-white"
                                    } rounded-3 p-3 shadow-sm`}
                            >

                                <div className="d-flex align-items-center gap-2">

                                    <span className="bi bi-person-circle fs-3 text-primary"></span>

                                    <div>

                                        <h6 className="mb-0 fw-semibold" key={users?._id}>
                                            !Hello {users?.username || "User"}
                                        </h6>


                                        <small className="text-secondary">
                                            Welcome back
                                        </small>
                                    </div>

                                </div>

                            </div>

                        </div>


                        {/* Sidebar Heading */}

                        <div className="px-3 mt-3">

                            <small className="text-uppercase text-secondary fw-semibold">
                                Workspace
                            </small>

                        </div>

                        <div className="px-2 mt-2">


                            <div
                                className="d-flex align-items-center gap-3 px-3 py-3 rounded-3 mb-1"
                                role="button"
                                onClick={()=> navigate("/Dashboard")}
                            >

                                <span className="bi bi-folder-fill fs-5"></span>


                                <span>Dashboard</span>




                            </div>



                            <div
                                className="d-flex align-items-center gap-3 px-3 py-3 rounded-3 mb-1"
                                role="button"
                                onClick={()=> navigate("/Dashboard/calendar")}
                            >

                                <span className="bi bi-calendar-date fs-5"></span>

                                <span > Calendar </span>

                            </div>





                            <div
                                className="d-flex align-items-center gap-3 px-3 py-3 rounded-3 mb-1"
                                role="button"
                                onClick={()=> navigate("/Dashboard/project")}
                                
                            >

                                <span className="bi bi-folder-fill fs-5"></span>


                                <span >Projects</span>




                            </div>


                            {/* Tasks */}

                            <div
                                className="d-flex align-items-center gap-3 px-3 py-3 rounded-3 mb-1"
                                role="button"
                                onClick={()=>navigate("/Dashboard/task")}
                            >

                                <span className="bi bi-pencil-square fs-5"></span>

                                <span >
                                    Tasks
                                </span>

                            </div>


                            {/* Add Appointment */}

                            <div
                                className="d-flex align-items-center gap-3 px-3 py-3 rounded-3 mb-1"
                                role="button"
                                onClick={() =>
                                    navigate("/Dashboard/addappointments")
                                }
                            >

                                <span className="bi bi-calendar-plus fs-5"></span>

                                <span>
                                    Add Appointment
                                </span>

                            </div>

                        </div>


                        {/* Sidebar Extra Section */}

                        <div className="px-3 mt-4">

                            <small className="text-uppercase text-secondary fw-semibold">
                                Quick Access
                            </small>

                        </div>


                        <div className="px-2 mt-2">

                            {/* Notifications */}

                            <div
                                className="d-flex align-items-center justify-content-between px-3 py-3 rounded-3 mb-1"
                                role="button"
                                onClick={()=>navigate("/Dashboard/notification")}
                            >

                                <div className="d-flex align-items-center gap-3">

                                    <span className="bi bi-bell fs-5"></span>

                                    <span>
                                        Notifications
                                    </span>

                                </div>

                                <span className="badge bg-primary rounded-pill">
                                    New
                                </span>

                            </div>


                            {/* Reports */}

                            <div
                                className="d-flex align-items-center gap-3 px-3 py-3 rounded-3 mb-1"
                                role="button"
                                onClick={()=>navigate("/Dashboard/report")}
                            >

                                <span className="bi bi-bar-chart fs-5"></span>

                                <span>
                                    Reports
                                </span>

                            </div>


                            {/* Help */}

                            <div
                                className="d-flex align-items-center gap-3 px-3 py-3 rounded-3 mb-1"
                                role="button"
                                onClick={()=>navigate("/Dashboard/help")}
                            >

                                <span className="bi bi-question-circle fs-5"></span>

                                <span>
                                    Help & Support
                                </span>

                            </div>

                        </div>


                        {/* Sidebar Bottom */}

                        <div className="px-3 mt-5">

                            <div
                                className={`${toggle
                                    ? "bg-body-secondary"
                                    : "bg-white"
                                    } rounded-3 p-3 border`}
                            >

                                <div className="d-flex align-items-center gap-2">

                                    <span className="bi bi-shield-check text-success fs-4"></span>

                                    <div>

                                        <small className="fw-semibold">
                                            Workspace
                                        </small>

                                        <div className="small text-secondary">
                                            Secure & active
                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>


                    <div className="col-10">
                        <Outlet />
                    </div>


                </div>

            </div>

        </div>
    );
}