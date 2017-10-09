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
		var FileList="SELECT * FROM user_data WHERE username='"+ username +"'";
		var FileExist = "SELECT * FROM user_data WHERE username='"+ username +"' AND file_name='" + fileName + "'";
		var InsActivity = "INSERT into user_activity (username, file_name, activity) VALUES ('" + username + "','" + fileName + "','Added File : " + fileName + "')";
		
		console.log('FILE EXIST QUERY' + FileExist);
		console.log('FILE INSERT : ' + InsData);
		console.log('Activity : ' + InsActivity);
		
		if (!req.files){
		    return res.status(400).send('No files were uploaded.');
		}
		
		//Move File in Directory		
		file.mv('./data/'+fileName, function(err) {
			if (err){
			      return res.status(500).send(err);
			}
			else{			
				
					connection.query(FileExist, function(err , results){
						
						if (err) 
						{
							console.log("Error");
							res.status(400);
						}
						if(!results[0])
							{
							
								console.log('Allow Insert');
								//Insert file info in database
								connection.query(InsData, function(err , results){
									
									if (err) 
										{
										console.log("File Upload Failed");
										res.status(400);
										}
									else
										{
												//Making entry in Activity Table
												connection.query(InsActivity, function(err , results){
													if (err) 
													{
														console.log("File Activity Failed");
														
													}
													else
													{
														console.log("Activity Table Updated");
													}	
													
													
												});
										
										
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
								
							}
						else {
							console.log('File Exists');
							res.status(400);
						}
					})
						
						
			   
			}    
			
		})
		
		
	});
	
	
	
	//UPLOAD RECENT HOME FILES
	app.post('/api/uploadHome', function(req,res) {
		
		console.log('SERVER 5 UPLOAD');
		console.log(req.files);
		var username = req.body.username;
		console.log(username);
		
		let file=req.files.file;
		let fileName=req.files.file.name;
		var InsData="INSERT into user_data ( username, file_name, file_path) values ('" + username + "','" + fileName + "','./data/')";
		var FileList="SELECT * FROM user_data WHERE username='"+ username +"' ORDER BY file_id DESC LIMIT 5 ";
		var FileExist = "SELECT * FROM user_data WHERE username='"+ username +"' AND file_name='" + fileName + "'";
		
		console.log('FILE EXIST QUERY' + FileExist);
		console.log('FILE INSERT : ' + InsData);
		
		if (!req.files){
		    return res.status(400).send('No files were uploaded.');
		}
		
		//Move File in Directory		
		file.mv('./data/'+fileName, function(err) {
			if (err){
			      return res.status(500).send(err);
			}
			else{			
				
					connection.query(FileExist, function(err , results){
						
						if (err) 
						{
							console.log("Error");
							res.status(400);
						}
						if(!results[0])
							{
							
								console.log('Allow Insert');
								//Insert file info in database
								connection.query(InsData, function(err , results){
									
									if (err) 
										{
										console.log("File Upload Failed");
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
								
							}
						else {
							console.log('File Exists');
							res.status(400);
						}
					})
						
						
			   
			}    
			
		})
		
		
	});
	
	
	
	
	//Set Home File list on refresh (5 recent)
	app.post('/api/setHomeFiles', function(req,res) {
		
		console.log('SET HOME FILES' + req.body.username);
		
		var username = req.body.username;
		var SetList="SELECT * FROM user_data WHERE username='"+ username +"' ORDER BY file_id DESC LIMIT 5 ";
				
		connection.query(SetList, function(err , results){
			
			if (err) 
			{
				res.status(400);
			}	
			else
			{	
				console.log('Server Return Star' + results);
				res.status(200).json({list:results});
			}
			
		});
		
	});
	
	//Set All File list on refresh
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
	
	
	
	//Un_Starred Files
	app.post('/api/unstar', function(req,res) {
		
		
		var username = req.body.username;
		var file_id = req.body.file_id;
		console.log('SERVER STAR : ' + username + file_id );
		var StarQuery="UPDATE user_data SET isStarred='false' WHERE username='"+ username +"' AND file_id='"+ file_id +"'";
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
	
	
	
	
	//Set Star File list on refresh
	app.post('/api/getStar', function(req,res) {
		
		console.log('SET STAR FILES' + req.body.username);
		
		var username = req.body.username;
		var GetStarList="SELECT file_name,file_id FROM user_data WHERE username='"+ username +"' AND isStarred='true'";
				
		connection.query(GetStarList, function(err , results){
			
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
		
	});
	
	
	//Download Files
	app.post('/api/download', function(req,res) {
		
		console.log('DOWNLOAD FILES' + req.body.username + req.body.file_name);
				
		var username = req.body.username;
		var file_name = req.body.file_name;
		var DownFile="SELECT file_path FROM user_data WHERE username='"+ username +"' AND file_name='" + file_name +"'";
		console.log('Qeury : ' + DownFile);
				
		connection.query(DownFile, function(err , results){
			
			if (err) 
			{
				res.status(400);
			}	
			else
			{
				console.log('Download Result : ' + results);	
				
				res.download(__dirname + '.' + results[0].file_path + file_name , file_name);
				
				//res.status(200).json({star_list:results});
			}
			
		});
		
	});

	
};