// route ye defin karta hai ki request kiss function ya control tak jani chahiye
import express from "express";
const userroute = express.Router();

import {PostLoginUser,SingOutUser,GetUser} from "../controllers/usercontroller.js";

userroute.post("/User",PostLoginUser)

userroute.delete("/User",SingOutUser)

userroute.get("/User",GetUser)

export default userroute