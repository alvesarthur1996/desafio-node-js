exports.post = (req, res, next) => {
    console.log(req.body);

    let response = {
        id: 'string',
        created_at: new Date().toLocaleString(),
        modified_at: new Date().toLocaleString()
    };

    res.status(200).send(response);
};
