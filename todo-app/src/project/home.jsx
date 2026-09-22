import { BrowserRouter } from "react-router-dom";
import { Login } from "./login";
import { Register } from "./register";
import { useLocation } from "react-router-dom";

export function Home() {

    const location = useLocation();

    const showRegister = location.hash === "#register";

    return (
        <div className="container-fluid">

           

            <div className="row min-vh-100 align-items-center py-5">

                {/* ================= LEFT SIDE ================= */}

                <div className="col-lg-6 px-5">

                    <div className="mb-4">

                        <span className="badge bg-primary rounded-pill px-3 py-2 mb-3">
                            <span className="bi bi-lightning-charge-fill me-1"></span>
                            Welcome to TaskManager
                        </span>

                        <h1 className="display-5 fw-bold mb-3">
                            Manage your work
                            <br />
                            <span className="text-primary">
                                smarter & easier.
                            </span>
                        </h1>

                        <p className="lead text-secondary">
                            Keep your appointments, tasks and projects
                            organized in one simple workspace.
                        </p>

                    </div>


                    {/* Feature cards */}

                    <div className="row g-3 mt-4">

                        <div className="col-md-6">

                            <div className="border rounded-4 p-3 shadow-sm h-100">

                                <div className="d-flex align-items-center gap-3">

                                    <div className="bg-primary bg-opacity-10 rounded-3 p-3">
                                        <span className="bi bi-calendar-check text-primary fs-3"></span>
                                    </div>

                                    <div>
                                        <h6 className="mb-1">
                                            Appointments
                                        </h6>

                                        <small className="text-secondary">
                                            Manage your schedule
                                        </small>
                                    </div>

                                </div>

                            </div>

                        </div>


                        <div className="col-md-6">

                            <div className="border rounded-4 p-3 shadow-sm h-100">

                                <div className="d-flex align-items-center gap-3">

                                    <div className="bg-success bg-opacity-10 rounded-3 p-3">
                                        <span className="bi bi-check2-square text-success fs-3"></span>
                                    </div>

                                    <div>
                                        <h6 className="mb-1">
                                            Tasks
                                        </h6>

                                        <small className="text-secondary">
                                            Stay productive
                                        </small>
                                    </div>

                                </div>

                            </div>

                        </div>


                        <div className="col-12">

                            <div className="border rounded-4 p-3 shadow-sm">

                                <div className="d-flex align-items-center gap-3">

                                    <div className="bg-warning bg-opacity-10 rounded-3 p-3">
                                        <span className="bi bi-shield-check text-warning fs-3"></span>
                                    </div>

                                    <div>
                                        <h6 className="mb-1">
                                            Simple & Organized
                                        </h6>

                                        <small className="text-secondary">
                                            Everything you need in one place.
                                        </small>
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>



                {/* ================= RIGHT SIDE LOGIN / REGISTER ================= */}

                <div className="col-lg-6 px-4"  id="auth-container">

                    <div className="mx-auto" style={{ maxWidth: "480px" }}>

                        <div className="card border-0 shadow-lg rounded-4">

                            <div className="card-body p-4 p-md-5">

                                {/* Card Header */}

                                <div className="text-center mb-4">

                                    <div
                                        className="bg-primary rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                                        style={{
                                            width: "60px",
                                            height: "60px"
                                        }}
                                    >

                                        <span className="bi bi-person text-white fs-2"></span>

                                    </div>

                                    <h3 className="fw-bold mb-1">
                                        Get Started
                                    </h3>

                                    <p className="text-secondary mb-0">
                                        Login or create your account
                                    </p>

                                </div>


                                {/* ================= EXISTING TABS ================= */}

                                <ul className="nav nav-tabs nav-fill mb-4">

                                    <li className="nav-item">

                                        <a
                                            href="#login"
                                            className={`nav-link ${!showRegister ? "active" : ""} fw-semibold`}
                                            data-bs-toggle="tab"
                                        >
                                            <span className="bi bi-box-arrow-in-right me-2"></span>
                                            Login
                                        </a>

                                    </li>


                                    <li className="nav-item">

                                        <a
                                            href="#register"
                                            className={`nav-link ${showRegister ? "active" : ""} fw-semibold`}
                                            data-bs-toggle="tab"
                                        >
                                            <span className="bi bi-person-plus me-2"></span>
                                            Register
                                        </a>

                                    </li>

                                </ul>


                                {/* ================= EXISTING TAB CONTENT ================= */}

                                <div className="tab-content">

                                    <div
                                        className={`tab-pane ${!showRegister ? "active show" : ""}`}
                                        id="login"
                                    >
                                        <Login />
                                    </div>


                                    <div
                                        className={`tab-pane ${showRegister ? "active show" : ""}`}
                                        id="register"
                                    >
                                        <Register />
                                    </div>

                                </div>

                            </div>

                        </div>


                        {/* Bottom text */}

                        <div className="text-center mt-4">

                            <small className="text-secondary">

                                <span className="bi bi-shield-check me-1"></span>

                                Your workspace, your productivity.

                            </small>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    )
}