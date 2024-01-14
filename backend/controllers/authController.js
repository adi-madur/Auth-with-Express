const userModel = require("../models/userSchema");
const emailValidator = require('email-validator');


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

        if (e.code === 11000) { //--> 11000 code is a error code for duplicate key. i.e same email
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

    const user = await userModel
        .findOne({email})
        .select('+password') //--> Also selects password from entire userSchema's information
    
    if(!user || (user.password !== password)) {
        return res.status(400).json({
            success: false,
            message: "Invalid Credentials"
        })
    }

}


module.exports = {
    signup,
    signin
}