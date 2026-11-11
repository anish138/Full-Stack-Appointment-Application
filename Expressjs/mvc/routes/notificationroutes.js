import express from "express";
import {
    CreateNotification,
    DeleteNotification,
    GetNotifications,
    MarkAllNotificationsRead,
    UpdateNotification
} from "../controllers/notificationcontroller.js";

const notificationroute = express.Router();

notificationroute.get("/Notification/:username", GetNotifications);
notificationroute.post("/Notification", CreateNotification);
notificationroute.patch("/Notification/read-all/:username", MarkAllNotificationsRead);
notificationroute.patch("/Notification/:id", UpdateNotification);
notificationroute.delete("/Notification/:id", DeleteNotification);

export default notificationroute;
