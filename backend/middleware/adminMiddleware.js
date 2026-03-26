// Middleware to allow only admin users
const admin = (req, res, next) => {
  console.log(req.user, " admin middleware");

  // Check if user exists AND has admin role
  if (req.user && req.user.role === "admin") {
    next(); // Allow request to continue
  } else {
    res.status(403).json({ message: "Admin only" });
  }
};

export default admin;
