const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./userAuth");
//----------------------sign up---------------------
router.post("/sign-up", async (req, res) => {
  try {
    const { user_name, user_email, user_password, user_address } = req.body;

    if (user_name.length < 4) {
      return res
        .status(400)
        .json({ message: "usernamee length should be greater that 3" });
    }

    const existingUsername = await User.findOne({ username: user_name });
    if (existingUsername) {
      return res.status(400).json({ message: "usernamee already exist" });
    }

    const existingEmail = await User.findOne({ email: user_email });
    if (existingEmail) {
      return res.status(400).json({ message: "email already exist" });
    }

    if (user_password.length <= 5) {
      return res
        .status(400)
        .json({ message: "password length should be greater that 5 " });
    }
    const hashPass = await bcrypt.hash(user_password, 10);

    const newUser = new User({
      username: user_name,
      email: user_email,
      password: hashPass,
      address: user_address,
    });

    await newUser.save();
    return res.status(200).json({ message: "SignUp Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});
// --------------------sign in-------------------

router.post("/sign-in", async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });
    if (!existingUser) {
      return res.status(400).json({ message: "Invalid Credentials" }); // ✅ Return stops execution
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials" }); // ✅ Return to prevent multiple responses
    }

    const authClaims = {
      name: existingUser.username,
      role: existingUser.role,
    };

    const token = jwt.sign(authClaims, "bookStore123", { expiresIn: "30d" });

    return res.status(200).json({
      id: existingUser._id,
      role: existingUser.role,
      token: token,
    });
  } catch (error) {
    console.error("Sign-in error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

//--------------get user information-------------
router.get("/get-user-information", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;

    const data = await User.findById(id).select("-password");
    return res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: "internal server error" });
  }
});
//
//update address
router.put("/update-address", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const { address } = req.body;
    await User.findByIdAndUpdate(id, { address: address });
    return res.status(200).json({ message: "address updated successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "internal server erro" });
  }
});

module.exports = router;
