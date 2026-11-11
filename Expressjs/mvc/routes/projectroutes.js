import express from "express";
const projectroute = express.Router();

import {
    GetAllProjects,
    GetSingleProject,
    PostProject,
    PutProject,
    PatchProject,
    DeleteProject
} from "../controllers/projectcontroller.js";

projectroute.get("/Project", GetAllProjects);

projectroute.get("/Project/:id", GetSingleProject);

projectroute.post("/Project", PostProject);

projectroute.put("/Project/:id", PutProject);

projectroute.patch("/Project/:id", PatchProject);

projectroute.delete("/Project/:id", DeleteProject);

export default projectroute;
