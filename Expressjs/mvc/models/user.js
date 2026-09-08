// models/User.js
import mongoose from "mongoose";


const LoginShema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }

});

const LoginUser = mongoose.model("LoginUser", LoginShema, "LoginDetails");


export default LoginUser