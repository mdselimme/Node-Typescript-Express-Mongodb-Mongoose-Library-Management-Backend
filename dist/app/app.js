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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const errorHandler_1 = require("./errorHandler");
// Routes Imports 
const books_route_1 = __importDefault(require("../routes/books.route"));
const borrows_route_1 = __importDefault(require("../routes/borrows.route"));
// Default Router For See Servers ON 
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({
        running: "Library Management Server is Running ...",
        version: 0.5
    });
}));
// Routes Use 
app.use("/api/books", books_route_1.default);
app.use("/api/borrow", borrows_route_1.default);
// Not found route 
app.use((req, res, next) => {
    res.status(404).json({
        message: "Route url didn't match. Try with right url."
    });
});
// error Handling Middleware 
app.use(errorHandler_1.errorHandler);
exports.default = app;
