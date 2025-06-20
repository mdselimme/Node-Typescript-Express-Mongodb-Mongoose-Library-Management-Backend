import { Server } from "http";
import app from "./app";
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 5000;


let server: Server;

// Main Server Running Function 
const mainServerRunning = async () => {
    try {
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