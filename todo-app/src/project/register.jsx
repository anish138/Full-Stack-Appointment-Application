import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";




export function Register(props) {

    let navigate = useNavigate();

    const [show, setShow] = useState(true)

    const formik = useFormik({
        initialValues: {
            name: "",
            username: "",
            email: "",
            password: ""
        },
        onSubmit: async (user) => {

            try {
                let res = await axios.post("http://localhost:3000/Register", user,{withCredentials:true})

                alert(res.data.message)

                navigate("/Dashboard")

                
            } catch (error) {

                if(error.response){

                    alert(response.data.message)
                }else{
                    alert("server error")
                }

                
            }
        }
    })

    return (
        <div className={props.align}>
            <form onSubmit={formik.handleSubmit} className={props.width}>
                <div>
                    <h2 className={props.icone}> {props.text}</h2>
                </div>
                <dl>
                    <dt>Name</dt>
                    <dd><input type="text" className="form-control" name="name" value={formik.values.name} onChange={formik.handleChange} required /> </dd>
                    <dt>UserName</dt>
                    <dd><input type="text" className="form-control" name="username" value={formik.values.username} onChange={formik.handleChange} required /> </dd>
                    <dt>Email</dt>
                    <dd><input type="email" className="form-control" name="email" value={formik.values.email} onChange={formik.handleChange} required /> </dd>
                    <dt>Password</dt>
                    <dd className="input-group"><input type={show ? "password" : "text"} className="form-control" name="password" value={formik.values.password} onChange={formik.handleChange} required /><span className={`input-group-text text-center${show ? "bi bi-eye-slash" : "bi bi-eye"}`} onClick={() => setShow(!show)} ></span></dd>

                </dl>
                <button type="submit" className="btn btn-outline-primary w-100">Submit</button>
                <div>
                    <Link to="/login">Login User</Link>
                </div>
            </form>
        </div>
    )
}