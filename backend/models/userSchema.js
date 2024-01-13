const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        // require: [true, "Username is required"] //--> The syntax is `required`. IDK if this works.. Lecture 292 by Chirag Goyal
        required: [true, "Username is required"],
        maxLength: [25, "Name must be less than 25 characters"],
        trim: true // --> removes extra spaces which are at start or end
    },
    email:{
        type: String,
        required: [true, "Email is required"],
        unique: [true, "Already Registered"],
        lowercase: true //--> it is `lowercase` not `lowerCase`. Source - StackOverflow

    },
    password:{
        type: String,
        select: false
    },
    // A token needed for Forget-Password:
    forgotPasswordToken: {
        type: String,
    },
    // Token must have an expiry date...
    forgotPasswordExpiryDate: {
        type: Date,
    }
}, {
    timestamps: true, // --> This will add `createdAt` and `updatedAt` properties of Schema.
})

const userModel = mongoose.model('user', userSchema);
module.exports = userModel;