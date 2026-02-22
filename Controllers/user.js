const User = require("../Models/user.js");
const { createToken } = require("../service/auth.js");

async function handleusersignup(req, res) {
  const { name, email, password } = req.body;
  const user = await User.create({ name, email, password, role: "normal" });
  const token = createToken(user);
  res.cookie("uid", token, { httpOnly: true });
  return res.redirect("/");
}

async function handleuserlogin(req, res) {
  const { name, email } = req.body;
  const user = await User.findOne({ name, email });
  if (!user) return res.render("login", { error: "Invalid Username or Password" });
  const token = createToken(user);
  res.cookie("uid", token, { httpOnly: true });
  return res.redirect("/");
}

module.exports = { handleusersignup, handleuserlogin };