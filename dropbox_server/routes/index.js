var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended : false});
var mysql = require('mysql');

var connection = mysql.createConnection({
	//details
	host : 'localhost',
	user : 'root',
	password : 'root',
	database : 'data'
	
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
	app.post('/api/login',urlencodedParser,function(req,res){

		console.log('Addition Request Received !!' + req.body);
		var username = req.body.username;
		var password = req.body.password;
		var dbpass;
		
		var queSel="SELECT * from user_data WHERE username='"+username+"'";
		
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
						//res.render('successLogin',{data : results[0]});
					}
				else
					{
						console.log("Wrong Password");
						//res.render('failedLogin');
					}
			}
			else
			{
				console.log('Wrong Credentials !!');
			}
		});


	});

	
};