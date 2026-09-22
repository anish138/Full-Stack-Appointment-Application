import axios from "axios"
import { useFormik } from "formik"
import { useNavigate } from "react-router-dom"
import UserContext from "./indexcontext"
import { useContext } from "react"

export function Addappointments() {

    const { users, setRefresh } = useContext(UserContext)

    const navigate = useNavigate()


    const formik = useFormik({
        initialValues: {
            userId: "",
            title: "",
            description: "",
            date: ""
        },
        onSubmit: async (user, resert) => {

            console.log(user)

            try {
                let res = await axios.post("http://localhost:3000/Appointment", user, { withCredentials: true })

                alert(res.data.message)

                resert.resetForm()

                setRefresh(ref => ref + 1)  // data depan.. get method 

                navigate("/Dashboard/appointments")
            } catch (error) {

                if (error.response) {
                    alert(error.response.data.message)
                } else {
                    alert("server error")
                }
            }

        }
    })


    return (
        <div className="container py-4">

            {/* Header */}
            <div className="mb-4">
                <div className="d-flex align-items-center gap-3">

                    <div
                        className="bg-primary text-white rounded-3 d-flex align-items-center justify-content-center"
                        style={{ width: "50px", height: "50px" }}
                    >
                        <i className="bi bi-calendar-plus fs-4"></i>
                    </div>

                    <div>
                        <h2 className="fw-bold mb-1">
                            Add Appointment
                        </h2>

                        <p className="text-secondary mb-0">
                            Create a new appointment and manage your schedule.
                        </p>
                    </div>

                </div>
            </div>


            <div className="row g-4">

                {/* ================= FORM ================= */}

                <div className="col-lg-8">

                    <div className="card border-0 shadow-sm rounded-4">

                        <div className="card-body p-4 p-md-5">

                            <form onSubmit={formik.handleSubmit}>

                                {/* Select User */}

                                <div className="mb-4">

                                    <label className="form-label fw-semibold">
                                        <i className="bi bi-person me-2"></i>
                                        Select User
                                    </label>

                                    <select
                                        type="text"
                                        name="userId"
                                        className="form-select form-select-lg"
                                        value={formik.values.userId}
                                        onChange={formik.handleChange}
                                        required
                                    >

                                        <option value="">
                                            -- Select User --
                                        </option>

                                        {
                                            users.map(user =>
                                                <option
                                                    key={user._id}
                                                    value={user._id}
                                                >
                                                    {user.username}
                                                </option>
                                            )
                                        }

                                    </select>

                                </div>


                                {/* Title */}

                                <div className="mb-4">

                                    <label className="form-label fw-semibold">
                                        <i className="bi bi-card-heading me-2"></i>
                                        Title
                                    </label>

                                    <input
                                        type="text"
                                        name="title"
                                        className="form-control form-control-lg"
                                        value={formik.values.title}
                                        onChange={formik.handleChange}
                                        placeholder="Enter appointment title"
                                        required
                                    />

                                </div>


                                {/* Description */}

                                <div className="mb-4">

                                    <label className="form-label fw-semibold">
                                        <i className="bi bi-text-paragraph me-2"></i>
                                        Description
                                    </label>

                                    <input
                                        type="text"
                                        name="description"
                                        className="form-control form-control-lg"
                                        value={formik.values.description}
                                        onChange={formik.handleChange}
                                        placeholder="Enter appointment description"
                                        required
                                    />

                                </div>


                                {/* Date */}

                                <div className="mb-4">

                                    <label className="form-label fw-semibold">
                                        <i className="bi bi-calendar-event me-2"></i>
                                        Date
                                    </label>

                                    <input
                                        type="date"
                                        name="date"
                                        className="form-control form-control-lg"
                                        value={formik.values.date}
                                        onChange={formik.handleChange}
                                        required
                                    />

                                </div>


                                {/* Buttons */}

                                <div className="d-flex justify-content-end gap-2 pt-2">

                                    <button
                                        className="btn btn-outline-secondary px-4"
                                        type="button"
                                        onClick={() =>
                                            navigate("/Dashboard/appointments")
                                        }
                                    >
                                        <i className="bi bi-x-lg me-2"></i>
                                        Cancel
                                    </button>

                                    <button
                                        className="btn btn-primary px-4"
                                        type="submit"
                                    >
                                        <i className="bi bi-check-lg me-2"></i>
                                        Save Appointment
                                    </button>

                                </div>

                            </form>

                        </div>

                    </div>

                </div>


                {/* ================= RIGHT SIDE ================= */}

                <div className="col-lg-4">

                    <div className="card border-0 shadow-sm rounded-4 h-100">

                        <div className="card-body p-4">

                            <div className="text-center mb-4">

                                <div
                                    className="bg-primary bg-opacity-10 text-primary rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                                    style={{
                                        width: "70px",
                                        height: "70px"
                                    }}
                                >
                                    <i className="bi bi-calendar-check fs-2"></i>
                                </div>

                                <h5 className="fw-bold">
                                    Appointment Details
                                </h5>

                                <p className="text-secondary small">
                                    Fill in the details to create a new appointment.
                                </p>

                            </div>


                            <div className="border rounded-3 p-3 mb-3">

                                <div className="d-flex align-items-center gap-3">

                                    <i className="bi bi-person-check text-primary fs-4"></i>

                                    <div>
                                        <small className="text-secondary">
                                            User
                                        </small>

                                        <div className="fw-semibold">
                                            Select the user
                                        </div>
                                    </div>

                                </div>

                            </div>


                            <div className="border rounded-3 p-3 mb-3">

                                <div className="d-flex align-items-center gap-3">

                                    <i className="bi bi-card-text text-success fs-4"></i>

                                    <div>
                                        <small className="text-secondary">
                                            Appointment
                                        </small>

                                        <div className="fw-semibold">
                                            Add title & description
                                        </div>
                                    </div>

                                </div>

                            </div>


                            <div className="border rounded-3 p-3">

                                <div className="d-flex align-items-center gap-3">

                                    <i className="bi bi-calendar3 text-warning fs-4"></i>

                                    <div>
                                        <small className="text-secondary">
                                            Schedule
                                        </small>

                                        <div className="fw-semibold">
                                            Choose appointment date
                                        </div>
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    )
}