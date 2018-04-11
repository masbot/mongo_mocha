const assert = require('assert');
const User = require('../src/users');


describe('Validating records', () => {
    it('requires a user name', () => {
        //validate user name was provided and is longer than two chars
        const user = new User({ name: undefined });
        //will have all the validation results
        //validateSync is different to validate, validateSync is a synchronous process
        const validationResult = user.validateSync();
        const { message } = validationResult.errors.name;
        assert(message === 'Name is required');

    });

    it('requires a user\'s name longer than 2 characters', () => {
        const user = new User({ name: 'Sa' });
        const validationResult = user.validateSync();
        const { message } = validationResult.errors.name;
        assert(message === 'Name must be longer than two characters');
    });

    it('disallows invalid record from being saved', (done) => {
        const user = new User({ name: 'Sa' });
        user.save()
            .catch((validationResult) => {
                const { message } = validationResult.errors.name;
                assert(message === 'Name must be longer than two characters');
                done();
            });
    })
})