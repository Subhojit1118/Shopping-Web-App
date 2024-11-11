const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../model/User");
const env = require("dotenv");

// Signup user
const signUpUser = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    if (!userName || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill all the fields" });
    }
    const checkUser = await User.findOne({ email });
    if (checkUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists with the same email",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({ userName, email, password: hashedPassword });
    await newUser.save();
    return res
      .status(201)
      .json({ success: true, message: "User Created Successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const checkUser = await User.findOne({ email });
    if (!checkUser) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }
    const isPasswordMatch = await bcrypt.compare(password, checkUser.password);
    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect password" });
    }
    const token = jwt.sign(
      { id: checkUser._id, role: checkUser.role, email: checkUser.email },
      "USER_SECRET_KEY",
      {
        expiresIn: "60m",
      }
    );
    res.cookie("token", token, { httpOnly: true, secure: false }).json({
      success: true,
      message: "Login Successfully",
      token,
      user: {
        email: checkUser.email,
        role: checkUser.role,
        userName: checkUser.userName,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// logout user
const logoutUser = async (req, res) => {
  res.clearCookie("token");
  return res
    .status(200)
    .json({ success: true, message: "Logout Successfully!" });
};

// middleware
const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized user!" });
  }
  try {
    const decoded = jwt.verify(token, "USER_SECRET_KEY");
    req.user = decoded;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized user!" });
  }
};

module.exports = { signUpUser, loginUser, logoutUser, authMiddleware };
