const test = require('tape');
const RegisterController = require('../src/controllers/RegisterController');

test('Validate Email', (t) => {
    t.true(RegisterController.ValidateEmail('teste@teste.com'), 'Valid e-mail');
    t.false(RegisterController.ValidateEmail('teste.com'), 'Invalid e-mail');
    t.false(RegisterController.ValidateEmail(null), 'Null value is not allowed');
    t.false(RegisterController.ValidateEmail(''), 'E-mail is required');
    t.end();
});
