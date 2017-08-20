var mongoose = require('mongoose');
var ArticleSchema = new mongoose.Schema({
   username: String,
   title: String,
   text: String,
   timestamp: {type: Date, default: Date.now}
});
mongoose.model ('Article', ArticleSchema);
