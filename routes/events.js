import express from "express";
import EventsModel from "../models/eventsSchema.js";

export const eventsRouter = express.Router();

eventsRouter.route("/")
    .post(async (req, res) => {
        const newEvent = new EventsModel(req.body);
        try {
            const event = await newEvent.save();
            res.status(201).json(event);
        } catch (error) {
            res.status(422).json({ error: "Unable to add new event." })
        }
    })