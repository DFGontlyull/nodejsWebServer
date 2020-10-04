/* =======================
    LOAD THE DEPENDENCIES
==========================*/
const cluster = require('cluster')
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
///const axios = require('axios')
/* =======================
    LOAD THE CONFIG
==========================*/
const config = require('./config')
const port = process.env.PORT || config.nodeAppPort
const os = require('os');
const uuid = require('uuid');


/* =======================
    EXPRESS CONFIGURATION
==========================*/
//const app = express()

var instance_id = uuid.v4();
var cpuCount = os.cpus().length;
var workerCount = 1;


mongoose.connect(config.mongodbUri)
//// parse JSON and url-encoded query
//app.use(bodyParser.urlencoded({extended: false}))
//app.use(bodyParser.json())
//// print the request log on console
//app.use(morgan('dev'))
//
//// index page, just for testing
//app.get('/', (req, res) => {
//    res.send('Node App!')
//})
//
//// configure api router
//app.use('/api', require('./routes/api'))



// open the server
//app.listen(port, () => {
//    console.log(`Express is running on port ${port}`)
//})

//마스터일 경우
if (cluster.isMaster) {
    console.log('서버 ID : '+instance_id);
    console.log('서버 CPU 수 : ' + cpuCount);
    console.log('생성할 워커 수 : ' + workerCount);
    console.log(workerCount + '개의 워커가 생성됩니다\n');
   
    //워커 메시지 리스너
    var workerMsgListener = function(msg){
       
            var worker_id = msg.worker_id;
           
            //마스터 아이디 요청
            if (msg.cmd === 'MASTER_ID') {
                cluster.workers[worker_id].send({cmd:'MASTER_ID',master_id: instance_id});
            }
    }
   
    //CPU 수 만큼 워커 생성
    for (var i = 0; i < workerCount; i++) {
        console.log("워커 생성 [" + (i + 1) + "/" + workerCount + "]");
        var worker = cluster.fork();
       
        //워커의 요청메시지 리스너
        worker.on('message', workerMsgListener);
    }
   
    //워커가 online상태가 되었을때
    cluster.on('online', function(worker) {
        console.log('워커 온라인 - 워커 ID : [' + worker.process.pid + ']');
    });
   
    //워커가 죽었을 경우 다시 살림
    cluster.on('exit', function(worker) {
        console.log('워커 사망 - 사망한 워커 ID : [' + worker.process.pid + ']');
        console.log('다른 워커를 생성합니다.');
       
        var worker = cluster.fork();
        //워커의 요청메시지 리스너
        worker.on('message', workerMsgListener);
    });
 
//워커일 경우
} else if(cluster.isWorker) {
    //var express = require('express');
    var app = express();
    var worker_id = cluster.worker.id;
    var master_id;
      
    var server = app.listen(port, function () {
        console.log("Express 서버가 " + server.address().port + "번 포트에서 Listen중입니다.");
    });
   
    //마스터에게 master_id 요청
    process.send({worker_id: worker_id, cmd:'MASTER_ID'});
    process.on('message', function (msg){
        if (msg.cmd === 'MASTER_ID') {
            master_id = msg.master_id;
        }
    });
   
    app.use(bodyParser.urlencoded({extended: false}))
    app.use(bodyParser.json())
    app.set('jwt-secret', config.secret)
    // parse JSON and url-encoded query
    app.use('/api', require('./routes/api'))
    //app.use(bodyParser.urlencoded({extended: false}))
    //app.use(bodyParser.json())
    // print the request log on console
    app.use(morgan('dev'))
 
    // index page, just for testing
///    app.get('/', (req, res) => {
//        res.send('Node App!')
//    })

    // configure api router
    app.use('/api', require('./routes/api'))
    app.get('/', function (req, res) {
        res.send('<br>['+master_id+']서버의<br>워커 ['+ cluster.worker.id+']');
    });
    db.on('error', console.error)
    db.once('open', ()=>{
        console.log('connected to mongodb server')
    })
}

/* =======================
    CONNECT TO MONGODB SERVER
==========================*/
//mongoose.connect(config.mongodbUri)
//const db = mongoose.connection
//db.on('error', console.error)
//db.once('open', ()=>{
//    console.log('connected to mongodb server')
//})

