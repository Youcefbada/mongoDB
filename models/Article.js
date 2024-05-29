const mongoose = require("mongoose");

// Create the schema for the database
const articaleSchema = new mongoose.Schema({
    title: String,
    body: String,
    numberofpages: Number
});

// Create the model using a name and the schema
const Article = mongoose.model('Article', articaleSchema);

// Export the model
module.exports = Article;