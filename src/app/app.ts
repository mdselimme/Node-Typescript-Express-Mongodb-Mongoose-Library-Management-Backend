import express from 'express';
const app = express();
app.use(express.json());

// Routes Imports 
import booksRouter from '../routes/books.route';

// Routes Use 
app.use("/api/books", booksRouter);


// Default Router For See Servers ON 
app.get('/', async (req, res) => {
    res.send("Library Management Server is Running ...");
});



export default app;