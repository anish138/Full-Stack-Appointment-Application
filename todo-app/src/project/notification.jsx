
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import UserContext from "./indexcontext";

const NOTIFICATION_API = "http://localhost:3000/Notification";

export function Notification() {
    const { users,toggle } = useContext(UserContext);
    const [notifications, setNotifications] = useState([]);
    const [filter, setFilter] = useState("All");

    useEffect(() => {
        if (!users?.username) {
            setNotifications([]);
            return;
        }

        const fetchNotifications = async () => {
            try {
                const { data } = await axios.get(`${NOTIFICATION_API}/${users.username}`, { withCredentials: true });
                setNotifications(data.notifications || []);
            } catch (error) {
                console.error("Unable to load notifications:", error);
            }
        };

        fetchNotifications();
    }, [users?.username]);

    // Filter Notifications
    const filteredNotifications = notifications.filter((notification) => {
        return filter === "All" || !notification.read;
    });

    // Notification Count
    const unreadCount = notifications.filter(
        (notification) => !notification.read
    ).length;

    // Mark as Read
    const markAsRead = async (id) => {
        try {
            const { data } = await axios.patch(`${NOTIFICATION_API}/${id}`, { read: true }, { withCredentials: true });
            setNotifications((current) => current.map((notification) =>
                notification._id === id ? data.notification : notification
            ));
        } catch (error) {
            alert(error.response?.data?.message || "Unable to update notification");
        }
    };

    // Mark All as Read
    const markAllAsRead = async () => {
        if (!users?.username) return;
        try {
            await axios.patch(`${NOTIFICATION_API}/read-all/${users.username}`, {}, { withCredentials: true });
            setNotifications((current) => current.map((notification) => ({ ...notification, read: true })));
        } catch (error) {
            alert(error.response?.data?.message || "Unable to update notifications");
        }
    };

    // Delete Notification
    const deleteNotification = async (id) => {
        try {
            await axios.delete(`${NOTIFICATION_API}/${id}`, { withCredentials: true });
            setNotifications((current) => current.filter((notification) => notification._id !== id));
        } catch (error) {
            alert(error.response?.data?.message || "Unable to delete notification");
        }
    };

    return (
        <main className={`container-fluid py-4 px-3 bg-light min-vh-100 ${toggle ? 'bg-dark bg-body-secondary' : 'bg-white'}`}>

            {/* Header */}
            <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">

                <div>
                    <h2 className="fw-bold mb-1">Notifications</h2>
                    <p className="text-secondary mb-0">
                        Stay updated with your latest activities.
                    </p>
                </div>

                <button
                    className="btn btn-outline-primary"
                    onClick={markAllAsRead}
                    disabled={unreadCount === 0}
                >
                    Mark all as read
                </button>

            </div>

            {/* Statistics */}
            <div className="row g-3 mb-4">

                <div className="col-md-4">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body">
                            <p className="text-secondary mb-1">Total Notifications</p>
                            <h3 className="fw-bold mb-0">{notifications.length}</h3>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body">
                            <p className="text-secondary mb-1">Unread</p>
                            <h3 className="fw-bold text-primary mb-0">
                                {unreadCount}
                            </h3>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body">
                            <p className="text-secondary mb-1">Read</p>
                            <h3 className="fw-bold text-success mb-0">
                                {notifications.length - unreadCount}
                            </h3>
                        </div>
                    </div>
                </div>

            </div>

            {/* Notification List */}
            <div className="card border-0 shadow-sm">

                <div className="card-body p-3 p-md-4">

                    <div className="d-flex justify-content-between align-items-center mb-4">

                        <h5 className="fw-bold mb-0">Recent Notifications</h5>

                        <select
                            className="form-select w-auto"
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                        >
                            <option>All</option>
                            <option>Unread</option>
                        </select>

                    </div>

                    {filteredNotifications.length > 0 ? (

                        filteredNotifications.map((notification) => (

                            <div
                                key={notification._id}
                                className={`border rounded-3 p-3 mb-3 ${
                                    notification.read ? "bg-white" : "bg-primary bg-opacity-10"
                                }`}
                            >

                                <div className="d-flex justify-content-between gap-3">

                                    <div className="d-flex gap-3">

                                        <div className="text-primary fs-4">
                                            <i className="bi bi-bell-fill"></i>
                                        </div>

                                        <div>
                                            <h6 className="fw-bold mb-1">
                                                {notification.title}
                                            </h6>

                                            <p className="text-secondary mb-2 small">
                                                {notification.message}
                                            </p>

                                            <div className="d-flex flex-wrap gap-2 align-items-center">

                                                <span className="badge text-bg-secondary">
                                                    {notification.type}
                                                </span>

                                                <small className="text-secondary">
                                                    {new Date(notification.createdAt).toLocaleString()}
                                                </small>

                                                <span className={`badge ${
                                                    notification.read
                                                        ? "text-bg-success"
                                                        : "text-bg-primary"
                                                }`}>
                                                    {notification.read ? "Read" : "Unread"}
                                                </span>

                                            </div>
                                        </div>

                                    </div>

                                    <div className="d-flex gap-2 align-items-start">

                                        {!notification.read && (
                                            <button
                                                className="btn btn-sm btn-outline-primary"
                                                onClick={() => markAsRead(notification._id)}
                                            >
                                                Mark Read
                                            </button>
                                        )}

                                        <button
                                            className="btn btn-sm btn-outline-danger"
                                            onClick={() => deleteNotification(notification._id)}
                                        >
                                            <i className="bi bi-trash"></i>
                                        </button>

                                    </div>

                                </div>

                            </div>

                        ))

                    ) : (

                        <div className="text-center py-5">
                            <i className="bi bi-bell-slash fs-1 text-secondary"></i>
                            <h5 className="mt-3">No Notifications Found</h5>
                            <p className="text-secondary mb-0">
                                You are all caught up!
                            </p>
                        </div>

                    )}

                </div>

            </div>

        </main>
    );
}
