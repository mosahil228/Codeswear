// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Form from "../../models/Form";
import connectDb from "../../middleware/mongoose";
const handler = async (req, res) => {
  if (req.method == "POST") {
      console.log(req.body);
      const {name,email,phone,message}=req.body;
      let u=new Form({name,email,phone,message});
      await u.save();
      res.status(200).json({ success:"Success" });
    
  }else{
      res.status(400).json({error:"This method is not allowed"})
  }
  
};
export default connectDb(handler);
