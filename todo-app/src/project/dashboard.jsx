import { useState } from "react";
import { Outlet } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { Calendar } from "./calendar";

export function Dashboard() {



    const [search, setSearch] = useState("");

    const navigate = useNavigate()

    const SingOutClick = async () => {

        try {
            let res = await axios.delete(`http://localhost:3000/User`, { withCredentials: true })

            alert(res.data.message)

            navigate("/", { replace: true }) // replace:true se logout page ko history mein previous entry ki tarah nahi rakha jayega url back nai hoga 

        } catch (error) {

            if (error.response) {

                alert(error.response.data.message)

            } else {

                alert("server error");
            }
        }

    }


    const { shareappoinments, appoinmentscount } = useSelector((state) => state.sharedata)


    return (
        <div>
            <div className="row container-fluid">

                <div className="col-2 mt-3">
                    <div>
                        <div className="bg-light p-2">
                            <h2 className="fs-3">! Hello</h2>
                        </div>
                    </div>
                    <div className="mt-5 mb-3">
                        <button className="btn btn-outline-primary"data-bs-toggle="modal" data-bs-target="#calendarmod"> Calendar <span className="bi bi-calendar-date "></span></button>
                        <Calendar/>
                    </div>
                    <div className="mb-3">
                        <button className="btn btn-outline-primary"> Projects <span className="bi bi-folder-fill"></span></button>
                    </div>
                    <div className="mb-3">
                        <button className="btn btn-outline-primary"> Tasks <span className="bi bi-pencil-square"></span></button>
                    </div>
                    <div className="mb-3">
                        <button className="btn btn-outline-primary">Setting <span className="bi bi-gear-fill"></span></button>
                    </div>
                </div>

                <div className="col-10 mt-3">
                    <div className="bg-light d-flex justify-content-between p-2">
                        <div>
                            <h2 className="fs-3">Dashboard</h2>
                        </div>
                        <div>
                            <div className="input-group">
                                <input type="text" className="form-control" onChange={(e) => setSearch(e.target.value)} />
                                <span className="bi bi-search input-group-text bg-warning "></span>
                            </div>
                        </div>
                        <div>
                            <button className="btn btn-outline-primary" onClick={() => navigate("/Dashboard/addappointments")}><span className="bi bi-calendar-date" ></span> Add Appointment</button>
                        </div>
                        <div>
                            <button className="btn btn-outline-primary" onClick={SingOutClick}><span className="bi bi-person-circle"> Sing Out</span></button>
                        </div>
                    </div>

                    <div className="mt-5">
                        <div className="bg-light p-3">
                            <div className="d-flex justify-content-between">
                                <div className="d-flex" style={{ width: "300px" }}>
                                    <select className="form-select ">
                                        <option>Filter</option>
                                        <option >New Date </option>
                                        <option >Old Date</option>
                                    </select>

                                    <select className="form-select mx-4">
                                        <option>Date</option>
                                        <option>Upcomming</option>
                                        <option>Past</option>
                                    </select>
                                </div>

                                <div>
                                    <button className="bi bi-share-fill btn btn-primary position-relative" data-bs-toggle="offcanvas" data-bs-target="#share"  ><span className="badge bg-dark rounded rounded-circle position-absolute"></span></button>

                                    <div className="offcanvas offcanvas-end" id="share">
                                        <div className="offcanvas-header">
                                            <span className="bi bi-arrow-up-right-square fs-4 fw-bold"> Share Appointemnts</span>
                                            <button className="btn btn-close" data-bs-dismiss="offcanvas"></button>
                                        </div>
                                        <div className="offcanvas-body">
                                            <table className="table table-hover">
                                                <thead>
                                                    <tr>
                                                        <th>Title</th>
                                                        <th>Appointments</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>

                                                    {

                                                        shareappoinments.map(data =>
                                                            <tr key={data._id}>
                                                                <td >{data.title}</td>
                                                                <td>{data.description}</td>
                                                                <td>
                                                                    <button className="btn btn-outline-danger"><span className="bi bi-trash"></span></button>
                                                                </td>
                                                            </tr>
                                                        )
                                                    }

                                                </tbody>
                                                <tfoot>
                                                    <tr>
                                                        <td className="bg-warning " >Total Appointment:{appoinmentscount}</td>
                                                    </tr>
                                                </tfoot>
                                            </table>
                                        </div>
                                        <div className="offcanvas-footer">

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-4">
                        <Outlet context={search} />
                    </div>
                </div>
            </div>
        </div>
    )
}