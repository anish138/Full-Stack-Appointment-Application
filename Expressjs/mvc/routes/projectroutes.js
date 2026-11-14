import express from "express";
const projectroute = express.Router();
import { verifytoken } from "../middleware/middleware.js";

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

projectroute.put("/Project/:id",verifytoken, PutProject);

projectroute.patch("/Project/:id",verifytoken, PatchProject);

projectroute.delete("/Project/:id",verifytoken, DeleteProject);

export default projectroute;
