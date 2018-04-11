const assert = require('assert');
const User = require('../src/users');

describe('Deleting a user', () => {
    let sam;

    beforeEach((done) => {
        sam = new User({
            name: 'Sam'
        })

        sam.save()
            .then(() => done())
    })

    it('model instance remove', (done) => {
        //already fetched the user
        sam.remove()
            //how to test?
            //search through the collection
            .then(() => User.findOne({ name: 'Sam' }))
            .then((user) => {
                assert(user === null);
                done();
            });
    });

    it('class method remove', (done) => {
        //use when we want to remove a bunch of records at the same time
        //remove all record with the name Sam
        User.remove({ name: 'Sam' })
            .then(() => User.findOne({ name: 'Sam' }))
            .then((user) => {
                assert(user === null);
                done();
            });
    });

    it('class method findOneAndRemove', (done) => {
        User.findOneAndRemove({ name: 'Sam' })
            .then(() => User.findOne({ name: 'Sam' }))
            .then((user) => {
                assert(user === null);
                done();
            });
    });

    it('class method findByIdAndRemove', (done) => {
        User.findByIdAndRemove({ _id: sam._id })
            .then(() => User.findOne({ name: 'Sam' }))
            .then((user) => {
                assert(user === null);
                done();
            });
    });
})