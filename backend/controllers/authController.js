const signup = async (req, res, next) => {
    const { name, email, password, confirmPassword } = req.body;

    return res.status(200).json({
        success: true,
        data : {}
    })

}

module.exports = {
    signup
}