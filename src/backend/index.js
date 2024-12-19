import express from "express";
import { PORT, mongoURL } from "./config.js";
import mongoose from "mongoose";
import bookRoutes from "./routes/bookRoutes.js";
import cors from "cors"

const time = new Date();
const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for CORS policy
app.use(cors({ origin: "http://localhost:5173" }));


// Middleware for routes
app.use("/books", bookRoutes);

// Default route
app.get("/", (request, response) => {
    printRequest(request, "GET");
    return response.status(200).send(`
        <!DOCTYPE html>
        <head>
            <title>Bookstore</title>
        </head>
        <body>
            <h1>This is a bookstore</h1>
            <p>Visited at ${time.toLocaleTimeString()}</p>
        </body>
        `
    );
});

mongoose
    .connect(mongoURL)
    .then(() => {
        console.log("Successfully connected to database");
        app.listen(PORT, () => {
            console.log(`App is listening to the port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });

export function printRequest(request, type) {
    console.log(`${type} "${request.url}" at ${time.toLocaleTimeString()}`);
}
