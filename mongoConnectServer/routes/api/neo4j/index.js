const router = require('express').Router()
const controller = require('./neo4j.controller')
const jsonDataObj = {'start':  '310', 'end': '339'}

//POST
const request = require('request')
const axios = require('axios')
var start = 0;
var end = 0;



//const getBreeds = async () => {
//	var arr = 310;
//	var arr2 = 339;
//	var jsons = { start: '310' , end: '339'};
//  try {
//	  console.log(JSON.stringify(arr));
////    return await axios.post('http://210.119.105.216:40000/api/shortestPath/getPath', { params: { "start":'310', "end":'339'} });
//    return await axios.post('http://210.119.105.216:40000/api/shortestPath/getPath', jsons);
//
//  } catch (error) {
//    console.error(error);
//  }
//};

//const countBreeds = async () => {
//  const breeds = await getBreeds();
//  
//  console.log(breeds);
//};
//
//countBreeds();

//const authMiddleware = require('../../../middlewares/auth')

//router.post('/register', controller.register)
router.post('/getPath', controller.getPath); 


//router.post('/login', controller.login)

//router.use('/check', authMiddleware)
//router.get('/check', controller.check)

module.exports = router

