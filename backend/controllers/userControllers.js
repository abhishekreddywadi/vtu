const User = require("../models/userModels");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  const { usn, password } = req.body;
  if (!usn || !password) {
    return res.status(400).json({ message: "USN and password are required" });
  }
  // Check if the user already exists
  const existingUser = await User.findOne({ usn });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }
  // Hash the password
  const hashedPassword = await crypto
    .createHash("sha256")
    .update(password)
    .digest("hex");
  // Create a new user
  const user = new User({ usn, password: hashedPassword });
  await user.save();
  // Generate a JWT token
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  // Send the token in the response
  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });

  res.status(201).json({ user, token });
};

const loginUser = async (req, res) => {
  const { usn, password } = req.body;
  if (!usn || !password) {
    return res.status(400).json({ message: "USN and password are required" });
  }
  // Check if the user exists
  const user = await User.findOne({ usn });
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  // Check if the password is correct
  const isPasswordValid =
    (await crypto.createHash("sha256").update(password).digest("hex")) ===
    user.password;
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  // Generate a JWT token
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  // Send the token in the response
  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });
  res.status(200).json({ user, token });
};

module.exports = {
  registerUser,
  loginUser,
};
