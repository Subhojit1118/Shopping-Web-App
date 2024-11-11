const express = require("express");
const router = express.Router();
const {
  signUpUser,
  loginUser,
  logoutUser,
  authMiddleware,
} = require("../../controller/auth/auth-controller");

router.post("/signup", signUpUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/check-auth", authMiddleware, (req, res) => {  
  const user = req.user;
  res.status(200).json({ success: true, message: "Authorized user!", user });
 
});

module.exports = router;
