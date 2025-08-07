var mongoose = require('mongoose');
const {Schema} = mongoose
//table Schema
const Admin_info = new Schema({
    admin_id:String,
    admin_name:String,
    admin_email:String,
    admin_password:Number,
});
var admin_data = mongoose.model("Admin", Admin_info);
module.exports = admin_data;