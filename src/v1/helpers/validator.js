// validator for check validation of API's params and body
const validator = async (req, res, next, schema ) => {
    const { error } = schema.validate(req.query);
    if (error) {
        return res.error(error.message); //return error if required fields is not there in req.
    } else {
        // return true or next function if all required fields is there in req.
        if (!next) {
            return true;
        } else {
            next();
        }
    }
}

module.exports = {
    validator
}
