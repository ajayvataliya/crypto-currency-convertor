const {Order: Model} = require('../models')
const entityName = 'Order';

exports.list = async (req, res) => {
    try {
        const {id} = req.params;
        const {userId} = req.query;
        if (id) {
            const item = await Model.findById(id).populate('userID').populate('productData.productID');
            return res.data({[entityName]: item})
        }
        const cons = {};
        if (userId) {
            cons.userId = userId;
        }
        const order = await Model.find(cons).populate('userID').populate('productData.productID');
        return res.data({[entityName]: order})
    } catch (e) {
        console.log(e)
        return res.error(e);
    }
}

exports.add = async (req, res) => {
    try {
        let single = new Model(req.body);
        single = await single.save();
        return res.data({[entityName]: single});
    } catch (e) {
        console.log(e)
        return res.error(e);
    }

}

exports.update = async (req, res) => {
    try {
        const {id} = req.params;
        const {
            productData,
            totalPrice,
            address
        } = req.body;
        let single = Model.findById(id);
        if (!single) {
            return res.message(`${entityName} not found`, 409);
        }
        if (productData) {
            single.productData = productData;
        }
        if (totalPrice) {
            single.totalPrice = totalPrice;
        }
        if (address) {
            single.address = address;
        }
        await single.save();
        return res.data({[entityName]: single}, `${entityName} updated`);
    } catch (e) {
        console.log(e)
        return res.error(e);
    }

}

exports.orderIDs = async (req, res) => {
    try {
        const order = await Model.find();
        return res.data({[entityName]: order})
    } catch (e) {
        console.log(e)
        return res.error(e);
    }
}
