import LoginUser from "../models/user.js";
import { genrateToken } from "../utils/genratetoken.js";
import { hassingPassword } from "../utils/password.js";
import { cookieadd } from "./cookiecontroller.js";

// USER register



const verifydata = async (req, res) => {
    try {
        const { email, username } = req.query;

        const Regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!email && !username) {
            return res.status(400).json({
                message: "Email or username is required"
            });
        }

        if (email) {

            if (email.length > 224) {
                return res.status(400).json({
                    emailError: "Email cannot exceed 224 characters"
                });
            }

            if (!Regex.test(email)) {
                return res.status(400).json({
                    emailError: "Please enter a valid email address"
                });
            }

            const verifyemail = await LoginUser.findOne({
                email: email.trim()
            });

            if (verifyemail) {
                return res.status(409).json({
                    emailError: "Your email already exists. Please login"
                });
            }

            return res.status(200).json({
                message: "Email Available"
            });
        }

        if (username) {

            const cleanUsername = username.trim();

            if (cleanUsername.length < 4) {
                return res.status(400).json({
                    userError: "Username must be at least 4 characters long"
                });
            }

            if (cleanUsername.length > 30) {
                return res.status(400).json({
                    userError: "Username cannot exceed 30 characters"
                });
            }

            const verifyuser = await LoginUser.findOne({
                username: cleanUsername
            });

            if (verifyuser) {
                return res.status(409).json({
                    userError: "Username is not available"
                });
            }
        }

        return res.status(200).json({
            message: "Username Available"
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error"
        });
    }
};




const postRegister = async (req, res) => {

    try {
        const { name, username, email, password } = req.body

        const Regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

        if (!name || !username || !email || !password)
            return res.status(400).json({ message: "all filed are required" })

        if (name.length < 4) {
             res.status(400).json({ namemsg: "Name must be at least for charecters long" })
        } 
        
        if (name.length > 30) {
             res.status(400).json({ namemsg: "Name cannot excees thirty characters" })
        } 
        
        if (password.length > 30) {
             res.status(400).json({ passmessage: "Username cannot excees thirty characters" })
        } 
        
        if (!Regex.test(password)) {
            return res.status(400).json({ passmessage: "Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character" })
        }

        const hasspassword = await hassingPassword(password)

        const user = await LoginUser.create({ name: name, username: username, email: email, password: hasspassword })

        const token = await genrateToken(user._id, email)


        cookieadd(res, user.id, user.username, token)

        return res.status(201).json({ message: "user created successfully", details: { _id: user._id, name } })

    }
    catch (error) {


        return res.status(400).json({ message: error.message })
    }

}



export { postRegister, verifydata };