import LoginUser from "../models/user.js";
import { genrateToken } from "../utils/genratetoken.js";
import { ComparePassword } from "../utils/password.js";
import { cookieadd } from "./cookiecontroller.js";
import { cookieDelete } from "./cookiecontroller.js";

// USER LOGIN

const PostLoginUser = async (req, res) => {

    const { username, password } = req.body

    

    const user = await LoginUser.findOne({ username: username })

    if (!user)
        return res.status(401).json({ message: "username is not exists" })


    const isMatch = await ComparePassword(password, user.password);

    if (!isMatch) {
        return res.status(401).json({ message: "invalid password" })
    }

    const token = await genrateToken(user._id, user.email);
    //user login karne ke bad new token create karega 
    //ab jab bhi history chek karoge tab token verify hoga 

     cookieadd(res,user.id,user.username,token)

   
    return res.status(200).json({
        message: "logine successfully", details: {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email,
            token:token
        }
    })


};


const SingOutUser = async (req,res) => {
    try {

        cookieDelete(res)
        
      return res.status(200).json({message:"Logout successfully"})

    } catch (error) {
        

       return res.status(500).json({ message: error.message })
    }
}


const GetUser = async (req, res) => {
    try {

    
        const data = await LoginUser.find()

        res.status(200).json({ users: data })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
} 





export { PostLoginUser, SingOutUser, GetUser }