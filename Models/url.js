const mongoose = require("mongoose");
const shortid = require("shortid");

const urlschema = new mongoose.Schema(
    {
        shortID : {
            type:String,
            required:true,
            unique:true,
            default: () => shortid.generate()
        },
        redirecturl : {
            type:String,
            required:true   
        },
        visitHistory : [{timestamps: {type:Number}}],
        createdBy : {
            type:mongoose.Schema.Types.ObjectId,
            ref:"users",
        } 
    },{timestamps:true}
);

const URL = mongoose.model('url',urlschema);
module.exports = URL;