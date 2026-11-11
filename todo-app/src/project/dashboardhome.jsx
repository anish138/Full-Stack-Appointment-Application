import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import UserContext from "./indexcontext";
import { Appointments } from "./appointments";
import "./dashboard.css";


export function DashboardHome() {

    const { setToggle, toggle, appointments, setAppointments, setProjects, users, setUsers, projects = [], tasks = [] } = useContext(UserContext);
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

            localStorage.removeItem("user");
            localStorage.removeItem("appointments");
            localStorage.removeItem("projects");
            setAppointments([]);
            if (setProjects) setProjects([]);
            if (setUsers) setUsers(null);

            alert(res.data.message);

            navigate("/", { replace: true });

            window.location.reload()

        } catch (error) {

            localStorage.removeItem("user");
            localStorage.removeItem("appointments");
            localStorage.removeItem("projects");
            setAppointments([]);
            if (setProjects) setProjects([]);
            if (setUsers) setUsers(null);

            if (error.response) {

                alert(error.response.data.message);

            } else {

                alert("server error");
            }

            navigate("/", { replace: true });

            window.location.reload()
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
        <div >

            <div
                className={`${toggle
                    ? "bg-body-secondary"
                    : "bg-white"
                    } m-3 p-3 rounded-3 shadow-sm border`}
            >

                <div className="d-flex align-items-center justify-content-between gap-3">

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


                   

                    <button className="btn btn-outline-primary">

                        <span className="bi bi-gear-fill me-1"></span>

                        Setting

                    </button>


                   

                    <button
                        className="btn btn-outline-primary"
                        onClick={SingOutClick}
                    >

                        <span className="bi bi-person-circle me-1"></span>

                        Sign Out

                    </button>


                   

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



          

            <div className="m-3">

                <div className="row g-3">


                

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


                    <div className="col-md-4">

                        <div
                            className={`${toggle
                                ? "bg-body-secondary"
                                : "bg-white"
                                } border rounded-3 p-3 shadow-sm`}
                            role="button"
                            onClick={() => navigate("/Dashboard/project")}
                        >

                            <div className="d-flex justify-content-between align-items-center">

                                <div>

                                    <small className="text-secondary">
                                        Projects
                                    </small>

                                    <h3 className="mb-0 mt-1 fw-semibold">
                                        {projects.length}
                                    </h3>

                                </div>

                                <div className="bg-warning bg-opacity-10 rounded-circle p-3">

                                    <span className="bi bi-folder-fill text-warning fs-4"></span>

                                </div>

                            </div>

                        </div>

                    </div>


                   

                    <div className="col-md-4">

                        <div
                            className={`${toggle
                                ? "bg-body-secondary"
                                : "bg-white"
                                } border rounded-3 p-3 shadow-sm`}
                            role="button"
                            onClick={() => navigate("/Dashboard/task")}
                        >

                            <div className="d-flex justify-content-between align-items-center">

                                <div>

                                    <small className="text-secondary">
                                        Tasks
                                    </small>

                                    <h3 className="mb-0 mt-1 fw-semibold">
                                        {tasks.length}
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


            <div className="m-3 mt-4">

                <div
                    className={`${toggle
                        ? "bg-body-secondary"
                        : "bg-white"
                        } p-3 rounded-3 shadow-sm border`}
                >

                    <div className="d-flex justify-content-between align-items-center">


                       

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


                    <Appointments search={search} />

                </div>

            </div>


        </div>
    )
}