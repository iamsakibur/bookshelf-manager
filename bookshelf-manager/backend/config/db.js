import mongoose from "mongoose";
 let cachedDb = null;
export const connectDB = async () => {
      if (cachedDb) {
          return cachedDb;
      }
      try {
          const conn = await mongoose.connect(process.env.MONGO_URI, {
             serverSelectionTimeoutMS: 10000,
          });
          cachedDb = conn;
          console.log(`MongoDB Connected: ${conn.connection.host}`);
          return conn;
      } catch (error) {
          console.error(`Error connecting to MongoDB: ${error.message}`);
          process.exit(1);
      }
  };