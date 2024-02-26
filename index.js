const express = require('express');
const app = express();
const morgan = require('morgan');
const fs = require('fs');
const { createWriteStream } = require("fs");
const PORT = 5000;

// const writableStream = createWriteStream('server.log', { flags: 'a' });

// // Use morgan middleware to log requests
// app.use(morgan('combined', { stream: writableStream }));

// Custom middleware to log requests to login.txt
app.use((req, res, next) => {
    const startTime = new Date();

    res.on('finish', () => {
        const endTime = new Date();
        const timeTaken = endTime - startTime; // Calculate time taken in milliseconds

        const logData = {
            method: req.method,
            date: new Date(),
            timeTaken: timeTaken + 'ms'
        };

        fs.appendFileSync("login.txt", JSON.stringify(logData) + '\n');
    });

    next();
});
app.post("/data", (req, res) => {
    console.log(req.method);
    res.status(200).json({ status: "Success !", data: { body: req.body } });
});

app.get("/", (req, res) =>
    res.status(200).json({ message: "Hello from the server !", app: "Express-Routes" })
);

app.get("*", (req, res) =>
    res.status(404).json({ message: "Route does not exist", app: "Express-Routes" })
);

app.listen(PORT, () => {
    console.log('Server is running');
});
