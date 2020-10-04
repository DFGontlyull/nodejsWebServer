var axios = require('axios')
var resultJson = {}

exports.getPath = (req, res) => {
	const getBreeds = async () => {
	        var arr = req.body.start;
	        var arr2 = req.body.end;
        	var jsons = { start: arr , end: arr2};
	  	try {
			return await axios.post('http://210.119.105.216:40000/api/shortestPath/getPath', jsons);
	}catch (error) {
		console.error(error);
  	}};

	const countBreeds = async () => {
	 	resultJson = await getBreeds();
//		console.log("json = " , resultJson.data);
		console.log("type = ", typeof resultJson.data);
		
//	        console.log(JSON.stringify({result : resultJson.data}));
	        res.json(resultJson.data);
	};

	countBreeds();

//	console.log("result = " , resultJson);
//	console.log(JSON.stringify({result : resultJson.data}));
//	res.json(JSON.stringify({result : resultJson.data}));

	//if (!error && response.statusCode == 200) {
          //  console.log(body)
        //}
    
//	req.post({
//		headers: {'content-type': 'application/json'}
//		url: 'http://210.119.105.216:40000/api/shortestPath/getPath',
//		body: jsonContent,
//		json: true
//	}, function(error, response, body){
//		res.json(body);
//	});
//	
//	const session = req.driver.session();
//        var startroom = req.body.start;
//        var endroom = req.body.end;
//
//        const resultPromise = session.run(
//                'MATCH (a:node {room: $first}), (b:node{room: $second}) CALL kde.dijkstra(a, b) yield path as path, weight as weight RETURN path, weight',
//                {first: startroom, second: endroom}
//       );
//
//        resultPromise.then(result => {
//                session.close();
//                const singleRecord = result.records[0];
//                const node = singleRecord.get(0).segments[1].relationship;
//
//                //console.log(singleRecord.get(1));
//                //console.log(node);
//
//                singleRecord.get(0).segments.forEach(function(record){
//                   collectedNodes.push(record.start.properties);
//                //    res.send(record);
//               });
//                totalWeights.push(singleRecord.get(1));
//                //console.log(collectedNodes);
//                jsonString = JSON.stringify({node : collectedNodes, totalWeight : totalWeights})
//                console.log(jsonString);
//
//		res.json(jsonString)
//	//	return jsonString		
//
//        });
}
