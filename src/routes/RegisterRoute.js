const RegisterController = require('../controllers/RegisterController');

module.exports = (app) => {
    app.post('/signup', RegisterController.post);
};
