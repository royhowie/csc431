var fs = require("fs");
const path = require('path');
var str = require('string');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectId;


//Ask roy 
var url = '';

var insertDocument = function(db, info, type, fPath, callback){
	//Not too sure what gallery and picture refer too
	var galID ; db.collection(‘Gallery’).find(({name: index[0]}, {_id : 1}).limit(1)); 
		if ( galID == null){
			db.collection(‘Gallery’).insertOne({
			“name” : info[0];
			)}
			galID = db.collection(‘Gallery’).find(({name: index[0]}, {_id : 1}).limit(1));
}	db.collection('Picture').insertOne({

		“galID”  :galID._id, 
    "location" : info [0],
		"path"       :fPath,
		"type"       :type,
		"calibrated" :info[1],
		"date"       :info[2],
		"type/method":info[3],
		"camera"     :info[4],
		"filename"   :info[5]
	}, function(err, result){
		assert.equal(err, null);
		//console.log("Inserted Document");
		callback();
	});
}

var extensionRemover = function(type){
	//removes the . at the begining Ex. .txt = txt
	var temp = '';
	for(var i = 1; i < type.length; i ++){
  		temp+=type.charAt(i);
  	}
  	return temp;
}

var methodType = function(type){
	//removes location_ at the beginning of this file path
	if(type.indexOf("calibrated") > -1){
		type = "calibrated";
	}
	else if(type.indexOf("data") > -1){
		type = "data"
	}
	return type;
}

process.argv.forEach(function (val, index, array) {
	if(index>1){
  		//Gets Information we need for database
  		var type = path.extname(val);
  		//var time = fs.statSync(val).birthtime;
		//console.log(time);
		var info = val.split("/");
		type = extensionRemover(type );
		info[1] = methodType(info[1]);

		/*for(var i =0 ; i< info.length; i++){
			//console.log(i + " " + info[i]);
		}*/

		//Puts Information into database
		MongoClient.connect(url, function(err, db){
			assert.equal(null, err);
			insertDocument(db, info, type, val, function(){
				db.close();
			});
		});
	}

});
//console.log("Program Ended");
//console.log(process.argv)
