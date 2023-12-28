import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// THIS CODE REGISTERS A NEW USER
export const register = async (req, res) => {
    try{
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation
        } = req.body;
    
        // hash the password for security purposes
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            picturePath,
            friends,
            location,
            occupation,
            viewProfile: 0,
            impressions: 0,
        });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch(err){
        res.status(500).json(err);
    }
};

// THIS CODE LOGS IN A USER

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // validate
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).json("User not found");
        }
        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(400).json("Invalid Credentials");
        }

        //JWT

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        delete user.password;
        res.status(200).json({ user, token });
        
    } catch (err) {
        res.status(500).json(err);
    }
}