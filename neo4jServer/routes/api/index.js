const router = require('express').Router()
//const authMiddleware = require('../../middlewares/auth')
const shortestPath = require('./shortestPath')
//const auth = require('./auth')
//const user = require('./user')

router.use('/shortestPath', shortestPath)
//router.use('/user', authMiddleware)
//router.use('/user', user)

module.exports = router

