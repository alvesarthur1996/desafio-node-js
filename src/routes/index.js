const UserRoute = require('./UserRoute');
const LoginRoute = require('./LoginRoute');
const RegisterRoute = require('./RegisterRoute');

module.exports = (app) => {
    LoginRoute(app);
    RegisterRoute(app);
    UserRoute(app);
};
