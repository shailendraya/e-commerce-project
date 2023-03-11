const catchAsyncError = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModal")

exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {

    const { token } = req.cookies;

    if(!token){
        return next(new ErrorHandler('Please Login to access this resource', 401));
    }


    const userData = jwt.verify(token, process.env.JWT_SECRET)

    req.user = await User.findById(userData.id);

    next();
})

exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)){
            next(new ErrorHandler(
                `Role: ${req.user.role} is not allowed to access this resource`
            ));
        }

        next();
    }
}