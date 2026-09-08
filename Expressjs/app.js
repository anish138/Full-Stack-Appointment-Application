import express from "express";
import dotenv from "dotenv"
dotenv.config()
import { connectDB } from "./mvc/config/db.js";
import cors from "cors"


const app = express();
connectDB();
app.use(cors({
    origin:true, //token send origin isi url me token set
    credentials:true // token se allow kar do 
}));
app.use(express.json());
app.use(express.urlencoded({extended:true}))

import userroute from "./mvc/routes/userroute.js";

import appointmentroute from "./mvc/routes/appointmentroutes.js";

import resgisterroute from "./mvc/routes/registerroute.js";

app.use("/",userroute);

app.use("/",appointmentroute)

app.use("/",resgisterroute)


app.listen(process.env.PORT,()=>{
    console.log(`http://localhost:${process.env.PORT}`)
}) 