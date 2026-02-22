 const express = require('express');
 const router =  express.Router();
  
 const {generateshorturl, getanalytics} = require("../Controllers/controllers.js");
 router.post("/",generateshorturl);
 router.get("/analytics/:shortID",getanalytics);
 module.exports = router;