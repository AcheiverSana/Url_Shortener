const shortid = require("shortid");
const URL = require("../Models/url");

async function generateshorturl(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "url is required" });

  const SHORTID = shortid.generate();

  await URL.create({
    shortID: SHORTID,
    redirecturl: body.url,
    visitHistory: [],
    createdBy: req.user.id, // ✅ JWT decoded gives .id not ._id
  });

  return res.redirect(`/?id=${SHORTID}`);
}

async function getanalytics(req, res) {
  const shortID = req.params.shortID;
  const url = await URL.findOne({ shortID });
  return res.json({
    totalClicks: url.visitHistory.length,
    analytics: url.visitHistory
  });
}

module.exports = { generateshorturl, getanalytics };