import mongoose from "mongoose";

async function connectDB(){
    try {
        const uri = process.env.MONGO_URI;
        if(!uri) throw new Error("MONGO_URI is not defined");
        const conn = await mongoose.connect(uri);
        console.log("Mongodb connected", conn.connection.host);
    } catch (error) {
        console.error("Mongodb connection error:", error.message);
        process.exit(1);
    }
}

export { connectDB };