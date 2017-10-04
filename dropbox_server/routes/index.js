var config = require('../config/config');
var jwt = require('jsonwebtoken');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended : false});
var mysql = require('mysql');


var connection = mysql.createConnection({
	//details
	host : 'localhost',
	user : 'root',
	password : 'root',
	database : 'dropbox'
	
});

connection.connect(function(error){
	if(!!error){
		console.log('Error');
	}
	else {
		console.log('Connection Successful!!');
	}
	
});

module.exports = function(app){
	app.use(bodyParser());
	
	//LOGIN
	app.post('/api/login',urlencodedParser,function(req,res){

		console.log('Addition Request Received !!' + req.body);
		var username = req.body.username;
		var password = req.body.password;
		var dbpass;
		
		var queSel="SELECT * from users WHERE username='"+username+"'";
		
		console.log('Received' + username + " "  + password);
		
		//res.json({output:num1+num2});
		
		connection.query(queSel, function(err , results){
			
			if (err)
			{
				throw err;
			}
			if(results.length)
			{
				//console.log(" Data : " + results[0].first_name);
				dbpass = results[0].password;
				
				//Matching Passwords
				if(password===dbpass)
					{
						console.log("Matched!!");
						console.log(results);
												
						//Token Creation
						const token = jwt.sign({
							
							username: username
						},config.jwtSecret);
						
						res.json({token});
						
					}
				else
					{
						console.log("Wrong Password");
						res.json({status:false});
					}
			}
			else
			{
				console.log('Wrong Credentials !!');
				res.json({status:false});
			}
		});


	});
	
	//SIGN UP
	app.post('/api/signup',urlencodedParser, function(req,res){
		
		console.log('Form Data Received !!');
		console.log(req.body);
		var username = req.body.username;
		var password = req.body.password;
		var first_name = req.body.first_name;
		var last_name = req.body.last_name;
		var dbpass;
		
		var queIns="INSERT into users ( first_name, last_name, username, password) values ('" + first_name + "','" + first_name + "','" + username + "','" + password + "')";
		
		//console.log(queIns);
				
		connection.query(queIns, function(err , results){
			
			if (err) 
				{
					throw err;
				}
			else
				{
					console.log("Data entered Successfully");
					//res.render('successSignUp');
				
				}
		});
		
	
	});


	
};