import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { Calendar } from "./calendar";
import UserContext from "./indexcontext";
import { useContext } from "react";
import "./dashboard.css"

export function Dashboard() {

    const { setToggle, toggle, appointments, setAppointments, users } = useContext(UserContext);

    const [search, setSearch] = useState("");

    const navigate = useNavigate();

    const SingOutClick = async () => {

        const isConfirmed = window.confirm("Are you sure you want to SignOut")

        if (!isConfirmed) return

        try {
            let res = await axios.delete(
                `http://localhost:3000/User`,
                { withCredentials: true }
            );

            alert(res.data.message);

            navigate("/", { replace: true });

        } catch (error) {

            if (error.response) {

                alert(error.response.data.message);

            } else {

                alert("server error");
            }
        }
    };


    // date //

    const { shareappoinments, appoinmentscount } = useSelector((state) => state.sharedata);


    const sortNedate = () => {
        const sorted = [...appointments].sort((a, b) => new Date(a.date) - new Date(b.date))
        setAppointments(sorted)
    }

    const sortOlddate = () => {
        const sorted = [...appointments].sort((a, b) => new Date(b.date) - new Date(a.date))
        setAppointments(sorted)
    }

    const handleSort = (e) => {
        if (e.target.value === "new") {
            console.log("hello ");
            sortNedate()
        } else if (e.target.value === "old") {
            console.log("hello ");
            sortOlddate()
        }
    }


    return (
        <div className={`${toggle ? "bg-dark text-light" : "bg-light text-dark"} min-vh-100`}>

            <div className="container-fluid">

                <div className="row g-0">


                    {/* =====================================================
                        SIDEBAR
                    ====================================================== */}

                    <div
                        className={`${toggle
                            ? "bg-dark text-light"
                            : "bg-light text-dark"
                            } col-2 min-vh-100 border-end`}
                    >

                        {/* Logo / Greeting */}

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

                                        {
                                            users.map(app =>
                                                <h6 className="mb-0 fw-semibold" key={app._id}>
                                                    !Hello {app.username}
                                                </h6>
                                            )
                                        }


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


                        {/* Sidebar Menu */}

                        <div className="px-2 mt-2">


                            {/* Calendar */}

                            <div
                                className="d-flex align-items-center gap-3 px-3 py-3 rounded-3 bg-primary text-white mb-1"
                                data-bs-toggle="modal"
                                data-bs-target="#calendarmod"
                                role="button"
                            >

                                <span className="bi bi-calendar-date fs-5"></span>

                                <span className="fw-semibold">
                                    Calendar
                                </span>

                            </div>

                            <Calendar />


                            {/* Projects */}

                            <div
                                className="d-flex align-items-center gap-3 px-3 py-3 rounded-3 mb-1"
                                role="button"
                            >

                                <span className="bi bi-folder-fill fs-5"></span>

                              
                                    <span>Projects</span>
                               



                            </div>


                            {/* Tasks */}

                            <div
                                className="d-flex align-items-center gap-3 px-3 py-3 rounded-3 mb-1"
                                role="button"
                            >

                                <span className="bi bi-pencil-square fs-5"></span>

                                <span>
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
                            >

                                <span className="bi bi-bar-chart fs-5"></span>

                                <span>
                                    Reports
                                </span>

                            </div>


                            {/* Help */}

                            <div
                                className="d-flex align-items-center gap-3 px-3 py-3 rounded-3 mb-1"
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



                    {/* =====================================================
                        MAIN CONTENT
                    ====================================================== */}

                    <div className="col-10">


                        {/* =================================================
                            TOP NAVBAR
                        ================================================== */}

                        <div
                            className={`${toggle
                                ? "bg-body-secondary"
                                : "bg-white"
                                } m-3 p-3 rounded-3 shadow-sm border`}
                        >

                            <div className="d-flex align-items-center justify-content-between gap-3">


                                {/* Dashboard Title */}

                                <div>

                                    <div className="d-flex align-items-center gap-2">

                                        <span className="bi bi-grid-1x2-fill text-primary fs-4"></span>

                                        <h2 className="fs-3 fw-semibold mb-0">
                                            Dashboard
                                        </h2>

                                    </div>

                                    <small className="text-secondary ms-4">
                                        Manage your appointments and tasks
                                    </small>

                                </div>


                                {/* Search */}

                                <div
                                    className="input-group"
                                    style={{ maxWidth: "320px" }}
                                >

                                    <span className="input-group-text">
                                        <span className="bi bi-search"></span>
                                    </span>

                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Search appointments..."
                                        onChange={(e) =>
                                            setSearch(e.target.value)
                                        }
                                    />

                                </div>


                                {/* Setting */}

                                <button className="btn btn-outline-primary">

                                    <span className="bi bi-gear-fill me-1"></span>

                                    Setting

                                </button>


                                {/* Sign Out */}

                                <button
                                    className="btn btn-outline-primary"
                                    onClick={SingOutClick}
                                >

                                    <span className="bi bi-person-circle me-1"></span>

                                    Sign Out

                                </button>


                                {/* Theme */}

                                <button
                                    className="btn btn-outline-primary"
                                    onClick={() => setToggle(!toggle)}
                                >

                                    <span
                                        className={
                                            toggle
                                                ? "bi bi-sun-fill"
                                                : "bi bi-moon-fill"
                                        }
                                    ></span>

                                </button>

                            </div>

                        </div>



                        {/* =================================================
                            WELCOME / STAT CARDS
                        ================================================== */}

                        <div className="m-3">

                            <div className="row g-3">


                                {/* Appointment Card */}

                                <div className="col-md-4">

                                    <div
                                        className={`${toggle
                                            ? "bg-body-secondary"
                                            : "bg-white"
                                            } border rounded-3 p-3 shadow-sm`}
                                    >

                                        <div className="d-flex justify-content-between align-items-center">

                                            <div>

                                                <small className="text-secondary">
                                                    Total Appointments
                                                </small>

                                                <h3 className="mb-0 mt-1 fw-semibold">
                                                    {appointments.length}
                                                </h3>

                                            </div>

                                            <div className="bg-primary bg-opacity-10 rounded-circle p-3">

                                                <span className="bi bi-calendar-check text-primary fs-4"></span>

                                            </div>

                                        </div>

                                    </div>

                                </div>


                                {/* Projects Card */}

                                <div className="col-md-4">

                                    <div
                                        className={`${toggle
                                            ? "bg-body-secondary"
                                            : "bg-white"
                                            } border rounded-3 p-3 shadow-sm`}
                                    >

                                        <div className="d-flex justify-content-between align-items-center">

                                            <div>

                                                <small className="text-secondary">
                                                    Projects
                                                </small>

                                                <h3 className="mb-0 mt-1 fw-semibold">
                                                    --
                                                </h3>

                                            </div>

                                            <div className="bg-warning bg-opacity-10 rounded-circle p-3">

                                                <span className="bi bi-folder-fill text-warning fs-4"></span>

                                            </div>

                                        </div>

                                    </div>

                                </div>


                                {/* Tasks Card */}

                                <div className="col-md-4">

                                    <div
                                        className={`${toggle
                                            ? "bg-body-secondary"
                                            : "bg-white"
                                            } border rounded-3 p-3 shadow-sm`}
                                    >

                                        <div className="d-flex justify-content-between align-items-center">

                                            <div>

                                                <small className="text-secondary">
                                                    Tasks
                                                </small>

                                                <h3 className="mb-0 mt-1 fw-semibold">
                                                    --
                                                </h3>

                                            </div>

                                            <div className="bg-success bg-opacity-10 rounded-circle p-3">

                                                <span className="bi bi-check2-square text-success fs-4"></span>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>



                        {/* =================================================
                            FILTER SECTION
                        ================================================== */}

                        <div className="m-3 mt-4">

                            <div
                                className={`${toggle
                                    ? "bg-body-secondary"
                                    : "bg-white"
                                    } p-3 rounded-3 shadow-sm border`}
                            >

                                <div className="d-flex justify-content-between align-items-center">


                                    {/* Filter */}

                                    <div className="d-flex align-items-center gap-3">

                                        <div className="d-flex align-items-center gap-2">

                                            <span className="bi bi-funnel text-primary"></span>

                                            <select className="form-select" onChange={handleSort}>

                                                <option>Filter</option>

                                                <option value="new">
                                                    New Date
                                                </option>

                                                <option value="old">
                                                    Old Date
                                                </option>

                                            </select>

                                        </div>


                                        <div className="d-flex align-items-center gap-2">

                                            <span className="bi bi-calendar3 text-primary"></span>

                                            <select className="form-select">

                                                <option>Date</option>

                                                <option>
                                                    Upcoming
                                                </option>

                                                <option>
                                                    Past
                                                </option>

                                            </select>

                                        </div>

                                    </div>


                                    {/* Share */}

                                    <div>

                                        <button
                                            className="btn btn-primary rounded-3 position-relative px-3"
                                            data-bs-toggle="offcanvas"
                                            data-bs-target="#share"
                                        >

                                            <span className="bi bi-share-fill me-1"></span>

                                            Share

                                            <span className="badge bg-danger rounded-circle position-absolute top-0 start-100 translate-middle">
                                            </span>

                                        </button>


                                        {/* Share Offcanvas */}

                                        <div
                                            className="offcanvas offcanvas-end"
                                            id="share"
                                        >

                                            <div className="offcanvas-header border-bottom">

                                                <h5 className="offcanvas-title">

                                                    <span className="bi bi-share-fill me-2 text-primary"></span>

                                                    Share Appointments

                                                </h5>

                                                <button
                                                    className="btn-close"
                                                    data-bs-dismiss="offcanvas"
                                                ></button>

                                            </div>


                                            <div className="offcanvas-body">

                                                <table className="table table-hover align-middle">

                                                    <thead>

                                                        <tr>

                                                            <th>
                                                                Title
                                                            </th>

                                                            <th>
                                                                Appointment
                                                            </th>

                                                            <th>
                                                                Action
                                                            </th>

                                                        </tr>

                                                    </thead>


                                                    <tbody>

                                                        {

                                                            shareappoinments.map(data =>

                                                                <tr key={data._id}>

                                                                    <td>
                                                                        {data.title}
                                                                    </td>

                                                                    <td>
                                                                        {data.description}
                                                                    </td>

                                                                    <td>

                                                                        <button className="btn btn-outline-danger btn-sm">

                                                                            <span className="bi bi-trash"></span>

                                                                        </button>

                                                                    </td>

                                                                </tr>

                                                            )

                                                        }

                                                    </tbody>


                                                    <tfoot>

                                                        <tr>

                                                            <td
                                                                colSpan="3"
                                                                className="bg-warning fw-semibold"
                                                            >

                                                                Total Share Appointments:
                                                                {" "}
                                                                {appoinmentscount}

                                                            </td>

                                                        </tr>

                                                    </tfoot>

                                                </table>

                                            </div>


                                            <div className="offcanvas-footer">
                                            </div>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>



                        {/* =================================================
                            PAGE CONTENT
                        ================================================== */}

                        <div className="m-3">

                            <div
                                className={`${toggle
                                    ? "bg-body-secondary"
                                    : "bg-white"
                                    } rounded-3 p-3 border shadow-sm`}
                            >

                                <div className="d-flex align-items-center justify-content-between mb-3">

                                    <div>

                                        <h4 className="mb-1 fw-semibold">
                                            Appointments Details
                                        </h4>

                                        <small className="text-secondary">
                                            View and manage your appointments
                                        </small>

                                    </div>


                                    {/* Extra UI button - same existing route */}

                                    <button
                                        className="btn btn-primary"
                                        onClick={() =>
                                            navigate("/Dashboard/addappointments")
                                        }
                                    >

                                        <span className="bi bi-plus-lg me-2"></span>

                                        Add Appointment

                                    </button>

                                </div>


                                {/* Existing Outlet */}

                                <Outlet context={search} />

                            </div>

                        </div>


                    </div>

                </div>

            </div>

        </div>
    );
}