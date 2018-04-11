const mongoose = require('mongoose');
const PostSchema = require('./post');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: { 
        type: String, 
        validate: {
            validator: (name) => name.length > 2,
            message: 'Name must be longer than two characters'
        }, 
        required: [true, 'Name is required']
    }, //adding validation
    posts: [PostSchema],
    likes: Number,
    blogPosts: [{ type: Schema.Types.ObjectId, ref: 'blogPost' }]
});

//separate declaration on the userSchema
//virtual is telling mongoose that we want to define a virtual field
//virtual properties work by using the getter and setter features of ES6
//whenever we define a getter with virtual property, we can reference a property on our model 
//when we define a getter, instead of giving back the value of postCount, mongoose and JS 
//will work together to very quickly run the function that we define, inside that function return come computed value
UserSchema.virtual('postCount').get(function() {
    return this.posts.length;
})

UserSchema.pre('remove', function(next) {
    const BlogPost = mongoose.model('blogPost');
    // this === sam instance of user

    //go through all of our BlogPost look at all their ids
    //if  the id is in this list, remove it
    BlogPost.remove({ _id: { $in: this.blogPosts }})
        .then(() => next());

});

const User = mongoose.model('user', UserSchema);

module.exports = User;