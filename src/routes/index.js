const UserRoute = require('./UserRoute');
const LoginRoute = require('./LoginRoute');
const RegisterRoute = require('./RegisterRoute');
const database = require('../../db');

module.exports = (app) => {
    (
        async () => {
            try {
                await database.sync();
            } catch (error) {
                console.log(error);
            }
        }
    )();

    LoginRoute(app);
    RegisterRoute(app);
    UserRoute(app);
};
