const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Your Name"],
    maxlength: ["30", "Name Can not exceed 30 character"],
    minlength: [4, "Name should have more then 4 characters"],
  },
  email: {
    type: String,
    required: [true, "Please Enter your Email"],
    unique: true,
    validate: [validator.isEmail, "Please Enter a valid Email"],
  },
  password: {
    type: String,
    required: [true, "Please Enter your password"],
    minlength: [8, "Password should to greater then 8 characters"],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

userSchema.pre("save", async function(next) {
    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
})

// JWT Token

// userSchema.methods.getJWTToken = function(){
//     return jwt.sign({id: JSON.stringify(this._id)}, process.env.JWT_SECRET, {
//         expiresIn: process.env.JWT_EXPIRE
//     })
// }

userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Compare Password

userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}

// Reset Password

userSchema.methods.getResetPasswordToken = function(){
  const resultToken = crypto.randomBytes(20).toString("hex");

  // Hashing and adding resetPasswordToken to userSchema

  this.resetPasswordToken = crypto
  .createHash("sha256")
  .update(resultToken)
  .digest("hex")

  this.resetPasswordExpire = Date.now() + 15 * 60 * 60 * 1000;

  return resultToken;
}
module.exports = mongoose.model("User", userSchema);

