const ApiError = require('../error/ApiError')
const {User} = require('../models/models')
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const path = require('path')
const jwt = require('jsonwebtoken')

const generateJwt = (id, email, name, role) => {
    return jwt.sign(
        {id, email, name, role}, 
        process.env.SECRET_KEY, 
        {expiresIn: '24h'}
    )
}

class UserController {
    async registration(req, res, next){
        const {email, name, password} = req.body
        const {img} = req.files
        const role = 'USER'

        let imgUser = uuid.v4() + '.jpg'
        img.mv(path.resolve(__dirname, '..', 'staticUsers', imgUser))

        if(!email || !password){
            return next(ApiError.badRequest("Некорректный email или password"))
        }
        const checkEmail = await User.findOne({where: {email}})
        const checkName = await User.findOne({where: {name}})
        if(checkEmail){
            return next(ApiError.badRequest("Пользователь с таким email уже существует"))
        }
        if(checkName){
            return next(ApiError.badRequest("Пользователь с таким именем уже существует"))
        }

        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({email, name, role, password: hashPassword, img: imgUser})

        const token = generateJwt(user.id, user.email, user.name, user.role)
        return res.json({token})
    }
    async login(req, res, next){
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if(!user){
            return next(ApiError.internal('Пользователь с таким email не найден'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if(!comparePassword){
            return next(ApiError.internal('Неверный пароль'))
        }
        const token = generateJwt(user.id, user.email, user.name, user.role)
        return res.json({token})
    }
    async check(req, res, next){
        const token = generateJwt(req.user.id, req.user.email, req.user.name, req.user.role)
        return res.json({token})
    }
    async getAllUsers(req, res, next){
        const user = await User.findAll()
        return res.json(user)
    }
    async getSelfUser(req, res, next){
        const token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        const user = await User.findOne({
            where: {email: decoded.email}
        })
        return res.json(user)
    }
    async updateName(req, res, next){
        const {newName} = req.body
        const getToken = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(getToken, process.env.SECRET_KEY)
        const user = await User.findOne({
            where: {email: decoded.email}
        })
        user.name = newName
        await user.save()
        return res.json(user)
    }
}

module.exports = new UserController()