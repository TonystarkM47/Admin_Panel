var mongoose = require('mongoose');
const { Schema } = mongoose

const human = new Schema({
    user_id:String,
    user_name:String,
    user_gender:String,
    user_email:String,
    user_mobile:Number,
    user_address:String,
})

var user_data = mongoose.model("user", human);
module.exports = user_data;