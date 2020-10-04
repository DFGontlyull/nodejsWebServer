const router = require('express').Router()
//const authMiddleware = require('../../middlewares/auth')
const neo4j = require('./neo4j')
//const auth = require('./auth')
//const user = require('./user')

router.use('/neo4j', neo4j)
//router.use('/user', authMiddleware)
//router.use('/user', user)

module.exports = router

