const assert = require('assert');
const User = require('../src/users');

describe('Subdocuments', () => {
    it('can create a subdocument', (done) => {
        //to add post, have to pass some amount of data that matches the structure that the user model expects
        //pass in a key that points at a list of records that match the schema of post schema
        const sam = new User({ 
            name: 'Sam', 
            posts: [{title: 'PostTitle'}]
        });

        sam.save()
            .then(() => User.findOne({ name: 'Sam' }))
            .then((user) => {
                assert(user.posts[0].title === 'PostTitle');
                done();
            });
    });

    it('can add sub document to an existing record', (done) => {
        const sam = new User({ name: 'Sam', posts: [] });
        sam.save()
            .then(() => User.findOne({ name: 'Sam' }))
            .then((user) => {
                user.posts.push({title: 'New Posts'});
                return user.save();
            })
            .then(() => User.findOne({ name: 'Sam' }))
            .then((user) => {
                assert(user.posts[0].title === 'New Posts');
                done();
            });
    });

    it('can remove an existing sub document', (done) => {
        const sam = new User({ name: 'Sam', posts: [{title: 'New Title'}]});

        sam.save()
            .then(() => User.findOne({name: 'Sam'}))
            .then((user) => {
                //removing a record in array with mongoose api 
                //does not automatically save our record off to mongo
                user.posts[0].remove();
                return user.save();
            })
            .then(() => User.findOne({ name: 'Sam' }))
            .then((user) => {
                assert(user.posts.length === 0);
                done();
            });
    })
});