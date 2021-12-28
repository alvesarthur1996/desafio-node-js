const LoginController = require('../controllers/LoginController');

module.exports = (app) => {
    app.post('/signin', LoginController.post);
};
