const { verifyToken } = require("../service/auth.js");

function restrictToLoggedInUsers(req, res, next) {
  const token = req.cookies.uid;
  if (!token) return res.redirect("/login");
  const decoded = verifyToken(token);
  if (!decoded) return res.redirect("/login");
  req.user = decoded; // { id, role }
  next();
}

function checkauth(req, res, next) {
  const token = req.cookies.uid;
  if (token) {
    const decoded = verifyToken(token);
    req.user = decoded || null;
  } else {
    req.user = null;
  }
  next();
}


function restrictToAdmin(req, res, next) {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).send("Access denied. Admins only.");
  }
  next();
}

module.exports = { restrictToLoggedInUsers, checkauth, restrictToAdmin };