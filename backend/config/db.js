import mongoose from "mongoose";

// async function connectDB(){
//     try {
//         const uri = process.env.MONGO_URI;
//         if(!uri) throw new Error("MONGO_URI is not defined");
//         const conn = await mongoose.connect(uri);
//         console.log("Mongodb connected", conn.connection.host);
//     } catch (error) {
//         console.error("Mongodb connection error:", error.message);
//         process.exit(1);
//     }
// }

let isConnected = false;

 const connectDB = async () => {
  if (isConnected && mongoose.connection.readyState === 1) {
    return;
  }

  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is missing in environment variables");
  }

  const conn = await mongoose.connect(process.env.MONGO_URI);
  isConnected = conn.connections[0].readyState === 1;
  console.log(`MongoDB connected: ${conn.connection.host}`);
};

export { connectDB };