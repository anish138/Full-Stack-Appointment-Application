import axios from "axios"
import { useFormik } from "formik"
import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"


export function Login(props) {

    let navigate = useNavigate();

    const [show, setShow] = useState(true)
    const [error, setError] = useState("")
    const [timer, setTimer] = useState(0)


    useEffect(() => {
        if (timer <= 0) return;

        const interval = setInterval(() => {
            setTimer(prev => prev - 1)
        }, 1000)

        return () => clearInterval(interval)

    }, [timer])



    const formik = useFormik({
        initialValues: {
            username: "",
            password: ""
        },
        onSubmit: async (user, resert) => {
            try {
                let res = await axios.post("http://localhost:3000/User", { username: user.username, password: user.password }, { withCredentials: true })   //{withCredentials:true}  har request me cookies jayegai ab  

                alert(res.data.message);

                resert.resetForm();

                navigate("/Dashboard", { replace: true })
            } catch (error) {

                if (error.response?.status === 429) {
                    setError("Too many login attempts")
                    setTimer(30)


                } else if (error.response) {

                    alert(error.response.data.message)

                } else {
                    alert("server error")
                }
            }
        }
    })

    return (
        <div className={props.align}>

            <form
                onSubmit={formik.handleSubmit}
                className={`${props.width} mx-auto`}
            >

                {/* Heading */}

                <div className="text-center mb-4">

                    <div
                        className="bg-primary rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                        style={{
                            width: "55px",
                            height: "55px"
                        }}
                    >
                        <span className="bi bi-person-fill text-white fs-4"></span>
                    </div>

                    <h2 className="fs-3 fw-semibold mb-1">
                        Login
                    </h2>

                    <p className="text-secondary small mb-0">
                        Sign in to continue to your account
                    </p>

                </div>


                {/* Username */}

                <div className="mb-3">

                    <label className="form-label fw-semibold">
                        Username
                    </label>

                    <div className="input-group">

                        <span className="input-group-text">
                            <span className="bi bi-person"></span>
                        </span>

                        <input
                            type="text"
                            className="form-control"
                            name="username"
                            placeholder="Enter username"
                            value={formik.values.username}
                            onChange={formik.handleChange}
                            required
                        />

                    </div>

                </div>


                {/* Password */}

                <div className="mb-3">

                    <label className="form-label fw-semibold">
                        Password
                    </label>

                    <div className="input-group">

                        <span className="input-group-text">
                            <span className="bi bi-lock"></span>
                        </span>

                        <input
                            type={show ? "password" : "text"}
                            className="form-control"
                            name="password"
                            placeholder="Enter password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            required
                        />

                        <span
                            className={`input-group-text ${show
                                ? "bi bi-eye-slash"
                                : "bi bi-eye"
                                }`}
                            role="button"
                            onClick={() => setShow(!show)}
                        ></span>

                    </div>

                </div>


                {/* 429 Error */}

                <div style={{ minHeight: "30px" }}>

                    {error && timer > 0 && (

                        <div className="alert alert-danger py-2 px-3 mb-3">

                            <div className="d-flex align-items-center gap-2">

                                <span className="bi bi-exclamation-triangle-fill"></span>

                                <div style={{ fontSize: "12px" }}>

                                    <div className="fw-semibold">
                                        {error}
                                    </div>

                                    <div>
                                        Please try again after {timer} seconds.
                                    </div>

                                </div>

                            </div>

                        </div>

                    )}

                </div>


                {/* Submit */}

                <button
                    type="submit"
                    className="btn btn-primary w-100 py-2 fw-semibold"
                    disabled={timer > 0}
                >

                    {timer > 0 ? (
                        <>
                            <span className="bi bi-clock me-2"></span>
                            Try again in {timer}s
                        </>
                    ) : (
                        <>
                            <span className="bi bi-box-arrow-in-right me-2"></span>
                            Login
                        </>
                    )}

                </button>


                {/* Register */}

                <div className="text-center mt-3">

                    <span className="text-secondary small">
                        Don't have an account?
                    </span>

                    <Link
                        to="/#register"
                        className="text-decoration-none fw-semibold ms-1"
                    >
                        Create Account
                    </Link>
                </div>

            </form>

        </div>
    )
}