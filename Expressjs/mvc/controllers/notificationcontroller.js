import Notification from "../models/notification.js";
import LoginUser from "../models/user.js";
import mongoose from "mongoose";

const GetNotifications = async (req, res) => {
    try {
        const user = await LoginUser.findOne({ username: req.params.username });
        if (!user) return res.status(404).json({ message: "User not found" });

        const notifications = await Notification.find({ userId: user._id }).sort({ createdAt: -1 });
        return res.status(200).json({ notifications });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const CreateNotification = async (req, res) => {
    try {
        const { title, message, type, userId } = req.body;
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Valid userId is required" });
        }

        const notification = await Notification.create({ userId, title, message, type });
        return res.status(201).json({ notification });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

const UpdateNotification = async (req, res) => {
    try {
        const notification = await Notification.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true, runValidators: true }
        );
        if (!notification) return res.status(404).json({ message: "Notification not found" });
        return res.status(200).json({ notification });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

const MarkAllNotificationsRead = async (req, res) => {
    try {
        const user = await LoginUser.findOne({ username: req.params.username });
        if (!user) return res.status(404).json({ message: "User not found" });

        await Notification.updateMany({ userId: user._id }, { $set: { read: true } });
        return res.status(200).json({ message: "All notifications marked as read" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const DeleteNotification = async (req, res) => {
    try {
        const notification = await Notification.findByIdAndDelete(req.params.id);
        if (!notification) return res.status(404).json({ message: "Notification not found" });
        return res.status(200).json({ message: "Notification deleted successfully" });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

export { GetNotifications, CreateNotification, UpdateNotification, MarkAllNotificationsRead, DeleteNotification };
