import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "LoginUser"
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        validate: {
            validator: (value) => {
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                return value >= today;
            },
            message: 'Appointment Date Cannot be in the past'
        }
    }
});


const AppointmentUser = mongoose.model("AppointmentUser", AppointmentSchema, "Appointments");


export default AppointmentUser