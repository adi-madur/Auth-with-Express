const userModel = require("../models/userSchema");
const emailValidator = require('email-validator');
const bcrypt = require('bcrypt');

const signup = async (req, res, next) => {
    const { name, email, password, confirmPassword } = req.body;

    // Checking if all fields are provided
    if(!name || !email || !password || !confirmPassword){
        return res.status(400).json({
            success: false,
            message: "Every field is required"
        })
    } 

    // Validating Email
    const validEmail = emailValidator.validate(email);
    if(!validEmail){
        return res.status(400).json({
            success: false,
            message: "Please Enter a valid Email"
        })
    }

    if (password !== confirmPassword){
        return res.status(400).json({
            success: false,
            message: "Password and Confirm Password doesn't match"
        })
    }


    try {

        const userInfo = userModel(req.body); // --> the Variable `userInfo` (is now a Schema) now has taken structure of Schema and the same key names from `req.body` are matched with Schema key names...
        //  We can save data 
        const result = await userInfo.save(); //--> or we could have used userModel.create({...}) /A Schema name/.create

        return res.status(200).json({
            success: true,
            data: result
        })
    } catch (e) {

        if (e.code === 11000) { //--> 11000 code is a error code for duplicate key. i.e same email. Here it'll work because only email attribute is set to UNIQUE.
            return res.status(400).json({
                success: false,
                message: "Account already exists with this email"
            })
        }

        return res.status(400).json({
            success: false,
            message: e.message
        })
    }

}

const signin = async (req, res) => {
    const { email, password } = req.body;

    if(!email || !password){
        return res.status(400).json({
            success: false,
            message: "Every field is mandatory"
        })
    }

    try {
        const user = await userModel
        .findOne({email})
        .select('+password') //--> Also selects password from entire userSchema's information.
        // Because password doesn't gets selected defaultly due to `select: disable` in Schema
    
        if(!user || !(bcrypt.compare(password, user.password) )) {
            return res.status(400).json({
                success: false,
                message: "Invalid Credentials"
            })
        }

        // Generating Token for a User
        const token = user.jwtToken();
        // Since we don't need password now, we'll clear it
        user.password = undefined;

        // Creating Cookie as Object
        const cookieOption = {
            maxAge: 24 * 60 * 60 * 1000, //--> 24 h in milliseconds
            httpOnly: true,
        }
        
        // Now putting the cookieOption in Cookies
        res.cookie("token", token, cookieOption); //--> The 3 fields are Name, token and CookieObject
        res.status(200).json({
            success:true,
            data: user
        })
    } catch (end) {
        return res.status(400).json({
            success: false,
            message: e.message
        })
    }

    

}

const getUser = async (req, res) => {
    const userId = req.user.id;

    try {
        const user = await userModel.findById(userId);
        return res.status(200).json({
            success: true,
            data: user
        })
    } catch (e) {
        return res.status(400).json({
            success:false,
            message: e.message
        })
    }
}

// To Logout, the user must be first logged in. Hence the flow goes to `jwtAuth` middleware first
// And the method to log out is just deleting the token / cookie.
const logout = (req, res) => {
    try {
        const cookieOption= {
            expires: new Date(),
            httpOnly: true,
        }

        res.cookie("token", null, cookieOption);

        res.status(200).json({
            success: true,
            message: "Logged Out successfully"
        })

    } catch (e) {
        res.status(200).json({
            success: false,
            message: e.message
        })
    }
}

module.exports = {
    signup,
    signin,
    getUser,
    logout
}