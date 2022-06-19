const mongoose = require("mongoose")

const mSchema = new mongoose.Schema({
    category:{
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    discription: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
})

module.exports = new mongoose.model('Product', mSchema);
