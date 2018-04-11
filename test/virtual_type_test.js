const assert = require('assert');
const User = require('../src/users');

describe('Virtual types', () => {
    it('postCount returns the number of posts', (done) => {
        const sam = new User({
            name: 'Sam',
            posts: [{ title: 'PostTitle' }]
        });
        
        sam.save()
            .then(() => User.findOne({ name: 'Sam' }))
            .then((user) => {
                assert(sam.postCount === 1);
                done();
            });
    });
})