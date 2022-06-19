const {Product: Model} = require("../models")
const socket = require('../../socket');
const entityName = 'Product'

exports.add = async (req, res) => {
    req.body.image = req.file.path;

    try {
        let single = new Model(req.body);

        single = await single.save();

        socket.broadcast('product-insert', single);
        return res.data({[entityName]: single});
    } catch (e) {
        console.log(e)
        return res.error(e);
    }
}

exports.list = async (req, res) => {
    try {
        const {params: {id}} = req;
        if (id) {
            const single = await Model.findById(id);
            if (!single) {
                return res.message(`${entityName} not found`, 409);
            }
            return res.data({[entityName]: single});
        } else {
            const dataList = await Model.find();
            if (!dataList) {
                return res.message(`${entityName} not found`, 409);
            }
            return res.data({[`${entityName}List`]: dataList})
        }
    } catch (e) {
        console.log(e)
        return res.error(e)
    }
}

exports.update = async (req, res) => {
    if (req.file?.path) {
        req.body.image = req.file.path;
    }

    try {
        const _id = req.params.id;
        const single = await Model.findByIdAndUpdate(_id, req.body, {
            new: true
        });
        if (!single) {
            return res.message('Can not update', 409);
        }

        socket.broadcast('product-update', single);
        return res.data({[entityName]: single});
    } catch (e) {
        console.log(e)
        return res.error(e)
    }

}

exports.destroy = async (req, res) => {
    try {
        const _id = req.params.id;
        const single = await Model.findByIdAndDelete(_id);

        if (!single) {
            return res.message(`${entityName} not found`, 409);
        }

        socket.broadcast('product-delete', single);
        return res.message(`${entityName} deleted`);

    } catch (e) {
        console.log(e)
        return res.error(e)
    }
}
