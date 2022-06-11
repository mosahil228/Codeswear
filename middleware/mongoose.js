// connect to mongoose
// const mongoose=require("mongoose");
// const DB=process.env.DATABASE;
// mongoose.connect(DB).then(()=>{
//     console.log("connection successfull");
// }).catch((err)=>{
//   console.log("no connection");
//   console.log(err);
// })
import mongoose from "mongoose";

const connectDb=handler=> async (req,res)=>{
    if(mongoose.connections[0].readyState){
        return handler(req,res)
    }
    await mongoose.connect(process.env.MONGO_URI)
    return handler(req,res);
}

export default connectDb;
