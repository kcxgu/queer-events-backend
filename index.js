import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import { eventsRouter } from "./routes/events.js";
import { signUpRouter } from "./routes/signup.js";

const app = express();

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
mongoose.set('strictQuery', true);

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use("/events", eventsRouter)
app.use("/sign-up", signUpRouter)

const host = process.env.HOST;
const port = process.env.PORT;

const db = async () => {
    console.log(`Connecting to database at: ${process.env.DB_URI}`)

    try {
        await mongoose.connect(process.env.DB_URI);
        console.log(`Database connected at: ${process.env.DB_URI}`);
    } catch (error) {
        console.log(`Database error: ${error.message}`)
    }
}

db();

const server = app.listen(port, host, () => {
    const SERVERHOST = server.address().address;
    const SERVERPORT = server.address().port;
    console.log(`Server is running on http://${SERVERHOST}:${SERVERPORT}`)
})