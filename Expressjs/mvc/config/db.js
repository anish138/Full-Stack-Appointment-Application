import mongoose from "mongoose"

export const connectDB = async () => {

    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("mongodb connected successfully")

    } catch (error) {

        console.log("mongodb connection faild", error)
        process.exit(1); // exit(1) error aa gaya to program band kar dega is aagge proccess nai hoga
    }
}