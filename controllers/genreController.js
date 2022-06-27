const {Genre} = require('../models/models')

class genreController {
    async create(req, res){
        const {name} = req.body 
        const genre = await Genre.create({name})
        return res.json(genre)
    }

    async getAll(req, res){
        const genre = await Genre.findAll()
        return res.json(genre)
    }
    async delete(req, res){

    }
}

module.exports = new genreController()