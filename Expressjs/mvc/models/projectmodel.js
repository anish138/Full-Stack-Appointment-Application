import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "LoginUser"
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        default: ""
    },
    status: {
        type: String,
        enum: ["Planning", "In progress", "Completed"],
        default: "Planning"
    },
    progress: {
        type: Number,
        min: 0,
        max: 100,
        default: 0
    },
    dueDate: {
        type: Date,
        default: null
    },
    tasks: {
        type: Number,
        default: 0
    },
    completedTasks: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

const Project = mongoose.model("Project", ProjectSchema, "projects");

export default Project;
