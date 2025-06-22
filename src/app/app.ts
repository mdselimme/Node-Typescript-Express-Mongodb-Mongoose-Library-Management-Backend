import express, { NextFunction, Request, Response } from 'express';
import cors from "cors";
const app = express();
app.use(express.json());
app.use(cors());
import { errorHandler } from './errorHandler';


// Routes Imports 
import booksRouter from '../routes/books.route';
import borrowsRouter from '../routes/borrows.route';


// Default Router For See Servers ON 
app.get('/', async (req: Request, res: Response) => {
    res.json({
        running: "Library Management Server is Running ...",
        version: 0.1
    });
});

// Routes Use 
app.use("/api/books", booksRouter);
app.use("/api/borrow", borrowsRouter);


// Not found route 
app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({
        message: "Route url didn't match. Try with right url."
    })
});

// error Handling Middleware 
app.use(errorHandler);


export default app;