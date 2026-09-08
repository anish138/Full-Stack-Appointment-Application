import { useNavigate, useOutletContext } from "react-router-dom"
import { useContext } from "react";
import UserContext from "./indexcontext";

export function Appointments() {

    const Search = useOutletContext();

    const navigate = useNavigate()

    const { appointments,delappointment } = useContext(UserContext)


    return (
        <div>
            <h3>Apoointments Details</h3>
            <div>
                <div>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                appointments.filter(appointments => (appointments.title || "").toLowerCase().includes((Search || '').toLowerCase()))
                                    .map(appointment =>
                                        <tr key={appointment._id}>
                                            <td>{appointment.title}</td>
                                            <td>{appointment.description}</td>
                                            <td>{new Date(appointment.date).toLocaleDateString()}</td>
                                            <td>{new Date(appointment.date).toLocaleTimeString()}</td>
                                            <td>

                                                <button className="btn btn-outline-danger" onClick={()=>delappointment(appointment._id)} ><span className="bi bi-trash"></span></button>
                                                <button className="btn btn-outline-warning mx-2" onClick={()=>navigate("/Dashboard/editappointments/" + appointment._id)}><span className="bi bi-pen"></span></button>

                                            </td>
                                        </tr>
                                    )

                            }
                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    )
}