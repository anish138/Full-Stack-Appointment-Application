import Project from "../models/projectmodel.js";
import LoginUser from "../models/user.js";
import mongoose from "mongoose";

// GET ALL PROJECTS
const GetAllProjects = async (req, res) => {
    try {
        const data = await Project.find().populate("userId");
        return res.status(200).json({ projects: data });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// GET SINGLE PROJECT (by project ID or by username)
const GetSingleProject = async (req, res) => {
    try {
        const id = req.params.id;

        // Check if id is a username
        const user = await LoginUser.findOne({ username: id });
        if (user) {
            const userProjects = await Project.find({ userId: user._id }).populate("userId");
            return res.status(200).json({ projects: userProjects });
        }

        // Check if id is a valid Mongo ObjectId
        if (mongoose.Types.ObjectId.isValid(id)) {
            const project = await Project.findById(id).populate("userId");
            if (project) {
                return res.status(200).json({ project: project });
            }
        }

        return res.status(404).json({ message: "Project not found" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// CREATE PROJECT
const PostProject = async (req, res) => {
    try {
        const { name, description, status, progress, dueDate, tasks, completedTasks, userId } = req.body;

        if (!name) {
            return res.status(400).json({ message: "Project name is required" });
        }

        const projectData = {
            name,
            description: description || "",
            status: status || "Planning",
            progress: progress !== undefined ? Number(progress) : 0,
            dueDate: dueDate ? new Date(dueDate) : null,
            tasks: tasks !== undefined ? Number(tasks) : 0,
            completedTasks: completedTasks !== undefined ? Number(completedTasks) : 0
        };

        if (userId && mongoose.Types.ObjectId.isValid(userId)) {
            projectData.userId = userId;
        }

        const newProject = await Project.create(projectData);
        return res.status(201).json({ message: "Project created successfully", project: newProject });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

// UPDATE PROJECT (PUT)
const PutProject = async (req, res) => {
    try {
        const updated = await Project.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updated) {
            return res.status(404).json({ message: "Project not found" });
        }

        return res.status(200).json({ message: "Project updated successfully", project: updated });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

// PATCH PROJECT
const PatchProject = async (req, res) => {
    try {
        const updated = await Project.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true, runValidators: true }
        );

        if (!updated) {
            return res.status(404).json({ message: "Project not found" });
        }

        return res.status(200).json({ message: "Project updated successfully", project: updated });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

// DELETE PROJECT
const DeleteProject = async (req, res) => {
    try {
        const deleted = await Project.findByIdAndDelete(req.params.id);

        if (!deleted) {
            return res.status(404).json({ message: "Project not found" });
        }

        return res.status(200).json({ message: "Project deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export {
    GetAllProjects,
    GetSingleProject,
    PostProject,
    PutProject,
    PatchProject,
    DeleteProject
};
