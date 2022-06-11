const mongoose = require('mongoose'); 

// Declare the Schema of the Mongo model
const FormSchema = new mongoose.Schema({
    name:{ type:String,required:true},  
    email:{ type:String,required:true,unique:true},  
    phone:{ type:Number,required:true},  
    message:{ type:String,required:true},   
},{timestamps:true});



//Export the model
// const User= mongoose.model('User', UserSchema);
// module.exports = User;
// mongoose.models={}
// export default mongoose.model("User",UserSchema)
export default mongoose.models.Form || mongoose.model("Form",FormSchema);
