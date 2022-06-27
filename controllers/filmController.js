const uuid = require('uuid')
const path = require('path')
const {Film} = require('../models/models')
const ApiError = require('../error/ApiError')

class filmController{
    async create(req, res, next){        
        try {
            const {name, raiting, country, year, actor, description, genreId, typeId} = req.body

            const {img} = req.files
            let imgName = uuid.v4() + '.jpg'
            img.mv(path.resolve(__dirname, '..', 'staticImg', imgName))
    
            const {video} = req.files
            let videoName = uuid.v4() + '.mp4'
            video.mv(path.resolve(__dirname, '..', 'staticVideo', videoName))
    
            const film = await Film.create({name, raiting, country, year, actor, description, img: imgName, video: videoName, genreId, typeId})
    
            return res.json(film)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }
    async getAll(req, res){
        let {genreId, year, country, raiting} = req.query
        let films 
        if(!genreId && !country && !year && !raiting){
            films = await Film.findAndCountAll({})
        }
        if(genreId && !country && !year && !raiting){
            films = await Film.findAndCountAll({where:{genreId}})
        }
        if(!genreId && country && !year && !raiting){
            films = await Film.findAndCountAll({where:{country}})
        }
        if(!genreId && !country && year && !raiting){
            films = await Film.findAndCountAll({where:{year}})
        }
        if(!genreId && !country && !year && raiting){
            films = await Film.findAndCountAll({where:{raiting}})
        }
        if(country && genreId && !year && !raiting){
            films = await Film.findAndCountAll({where:{country, genreId}})
        }
        if(country && !genreId && year && !raiting){
            films = await Film.findAndCountAll({where:{country, year}})
        }
        if(!country && genreId && year){
            films = await Film.findAndCountAll({where:{genreId, year}})
        }
        if(country && !genreId && !year && raiting){
            films = await Film.findAndCountAll({where:{country, raiting}})
        }
        if(country && !genreId && year && raiting){
            films = await Film.findAndCountAll({where:{country, year, raiting}})
        }
        if(country && genreId && !year){
            films = await Film.findAndCountAll({where:{country, genreId}})
        }
        if(country && genreId && year){
            films = await Film.findAndCountAll({where:{year, genreId, country}})
        }
        if(country && genreId && year, raiting){
            films = await Film.findAndCountAll({where:{country, genreId, year, raiting}})
        }

        return res.json(films)
    }
    async getOne(req, res){
        const {id} = req.params
        const film = await Film.findOne(
            {
                where: {id}
            }
        )
        return res.json(film)
    }
 
    async delete(req, res){
        const {id} = req.params
        const filmOne = await Film.findByPk(id)
        const deleteFilm = filmOne.destroy()
        if(!deleteFilm){
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

module.exports = new filmController()