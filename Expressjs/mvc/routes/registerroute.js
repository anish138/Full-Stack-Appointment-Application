import express from "express";

const resgisterroute = express.Router()

import {postRegister,verifydata} from "../controllers/registercontroller.js";

import { RegisterRatLimiter } from "../middleware/ratelimitter.js";

resgisterroute.post("/Register",RegisterRatLimiter,postRegister)

resgisterroute.get("/Register",verifydata)

export default resgisterroute;