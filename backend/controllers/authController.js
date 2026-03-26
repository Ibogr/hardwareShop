import User from "../models/User.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

// function for register users and save it to the DB
export const registerUser = async (req, res) => {
  //async/await is necessary because operations like checking the database or hashing passwords are asynchronous.
  try {
    const { name, email, password } = req.body; // to get data from body(users on Browser)

    const userExists = await User.findOne({ email }); // search emain address on the User model

    if (userExists) {
      // if there is a user for the same email address
      return res.status(400).json({ message: "User already exists" });
    }
    // hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //to create a new user in the user model in the Database
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // to send the new user to the frontend so developer can use them
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      // sending a create token for this register so developer can save it to the localStorage of the Browser.  (it can used later on. This one would be session for the website)
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

// function to login
export const loginUser = async (req, res) => {
  const { email, password } = req.body; // getting user info from the frontend

  const user = await User.findOne({ email }); //searching the user on the User model in DB

  // comparing the hashed password and if the user exist in the DB
  if (user && (await bcrypt.compare(password, user.password))) {
    // to send the info that we got from backend to the frontend
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
    // if the user who entered info on frontend not exist in the DB, else block can run
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
};
