const mongoose = require('mongoose'); 

// Declare the Schema of the Mongo model
const ForgotSchema = new mongoose.Schema({
    userid:{ type:String,required:true},  
    email:{ type:String,required:true,unique:true},  
    token:{ type:String,required:true},  
},{timestamps:true});



//Export the model
// const User= mongoose.model('User', UserSchema);
// module.exports = User;
// mongoose.models={}
// export default mongoose.model("User",UserSchema)
export default mongoose.models.Forgot || mongoose.model("Forgot",ForgotSchema);
