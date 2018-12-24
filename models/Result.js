var mongoose = require('mongoose');
var ResultSchema = new mongoose.Schema({
    id: String,
    name: String,
    father_name: String,
    grand_father_name: String,
    school: String,
    score: Number,
    result: String,
    province: String
});
  
module.exports = mongoose.model('Result', ResultSchema, 'results');