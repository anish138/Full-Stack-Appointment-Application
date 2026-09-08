import axios from "axios"
import { useFormik } from "formik"
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"


export function Login(props) {

    let navigate = useNavigate();

    const [show, setShow] = useState(true)

   

    const formik = useFormik({
        initialValues: {
            username: "",
            password: ""
        },
        onSubmit: async (user, resert) => {
            try {
                let res = await axios.post("http://localhost:3000/User", { username: user.username, password: user.password },{withCredentials:true})   //{withCredentials:true}  har request me cookies jayegai ab  

                alert(res.data.message);

                resert.resetForm();

                navigate("/Dashboard",{replace:true})
            } catch (error) {
                console.log(error)
                if (error.response) {
                    alert(error.response.data.message)

                } else {

                    alert("server  error")
                }
            }
        }
    })

    return (
        <div className={props.align} >
            <form onSubmit={formik.handleSubmit} className={props.width} >
                <div>
                    <h2 className={props.icone}> {props.text}</h2>
                </div>
                <dl>
                    <dt>Username</dt>
                    <dd><input type="text" className="form-control" name="username" value={formik.values.username} onChange={formik.handleChange} required /> </dd>
                    <dt>Password</dt>
                    <dd className="input-group"><input type={show ? "password" : "text"} className="form-control" name="password" value={formik.values.password} onChange={formik.handleChange} required /><span className={`input-group-text text-center${show ? "bi bi-eye-slash" : "bi bi-eye"}`} onClick={() => setShow(!show)} ></span></dd>
                </dl>
                <button type="submit" className="btn btn-outline-primary w-100">Submit</button>
                <div>
                    <Link to="/register" className="">New Registration</Link>
                </div>
            </form>
        </div>
    )
}