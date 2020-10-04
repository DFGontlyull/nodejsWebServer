var Company = require('../models/neo4j/company')
 
var create = function (session, company) {
  let query = 'CREATE (c:Company{id: {id}, companyName: {companyName}, createdDate: {createdDate}, updatedDate: {updatedDate}}) RETURN c'
  var writexResultPromise = session.writeTransaction(function (transaction) {
    // used transaction will be committed automatically, no need for explicit commit/rollback
    var result = transaction.run(query, {
      id: company.id,
      companyName: company.companyName,
      createdDate: company.createdDate,
      updatedDate: company.updatedDate
    })
    return result
  })
 
  return writexResultPromise.then(_returnBySingleId).catch(_handlePayloadValidation)
}
