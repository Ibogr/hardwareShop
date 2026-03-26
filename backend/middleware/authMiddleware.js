import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Middleware runs between the request and the response.
// First, the data comes from the frontend.
// Then it passes through the middleware.
// In the middleware, the data is checked or processed.
// After that, it continues to the backend logic and finally a response is sent back to the frontend.
// In simple terms, middleware is used to validate or handle data before sending a response.

// function to check the Token send from frontend. this one  called middleware and it needs to proceed with next parameter.
const verifyToken = async (req, res, next) => {
  let token;

  if (
    // if the headers in frontend exist, run this block
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      //to get token from headers and set it as a token
      token = req.headers.authorization.split(" ")[1];
      // to decode the token. so token has some information by creating when the token created. here we decode it helping with secret key. so we can see whatever it out inside it.
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // The token has been decoded and contains a user ID.
      // We use this ID to find the user in the database.
      // If the user exists, we attach it to req.user.
      // This allows us to access the authenticated user in the request,
      // since the token originally comes from the frontend (client side).
      req.user = await User.findById(decoded.id);
      console.log(req.user);
      // if everything is okey proceedwith next method
      next();
      //if not the catch block runs and sends status and message as a responce, so in frontend, developer can use message that comes from here
    } catch (error) {
      console.error("Token verification failed:", error);
      res.status(401).json({ message: "Not authorized" });
    }
  } else {
    res.status(401).json({ message: "No token" });
  }
};

// exporting the function
export default verifyToken;
