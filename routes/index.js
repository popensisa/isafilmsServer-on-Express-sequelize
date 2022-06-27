const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const commentRouter = require('./commentRouter')
const filmRouter = require('./filmRouter')
const typeRouter = require('./typeRouter')
const genreRouter = require('./genreRouter')


router.use('/user', userRouter)
router.use('/type', typeRouter)
router.use('/genre', genreRouter)
router.use('/film', filmRouter)
router.use('/comment', commentRouter)

module.exports = router