const jwt = require("jsonwebtoken");
const User = require("../models/user");

const authMiddleware = async (req, res, next) => {
  // Get token from cookies
  const token = req.cookies.podcasterUserToken;

  // Log token for debugging
  console.log("Token received:", token);

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    // Verify the token
    const decode = jwt.verify(token, process.env.JWT_SECRET);

    // Log decoded token for debugging
    console.log("Decoded token:", decode);

    // Find the user associated with the token
    const user = await User.findById(decode.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Attach user to request object
    req.user = user;
    next();
  } catch (error) {
    // Log error for debugging
    console.log("Error decoding token:", error);

    // Handle token expiration or invalid token
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token has expired" });
    }

    return res.status(500).json({ message: "Invalid Token" });
  }
};

module.exports = authMiddleware;
