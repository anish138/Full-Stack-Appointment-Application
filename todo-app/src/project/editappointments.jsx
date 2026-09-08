import { useContext } from "react"
import UserContext from "./indexcontext"
import { useFormik } from "formik"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom"

export function EditAppoinments() {

    const navigate = useNavigate();

    const { id } = useParams();

    const { appointments,setRefresh } = useContext(UserContext);

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

                setRefresh(ref=> ref+1);

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
        <div>
            <h2>Edit Appointments</h2>
            <div className="row">
                <div className="col-8">
                    <form onSubmit={formik.handleSubmit}>
                        <dl>
                            <dt>Title</dt>
                            <dd><input type="text" name="title" className="form-control" value={formik.values.title} onChange={formik.handleChange} required /> </dd>
                            <dt>Description</dt>
                            <dd><input type="text" name="description" className="form-control" value={formik.values.description} onChange={formik.handleChange} required /> </dd>
                            <dt>Date</dt>
                            <dd><input type="date" name="date" className="form-control" value={formik.values.date} onChange={formik.handleChange} required /> </dd>
                        </dl>
                        <div className="d-flex justify-content-start">
                            <button className="btn btn-success" type="submit">Save</button>
                            <button className="btn btn-danger mx-2" onClick={() => navigate("/Dashboard/appointments")}>Cancel</button>
                        </div>
                    </form>
                </div>

                <div className="col-4">

                </div>
            </div>
        </div>
    )
}