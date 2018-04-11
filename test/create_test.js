const assert = require('assert');
const User = require('../src/users');

describe('Creating records', () => {

    it('saves a user', (done) => {
        const sam = new User({ 
            name: 'Sam' 
        });

        //takes some amount of time
        //returns a promise
        sam.save()
            .then(() => {
                //has sam been saved successfully?
                //mongoose will auto automatically place a flag on the model instance isNew (true when it hasn't been saved yet)
                //goal of the assertion is to look at the isNew flag
                assert(!sam.isNew);

                //done is available in every single it block and beforeEach statement in Mocha
                done();
            });
    });

});