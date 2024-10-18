import mongoose from "mongoose"
import dotenv from 'dotenv'
dotenv.config()
export const isLocal = process.env.NODE_ENV === "local";
const url = isLocal
  ? process.env.LOCAL_MONGO_URI
  : process.env.MONGO_URL || "";

export const connectDB = async () => {
  try {
    const connectionMessage = isLocal
      ? "Local 🛠️🛠️"
      : "Production 🌐🚀";
    await mongoose.connect(url);
    console.info(`Connected to MongoDB ${connectionMessage}`);
  } catch (err) {
    console.error(`Error connecting to mongodb ${err.message}`);
    process.exit(1);
  }
};

const gracefulShutdown = async () => {
  console.log("Shutting down gracefully...");

  // Close the MongoDB connection
  await mongoose.connection.close();

  console.log("Graceful shutdown complete");
  process.exit(0);
};

process.on("SIGINT", gracefulShutdown).on("SIGTERM", gracefulShutdown)

// export {isLocal, connectDB}