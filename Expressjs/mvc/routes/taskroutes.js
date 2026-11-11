import express from "express";
import { CreateTask, DeleteTask, GetAllTasks, UpdateTask } from "../controllers/taskcontroller.js";

const taskroute = express.Router();

taskroute.get("/Task", GetAllTasks);
taskroute.post("/Task", CreateTask);
taskroute.patch("/Task/:id", UpdateTask);
taskroute.delete("/Task/:id", DeleteTask);

export default taskroute;
