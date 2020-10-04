// Require Neo4j
const neo4j = require('neo4j-driver').v1;

// Create Driver
const driver = new neo4j.driver("bolt://210.119.105.216:7687", neo4j.auth.basic("neo4j", "kdelab01"));
//const driver = new neo4j.driver(config.neo4jUri, neo4j.auth.basic(config.neo4jID, config.neo4jPW));
// Express middleware
module.exports = function(req, res, next) {
    req.driver = driver;

    next();
};
