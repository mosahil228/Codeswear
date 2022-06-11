// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import User from "../../models/User";
import connectDb from "../../middleware/mongoose";
var CryptoJS =require("crypto-js");
var jwt = require('jsonwebtoken');
const handler = async (req, res) => {
  if (req.method == "POST") {
      // console.log(req.body);
      let user=await User.findOne({"email":req.body.email});
      const  bytes  = CryptoJS.AES.decrypt(user.password, process.env.AES_SECRET);
      let decryptPass = bytes.toString(CryptoJS.enc.Utf8);
      if(!user){
        res.status(200).json({success:false,error:"Invalid crediantials"})
      }
      if(user){
          if(req.body.email==user.email && req.body.password==decryptPass){
              var token=jwt.sign({email:user.email,name:user.name},process.env.JWT_SECRET,{expiresIn:"2d"})
              res.status(200).json({success:true,token,email:user.email})
          }else{
            res.status(200).json({success:false,error:"Invalid crediantials"})
          }
      }
    
  }else{
      res.status(400).json({success:false,error:"No user found"})
  }
  
};
export default connectDb(handler);
