var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UrlSchema = new Schema({
    url: String,
    key: String
})

module.exports = mongoose.model('Url', UrlSchema);
