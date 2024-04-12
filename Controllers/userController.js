const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./../Model/user");
const UserFeedback = require("./../Model/userFeedback");

exports.signup = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    // Check if user with the same email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Check if password and confirmPassword match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      confirmPassword: hashedPassword,
    });
    // await newUser.save();

    // Generate JWT token
    const token = jwt.sign({ userId: newUser._id }, "secret_key", {
      expiresIn: "1h",
    });
    res.cookie("jwt", token, {
      expiresIn: Date.now() + 1 * 60 * 1000,
      httpOnly: true,
    });
    // res.status(201).json({ message: "User created successfully" });
    res.locals.user = newUser;
    req.user = newUser;
    res.status(200).json({ message: "Success", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user with the provided email exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // req.body.user = user.name;
    // Check if the provided password matches the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, "secret_key", {
      expiresIn: "1h",
    });

    res.cookie("jwt", token, {
      expiresIn: Date.now() + 1 * 60 * 1000,
      httpOnly: true,
    });
    // console.log(req.cookies);
    res.locals.user = user;
    req.user = user;
    res.status(200).json({ message: "Success", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    await User.findByIdAndDelete(userId);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.feedback = async (req, res) => {
  try {
    // console.log(req.body);
    const usersFeedbacks = await UserFeedback.create({
      email: req.body.email,
      feedback: req.body.feedback,
    });
    // console.log(usersFeedbacks);
    res.status(200).json({ message: "Success" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Serverrr Error" });
  }
};

exports.logout = (req, res) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({
    message: "Success",
  });
};
