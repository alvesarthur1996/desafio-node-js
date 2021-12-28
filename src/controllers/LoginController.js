const jwt = require('jsonwebtoken');

exports.post = (req, res, next) => {
    if (typeof req.body.email === 'undefined' || req.body.email === '')
        return res.status(400).json({
            message: 'Field email is required'
        });
    else if (typeof req.body.password === 'undefined' || req.body.password === '')
        return res.status(400).json({
            message: 'Field password is required'
        });

    /**
     * If user and pass match, then return token
     * else return 401
     * CREATE A VALIDATOR FOR THIS
     */
    if (req.body.email === 'teste' && req.body.password === 'teste') {
        const token = jwt.sign({ email: req.body.email, password: req.body.password }, process.env.SECRET_JWT, {
            expiresIn: 300
        });
        return res.status(200).json({ auth: true, token: token });
    } else {
        return res.status(401).json({
            message: 'E-mail and/or password doesn\'t match.'
        });
    }
};
