import LoginUser from "../models/user.js";
import { genrateToken } from "../utils/genratetoken.js";
import { hassingPassword } from "../utils/password.js";
import { cookieadd } from "./cookiecontroller.js";

// USER register


const verifydata = async (req, res) => {

    try {

        const { email, username } = req.query


        if (username) {

            const verifyuser = await LoginUser.findOne({ username: username })

            if (verifyuser) {
                return res.status(409).json({ userError: "username is not available" })
            } else {
                return res.status(200).json({ message: "Available" })
            }

        }

        if (email) {

            const verifyemail = await LoginUser.findOne({ email: email })

            if (verifyemail) {
                return res.status(409).json({ emailError: "your email is alredy exists pleass login" })
            } else {
                return res.status(200).json({ message: "Available" })
            }
        }

    }
    catch (error) {
        return res.status(500).json({ message: error.message })
    }
}



const postRegister = async (req, res) => {

    try {
        const { name, username, email, password } = req.body

        if (!name || !username || !email || !password)
            return res.status(400).json({ message: "name,email,username,password is not provided" })

        const hasspassword = await hassingPassword(password)

        const user = await LoginUser.create({ name: name, username: username, email: email, password: hasspassword })

        const token = await genrateToken(user._id, email)


        cookieadd(res, user.id, user.username, token)

        return res.status(201).json({ message: "user created successfully", details: { _id: user._id, name, email, hasspassword } })

    }
    catch (error) {


        return res.status(400).json({ message: error.message })
    }

}



export { postRegister, verifydata };