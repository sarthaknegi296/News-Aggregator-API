const express = require('express');
const verifyToken = require('../middlewares/auth');
const { registerUser, validateRegistration, loginUser, userPreference, updateUserPreferences } = require('../controllers/user');
const { getNews } = require('../services/news');
const router = express.Router();

router.post("/register", validateRegistration, registerUser);

router.post("/login", loginUser);

router.get("/preferences",[verifyToken], userPreference);

router.put("/preferences",[verifyToken], updateUserPreferences);

router.get("/news", [verifyToken], getNews);

module.exports = router;