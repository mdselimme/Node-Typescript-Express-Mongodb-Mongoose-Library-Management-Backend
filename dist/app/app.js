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
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Routes Imports 
const books_route_1 = __importDefault(require("../routes/books.route"));
const borrows_route_1 = __importDefault(require("../routes/borrows.route"));
// Routes Use 
app.use("/api/books", books_route_1.default);
app.use("/api/borrow", borrows_route_1.default);
// Default Router For See Servers ON 
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("Library Management Server is Running ...");
}));
exports.default = app;
