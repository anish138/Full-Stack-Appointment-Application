import { useNavigate, useOutletContext } from "react-router-dom"
import { useContext } from "react";
import UserContext from "./indexcontext";
import { useDispatch } from "react-redux"
import { addtoshare } from "./taskslice";


export function Appointments() {

    const Search = useOutletContext();

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const { appointments, delappointment } = useContext(UserContext)

    const shareAppointment = (appointment) => {

        alert("Appoinment Share Succussfully.....")

        dispatch(addtoshare(appointment));

    }


    return (
        <div className="container-fluid py-4">

            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>
                    <div className="d-flex align-items-center gap-2">
                        <div
                            className="bg-primary text-white rounded-3 d-flex align-items-center justify-content-center"
                            style={{ width: "45px", height: "45px" }}
                        >
                            <i className="bi bi-calendar-check fs-4"></i>
                        </div>

                        <div>
                            <h3 className="fw-bold mb-0">
                                Appointments
                            </h3>

                            <small className="text-secondary">
                                Manage your scheduled appointments
                            </small>
                        </div>
                    </div>
                </div>

                <span className="badge bg-primary rounded-pill px-3 py-2">
                    <i className="bi bi-calendar3 me-2"></i>
                    {appointments.length} Appointments
                </span>

            </div>


            {/* Table Card */}
            <div className="card border-0 shadow-sm rounded-4">

                <div className="card-body p-0">

                    <div className="table-responsive">

                        <table className="table table-hover align-middle mb-0">

                            <thead className="table-light">

                                <tr>
                                    <th className="px-4 py-3">
                                        <i className="bi bi-card-heading me-2"></i>
                                        Title
                                    </th>

                                    <th className="py-3">
                                        <i className="bi bi-text-paragraph me-2"></i>
                                        Description
                                    </th>

                                    <th className="py-3">
                                        <i className="bi bi-calendar-event me-2"></i>
                                        Date
                                    </th>

                                    <th className="py-3">
                                        <i className="bi bi-clock me-2"></i>
                                        Time
                                    </th>

                                    <th className="py-3 text-center">
                                        Action
                                    </th>
                                </tr>

                            </thead>


                            <tbody>

                                {
                                    appointments
                                        .filter(appointments =>
                                            (appointments.title || "")
                                                .toLowerCase()
                                                .includes((Search || '').toLowerCase())
                                        )
                                        .map(appointment =>
                                            <tr key={appointment._id}>

                                                {/* Title */}
                                                <td className="px-4">

                                                    <div className="d-flex align-items-center gap-2">

                                                        <div
                                                            className="bg-primary bg-opacity-10 text-primary rounded-3 d-flex align-items-center justify-content-center"
                                                            style={{
                                                                width: "38px",
                                                                height: "38px"
                                                            }}
                                                        >
                                                            <i className="bi bi-calendar-event"></i>
                                                        </div>

                                                        <span className="fw-semibold">
                                                            {appointment.title}
                                                        </span>

                                                    </div>

                                                </td>


                                                {/* Description */}
                                                <td>

                                                    <span className="text-secondary">
                                                        {appointment.description}
                                                    </span>

                                                </td>


                                                {/* Date */}
                                                <td>

                                                    <div className="d-flex align-items-center gap-2">

                                                        <i className="bi bi-calendar3 text-primary"></i>

                                                        {new Date(
                                                            appointment.date
                                                        ).toLocaleDateString()}

                                                    </div>

                                                </td>


                                                {/* Time */}
                                                <td>

                                                    <div className="d-flex align-items-center gap-2">

                                                        <i className="bi bi-clock text-success"></i>

                                                        {new Date(
                                                            appointment.date
                                                        ).toLocaleTimeString()}

                                                    </div>

                                                </td>


                                                {/* Actions */}
                                                <td className="text-center">

                                                    <div className="d-flex justify-content-center gap-2">

                                                        <button
                                                            className="btn btn-outline-danger btn-sm"
                                                            onClick={() =>
                                                                delappointment(
                                                                    appointment._id
                                                                )
                                                            }
                                                            title="Delete"
                                                        >
                                                            <span className="bi bi-trash"></span>
                                                        </button>


                                                        <button
                                                            className="btn btn-outline-warning btn-sm"
                                                            onClick={() =>
                                                                navigate(
                                                                    "/Dashboard/editappointments/" +
                                                                    appointment._id
                                                                )
                                                            }
                                                            title="Edit"
                                                        >
                                                            <span className="bi bi-pen"></span>
                                                        </button>


                                                        <button
                                                            className="btn btn-outline-primary btn-sm"
                                                            onClick={() =>
                                                                shareAppointment(
                                                                    appointment
                                                                )
                                                            }
                                                            title="Share"
                                                        >
                                                            <span className="bi bi-arrow-up-right-square"></span>
                                                        </button>

                                                    </div>

                                                </td>

                                            </tr>
                                        )

                                }

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        </div>
    )
}