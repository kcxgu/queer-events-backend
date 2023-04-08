import express from "express";
import UserModel from "../models/userSchema.js";

export const logInRouter = express.Router();

logInRouter.route("/")
    .post(async (req, res) => {
        const { email, password } = req.body;
        try {
            const data = await UserModel.findOne({ email })
            if (data && password === data.password) {
                return res.send({ data })
            } else {
                return res.send({ message: "Incorrect email or password" })
            }
        } catch (error) {
            console.log(error)
            return res.send({ message: "We are experiencing a server error, please try again later" })
        }
    })