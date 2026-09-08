// route ye defin karta hai ki request kiss function ya control tak jani chahiye
import express from "express";
const appointmentroute = express.Router();

import { DeleteAppointment,PatchAppointment,PutAppointment,PostAppointment,GetSingleAppointment,GetAllAppontments } from "../controllers/appointmentcontroller.js";

appointmentroute.get("/Appointment",GetAllAppontments);

appointmentroute.get("/Appointment/:id",GetSingleAppointment)

appointmentroute.post("/Appointment",PostAppointment)

appointmentroute.patch("/Appointment/:id",PatchAppointment)

appointmentroute.put("/Appointment/:id",PutAppointment)

appointmentroute.delete("/Appointment/:id",DeleteAppointment)

export default appointmentroute