import mongoose from "mongoose";



const AppointmentSchema = new mongoose.Schema({

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
            validator: function (value) {
                const today = new Date(); // today Date and time object create karega 
                today.setHours(0, 0, 0, 0);   // time ko resert karega 
                return value >= today;    // yaha se value chek hoga ki user ka aapointment kya hai
            },
            message: 'Appointment Date Cannot be in the past'  // agar user past date enter karta hai 
        }
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "LoginUser"
    }
});


const AppointmentUser = mongoose.model("AppointmentUser", AppointmentSchema, "Appointments");


export default AppointmentUser