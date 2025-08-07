var mongoose = require('mongoose');
const {Schema} = mongoose
//table Schema
const Category_info = new Schema({
    category_id:String,
    category_name:String,
})
//Schema Export as Model
var category_data = mongoose.model("Category", Category_info);
module.exports = category_data;
