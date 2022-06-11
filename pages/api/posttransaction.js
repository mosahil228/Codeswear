// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Order from "../../models/Order";
import connectDb from "../../middleware/mongoose";
import Product from "../../models/Product";
import paytmChecksum from "paytmchecksum";
const handler = async (req, res) => {
  let order;
  //validate paytm check sum
  var paytmChecksum = "";
  var paytmParams = {};
  const received_data = req.body
  for (var key in received_data) {
    if (key == "CHECKSUMHASH") {
      paytmChecksum = received_data[key];
    } else {
      paytmParams[key] = received_data[key];
    }
  }
  var isValidChecksum=paytmChecksum .verifySignature(paytmParams,process.env.PAYTM_MKEY,paytmChecksum);
  if(!isValidChecksum){
    // console.log("checksum matched");
    res.status(500).send("Some error Occurred")
    return

  }
  //update status into Orders table after cgecking the transaction status
  if (req.body.STATUS == "TXN_SUCCESS") {
    order = await Order.findOneAndUpdate(
      { orderId: req.body.ORDERID },
      { status: "Paid", paymentInfo: JSON.stringify(req.body),transactionid:req.body.TXNID }
    );
    //  jitne bhi products lenge to database se bhi to utne product ki qty remove krege n
    let products = order.products;
    for (let slug in products) {
      await Product.findOneAndUpdate(
        { slug: slug },
        { $inc: { availableQty: -products[slug].qty } }
      );
    }
  } else if (req.body.STATUS == "PENDING") {
    order = await Order.findOneAndUpdate(
      { orderId: req.body.ORDERID },
      { status: "Pending", paymentInfo: JSON.stringify(req.body),transactionid:req.body.TXNID }
    );
    

  }
  res.redirect("/order?clearCart=1&id=" + order._id, 200);

  //Initiate Shipping
  //Redirect user to the order confirmation page

  // res.status(200).json({ body:req.body })
};
export default connectDb(handler);
