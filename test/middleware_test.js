const mongoose = require('mongoose')
const assert = require('assert');
const User = require('../src/users');
const BlogPost = require('../src/blogPost');

describe('Middleware', () => {

    let sam, blogPost;

    beforeEach((done) => {
        sam = new User({ name: 'Sam' });
        blogPost = new BlogPost({ title: 'JS is Great', content: 'CONTENT'});

        //mongoose is going to recognize that we pushed in an entire model and it's going to automatically
        //an association is being set up and going to just set up this object id type to refer to this other blog post
        sam.blogPosts.push(blogPost);
        //not saved yet.. or persisted     

        //takes an array of promises and combine them into a single promise
        Promise.all([sam.save(),blogPost.save()])
            .then(() =>  done());
    });

    it('users clean up dangling blogposts on remove', (done) => {
        sam.remove()
            .then(() => BlogPost.count())
            .then((count) => {
                assert(count === 0);
                done();
            })
    })

})