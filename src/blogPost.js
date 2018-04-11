const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogPostSchema = new Schema({
    title: String,
    content: String,
    comments: [{ type: Schema.Types.ObjectId, ref: 'comment' }]
})

//blog post will have many comments associated with it.
//pass an array with a configuration object,
//where we specify the type of this reference or the type that's going to sit inside of here
//this type is going to point off to a record that is sitting in a different collection
//not nesting but passing a reference off to another model or another document 
//sitting in a comment collection
//when mongodb stores the comment record there will be an array of IDs
//ref is connected to the mongoose.model('...', Schema)

const BlogPost = mongoose.model('blogPost', BlogPostSchema);

module.exports = BlogPost;