const mongoose = require('mongoose')

const mSchema = new  mongoose.Schema({

    userID : {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    productData:[{
        productID: {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Product'
        },
        quantity:{
            type: Number,
            required:true
        },
        price:{
            type:Number,
            required: true
        }
    }],
    totalPrice:{
        type:Number,
        required: true
    },
    address:{
        colony:{
            type:String,
            required:true
        },
        landmark:{
            type:String,
            required:true
        },
        city:{
            type:String,
            required:true
        },
        state:{
            type:String,
            required:true
        },
        zipcode:{
            type:Number,
            required:true
        },

    }
})

module.exports = new mongoose.model('Order',mSchema);
