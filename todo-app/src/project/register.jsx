import axios from "axios";
import { useFormik } from "formik";
import { useContext, useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "./indexcontext";


export function Register() {

    let navigate = useNavigate();

    const { getusers, getappointment, getprojects, setAppointments, setProjects, setUsers } = useContext(UserContext)
    const [show, setShow] = useState(true)
    const [error, setError] = useState("")
    const [timer, setTimer] = useState(0)
    const [chek, setChek] = useState({})
    const [loadding, setLoadding] = useState(false)
    const [validation, setValidation] = useState({})

    useEffect(() => {
        if (timer <= 0) return

        const interval = setInterval(() => {
            setTimer(prev => prev - 1)
        }, 1000)
        return () => clearInterval(interval)
    }, [timer])






    const formik = useFormik({
        initialValues: {
            name: "",
            username: "",
            email: "",
            password: ""
        },
        onSubmit: async (user) => {

            try {
                setLoadding(true)
                let res = await axios.post("https://full-stack-appointment-application.onrender.com/Register", user, { withCredentials: true })

                localStorage.removeItem("user");
                localStorage.removeItem("appointments");
                localStorage.removeItem("projects");
                if (setAppointments) setAppointments([]);
                if (setProjects) setProjects([]);
                if (setUsers) setUsers(null);

                await getusers(user.username);
                await getappointment(user.username);
                if (getprojects) await getprojects(user.username);

                navigate("/Dashboard")

            } catch (error) {
                if (!error.response) {
                    alert("Network Error Pleass Try Again")
                } else if (error.response?.status === 429) {

                    setError("Too many register attempts")
                    setTimer(10)

                } else if (error.response?.status === 409) {
                    setChek({
                        emailError: error.response.data.emailError || "",
                        userError: error.response.data.userError || ""
                    })

                } else if (error.response?.status === 400) {

                    setValidation((prev)=>({...prev,namemsg:error.response.data.namemsg || "",passmessage:error.response.data.passmessage || ""}))

                } else if (error.response.data.message) {
                    alert(error.response.data.message)
                } else {
                    alert("server error")
                }

            } finally {
                setLoadding(false)
            }
        }
    })



    const chekUser = async (field, value) => {
        try {
            let res = await axios.get(
                "https://full-stack-appointment-application.onrender.com/Register",
                {
                    params: { [field]: value }
                }
            );

            let data = res.data;

            console.log(data)

            if (field === "username") {
                setChek(prev => ({
                    ...prev,
                    userError: "",
                    userMsg: data.message
                }));
            }
            else if (field === "email") {
                setChek(prev => ({
                    ...prev,
                    emailError: "",
                    emailMsg: data.message
                }));
            }

        } catch (error) {

            let data = error.response?.data;

            if (error.response?.status === 400 ||
                error.response?.status === 409) {

                if (field === "username") {
                    setChek(prev => ({
                        ...prev,
                        userError: data.userError || "",
                        userMsg: ""
                    }));
                }
                else if (field === "email") {
                    setChek(prev => ({
                        ...prev,
                        emailError: data.emailError || "",
                        emailMsg: ""
                    }));
                }

            } else if (!error.response) {
                setError("Unable to check availability. Please try again.");
            }
        }
    };



    useEffect(() => {
        const username = formik.values.username.trim();


        if (!username) {
            setChek(prev => ({
                ...prev,
                userError: "",
                userMsg: ""
            }));
            return;
        }

        const timer = setTimeout(() => {
            chekUser("username", username);
        }, 1000);

        return () => clearTimeout(timer);

    }, [formik.values.username]);


    useEffect(() => {
        const email = formik.values.email.trim();

        if (!email) {
            setChek(prev => ({
                ...prev,
                emailError: "",
                emailMsg: ""
            }));
            return;
        }

        const timer = setTimeout(() => {
            chekUser("email", email);
        }, 1000);

        return () => clearTimeout(timer);

    }, [formik.values.email]);




    return (
        <div className="py-4">
            <form
                onSubmit={formik.handleSubmit}

            >

                {/* Header */}
                <div className="text-center mb-4">
                    <div
                        className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                        style={{ width: "60px", height: "60px" }}
                    >
                        <i className="bi bi-person-plus-fill fs-3"></i>
                    </div>

                    <h2 className="fw-bold mb-1">
                        Create Account
                    </h2>

                    <p className="text-secondary mb-0">
                        Register yourself and get started
                    </p>
                </div>

                {/* Form Card */}
                <div className="card border-0 shadow-sm rounded-4">
                    <div className="card-body p-4">

                        {/* Name */}
                        <div className="mb-3">
                            <label className="form-label fw-semibold">
                                <i className="bi bi-person me-2"></i>
                                Name
                            </label>

                            <input
                                id="nameer"
                                type="text"
                                className="form-control form-control-lg"
                                name="name"
                                value={formik.values.name}
                                onChange={(e) => { formik.handleChange(e); setValidation(prev=>({...prev,namemsg:""})) }}
                                placeholder="Enter your name"
                                required
                            />

                            
                            {validation.namemsg && (<p className="text-danger">{validation.namemsg}</p>)} 

                        </div>

                        {/* Username */}
                        <div className="mb-3">
                            <label className="form-label fw-semibold">
                                <i className="bi bi-person-badge me-2"></i>
                                Username
                            </label>

                            <input
                                type="text"
                                className="form-control form-control-lg"
                                name="username"
                                value={formik.values.username}
                                onChange={formik.handleChange}
                                placeholder="Enter username"
                                required
                            />
                            <span className={`${chek?.userError ? "text-danger" : "text-success"}`} id="usererror">
                                {chek?.userError ? chek?.userError : chek?.userMsg}
                            </span>
                        </div>

                        {/* Email */}
                        <div className="mb-3">
                            <label className="form-label fw-semibold">
                                <i className="bi bi-envelope me-2"></i>
                                Email
                            </label>

                            <input
                                type="email"
                                className="form-control form-control-lg"
                                name="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                placeholder="Enter email address"
                                required
                            />
                            <span className={`${chek?.emailError ? "text-danger" : "text-success"}`} id="emerror">
                                {chek?.emailError ? chek?.emailError : chek?.emailMsg}
                            </span>
                        </div>

                        {/* Password */}
                        <div className="mb-3">
                            <label className="form-label fw-semibold">
                                <i className="bi bi-lock me-2"></i>
                                Password
                            </label>

                            <div className="input-group input-group-lg">
                                <input
                                    type={show ? "password" : "text"}
                                    className="form-control"
                                    name="password"
                                    value={formik.values.password}
                                    onChange={(e) => { formik.handleChange(e); setValidation(prev=>({...prev,passmessage:""})) }}
                                    placeholder="Enter password"
                                    required
                                />
                                
                                <span
                                    className={`input-group-text ${show ? "bi bi-eye-slash" : "bi bi-eye"}`}
                                    style={{ cursor: "pointer" }}
                                    onClick={() => setShow(!show)}
                                ></span>

                                {validation.passmessage && (<p className="text-danger">{validation.passmessage}</p>)} 
                            </div>
                        </div>

                        {/* Error / Timer */}
                        {error && timer && (
                            <div className="alert alert-danger py-2 px-3 mb-3">
                                <div className="d-flex align-items-center gap-2">
                                    <i className="bi bi-exclamation-triangle-fill"></i>

                                    <div>
                                        <div className="fw-semibold">
                                            {error}
                                        </div>

                                        <small>
                                            Please try again after {timer} seconds
                                        </small>
                                    </div>
                                </div>
                            </div>
                        )}

                        <button
                            type="submit"
                            className="btn btn-primary btn-lg w-100 fw-semibold"
                            disabled={loadding || timer > 0}
                        >
                            {loadding ? (
                                <>
                                    <span
                                        className="spinner-border spinner-border-sm me-2"
                                        role="status"
                                        aria-hidden="true"
                                    ></span>
                                    Loading...
                                </>
                            ) : (
                                <>
                                    <span className="bi bi-person-plus-fill me-2"></span>
                                    Create Account
                                </>
                            )}
                        </button>


                        {/* Login */}
                        <div className="text-center mt-4">
                            <span className="text-secondary">
                                Already have an account?
                            </span>

                            <Link
                                to="/#login"
                                className="text-decoration-none fw-semibold ms-2"
                            >
                                Login User
                            </Link>
                        </div>

                    </div>
                </div>

            </form>
        </div>
    )
}