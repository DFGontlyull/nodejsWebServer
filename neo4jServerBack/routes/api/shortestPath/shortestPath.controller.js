var collectedNodes = []
var totalWeights = []
var jsonString = null 

exports.getPath = (req, res) => {
        const session = req.driver.session();
        var startroom = req.body.start;
        var endroom = req.body.end;
	console.log("start : " , startroom);

	console.log("temp : ", req.body);
        const resultPromise = session.run(
                'MATCH (a:node {room: $start}), (b:node{room: $end}) CALL kde.dijkstra(a, b) yield path as path, weight as weight RETURN path, weight',
                {start: startroom, end: endroom}
        );

        resultPromise.then(result => {
                session.close();
                const singleRecord = result.records[0];
                const node = singleRecord.get(0).segments[1].relationship;

                //console.log(singleRecord.get(1));
                //console.log(node);

                singleRecord.get(0).segments.forEach(function(record){
                   collectedNodes.push(record.start.properties);
                //    res.send(record);
               });
                totalWeights.push(singleRecord.get(1));
                //console.log(collectedNodes);
                jsonString = JSON.stringify({node : collectedNodes, totalWeight : totalWeights})
                console.log(jsonString);

		res.json(JSON.parse(jsonString));
		collectedNodes = [];
		totalWeights = [];
	//	return jsonString		

        });
}
