const UserController = require('../controllers/UserController');

module.exports = (app) => {
    app.get('/search', UserController.get);
};
