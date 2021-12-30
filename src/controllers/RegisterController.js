const md5 = require('md5');
const User = require('../models/User');
const Telephone = require('../models/Telephone');

const ValidateEmail = (email) => {
    if (!email) return false;
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return email.toLowerCase().match(regex);
};

const RegisterUser = async (data, res) => {
    let resUser;
    let creating = false;

    if (!data.telephones || typeof data.telephones === 'undefined') return res.status(400).json({ message: 'At least a phone number is required.' });
    if (data.telephones.filter((item) => typeof item.number !== 'number' || typeof item.area_code !== 'number').length) {
        return res.status(400).json({ message: 'Telephones number and area_code must be a number.' });
    }
    if (!data.name || typeof data.name === 'undefined') return res.status(400).json({ message: 'Name is required.' });
    if (typeof data.name !== 'string') return res.status(400).json({ message: 'Name must be a string.' });
    if (!data.email || typeof data.email === 'undefined') return res.status(400).json({ message: 'E-mail is required.' });
    if (typeof data.email !== 'string') return res.status(400).json({ message: 'E-mail must be a string.' });
    if (!ValidateEmail(data.email)) return res.status(400).json({ message: 'Invalid e-mail.' });
    if (!data.password || typeof data.password === 'undefined') return res.status(400).json({ message: 'Password is required.' });

    await User.findOrCreate({
        where: {
            email: data.email,
        },
        defaults: {
            name: data.name,
            password: md5(data.password),
        },
    }).then(([user, created]) => {
        resUser = user.get({
            plain: true,
        });
        creating = created;
    });

    if (!creating) {
        return res.status(403).json({
            message: 'User is already registered',
        });
    }

    if (data.telephones.length) {
        await Telephone.bulkCreate(
            data.telephones.map((el) => {
                const item = el;
                item.user_id = resUser.id;
                return item;
            }),
        );
    }

    return res.status(200).json({
        id: resUser.id,
        created_at: new Date(resUser.createdAt).toLocaleString(),
        modified_at: new Date(resUser.updatedAt).toLocaleString(),
    });
};

exports.post = (req, res) => RegisterUser(req.body, res);
exports.ValidateEmail = ValidateEmail;
