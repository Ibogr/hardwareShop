const admin = (req, res, next) => {
  console.log(req.user)
  if (req.user && req.user.role) {
    next();
  } else {
    res.status(403).json({ message: "Admin only" });
  }
};

export default admin;
