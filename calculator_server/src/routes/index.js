var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended : false});

module.exports = function(app){
	app.use(bodyParser());
	app.get('/api/add',urlencodedParser,function(req,res){

		console.log('Addition Request Received !!');
		var num1 = parseInt(req.query.num1);
		var num2 = parseInt(req.query.num2);

		res.json({output:num1+num2});
	});

	app.get('/api/subtract',urlencodedParser,function(req,res){

		console.log('Subtraction Request Received !!');
		var num1 = parseInt(req.query.num1);
		var num2 = parseInt(req.query.num2);
		
		res.json({output:num1-num2});
	});

	app.get('/api/divide',urlencodedParser,function(req,res){

		console.log('Divide Request Received !!');
		var num1 = parseInt(req.query.num1);
		var num2 = parseInt(req.query.num2);
		
		res.json({output:num1/num2});
	});

	app.get('/api/multiply',urlencodedParser,function(req,res){

		console.log('Multiply Request Received !!');
		var num1 = parseInt(req.query.num1);
		var num2 = parseInt(req.query.num2);
		
		res.json({output:num1*num2});
	});

};