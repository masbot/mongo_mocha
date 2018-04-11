//mongoose is all about giving a nice handler onto MongoDB
const mongoose = require('mongoose');

//whenever mongoose needs to create a promise just juse the ES6 implementation
mongoose.Promise = global.Promise; //reference to the ES6 implementation of promises inside node js env.

//gets called only once
//used in the case where connecting to mongo took longer than expect
//and mocha started to run tests too soon
before((done) =>{
    //mocha starts
    //tells mongoose to connect to mongo
    mongoose.connect('mongodb://localhost/user_test');
    //mongoose connects to Mongo
    //connection successful? run test
    //connection failed? show error

    //done notifies mocha that connection has been successful and ready to run test
    mongoose.connection
        .once('open', () => { done(); })
        .on('error', () => {
            console.warn('Warning', error);
        });
});


//a hook
beforeEach((done) => {

    //this is a direct reference to our collection of users sitting inside of our database
    //calls the drop function on our collection of users, which is taking all records that are inside
    //the user collection and delete them.

    //Everytime we reach out to mongo we have to wait for a response
    //Same goes for every operation that we take on a collection

    //drop accepts a callback function that will be executed on the collection has been dropped
    
    const { users, comments, blogposts } = mongoose.connection.collections;
   
    
    users.drop(() => {
        //Ready to run the next test.
        //done means everything is complete with all the logic that I have inside this beforeEach
        comments.drop(() => {
            blogposts.drop(() => {
                done();
            });
        });
    });
});