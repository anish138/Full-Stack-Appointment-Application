import axios from "axios";
import { useFormik } from "formik";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";




export function Register(props) {

    let navigate = useNavigate();

    const [show, setShow] = useState(true)
    const [error, setError] = useState("")
    const [timer, setTimer] = useState(0)


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

                navigate("/Dashboard")


            } catch (error) {

                if (error.response.status === 429) {

                    setError("Too many login attempts")
                    setTimer(10)

                } else if (error.response) {
                    alert(response.data.message)

                } else {
                    alert("server error")
                }

            }
        }
    })

    return (
        <div className={`${props.align} py-4`}>
            <form
                onSubmit={formik.handleSubmit}
                className={`${props.width} mx-auto`}
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
                        {props.text || "Create Account"}
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