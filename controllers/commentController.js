const jwt = require('jsonwebtoken')
const {Comment} = require('../models/models')

class commentController {
    async create(req, res){

        try {
            const {text} = req.body
            const {img} = req.body
            const {id} = req.params
            const filmId = JSON.parse(id)
            const token = req.headers.authorization.split(' ')[1]
            if(!token){
                return res.status(401).json({message: "Для написания комментария вы должны быть авторизованных"})
            }
            const decoded = jwt.verify(token, process.env.SECRET_KEY)
            const com = await Comment.create({name: decoded.name, text, img, filmId, userId: decoded.id})
            return res.json(com)
        } catch (e) {
            return res.json(e)
        }
    }
    async getAllForOne(req, res){
        try {
            const {id} = req.params

            const com = await Comment.findAll(
                {
                    where: {filmId: id}
                }
            )
            return res.json(com)
        } catch (e) {
            res.json(e)
        }
    }
    async getAll(req, res){
        const myCom = await Comment.findAll({})
        return res.json(myCom)
    }
    async delete(req, res){
        const {id} = req.params
        const comOne = await Comment.findByPk(id)
        const deletedCom = comOne.destroy()
        if(!deletedCom){
            res.status(503).send({
                status: 'error',
                message: 'NE POLUCHILSA'
            })
        }
        res.status(200).send({
            status: 'success',
            message: 'deleted'
        })
    }
}
module.exports = new commentController()