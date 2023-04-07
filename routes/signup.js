import express from "express";
import UserModel from "../models/userSchema.js";

export const signUpRouter = express.Router();

signUpRouter.route("/")
    .get(async (req, res) => {
        try {
            const user = await UserModel.find({});
            res.json(user);
        } catch (error) {
            res.status(404).json({ error: "User not found" })
            console.log(error)
        }
    })
    .post(async (req, res) => {
        const { email } = req.body;
        try {
            const data = await UserModel.findOne({ email })
            if (data) {
                res.send({ message: "Account already exists" });
            } else {
                const newUser = new UserModel(req.body);
                newUser.save();
                res.send({ message: "Success!" })
            }
        } catch (error) {
            res.send({ message: "We are unable to register you at this time, please try again later." })
            console.log(error)
        }
    })