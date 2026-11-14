import express from "express";
import { CreateTask, DeleteTask, GetAllTasks, UpdateTask } from "../controllers/taskcontroller.js";

import { verifytoken } from "../middleware/middleware.js";

const taskroute = express.Router();

taskroute.get("/Task", GetAllTasks);
taskroute.post("/Task",verifytoken, CreateTask);
taskroute.patch("/Task/:id",verifytoken, UpdateTask);
taskroute.delete("/Task/:id",verifytoken, DeleteTask);

export default taskroute;
