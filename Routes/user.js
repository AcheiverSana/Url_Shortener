const express = require("express");
const { handleusersignup,handleuserlogin } = require("../Controllers/user");

const router = express.Router();

router.post("/",handleusersignup);
router.post("/login",handleuserlogin); 

module.exports = router;