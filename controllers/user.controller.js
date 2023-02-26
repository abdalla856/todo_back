const User = require("../models/User.js");
const scheduledFunctions = require('../middleware/scheduledFunctions')

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(name)
    const user = new User({ name, email, password });
    await user.save();
    res.json({ success: true, message: "User signed up successfully!" });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    scheduledFunctions.initScheduledJobs(user._id);

    if (!user) {
      throw new Error("Invalid email or password!");
    }
    if (user.password !== password) {
      throw new Error("Invalid email or password!");
    }
    res.json({ success: true, message: "User logged in successfully!", user });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};



