import mongoose from "mongoose";

const url: string = process.env.MONGODB_URI as string;

let connection: typeof mongoose | null = null;

const dbConnect = async (): Promise<typeof mongoose> => {
  if (!url) {
    throw new Error(
      "invalid MongoDB URI. Please check your environment variables."
    );
  }

  if (!connection) {
    try {
      connection = await mongoose.connect(url);
    } catch (error) {
      console.error("Error", error);
      throw error;
    }
  }

  return connection;
};

export default dbConnect;
