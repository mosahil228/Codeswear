// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Order from "../../models/Order";
import connectDb from "../../middleware/mongoose";
import Product from "../../models/Product";
import pincodes from "../../pincodes.json";
 const PaytmChecksum=require("paytmchecksum")
  const https = require('https');
  const handler = async (req, res) => {
    if(req.method=='POST'){
      //Initiate an order
      //check if the pincode is servucable
      if(!Object.keys(pincodes).includes(req.body.pincode)){
        res.status(200).json({success:false,"error":"the pincode You have entered  is not serviceable!",cartClear:false})
        return
      }
      //check if the cart is tempered with..[pending]
      let product,sumTotal=0;
      let cart=req.body.cart;
      if(req.body.subTotal<=0){
        res.status(200).json({success:false,"error":"Cart empty!  Please build your cart and try again!",cartClear:false})
        return
      }
      let item;
      for(item in req.body.cart){
        sumTotal+=cart[item].price*cart[item].qty
        product=await Product.findOne({slug:item})
        //check if the cart items are out of stock
        if(product.availableQty<cart[item].qty){
          res.status(200).json({success:false,"error":"Some items in your cart went out of stock,  Please try again!",cartClear:true})
          return
        }
        if(product.price!=cart[item].price){
          res.status(200).json({success:false,"error":"The price in your cart have changed,Please try again",cartClear:true})
          return
        }
      }
      //check f the details are valid..
      if(req.body.phone.length!==10 || !Number.isInteger(Number(req.body.phone))) {
         res.status(200).json({success:false,"error":"Please Enter your valid 10 digit phone number."})
          return
      }
      if(req.body.pincode.length!==6 || !Number.isInteger(Number(req.body.pincode))){
        res.status(200).json({success:false,"error":"Please Enter your 6 digit pincode."})
          return
      }


      //
      if(sumTotal!==req.body.subTotal){
        res.status(200).json({success:false,"error":"The price in your cart have changed,Please try again",cartClear:true})
        return
      }
      
      //Insert an entry in the Orders table with status as pending
      let order=new Order({
        email:req.body.email,
        orderId:req.body.oid,
        address:req.body.address,
        city:req.body.city,
        name:req.body.name,
        phone:req.body.phone,
        pincode:req.body.pincode,
        amount:req.body.subTotal,
        products:req.body.cart,
       
      })
      await order.save();
      
    
  
  
  var paytmParams = {};
  
  paytmParams.body = {
      "requestType"   : "Payment",
      "mid"           : process.env.NEXT_PUBLIC_PAYTM_MID,
      "websiteName"   : "YOUR_WEBSITE_NAME",
      "orderId"       : req.body.oid,
      "callbackUrl"   : `${process.env.NEXT_PUBLIC_HOST}/api/posttransaction`,
      "txnAmount"     : {
          "value"     : req.body.subTotal,
          "currency"  : "INR",
      },
      "userInfo"      : {
          "custId"    : req.body.email,
      },
  };
  
  const checkSum=await PaytmChecksum.generateSignature(JSON.stringify(paytmParams.body),process.env.PAYTM_MKEY)
  
      paytmParams.head = {
          "signature"    : checkSum
      };
  
      var post_data = JSON.stringify(paytmParams);
      const requestAsync=async()=>{
          return new Promise((resolve,reject)=>{
            var options = {
  
   
                        hostname: 'securegw.paytm.in',
                
              
                
                        port: 443,
                        path: `/theia/api/v1/initiateTransaction?mid=${process.env.NEXT_PUBLIC_PAYTM_MID}&orderId=${req.body.oid}`,
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Content-Length': post_data.length
                        }
                    };
                
                    var response = "";
                    var post_req = https.request(options, function(post_res) {
                        post_res.on('data', function (chunk) {
                            response += chunk;
                        });
                
                        post_res.on('end', function(){
                //             console.log('Response: ', response);
                             let ress=JSON.parse(response).body
                             ress.success=true
                             ress.cartClear=false
                             resolve(ress)
                        });
                    });
                
                    post_req.write(post_data);
                    post_req.end();

          })
      }
  
     let myr=await requestAsync();
    res.status(200).json(myr)
 
}}
export default connectDb(handler);
    