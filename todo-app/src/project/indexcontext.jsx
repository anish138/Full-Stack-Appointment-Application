import { Link, Route, Routes } from "react-router-dom";
import axios from "axios";
import { Home } from "./home";
import { Login } from "./login";
import { Register } from "./register";
import { Dashboard } from "./dashboard";
import { useLocation } from "react-router-dom";
import { createContext, useState, useEffect } from "react";
import { Appointments } from "./appointments";
import { Addappointments } from "./addappointments";
import { EditAppoinments } from "./editappointments";


const UserContext = createContext()
export default UserContext;

export function IndexContext() {


    const [users, setUsers] = useState([{ username: null }])

    const [appointments, setAppointments] = useState([{ title: null, description: null, date: null, userId: null, _id: null }])  //appointment data save

    const[refresh,setRefresh] = useState(0)

    const location = useLocation()   // iska use location path provide karata hai 
    

    useEffect(() => {

        const fetchdata = async () => {  // Login data fetch (only username )
            try {
                let res = await axios.get("http://localhost:3000/User")

                setUsers(res.data.users)
            } catch (error) {

                if (error.response) {
                    alert(error.response.data.message)
                } else {
                    alert("server error indexCount");
                }
            }
        }

        fetchdata();

    }, [])


    useEffect(() => {
        const fetchappointdata = async () => {  // appointment data fetch
            try {
                let res = await axios.get("http://localhost:3000/Appointment")

                setAppointments(res.data.users)
            } catch (error) {
                if (error.response) {
                    alert(error.response.data.message)
                } else {
                    alert("server error");
                }
            }
        }
        fetchappointdata();
    }, [refresh])


   
        const delappointment = async (id) => {

            try {
                let res = await axios.delete(`http://localhost:3000/Appointment/${id}`, { withCredentials: true })


                alert(res.data.message)

                setAppointments(prev=> prev.filter(item=>item._id !== id))

            } catch (error) {

                if (error.response) {

                    alert(error.response.data.message)

                } else {

                    alert("server error")

                }
            }
        }
   



    return (
        <div className="container-fluid">

            {location.pathname.startsWith("/Dashboard") || (<header >
                <div className="bg-light d-flex justify-content-between p-4">
                    <div>
                        <Link to="/"><button className="btn btn-outline-primary fs-4 bi bi-square-fill"> TaskManager</button></Link>
                    </div>
                    <div>
                        <button className="btn btn-outline-primary">Features</button>
                        <button className="btn btn-outline-primary m-3">Princing</button>
                        <button className="btn btn-outline-primary">About</button>
                    </div>
                </div>
            </header>)}

            <UserContext.Provider value={{ users, appointments,delappointment,setRefresh }}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="login" element={<Login className="d-flex justify-content-end mt-4" width="w-25 ms-3 mt-4" text="Login User" icone="bi bi-person-fill" />} />
                    <Route path="register" element={<Register className="d-flex justify-content-end mt-4" width="w-25 ms-3 mt-4" text="Login User" icone="bi bi-person-fill" />} />
                    <Route path="Dashboard" element={<Dashboard />}>
                        <Route index element={<Appointments />} />
                        <Route path="appointments" element={<Appointments />} />
                        <Route path="addappointments" element={<Addappointments />} />
                        <Route path="editappointments/:id" element={<EditAppoinments/>}/>
                    </Route>
                </Routes>
            </UserContext.Provider>

        </div>
    )
}