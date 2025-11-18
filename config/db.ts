import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL as string);
        console.log("connected to DB");
    } catch (error) {
        console.log("DB ERROR:", error);
    }
};