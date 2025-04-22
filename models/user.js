const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    preferances: {
        language: {
            type: String,
            default: "en"
        },
        country: {
            type: String,
            default: "in"
        },
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User;