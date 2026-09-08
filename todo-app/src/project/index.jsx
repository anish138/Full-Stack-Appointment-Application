import { BrowserRouter } from "react-router-dom";
import { IndexContext } from "./indexcontext";
export function Index() {

    //BrowserRouter reason becouse hai to uselocation ka use nai kar sakte is liye isko alag se index component me liya
    return(
        <BrowserRouter>   
            <IndexContext/>
        </BrowserRouter>
    )
   
}