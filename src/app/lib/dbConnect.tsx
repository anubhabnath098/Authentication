import mongoose from "mongoose";

export const connectToDb = async () => {
  "use server";
  try {
    // Check if mongoose is already connected
    if (mongoose.connection.readyState === 1) {
      console.log("Already connected to the database.");
      return;
    }

    // Connect to the database
    const { connection } = await mongoose.connect(process.env.MONGO_URL as string, {
    });

    console.log(`Connected to DB at ${connection.host}`);
  } catch (err) {
    console.error("Problem with Database:", err);
    throw new Error("Problem with Database");
  }
};