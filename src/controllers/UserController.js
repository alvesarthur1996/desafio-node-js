const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Telephone = require('../models/Telephone');

const FindUser = async (userId, res) => {
    const userData = {};

    await User.findOne({
        where: {
            id: userId,
        },
    }).then((resp) => {
        const respData = resp.get({
            plain: true,
        });
        userData.id = respData.id;
        userData.email = respData.email;
        userData.created_at = respData.createdAt;
        userData.modified_at = respData.updatedAt;
    });

    await Telephone.findAll({
        where: {
            user_id: userId,
        },
        raw: true,
    }).then((telephones) => {
        userData.telephones = telephones.map((item) => {
            const obj = { area_code: item.area_code, number: item.number };
            return obj;
        });
    });

    return res.status(200).json(userData);
};

exports.get = (req, res) => {
    const { authorization } = req.headers;
    if (!authorization) return res.status(400).json({ message: 'Missing Authorization header' });

    const token = authorization.replace('Bearer ', '');

    return jwt.verify(token, process.env.SECRET_JWT, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token is invalid or expired.' });
        }
        return FindUser(decoded.id, res);
    });
};
