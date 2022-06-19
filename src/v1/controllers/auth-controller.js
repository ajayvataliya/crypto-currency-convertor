const {User: Model} = require("../models")
const bcrypt = require('bcrypt');

exports.add = async (req, res) => {
    const {name, number, email, password, conpassword} = req.body;
    try {
        const customError = new Error();
        customError.code = 422;
        if (!name || !number || !email || !password || !conpassword) {
            customError.message = "plz filled all field.";
            throw customError;
        }
        const userExist = await Model.findOne({email: email});

        if (userExist) {
            customError.message = "Email already Exist";
            throw customError;
        }
        if (password != conpassword) {
            customError.message = "password are not macthing";
            throw customError;
        }
        const user = new Model(req.body);
        await user.save();

        return res.data({user});

    } catch (e) {
        return res.error(e);
    }

}

exports.login = async (req, res) => {
    const {email, password} = req.body;
    try {
        const customError = new Error();
        customError.code = 422;
        if (!email || !password) {
            customError.message = "All field required";
            throw customError;
        }

        let userLogin = await Model.findOne({email: email});
        if (userLogin) {
            const compare = (password, inputPassword) => {
                return password === inputPassword;
            }
            const isMacthing = await bcrypt.compare(password, userLogin.password);

            const token = await userLogin.generateAuthToken();

            userLogin = userLogin.toObject();
            userLogin.authToken = token;
            delete userLogin.password;

            if (!isMacthing) {
                customError.message = "Invalid credientials pass*";
                throw customError;
            } else {
                return res.data({user: userLogin}, 'User Login successfully');
            }
        } else {
            customError.message = "Invalid credientials pass*";
            throw customError;
        }

    } catch (err) {
        console.log(err);
        return res.error(err);
    }
}

exports.logout = async (req, res) => {
    try {
        return res.message("Remove success");
    } catch (err) {
        console.log(err);
        return res.error(err)
    }
}
