const mongoose = require('mongoose');

var documentSchema = new mongoose.Schema({
    title: String,
    username: String,
    body: String
});
var Document = mongoose.model('Document', documentSchema);
module.exports = Document;
