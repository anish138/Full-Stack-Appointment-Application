// route ye defin karta hai ki request kiss function ya control tak jani chahiye
import express from "express";
const appointmentroute = express.Router();

import { verifytoken } from "../middleware/middleware.js";

import { DeleteAppointment,PatchAppointment,PutAppointment,PostAppointment,GetSingleAppointment,GetAllAppontments } from "../controllers/appointmentcontroller.js";

appointmentroute.get("/Appointment",GetAllAppontments);

appointmentroute.get("/Appointment/:id",GetSingleAppointment)

appointmentroute.post("/Appointment",PostAppointment)

appointmentroute.patch("/Appointment/:id",verifytoken,PatchAppointment)

appointmentroute.put("/Appointment/:id",verifytoken,PutAppointment)

appointmentroute.delete("/Appointment/:id",verifytoken,DeleteAppointment)

export default appointmentroute