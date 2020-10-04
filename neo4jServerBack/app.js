/* =======================
    LOAD THE DEPENDENCIES
==========================*/
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')

/* =======================
    LOAD THE CONFIG
==========================*/
const config = require('./config')
const port = process.env.PORT || config.neo4jAppPort

/* =======================
    EXPRESS CONFIGURATION
==========================*/
const app = express()

// parse JSON and url-encoded query
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// print the request log on console
app.use(morgan('dev'))
app.use(require('./neo4j'))
// set the secret key variable for jwt
//app.set('jwt-secret', config.secret)
//app.set('bolt-ip', config.neo4jUri)
//app.set('neo4jID', config.neo4jID)
//app.set('neo4jPW', config.neo4jPW)

// index page, just for testing
app.get('/', (req, res) => {
    res.send('Neo4j App!')
})

// configure api router
app.use('/api', require('./routes/api'))

// open the server
app.listen(port, () => {
    console.log(`Express is running on port ${port}`)
})


/* =======================
    CONNECT TO NEO4JDB SERVER
==========================*/

