import AppointmentUser from "../models/appointment.js"


//GET ALL USERS

const GetAllAppontments = async (req, res) => {

    try {

        const data = await AppointmentUser.find().populate("userId");


        if (!data) {
            return res.status(404).json({ messsage: "data is not found" })
        }

        if (data.length === 0) {
            return res.status(404).json({ messsage: "data is empty" })
        }
        res.status(200).json({ users: data })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message:error.message })
    }

}


// GET SINGLE Appointment

const GetSingleAppointment = async (req, res) => {
    try {

        const username = req.username

        const data = await AppointmentUser.findOne({username:username}).populate("userId")

        if (!data) {
            return res.status(404).json({ messsage: "data is not found" })
        }
        if (data.length === 0) {
            return res.status(404).json({ messsage: "data is empty" })
        }
        res.status(200).json({ users: data })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


// CREATE Appointment

const PostAppointment = async (req, res) => {

    console.log(req.body)

    try {
        const { title, description, date, userId } = req.body

        const data = await AppointmentUser.create({ title: title, description: description, date: date, userId: userId })   // mongoose db schema(schema chek karta hai) ke hisab se data ko valid karta hai securety ke liye imporatent hota hai 
        // insertone ya insertmany  schema ko by pass karta sakta hai is liye isko lena fair nahi hai 

        if (!data) {
            return res.status(404).json({ message: "data is not found" })
        }
        res.status(201).json({ message: "data successfully added..." })
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message })
    }
};


// UPDATE Appointment

const PutAppointment = async (req, res) => {

    try {
        const { title, description, date } = req.body
        console.log(req.body)
        const data = await AppointmentUser.findByIdAndUpdate(req.params.id, { title: title, description: description, date: date }, { new: true, runValidators: true })  // new= app ko new updated data dega                                                     
        // runValidators = schema ke roole chek karega 

        if (!data) {
            return res.status(404).json({ message: "data is not found" })
        }
        res.status(200).json({ user: "data update successfully" })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
};



//PATCH Appointment

const PatchAppointment = async (req, res) => {

    try {
        const { title, description, date } = req.body

        const data = await AppointmentUser.findByIdAndUpdate(req.params.id, { $set: { title: title, description: description, date: date } }, { new: true, runValidators: true })  // new= app ko new updated data dega                                                     
        // runValidators = schema ke roole chek karega 
        if (!data) {
            return res.status(404).json({ message: "data is not found" })
        }
        res.status(200).json({ user: data })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
};


// DELET Appointment

const DeleteAppointment = async (req, res) => {

    try {
        const data = await AppointmentUser.findByIdAndDelete(req.params.id)

        if (!data) {
            return res.status(404).json({ message: "data is not found" })
        }
        res.status(200).json({ message: "user deleted successfully" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
};


export { DeleteAppointment, PatchAppointment, PutAppointment, PostAppointment, GetSingleAppointment, GetAllAppontments }