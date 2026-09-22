import { useContext } from "react"
import UserContext from "./indexcontext"
import { useFormik } from "formik"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom"

export function EditAppoinments() {

    const navigate = useNavigate();

    const { id } = useParams();

    const { appointments, setRefresh } = useContext(UserContext);

    const appointment = appointments?.find(item => item._id === id)

    const formatdate = appointment?.date ? new Date(appointment.date).toLocaleDateString("en-CA") : "";



    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: appointment?.title || "",
            description: appointment?.description || "",
            date: formatdate || ""
        },
        onSubmit: async (user) => {
            try {
                let res = await axios.put(`http://localhost:3000/Appointment/${id}`, user, { withCredentials: true })

                alert(res.data.user)

                setRefresh(ref => ref + 1);

                navigate("/Dashboard/appointments")

            } catch (error) {

                if (error.response) {
                    alert(error.response.data.message)
                }
                alert("server error");
            }
        }
    })

    return (
        <div className="container-fluid py-4">

            {/* Header */}
            <div className="d-flex align-items-center gap-3 mb-4">
                <div
                    className="bg-primary text-white rounded-3 d-flex align-items-center justify-content-center"
                    style={{ width: "45px", height: "45px" }}
                >
                    <i className="bi bi-pencil-square fs-4"></i>
                </div>

                <div>
                    <h3 className="fw-bold mb-0">Edit Appointment</h3>
                    <small className="text-secondary">
                        Update your appointment details
                    </small>
                </div>
            </div>

            <div className="row g-4">

                {/* Form */}
                <div className="col-lg-8">

                    <div className="card border-0 shadow-sm rounded-4">
                        <div className="card-body p-4">

                            <div className="d-flex align-items-center gap-2 mb-4">
                                <i className="bi bi-calendar-event text-primary fs-5"></i>
                                <h5 className="fw-semibold mb-0">
                                    Appointment Details
                                </h5>
                            </div>

                            <form onSubmit={formik.handleSubmit}>

                                <div className="mb-3">
                                    <label className="form-label fw-semibold">
                                        Title
                                    </label>

                                    <div className="input-group">
                                        <span className="input-group-text bg-body">
                                            <i className="bi bi-card-heading"></i>
                                        </span>

                                        <input
                                            type="text"
                                            name="title"
                                            className="form-control"
                                            value={formik.values.title}
                                            onChange={formik.handleChange}
                                            required
                                            placeholder="Enter appointment title"
                                        />
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-semibold">
                                        Description
                                    </label>

                                    <div className="input-group">
                                        <span className="input-group-text bg-body">
                                            <i className="bi bi-text-paragraph"></i>
                                        </span>

                                        <input
                                            type="text"
                                            name="description"
                                            className="form-control"
                                            value={formik.values.description}
                                            onChange={formik.handleChange}
                                            required
                                            placeholder="Enter appointment description"
                                        />
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <label className="form-label fw-semibold">
                                        Date
                                    </label>

                                    <div className="input-group">
                                        <span className="input-group-text bg-body">
                                            <i className="bi bi-calendar3"></i>
                                        </span>

                                        <input
                                            type="date"
                                            name="date"
                                            className="form-control"
                                            value={formik.values.date}
                                            onChange={formik.handleChange}
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Buttons */}
                                <div className="d-flex gap-2">

                                    <button
                                        className="btn btn-success px-4"
                                        type="submit"
                                    >
                                        <i className="bi bi-check-lg me-2"></i>
                                        Save Changes
                                    </button>

                                    <button
                                        className="btn btn-danger px-4"
                                        onClick={() =>
                                            navigate("/Dashboard/appointments")
                                        }
                                    >
                                        <i className="bi bi-x-lg me-2"></i>
                                        Cancel
                                    </button>

                                </div>

                            </form>

                        </div>
                    </div>

                </div>

                {/* Right Side Info */}
                <div className="col-lg-4">

                    <div className="card border-0 shadow-sm rounded-4 h-100">
                        <div className="card-body p-4">

                            <div
                                className="bg-primary bg-opacity-10 text-primary rounded-3 d-flex align-items-center justify-content-center mb-3"
                                style={{ width: "50px", height: "50px" }}
                            >
                                <i className="bi bi-info-circle fs-4"></i>
                            </div>

                            <h5 className="fw-bold">
                                Edit Appointment
                            </h5>

                            <p className="text-secondary small">
                                Update the information of your existing
                                appointment and save the changes.
                            </p>

                            <hr />

                            <div className="d-flex align-items-center gap-2 mb-3">
                                <i className="bi bi-check-circle text-success"></i>
                                <span className="small">
                                    Keep appointment details updated
                                </span>
                            </div>

                            <div className="d-flex align-items-center gap-2 mb-3">
                                <i className="bi bi-calendar-check text-primary"></i>
                                <span className="small">
                                    Update the scheduled date
                                </span>
                            </div>

                            <div className="d-flex align-items-center gap-2">
                                <i className="bi bi-shield-check text-warning"></i>
                                <span className="small">
                                    Review details before saving
                                </span>
                            </div>

                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}