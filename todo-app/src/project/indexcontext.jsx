import { Link, Route, Routes } from "react-router-dom";
import axios from "axios";
import { Home } from "./home";
import { Login } from "./login";
import { Register } from "./register";
import { Dashboard } from "./dashboard";
import { useLocation } from "react-router-dom";
import { createContext, useState, useEffect } from "react";
import { Appointments } from "./appointments";
import { Addappointments } from "./addappointments";
import { EditAppoinments } from "./editappointments";



const UserContext = createContext()
export default UserContext;

export function IndexContext() {


    const [users, setUsers] = useState([{ username: null }])

    const [appointments, setAppointments] = useState([{ title: null, description: null, date: null, userId: null, _id: null }])  //appointment data save

    const [refresh, setRefresh] = useState(0)

    const location = useLocation()   // iska use location path provide karata hai 

    const [toggle, setToggle] = useState(localStorage.getItem("theme") === "dark")    // theme ke liye 


    useEffect(() => {

        const fetchdata = async () => {  // Login data fetch (only username )
            try {
                let res = await axios.get("http://localhost:3000/User")

                setUsers(res.data.users)
            } catch (error) {
                console.log(error)
                if (error.response) {
                    alert(error.response.data.message)
                } else {
                    alert("server error indexCount");
                }
            }
        }

        fetchdata();

    }, [])


    useEffect(() => {
        const fetchappointdata = async () => {  // appointment data fetch
            try {
                let res = await axios.get("http://localhost:3000/Appointment")

                setAppointments(res.data.users)
            } catch (error) {
                if (error.response) {
                    alert(error.response.data.message)
                } else {
                    alert("server error");
                }
            }
        }
        fetchappointdata();
    }, [refresh])



    const delappointment = async (id) => {

        try {
            let res = await axios.delete(`http://localhost:3000/Appointment/${id}`, { withCredentials: true })


            alert(res.data.message)

            setAppointments(prev => prev.filter(item => item._id !== id))

        } catch (error) {

            if (error.response) {

                alert(error.response.data.message)

            } else {

                alert("server error")

            }
        }
    }


    useEffect(() => {

        document.documentElement.setAttribute("data-bs-theme", toggle ? "dark" : "light")

        localStorage.setItem("theme", toggle ? "dark" : "ligth")

    }, [toggle])

    console.log(toggle);

    return (
        <div
            className={`${toggle ? "bg-dark text-light" : "bg-light text-dark"} min-vh-100`}
        >

            {/* ================= HEADER ================= */}

            {location.pathname.startsWith("/Dashboard") || (

                <header>

                    <nav
                        className={`${toggle
                            ? "bg-body-secondary"
                            : "bg-white"
                            } border-bottom shadow-sm`}
                    >

                        <div className="container-fluid px-4 py-3">

                            <div className="d-flex justify-content-between align-items-center">


                                {/* ================= LOGO ================= */}

                                <div>

                                    <Link
                                        to="/"
                                        className="text-decoration-none"
                                    >

                                        <div className="d-flex align-items-center gap-2">

                                            <div
                                                className="bg-primary rounded-3 d-flex align-items-center justify-content-center"
                                                style={{
                                                    width: "42px",
                                                    height: "42px"
                                                }}
                                            >

                                                <span className="bi bi-check2-square text-white fs-4"></span>

                                            </div>


                                            <div>

                                                <h4 className="mb-0 fw-bold text-primary">
                                                    TaskManager
                                                </h4>

                                                <small className="text-secondary">
                                                    Manage your work easily
                                                </small>

                                            </div>

                                        </div>

                                    </Link>

                                </div>



                                {/* ================= NAVIGATION ================= */}

                                <div className="d-flex align-items-center gap-2">

                                    <Link
                                        to="/"
                                        className="text-decoration-none"
                                    >

                                        <button className="btn btn-outline-primary px-3">

                                            <span className="bi bi-house me-1"></span>

                                            Home

                                        </button>

                                    </Link>


                                    <button className="btn btn-outline-primary px-3">

                                        <span className="bi bi-stars me-1"></span>

                                        Features

                                    </button>


                                    <button className="btn btn-outline-primary px-3">

                                        <span className="bi bi-tag me-1"></span>

                                        Pricing

                                    </button>


                                    <button className="btn btn-outline-primary px-3">

                                        <span className="bi bi-info-circle me-1"></span>

                                        About

                                    </button>


                                    {/* Theme Button */}

                                    <button
                                        className="btn btn-outline-primary ms-2"
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

                        </div>

                    </nav>


                    {/* ================= HERO / INTRO ================= */}

                    <div
                        className={`${toggle
                            ? "bg-body-secondary"
                            : "bg-light"
                            } py-5`}
                    >

                        <div className="container">

                            <div className="row align-items-center">


                                {/* LEFT */}

                                <div className="col-md-7">

                                    <span className="badge bg-primary rounded-pill px-3 py-2 mb-3">

                                        <span className="bi bi-lightning-charge-fill me-1"></span>

                                        Simple & Powerful Task Management

                                    </span>


                                    <h1 className="display-5 fw-bold mb-3">

                                        Organize your work.
                                        <br />

                                        <span className="text-primary">
                                            Get things done.
                                        </span>

                                    </h1>


                                    <p className="lead text-secondary mb-4">

                                        Manage your appointments, projects and tasks
                                        from one simple workspace.

                                    </p>


                                    <div className="d-flex gap-3">

                                        <Link
                                            to="/#login"
                                            className="text-decoration-none"
                                        >

                                            <button
                                                className="btn btn-primary btn-lg px-4"
                                                onClick={() => {
                                                    window.location.href = "/#login";
                                                    setTimeout(() => {
                                                        document.getElementById("auth-container")?.scrollIntoView({
                                                            behavior: "smooth"
                                                        });
                                                    }, 100);
                                                }}
                                            >
                                                <span className="bi bi-box-arrow-in-right me-2"></span>
                                                Get Started
                                            </button>

                                        </Link>


                                        <Link
                                            to="/#register"
                                            className="text-decoration-none"
                                        >

                                            <button
                                                className="btn btn-outline-primary btn-lg px-4"
                                                onClick={() => {
                                                    window.location.href = "/#register";
                                                    setTimeout(() => {
                                                        document.getElementById("auth-container")?.scrollIntoView({
                                                            behavior: "smooth"
                                                        });
                                                    }, 100);
                                                }}
                                            >
                                                <span className="bi bi-person-plus me-2"></span>
                                                Create Account
                                            </button>

                                        </Link>

                                    </div>

                                </div>



                                {/* RIGHT */}

                                <div className="col-md-5 mt-4 mt-md-0">

                                    <div className="row g-3">


                                        <div className="col-6">

                                            <div
                                                className={`${toggle
                                                    ? "bg-dark"
                                                    : "bg-white"
                                                    } border rounded-4 p-4 shadow-sm h-100`}
                                            >

                                                <span className="bi bi-calendar-check text-primary fs-2"></span>

                                                <h5 className="mt-3 mb-1">
                                                    Appointments
                                                </h5>

                                                <small className="text-secondary">
                                                    Keep your schedule organized
                                                </small>

                                            </div>

                                        </div>


                                        <div className="col-6">

                                            <div
                                                className={`${toggle
                                                    ? "bg-dark"
                                                    : "bg-white"
                                                    } border rounded-4 p-4 shadow-sm h-100`}
                                            >

                                                <span className="bi bi-list-check text-success fs-2"></span>

                                                <h5 className="mt-3 mb-1">
                                                    Tasks
                                                </h5>

                                                <small className="text-secondary">
                                                    Track your daily work
                                                </small>

                                            </div>

                                        </div>


                                        <div className="col-12">

                                            <div
                                                className={`${toggle
                                                    ? "bg-dark"
                                                    : "bg-white"
                                                    } border rounded-4 p-4 shadow-sm`}
                                            >

                                                <div className="d-flex align-items-center gap-3">

                                                    <div
                                                        className="bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center"
                                                        style={{
                                                            width: "50px",
                                                            height: "50px"
                                                        }}
                                                    >

                                                        <span className="bi bi-shield-check text-primary fs-4"></span>

                                                    </div>


                                                    <div>

                                                        <h6 className="mb-1">
                                                            Everything in one place
                                                        </h6>

                                                        <small className="text-secondary">
                                                            Simple workspace for your productivity
                                                        </small>

                                                    </div>

                                                </div>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* ================= FEATURES ================= */}

                    <div className="container py-5">

                        <div className="text-center mb-5">

                            <span className="text-primary fw-semibold">
                                WHY TASKMANAGER?
                            </span>

                            <h2 className="fw-bold mt-2">
                                Everything you need to stay organized
                            </h2>

                            <p className="text-secondary">
                                Simple tools designed to make your everyday work easier.
                            </p>

                        </div>


                        <div className="row g-4">


                            {/* Card 1 */}

                            <div className="col-md-4">

                                <div
                                    className={`${toggle
                                        ? "bg-body-secondary"
                                        : "bg-white"
                                        } border rounded-4 p-4 shadow-sm h-100`}
                                >

                                    <div
                                        className="bg-primary bg-opacity-10 rounded-3 d-flex align-items-center justify-content-center mb-3"
                                        style={{
                                            width: "52px",
                                            height: "52px"
                                        }}
                                    >

                                        <span className="bi bi-calendar-event text-primary fs-3"></span>

                                    </div>

                                    <h5 className="fw-semibold">
                                        Manage Appointments
                                    </h5>

                                    <p className="text-secondary mb-0">
                                        Create, view and manage your appointments
                                        from a single dashboard.
                                    </p>

                                </div>

                            </div>


                            {/* Card 2 */}

                            <div className="col-md-4">

                                <div
                                    className={`${toggle
                                        ? "bg-body-secondary"
                                        : "bg-white"
                                        } border rounded-4 p-4 shadow-sm h-100`}
                                >

                                    <div
                                        className="bg-success bg-opacity-10 rounded-3 d-flex align-items-center justify-content-center mb-3"
                                        style={{
                                            width: "52px",
                                            height: "52px"
                                        }}
                                    >

                                        <span className="bi bi-check2-circle text-success fs-3"></span>

                                    </div>

                                    <h5 className="fw-semibold">
                                        Track Your Tasks
                                    </h5>

                                    <p className="text-secondary mb-0">
                                        Keep your work organized and focus on
                                        the things that matter.
                                    </p>

                                </div>

                            </div>


                            {/* Card 3 */}

                            <div className="col-md-4">

                                <div
                                    className={`${toggle
                                        ? "bg-body-secondary"
                                        : "bg-white"
                                        } border rounded-4 p-4 shadow-sm h-100`}
                                >

                                    <div
                                        className="bg-warning bg-opacity-10 rounded-3 d-flex align-items-center justify-content-center mb-3"
                                        style={{
                                            width: "52px",
                                            height: "52px"
                                        }}
                                    >

                                        <span className="bi bi-search text-warning fs-3"></span>

                                    </div>

                                    <h5 className="fw-semibold">
                                        Quick Search
                                    </h5>

                                    <p className="text-secondary mb-0">
                                        Quickly find the appointments and information
                                        you need.
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* ================= FOOTER ================= */}

                    <footer
                        className={`${toggle
                            ? "bg-body-secondary"
                            : "bg-white"
                            } border-top mt-4`}
                    >

                        <div className="container py-4">

                            <div className="d-flex justify-content-between align-items-center">

                                <div>

                                    <h6 className="mb-1 fw-semibold text-primary">
                                        <span className="bi bi-check2-square me-2"></span>
                                        TaskManager
                                    </h6>

                                    <small className="text-secondary">
                                        Stay organized. Stay productive.
                                    </small>

                                </div>


                                <div className="text-secondary">

                                    <span className="bi bi-shield-check me-2"></span>

                                    Secure Workspace

                                </div>

                            </div>

                        </div>

                    </footer>

                </header>
            )}


            {/* ================= ROUTES ================= */}

            <UserContext.Provider
                value={{
                    users,
                    appointments,
                    setAppointments,
                    delappointment,
                    setRefresh,
                    setToggle,
                    toggle
                }}
            >

                <Routes>

                    <Route
                        path="/"
                        element={<Home />}
                    />

                    <Route
                        path="login"
                        element={
                            <Login
                                className="d-flex justify-content-end mt-4"
                                width="w-25 ms-3 mt-4"
                                text="Login User"
                                icone="bi bi-person-fill"
                            />
                        }
                    />

                    <Route
                        path="register"
                        element={
                            <Register
                                className="d-flex justify-content-end mt-4"
                                width="w-25 ms-3 mt-4"
                                text="Register User"
                                icone="bi bi-person-fill"
                            />
                        }
                    />

                    <Route
                        path="Dashboard"
                        element={<Dashboard />}
                    >

                        <Route index element={<Appointments />} />

                        <Route path="appointments" element={<Appointments />} />

                        <Route path="addappointments" element={<Addappointments />} />

                        <Route path="editappointments/:id" element={<EditAppoinments />} />

                        

                    </Route>

                </Routes>

            </UserContext.Provider>

        </div>
    )
}