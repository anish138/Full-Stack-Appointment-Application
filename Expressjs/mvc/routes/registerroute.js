import express from "express";

const resgisterroute = express.Router()

import postRegister from "../controllers/registercontroller.js";

resgisterroute.post("/Register",postRegister)

export default resgisterroute;