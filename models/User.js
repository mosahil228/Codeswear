const mongoose = require('mongoose'); 

// Declare the Schema of the Mongo model
const UserSchema = new mongoose.Schema({
    name:{ type:String,required:true},  
    email:{ type:String,required:true,unique:true},  
    password:{ type:String,required:true},  
    address:{ type:String,required:''},  
    pincode:{ type:String,required:''},  
    phone:{ type:String,required:''},  
},{timestamps:true});



//Export the model
// const User= mongoose.model('User', UserSchema);
// module.exports = User;
// mongoose.models={}
// export default mongoose.model("User",UserSchema)
export default mongoose.models.User || mongoose.model("User",UserSchema);
