var mongoose = require('mongoose');
const {Schema} = mongoose
//table Schema
const Product_info = new Schema({
    product_id:String,
    product_title:String,
    product_details:String,
    product_price:String,
    product_image_path:String,
    category_id:String
})
//Schema Export as Model
var product_data = mongoose.model("Product", Product_info);
module.exports = product_data;