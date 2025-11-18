import { Request, Response } from "express";
import { User } from "../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;

        const exist = await User.findOne({ email });
        if (exist) return res.status(400).json({ msg: "User already exists" });

        const hash = await bcrypt.hash(password, 10);

        const user = await User.create({ name, email, password: hash });

        res.json({ msg: "Account created", user });
    } catch (error) {
        res.status(500).json(error);
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: "Invalid email" });

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return res.status(400).json({ msg: "Invalid password" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string);

        res.json({ msg: "Login successful", token });
    } catch (error) {
        res.status(500).json(error);
    }
};