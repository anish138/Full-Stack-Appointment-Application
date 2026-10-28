import axios from "axios";
import { useFormik } from "formik";
import { useContext, useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "./indexcontext";


export function Register() {

    let navigate = useNavigate();

    const { getusers } = useContext(UserContext)
    const [show, setShow] = useState(true)
    const [error, setError] = useState("")
    const [timer, setTimer] = useState(0)
    const [chek, setChek] = useState({})

    console.log(chek)

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
                let res = await axios.post("http://localhost:3000/Register", user, { withCredentials: true })

                alert(res.data.message)

                getusers(user.username)

                navigate("/Dashboard")

            } catch (error) {

                if (error.response.status === 429) {

                    setError("Too many register attempts")
                    setTimer(10)

                } else if (error.response.status === 409) {
                    setChek({ emailError: error.response.data.emailError }, { userError: error.response.data.userError })

                } else if (error.response) {
                    alert(error.response.data.message)

                } else {
                    alert("server error")
                }

            }
        }
    })



    const chekUser = async (field, value) => {
        try {
            let res = await axios.get("http://localhost:3000/Register", {
                params: { [field]: value }
            });

            if (field === "username") {
                setChek(prev => ({ ...prev, userError: "", userMsg: res.data.message }));
            } else if (field === "email") {
                setChek(prev => ({ ...prev, emailError: "", emailMsg: res.data.message }));
            }
        }
        catch (error) {
            if (error.response?.status === 409) {
                if (field === "username") {
                    setChek(prev => ({ ...prev, userError: error.response.data.userError, userMsg: "" }));
                } else if (field === "email") {
                    setChek(prev => ({ ...prev, emailError: error.response.data.emailError, emailMsg: "" }));
                }
            }
        }
    }

    // Debounce for Username (500ms rukne ke baad API call hogi)
    useEffect(() => {
        if (!formik.values.username.trim()) {
            setChek(prev => ({ ...prev, userError: "", userMsg: "" }));
            return;
        }

        const timer = setTimeout(() => {
            chekUser("username", formik.values.username);
        }, 500);

        return () => clearTimeout(timer);
    }, [formik.values.username]);

    // Debounce for Email (500ms rukne ke baad API call hogi)
    useEffect(() => {
        if (!formik.values.email.trim()) {
            setChek(prev => ({ ...prev, emailError: "", emailMsg: "" }));
            return;
        }

        const timer = setTimeout(() => {
            chekUser("email", formik.values.email);
        }, 500);

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
                                type="text"
                                className="form-control form-control-lg"
                                name="name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                placeholder="Enter your name"
                                required
                            />

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
                                    onChange={formik.handleChange}
                                    placeholder="Enter password"
                                    required
                                />

                                <span
                                    className={`input-group-text ${show ? "bi bi-eye-slash" : "bi bi-eye"}`}
                                    style={{ cursor: "pointer" }}
                                    onClick={() => setShow(!show)}
                                ></span>
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

                        {/* Submit */}
                        <button
                            type="submit"
                            className="btn btn-primary btn-lg w-100 fw-semibold"
                        >
                            <i className="bi bi-person-plus-fill me-2"></i>
                            Create Account
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