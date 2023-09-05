const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    ename:{type:String,required:true},
    username:{type:String,required:true},
    email: {type:String,required:true},
    password: {type:String,required:true},
    designation:{type:String,required:true},
    contact:{type:Number,required:true},
    address:{type:String,required:true},
    city:{type:String,required:true},
    zip:{type:Number,required:true},
    ename:{type:String,required:true},
    state:{type:String,required:true},


    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ],
    
  })
);

module.exports = User;
