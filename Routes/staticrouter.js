const express = require('express');
const URL = require("../Models/url.js");
const router = express.Router();

router.get("/", async (req, res) => {
  if (!req.user) return res.redirect("/login");

  let allUrls;

  if (req.user.role === "admin") {
    allUrls = await URL.find({}); // admin sees everything
  } else {
    allUrls = await URL.find({ createdBy: req.user.id }); // normal sees own
  }

  return res.render("home", {
    urls: allUrls,
    id: req.query.id || null,
    role: req.user.role // pass role to view
  });
});

router.get("/signup", (req, res) => res.render("signup"));
router.get("/login",  (req, res) => res.render("login"));

module.exports = router;