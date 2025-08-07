var mongoose = require('mongoose');
const{ Schema } = mongoose;
//table schema
const userSchema = new Schema({
    pname:String,
    pprice:Number
});
var glance = mongoose.model('glance', userSchema);
module.exports = glance;
