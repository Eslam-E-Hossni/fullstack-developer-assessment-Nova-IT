import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI as string);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.log("Couldn't connect to MongoDB", err);
    process.exit(1); // 1 => failure, 0 => success
  }
};
