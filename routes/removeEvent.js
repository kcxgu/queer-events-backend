import express from "express";
import EventsModel from "../models/eventsSchema.js";

export const removeEventRouter = express.Router();

removeEventRouter.route("/")
    .post(async (req, res) => {
        const { _id } = req.body;
        try {
            await EventsModel.findOneAndRemove(
                { _id: _id }
            )
        } catch (error) {
            console.log(error)
        }
    })