const {Type} = require('../models/models')

class TypeController {
    async create(req, res){
        const {name} = req.body
        const type = await Type.create({name})
        return res.json(type)
    }

    async getAll(req, res){
        const type = await Type.findAll()
        return res.json(type)
    }

    async delete(req, res){

    }
}

module.exports = new TypeController()