const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const {JWT} = require('../../config');
const bcrypt = require('bcrypt')

const mSchema = mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    number: {
        type: Number,
        required: true,
    },
    role: {
        type: String,
        required: false,
        default: 'USER'
    },
    email: {
        type: String,
        required: true,

    },
    addresses: [

        {
        colony: {
            type: String,
            required: true
        },
            landmark: {
                type: String,
                required: true
            },
            city: {
                type: String,
                required: true,
            },
            state: {
                type: String,
                required: true,
            },
            zipcode: {
                type: Number,
                required: true,
            }

        }],

    password: {
        type: String,
        required: true,
    }

})

mSchema.pre('save', async () => {
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,12);
    }
})


mSchema.methods.generateAuthToken = async function () {
    try {
        return jwt.sign({_id: this._id}, JWT.secret, {expiresIn: '24h'});
    } catch (err) {
        console.log(err);
    }
};

module.exports = new mongoose.model('User', mSchema);
