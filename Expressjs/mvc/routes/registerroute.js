import express from "express";

const resgisterroute = express.Router()

import postRegister from "../controllers/registercontroller.js";

import { RegisterRatLimiter } from "../middleware/ratelimitter.js";

resgisterroute.post("/Register",RegisterRatLimiter,postRegister)

export default resgisterroute;