const UserController = require('../controllers/UserController');

module.exports = (app) => {
    app.get('/user', UserController.get);
};
