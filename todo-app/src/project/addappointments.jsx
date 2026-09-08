import axios from "axios"
import { useFormik } from "formik"
import { useNavigate } from "react-router-dom"
import  UserContext  from "./indexcontext"
import { useContext } from "react"

export function Addappointments() {

    const {users,setRefresh} = useContext(UserContext)
    
    const navigate = useNavigate()

    
    const formik = useFormik({
        initialValues: {
            userId: "",
            title: "",
            description: "",
            date: ""
        },
        onSubmit: async (user, resert ) => {

            console.log(user)

            try {
                let res = await axios.post("http://localhost:3000/Appointment", user, { withCredentials: true })

                alert(res.data.message)

                resert.resetForm()

                setRefresh(ref=>ref+1)  // data depan.. get method 

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
        <div>
            <h2>Appointments Add</h2>
            <div className="row">
                <div className="col-8">
                    <form onSubmit={formik.handleSubmit}>
                        <dl>
                            <select type="text" name="userId" className="form-control" value={formik.values.userId} onChange={formik.handleChange} required >
                              
                               <option value="">-- Select User --</option>
                              {
                                users.map(user=>
                                    <option key={user._id} value={user._id}>{user.username}</option>
                                )
                              } 
                        
                            </select>
                            <dt>Title</dt>
                            <dd><input type="text" name="title" className="form-control" value={formik.values.title} onChange={formik.handleChange} required /> </dd>
                            <dt>Description</dt>
                            <dd><input type="text" name="description" className="form-control" value={formik.values.description} onChange={formik.handleChange} required /> </dd>
                            <dt>Date</dt>
                            <dd><input type="date" name="date" className="form-control" value={formik.values.date} onChange={formik.handleChange} required /> </dd>
                        </dl>
                        <div className="d-flex justify-content-start">
                            <button className="btn btn-success" type="submit">Save</button>
                            <button className="btn btn-danger mx-2" onClick={() =>navigate("/Dashboard/appointments")}>Cancel</button>
                        </div>
                    </form>
                </div>
                
                <div className="col-4">

                </div>
            </div>
        </div>
    )
}