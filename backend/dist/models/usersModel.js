import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "A username is required"],
        trim: true,
        minLenght: [6, "Username must be at least characters long"],
    },
    email: {
        type: String,
        required: [true, "An email is required"],
        trim: true,
        unique: [true, "Email must be unique"],
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, "A password is required"],
        select: false,
    },
    semesters: {
        type: [],
        required: [true, "A semester array is required"],
    },
});
export const User = mongoose.model("User", userSchema);
