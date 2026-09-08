import { BrowserRouter } from "react-router-dom";
import { Login } from "./login";
import { Register } from "./register";

export function Home() {

    return (
        <div>
            <div className="row mt-5">
                <div className="col-6">
                        <div className="w-50 ms-4">
                            <ul className="nav nav-tabs">
                                <li className="nav-itme"><a href="#login" className="nav-link active" data-bs-toggle="tab" >Login</a></li>
                                <li className="nav-itme"><a href="#register" className=" nav-link" data-bs-toggle="tab">Register</a></li>
                            </ul>
                            <div className="tab-content">
                                    <div className="tab-pane active" id="login"> 
                                        <Login/>
                                    </div>
                                    <div className="tab-pane" id="register">
                                        <Register/>
                                    </div>
                            </div>
                        </div>
                </div>

            </div>
        </div>
    )
}