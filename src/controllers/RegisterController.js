const md5 = require('md5');
const User = require('../models/User');
const Telephone = require('../models/Telephone');

const RegisterUser = async (data, res) => {
    let resUser;
    let creating = false;

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

// TODO validar dados antes de persistir
