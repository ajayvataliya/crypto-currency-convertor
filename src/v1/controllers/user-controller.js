const {User: Model} = require("../models")
const entityName = 'User'

exports.add = async (req, res) => {
    req.body.image = req.file.path;
    try {
        let single = new Model(req.body);
        single = await single.save();
        return res.data({[entityName.toLowerCase()]: single});
    } catch (e) {
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
            return res.data({[entityName.toLowerCase()]: single});
        } else {
            const dataList = await Model.find();
            if (!dataList) {
                return res.message(`${entityName} not found`, 409);
            }
            return res.data({[`${entityName.toLowerCase()}List`]: dataList})
        }
    } catch (e) {
        return res.error(e)
    }
}

exports.update = async (req, res) => {
    try {
        const _id = req.params.id;
        const single = await Model.findByIdAndUpdate(_id, req.body, {
            new: true
        });
        if (!single) {
            return res.message('Can not update', 409);
        }
        return res.data({[entityName.toLowerCase()]: single});
    } catch (e) {
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

        return res.message(`${entityName} deleted`);

    } catch (e) {
        return res.error(e)
    }
}
