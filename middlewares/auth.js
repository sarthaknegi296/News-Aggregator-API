require("dotenv").config();
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;


const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
        
    
    if(!token) {
        return res.status(401).json({
            message: "No token provided",
        });
    }

    try{
        const decodedToken = jwt.verify(token, JWT_SECRET);
        req.user = decodedToken;
        next();
    }
    catch(e) {
        return res.status(401).json({
            message: "Invalid token"
        })
    }
}

module.exports = verifyToken;