var config = require('../config/config');
var jwt = require('jsonwebtoken');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended : false});
var mysql = require('mysql');
const fileUpload = require('express-fileupload');


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
	app.use(fileUpload());
	
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
				res.status(400);
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
						res.json({token:''});
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
				res.status(400);
				}
			else
				{
					console.log("Data entered Successfully");
					//res.render('successSignUp');
				
				}
		});
		
	
	});
	
	//UPLOAD FILES
	app.post('/api/upload', function(req,res) {
		
		console.log('SERVER UPLOAD');
		console.log(req.files);
		var username = req.body.username;
		console.log(username);
		
		let file=req.files.file;
		let fileName=req.files.file.name;
		var InsData="INSERT into user_data ( username, file_name, file_path) values ('" + username + "','" + fileName + "','./data/')";
		var FileList="SELECT file_name FROM user_data WHERE username='"+ username +"'";
		
		if (!req.files){
		    return res.status(400).send('No files were uploaded.');
		}
		
		//Move File in Directory		
		file.mv('./data/'+fileName, function(err) {
			if (err){
			      return res.status(500).send(err);
			}
			else{			 
				//Insert file info in database
				connection.query(InsData, function(err , results){
					
					if (err) 
						{
						res.status(400);
						}
					else
						{
							//Return with list of all files in directory
							console.log("Data entered Successfully");
							//res.render('successSignUp');
							
							connection.query(FileList, function(err , results){
								
								if (err) 
								{
									res.status(400);
								}	
								else
								{
									res.status(200).json({list:results});
								}
								
							});
							
						
						}
				});
				
			    //res.send('File uploaded!');
			}    
			
		})
		
		
	});
	
	
	//Set File list on refresh
	app.post('/api/setFiles', function(req,res) {
		
		console.log('SET FILES' + req.body.username);
		
		var username = req.body.username;
		var SetList="SELECT file_name,file_id FROM user_data WHERE username='"+ username +"'";
				
		connection.query(SetList, function(err , results){
			
			if (err) 
			{
				res.status(400);
			}	
			else
			{
				res.status(200).json({list:results});
			}
			
		});
		
	});

	//Starred Files
	app.post('/api/star', function(req,res) {
		
		
		var username = req.body.username;
		var file_id = req.body.file_id;
		console.log('SERVER STAR : ' + username + file_id );
		var StarQuery="UPDATE user_data SET isStarred='true' WHERE username='"+ username +"' AND file_id='"+ file_id +"'";
		var StarList="SELECT file_name,file_id FROM user_data WHERE username='"+ username +"' AND isStarred='true'";
		console.log(StarQuery);
		
		//STAR Files
		connection.query(StarQuery, function(err , results){
			
			if (err) 
				{
					res.status(400);
				}
			else
				{
					//Return with list of all starred files in directory
					console.log("Marked Star");
					
					connection.query(StarList, function(err , results){
						
						if (err) 
						{
							res.status(400);
						}	
						else
						{
							console.log('Server Return Star' + results);	
							res.status(200).json({star_list:results});
						}
						
					});
					
				
				}
		});
		
		
		
	});

	
};