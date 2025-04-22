require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { body, validationResult } = require("express-validator");

const JWT_SECRET = process.env.JWT_SECRET;


// Validation Rules

const validateRegistration = [
  body("username").notEmpty().withMessage("Username is required"),
  body("email").isEmail().withMessage("Email format is wrong"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be atleast 8 characters long"),
];
const registerUser = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        return res.status(400).json({ errors: errorMessages });
    }

    const { username, email, password } = req.body;

    try{
        const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const result = await User.create({
      username: username,
      email: email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User registered successfully",
      user: result,
    });
    }
    catch(e) {
        res.status(500).json({
            message: "Error registering user",
        });
    }
    
}



const loginUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username){
    return res.status(400).send("Username is required");
  }

  if (!password) { 
    return res.status(400).send("Password is required");
  }

  // Call service layer
  const user = await User.findOne({ username: username });

  if(!user) {
    return res.status(400).json({
      message: "User not found",
    });
  }
  const hashedPassword = user.password;
 
  const result = await bcrypt.compare(password, hashedPassword);

  if (!result) {
    return res.status(400).json({
        message: "Invalid password",
    });
  }

  // JWT Token
  
  const token = jwt.sign(
    { username }, 
    JWT_SECRET, 
    { expiresIn: "1h" } 
  );

  return res.status(200).send({token: token});
};

const userPreference = async (req, res) => {
  const username = req.user.username;
  const user = await User.findOne({ username: username });
  if (!user) {
    return res.status(400).json({
      message: "User not found",
    });
  }
  return res.status(200).json({
    message: "User preferances",
    preferances: user.preferances,
  });
};

const updateUserPreferences = async (req, res) => {
  const username = req.user.username;

  const { country, language } = req.body;
  const updatedUser = await User.findOneAndUpdate(
    { username: username },
    {
      $set: {
        "preferances.country": country,
        "preferances.language": language,
      },
    },
    { new: true }
  );
  if (!updatedUser) {
    return res.status(400).json({
      message: "User not found",
    });
  }
  res.status(200).json({
    message: "User preferances updated",
  });
};



module.exports = {
  registerUser,
  validateRegistration,
  loginUser,
  userPreference,
  updateUserPreferences,
};