import LoginUser from "../models/user.js";
import { genrateToken } from "../utils/genratetoken.js";
import { ComparePassword } from "../utils/password.js";
import { cookieadd } from "./cookiecontroller.js";
import { cookieDelete } from "./cookiecontroller.js";

// USER LOGIN

const PostLoginUser = async (req, res) => {

    try {
        const { username, password } = req.body

        const user = await LoginUser.findOne({ username: username })

        if (!user)
            return res.status(401).json({ message: "username is not exists" })

        const isMatch = await ComparePassword(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: "invalid password" })
        }

        const token = await genrateToken(user._id, user.email);

        cookieadd(res, user.id, user.username, token)

        return res.status(200).json({ message: "logine successfully" })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }

};


const SingOutUser = async (req, res) => {
    try {

        cookieDelete(res)

        return res.status(200).json({ message: "Logout successfully" })

    } catch (error) {

        return res.status(500).json({ message: error.message })
    }
}


const GetUser = async (req, res) => {
    try {

        const username = req.params.id

        const data = await LoginUser.findOne({ username: username })

        if (!data) {
            return res.status(401).json({ message: "user is not found" })
        }

        res.status(200).json({ users: data })
    } catch (error) {

        res.status(500).json({ message: error.message })
    }
}





export { PostLoginUser, SingOutUser, GetUser }