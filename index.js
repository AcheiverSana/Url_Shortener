 const express = require("express");
 const path = require("path");
const cookieParser = require("cookie-parser"); 

 const connect = require("./connect.js");
 const URL = require("./Models/url.js"); 
 const app = express();
 const port = 8000;


 const urlrouter = require("./Routes/router.js");
 const staticrouter = require("./Routes/staticrouter.js");
const userrouter = require("./Routes/user.js");


 mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("connected to mongodb"))
  .catch((err) => console.log(err));


  const {restrictToLoggedInUsers,checkauth} = require("./Middlewares/auth.js");

 app.set("view engine","ejs");
 app.set("views",path.resolve("./views"));

  app.use(cookieParser());
 app.use(express.json());
 app.use(express.urlencoded({extended:false}));

 
 app.use("/url",restrictToLoggedInUsers,urlrouter);
 app.use("/",checkauth,staticrouter);
 app.use("/user",userrouter);

 
 app.get("/:shortID",async (req,res) => {
    const shortID = req.params.shortID; 
    const url = await URL.findOne({shortID});
    if(!url) return res.status(404).json({error:"url not found"});
    url.visitHistory.push({timestamps:Date.now()});
    await url.save();
    res.redirect(url.redirecturl);
 });
 app.listen(port, ()=> {
    console.log(`Server started on port : ${port}`);
 }) 