const assert = require('assert');
const User = require('../src/users');

describe('Reading users out of the database', () => {
    let sam, sarah, roman, homer;

    //the purpose of this before each is to insert a record into our user collection
    //with the reference of the done callback
    beforeEach((done) => {
        sam = new User({name: 'Sam'});
        sarah = new User({name: 'Sarah'});
        roman = new User({name: 'Roman'});
        homer = new User({name: 'Homer'});
        //when we first create an user, automatically assigned an ID by mongoose
        //is identical to the one saved in the database

        Promise.all([sam.save(), sarah.save(), roman.save(), homer.save()])
        // sam.save()
            .then(() => done());
    })

    //first query finding all users with the name of Sam
    //added done before searching for user is an asynchronus test
    it('finds all user with the name of Sam', (done) => {
        //how do we query our database? how do we execute a query?
        //before we can find any user with the name of Sam, 
        //we have to make sure that one exist in the collection by adding a beforeEach
        
        //referencing the user model/class, not a specific user
        User.find({ name: 'Sam' })
            .then((users) => {
                //will be called with a list of users
                
                //how to write an assertion? checks same user created in beforeEach
                //by using the id created in mongo for the user
                //gotchas - same id but error is produced because when we are looking at an ID
                //we are not look at the raw string
                //it is an object of ID that encampsulate the string
                //to get a reference to the actual string, we have to call toString method
                assert(users[0]._id.toString() === sam._id.toString())

                done();
            });
    });

    it('find a user with a particular id', (done) => {
        //don't need to use toString to reference the string, internally mongoose knows how to work with that object id
        User.findOne({ _id: sam._id })
            .then((user) => {
                assert(user.name === 'Sam');

                done();
            })
    })

    it('can skip and limit the result set', (done) => {
        //filtering the result set
        //-Sam- [Sarah Roman] Homer
        User.find({})
            //ascending order sort({ name: 1 })
            //descending order sort({ name: -1 })
            .sort({ name: 1 })
            .skip(1)
            .limit(2)
            .then((users) => {
                assert(users.length === 2);
                assert(users[0].name === 'Roman');
                assert(users[1].name === 'Sam');
                done();
            });
    });
});