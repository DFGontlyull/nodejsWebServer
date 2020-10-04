var Company = require('../models/company')
var writeResponse = require('../helpers/response').writeResponse
var dbUtils = require('../neo4j/dbUtils')
var uuidv1 = require('uuid/v1')
 
let logging = function (log, message, info) {
  if (process.env.NODE_ENV !== 'test') {
    log.info(info, message)
  }
}
 
/**
* @swagger
* /api/v0/companies:
*   post:
*     tags:
*     - company
*     description: ''
*     summary: Add a new company
*     produces:
*       - application/json
*     parameters:
*       - in: body
*         name: body
*         description: Company object that needs to be added to the system. ID will be replaced by system.
*         required: true
*         schema:
*           $ref: '#/definitions/Company'
*     security:
*       - Bearer: []
*       - api_key: []
*     responses:
*       200:
*         description: Company created
*       401:
*         description: Unauthorized. Need JWT.
*       409:
*         description: Invalid payload
*/
exports.create = function (req, res, next) {
  let currentDate = dbUtils.getCurrentDate()
  req.body.id = uuidv1()
  req.body.createdDate = currentDate
  req.body.updatedDate = currentDate
  logging(req.log, 'Create company',
    { user: req.user, id: req.body.id, companyName: req.body.companyName })
 
  Company.create(dbUtils.getSession(req), req.body)
    .then(response => writeResponse(res, response))
    .catch(next)
}
