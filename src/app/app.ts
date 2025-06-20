import express from 'express';
const app = express();




// Default Router For See Servers ON 
app.get('/', async (req, res) => {
    res.send("Library Management Server is Running ...");
});



export default app;