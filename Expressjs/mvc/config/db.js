import mongoose from "mongoose"

export const connectDB = async () => {

    await mongoose.connect(process.env.MONGODB_URL)
        .then(() => console.log("database connected successfully"))
        .catch((error) => console.log("databse connection faild", error))

}