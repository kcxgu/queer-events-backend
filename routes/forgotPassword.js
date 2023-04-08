import express from "express";
import UserModel from "../models/userSchema.js"
import forgotPasswordEmail from "../utils/emailForgotPassword.js";

export const forgotPasswordRouter = express.Router();

forgotPasswordRouter.route("/")
    .post(async (req, res) => {
        const { email } = req.body;
        try {
            const data = await UserModel.findOne({ email })
            if (data) {
                const name = data.name;
                const email = data.email;
                const url = `http://localhost:3000/auth/reset-password`;
                forgotPasswordEmail(email, url, name);
            } else {
                return res.send({ message: "We cannot find your email address" })
            }
        } catch (error) {
            console.log(error)
        }
    })