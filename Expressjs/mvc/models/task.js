import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
        trim: true
    },
    project: {
        type: String,
        default: ""
    },
    dueDate: {
        type: String,
        default: ""
    },
    priority: {
        type: String,
        enum: ["Low", "Medium", "High"],
        default: "Medium"
    },
    completed: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const Task = mongoose.model("Task", TaskSchema, "tasks");

export default Task;
