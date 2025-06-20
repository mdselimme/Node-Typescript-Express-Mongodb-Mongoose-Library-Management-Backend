"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app/app"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
const PORT = process.env.PORT || 5000;
let server;
// Main Server Running Function 
const mainServerRunning = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Mongodb Database Connect With Mongoose
        const mongoDbUrl = `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASS}@cluster0.lbzm3xv.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`;
        yield mongoose_1.default.connect(mongoDbUrl);
        console.log(`Database Connected`);
        // Server Connect
        server = app_1.default.listen(PORT, () => {
            console.log(`Server is Running On port: http://localhost:${PORT}`);
        });
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
        }
    }
});
// Server Call 
mainServerRunning();
