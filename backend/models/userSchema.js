const mongoose = require('mongoose');
const { Schema } = mongoose;
const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
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

// Instead of modifying existing controller to encrypt the password, we create a method os Schema directly
userSchema.pre('save', async function(next){ //--> it runs previous to whenever the save function (userSchema's save) is used
    if(!this.isModified('password')){ //--> If password isn't modified then next()
        return next();
    }

    // If password is modified then encrypt password in 10 rounds/salt
    this.password = await bcrypt.hash(this.password, 10);
    return next();

})


// Mongoose offers to create custom methods.
userSchema.methods = {
    // JWT Token has 3 parts. Info, Secret Key, validity of Token
    jwtToken() {
        return JWT.sign(
            // First part
            {id: this._id, // --> the key is id and we want to use id from schema, so we use this._id (It means this.id in C++/JAVA)
            email: this.email},
            process.env.SECRET,
            { expiresIn: '24h' }

        )
    }
}

const userModel = mongoose.model('user', userSchema);
module.exports = userModel;