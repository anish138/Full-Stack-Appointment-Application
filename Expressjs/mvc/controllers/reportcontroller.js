import LoginUser from "../models/user.js";
import Project from "../models/projectmodel.js";
import Task from "../models/task.js";
import AppointmentUser from "../models/appointment.js";

const GetUserReport = async (req, res) => {
    try {
        const user = await LoginUser.findOne({ username: req.params.username });
        if (!user) return res.status(404).json({ message: "User not found" });

        const [projects, appointments] = await Promise.all([
            Project.find({ userId: user._id }).sort({ createdAt: -1 }),
            AppointmentUser.find({ userId: user._id }).sort({ date: 1 })
        ]);
        const projectNames = projects.map((project) => project.name);
        const tasks = projectNames.length
            ? await Task.find({ project: { $in: projectNames } }).sort({ createdAt: -1 })
            : [];

        const projectReports = projects.map((project) => {
            const projectTasks = tasks.filter((task) => task.project === project.name);
            const completedTasks = projectTasks.filter((task) => task.completed).length;
            const totalTasks = projectTasks.length;

            return {
                _id: project._id,
                project: project.name,
                totalTasks,
                completedTasks,
                progress: totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0,
                status: project.status,
                dueDate: project.dueDate
            };
        });

        const totalTasks = tasks.length;
        const completedTasks = tasks.filter((task) => task.completed).length;
        const pendingTasks = totalTasks - completedTasks;
        const completedProjects = projectReports.filter((project) => project.status === "Completed").length;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const overdueTasks = tasks.filter((task) => {
            if (task.completed || !task.dueDate) return false;
            const dueDate = new Date(`${task.dueDate}T00:00:00`);
            return !Number.isNaN(dueDate.getTime()) && dueDate < today;
        }).length;
        const upcomingAppointments = appointments.filter((appointment) => new Date(appointment.date) >= today).length;
        const priorities = tasks.reduce((counts, task) => {
            const priority = ["High", "Medium", "Low"].includes(task.priority) ? task.priority : "Medium";
            counts[priority] += 1;
            return counts;
        }, { High: 0, Medium: 0, Low: 0 });

        return res.status(200).json({
            summary: {
                totalProjects: projects.length,
                completedProjects,
                inProgressProjects: projects.length - completedProjects,
                totalTasks,
                completedTasks,
                pendingTasks,
                overdueTasks,
                averageProgress: projectReports.length
                    ? Math.round(projectReports.reduce((total, project) => total + project.progress, 0) / projectReports.length)
                    : 0,
                totalAppointments: appointments.length,
                upcomingAppointments
            },
            priorities,
            projects: projectReports
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export { GetUserReport };
