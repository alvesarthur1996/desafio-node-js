const jwt = require('jsonwebtoken');
const md5 = require('md5');
const User = require('../models/User');

const Auhtenticate = async (email, password, res) => {
    let user = {};

    await User.findOne({
        where: {
            email,
            password: md5(password),
        },
    }).then((data) => {
        if (data !== null) {
            user = data.get({
                plain: true,
            });
        }
    });

    if (typeof user.id !== 'undefined') {
        const token = jwt.sign({
            email: user.email,
            id: user.id,
        }, process.env.SECRET_JWT, {
            expiresIn: 600,
        });
        return res.status(200).json({ token });
    }

    return res.status(401).json({
        message: 'E-mail and/or password doesn\'t match.',
    });
};

exports.post = (req, res) => {
    const { email, password } = req.body;

    if (typeof email !== 'string' || email === '') {
        if (typeof email === 'undefined') {
            return res.status(400).json({
                message: 'Field email is required.',
            });
        }

        return res.status(422).json({
            message: 'Check the type of data sent in the field email. String is required.',
        });
    }

    if (typeof password !== 'string' || password === '') {
        if (typeof email === 'undefined') {
            return res.status(400).json({
                message: 'Field email is required.',
            });
        }
        return res.status(422).json({
            message: 'Check the type of data sent in the field password. String is required.',
        });
    }
    /**
     * If user and pass match, then return token
     * else return 401
     * CREATE A VALIDATOR FOR THIS
     */
    return Auhtenticate(email, password, res);
};
