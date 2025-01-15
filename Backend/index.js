import express from "express";
import { PORT, DB_URL } from "./config.js";
import mongoose from "mongoose";
import { Book } from './models/bookModel.js';
import booksRoute from './routes/bookRoute.js';
import cors from 'cors';

const app = express();
app.use(express.json());

app.use(cors());

// app.use(cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type', 'Authorization']
// }));

app.get('/', (req, res) => {
    console.log(req)
    return res.status(200).send('Welcome to the backend')
});

app.use('/books', booksRoute);


mongoose
    .connect(DB_URL)
    .then(() => {
        console.log("Database is connected");
        app.listen(PORT, () => {
            console.log(`App is listening on the port: ${PORT}`);
        });
    })
    .catch((err) => {
        console.log(err);
    });