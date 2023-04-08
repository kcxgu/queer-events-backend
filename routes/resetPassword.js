import express from "express";
import UserModel from "../models/userSchema.js";

export const resetPasswordRouter = express.Router();

resetPasswordRouter.route("/")
    .post(async (req, res) => {
        try {
            const { id, password } = req.body;
            await UserModel.findOneAndUpdate(
                { _id: id.id },
                { password: password }
            )
            return res.send({ message: "Success!" })
        } catch (error) {
            console.log(error)
            return res.send({ message: "We are unable to update your password at this time" })
        }
    })