const jwt = require('jsonwebtoken');
const {JWT} = require('../config');
const {User: Model} = require('../v1/models');

const Authenticate = async (req, res, next) => {
    try {
        const customError = new Error();
        customError.code = 401;
        const {authorization} = req.headers;
        if (!authorization) {
            customError.message = 'Unauthorized';
            throw customError
        }
        const split = authorization.split(' ');
        if (split.length <= 1) {
            customError.message = 'Bad format for authorization';
            throw customError
        }
        const verifyToken = jwt.verify(split[1], JWT.secret);

        const rootUser = await Model.findOne({_id: verifyToken._id}).lean();

        if (!rootUser) {
            customError.message = 'User not Found';
            throw customError
        }
        rootUser.authToken = split[1];
        rootUser.isAdmin = rootUser.role === 'ADMIN';
        delete rootUser.password;
        delete rootUser.__v;
        req.user = rootUser;
        next();

    } catch (err) {
        return res.error(err);
    }

}

module.exports = Authenticate;
