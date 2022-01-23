var express= require('express');
var faker= require('faker');
var app=express();
var mysql= require('mysql');
var bodyParser=require('body-parser');
var async      = require('async');
var credentials = {};
const fs= require('fs');
app.use('/static',express.static('static'))

const connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "password",
	database: "pharmacy",
  });

app.set('view engine','ejs');

app.use(bodyParser.urlencoded({extended : true}));


const dataSql = fs.readFileSync('./sql_files/show_all.sql').toString();
const dataSql2 = fs.readFileSync('./sql_files/details_1.sql').toString();
const dataSql3 = fs.readFileSync('./sql_files/details_2.sql').toString();
const dataSql4 = fs.readFileSync('./sql_files/delete.sql').toString();
const dataSql5 = fs.readFileSync('./sql_files/show_all_2.sql').toString();
const dataSql6 = fs.readFileSync('./sql_files/show_all_3.sql').toString();
const dataSql7 = fs.readFileSync('./sql_files/delete_2.sql').toString();


app.get("/",function(req,res){
	var q = "select count(*) as count from patient_details";
	connection.query(q,function(err,results){
		console.log(err);
		res.render("home",);
	});
	
});

app.get('/create-new-account',function(req,res){
	res.render("create_user");
});

app.get('/delete-account', function(req, res)
{
	res.render("delete_user");
});

app.post('/delete', function(req,res)
{
	var person=
	{
		firstname: req.body.fname,
		lastname: req.body.lname
	};
	
	connection.query("SET FOREIGN_KEY_CHECKS=0",function(err,fields){
		if (err) throw err;
		//
		
			
			connection.query(dataSql7, [person.firstname, person.lastname] , function 				(error, results, fields) 
			{
				//dataSql4
				connection.query(dataSql4, [person.firstname, person.lastname] ,function (error, results, fields)
								 {
					if (error) throw error;
				connection.query("SET FOREIGN_KEY_CHECKS=1",function(err,fields){
					if (error) throw error;
				});
				res.redirect("/request");
  				console.log(results);
				});
  				
			});
	});
})

app.get('/request',function(req,res){
	res.render("request");
});

app.post('/register',function(req,res){
	var person = {
    			firstname: req.body.fname,
    			lastname: req.body.lname,
				age: req.body.age,
				city:req.body.city
			};

	connection.query("INSERT INTO patient_details SET ?",person, function (error, results, fields) {
  		if (error) throw error;
		res.redirect("/request");
  		console.log(results);
		});
	
	});

app.post('/updated',function(req,res){
	
	var details = {
					total: req.body.total,
					paid: req.body.paid,
					patient_id: req.body.id
				  };
	
	connection.query("INSERT INTO details SET ?",details,function (error, results, fields){
		if (error) throw error;
		res.redirect("/request");
  		console.log(results);
	});
});

app.post('/search_1',function(req,res){
	
	var search1= req.body.search1;
	console.log(search1);
	
		
	connection.query(dataSql3,search1,function(err,data1,fields){
		if (err) throw err;
		//
		console.log(data1);
			
			connection.query(dataSql2,search1,function(err,data,fields){
			if (err) throw err;
			//res.render('details',{userData: data});
			console.log(data);
			 res.render('details',{data1:data1[0],data:data});
			
		});
	});
	
});





app.post('/DD',function(req,res){
	var s= req.body.data;
	var a;
	if(s==1)
		{
			a= dataSql;
		}
	else if(s==2)
		{
			a= dataSql5;
		}
	else if(s==3)
		{
			a= dataSql6;
		}
	connection.query(a,function(err,data,fields){
		if (err) throw err;
		console.log(data)
		res.render('show_all',{userData: data});
	});
});


app.get('/update',function(req,res){
	res.render("update");
});

app.get('/accounts',function(req,res){
	connection.query(dataSql,function(err,data,fields){
		if (err) throw err;
		console.log(data)
		res.render('show_all',{userData: data});
	});
});

app.get('/details',function(req,res){
	
	
	connection.query(dataSql2,function(err,data,fields){
		if (err) throw err;
		console.log(data)
		res.render('details',{userData: data});
	});
});












app.listen(3000 , function(){
	console.log("Server running");
});







