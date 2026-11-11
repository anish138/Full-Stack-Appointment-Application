import express from "express";
import { GetUserReport } from "../controllers/reportcontroller.js";

const reportroute = express.Router();

reportroute.get("/Report/:username", GetUserReport);

export default reportroute;
