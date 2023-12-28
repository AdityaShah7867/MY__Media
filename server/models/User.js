import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        firstName: { type: String, required: true, min: 3, max: 20 },
        lastName: { type: String, required: false, min: 3, max: 20 },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true, min: 6 },
        picturePath: { type: String, default: "" },
        friends: { type: Array, default: [] },
        location: { type: String},
        occupation: { type: String},
        viewProfile: Number,
        impressions: Number,
    },{timestamps: true}
)

const User = mongoose.model("User", userSchema);
export default User;