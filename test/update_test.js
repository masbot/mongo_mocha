const assert = require('assert');
const User = require('../src/users');

describe('Updating records', () => {
    let sam;

    beforeEach((done) => {
        sam = new User({
            name: 'Sam',
            likes: 0
        });

        sam.save()
            .then(() => done());
    });

    function assertName(operation, done) {
        operation
            //empty criteria finds all users
            .then(() => User.find({}))
            .then((users) => {
                assert(users.length === 1);
                assert(users[0].name === 'Samuel');
                done();
            });
    }

    it('instance type using set and save', (done) => {

        //used when you want to do some peice meal updates over time
        sam.set('name', 'Samuel');
        //just setting no update is done
        //its done in memory
        //to persist our record to db
        assertName(sam.save(), done);
    });

    it('A model instance can update', (done) => {
        //use update when you want to update in one go
        assertName(sam.update({ name: 'Samuel' }), done);
    });

    it('A model class can update', (done) => {
        assertName(User.update({ name: 'Sam' }, { name: 'Samuel' }), done);
    });

    it('A model class can update one record', (done) => {
        assertName(User.findOneAndUpdate({ name: 'Sam' }, { name: 'Samuel'}), done)
    });

    it('A model class can find a record with an Id and update', (done) => {
        assertName(User.findByIdAndUpdate({ _id: sam._id }, { name: 'Samuel'}), done)
    });

    it('A user can have their postcount incremented by 1', (done) => {
        //set every user's postcount to 1, not incrementing by one
        //User.update({ name: 'Sam' }, { postCount: 1 });
        //better to write a query to instruct in finding all users and increment by 1
        //specify which operator we want to use, point it to an object with the key of the property that we want to increment and the amount (decrement by -1)
        User.update({ name: 'Sam' }, { $inc: { likes: 1 } })
            .then(() => User.findOne({ name: 'Sam' }))
            .then((user) => {
                assert(user.likes === 1);
                done();
            });
    });


});