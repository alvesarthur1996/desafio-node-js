exports.get = (req, res, next) => {
    console.log(req.headers);

    // if header authorization
    res.status(200).send(res);

    // else
    res.status(401).send();
};
