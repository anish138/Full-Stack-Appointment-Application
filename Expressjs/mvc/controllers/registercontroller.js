import LoginUser from "../models/user.js";
import { genrateToken } from "../utils/genratetoken.js";
import {  hassingPassword } from "../utils/password.js";
import { cookieadd } from "./cookiecontroller.js";

// USER register

const postRegister = async (req, res) => {

    const { name, username, email, password } = req.body

    if (!name || !username || !email || !password) // agar email empty hai tab
        return res.status(400).json({ message: "name,email,username,password is not provided" })


    const verify = await LoginUser.findOne({ email: email })
    if (verify) 
        return res.status(409).json({ message: "your email is alredy exist please login" })
    //409(confict) request bhej rahe ho lekin server se match nai hota is liye kiya jata hai

    const hasspassword = await hassingPassword(password) // password ko hasing karne ke liye diya ja raha hai


    const user = await LoginUser.create({ name: name, username: username, email: email, password: hasspassword })

    const token = await genrateToken(user._id, email)    // yaha pass user.id and email ko token create karne ke liye diya ja raha hai
    // yaha pass registration ke time token create hpga ab jab bhi use history chek karega token compare karega ki authorized user hai ki nai
    
    // register me token create karne ka purpose register ke user direct loggd-in ho na aur protected routes ko access kar sake

    cookieadd(res,user.id,user.username,token)

    return res.status(201).json({ message: "user created successfully", details: { _id: user._id, name, email, hasspassword } })

}

export default postRegister;