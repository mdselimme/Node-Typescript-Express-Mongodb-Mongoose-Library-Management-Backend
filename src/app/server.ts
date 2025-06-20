import { Server } from "http";
import app from "./app";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();
const PORT = process.env.PORT || 5000;

let server: Server;

// Main Server Running Function 
const mainServerRunning = async () => {
    try {
        // Mongodb Database Connect With Mongoose
        await mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASS}@cluster0.lbzm3xv.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`);
        console.log(`Database Connected`);
        // Server Connect
        server = app.listen(PORT, () => {
            console.log(`Server is Running On port: http://localhost:${PORT}`);
        })
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
        }
    }
};

// Server Call 
mainServerRunning();