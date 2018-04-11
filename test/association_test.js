const mongoose = require('mongoose');
const User = require('../src/users');
const Comment = require('../src/comment');
const BlogPost = require('../src/blogPost');
const assert = require('assert');

describe('Association', () => {

    let sam, blogPost, comment;

    beforeEach((done) => {
        sam = new User({ name: 'Sam' });
        blogPost = new BlogPost({ title: 'JS is Great', content: 'CONTENT'});
        comment = new Comment({ content: 'Congrats on great...' });

        //mongoose is going to recognize that we pushed in an entire model and it's going to automatically
        //an association is being set up and going to just set up this object id type to refer to this other blog post
        sam.blogPosts.push(blogPost);
        blogPost.comments.push(comment);
        comment.user = sam;
        //not saved yet.. or persisted     

        //takes an array of promises and combine them into a single promise
        Promise.all([sam.save(),blogPost.save(),comment.save()])
            .then(() =>  done());
    });

    it('saves a relation between a user and a blogpost', (done) => {
        User.findOne({ name: 'Sam' })
            .populate('blogPosts')
            .then((user) => {
                assert(user.blogPosts[0].title === 'JS is Great')
                done();
            });
    });

    it('saves a full relation graph', (done) => {
        User.findOne({ name: 'Sam' })
            //populate can also take an object with a bunch of config option
            //path - inside of the user that we fetch, we want to recursively load this additional resource
            //populate - inside of the path, we want you to further go inside and attempt to load up this add association
        
            .populate({
                path: 'blogPosts',
                populate: {
                    path: 'comments',
                    model: 'comment',
                    populate: {
                        path: 'user',
                        model: 'user'
                    }
                }
            })
            .then((user) => {
                assert(user.name === 'Sam');
                assert(user.blogPosts[0].title === 'JS is Great');
                assert(user.blogPosts[0].comments[0].content === 'Congrats on great...');
                assert(user.blogPosts[0].comments[0].user.name === 'Sam');
                done();
            })
    })

});