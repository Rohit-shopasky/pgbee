var express=require("express");
var app=express();

var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
var connection=require("./db.js");
var mongo=require("mongodb");

app.post("/",function(req,res){
//res.writeHead(200, {'Content-Type': 'text/plain'});
res.send("hii");
console.log("connected !!!!!!!!!!!!!!!!!");
connection(function(error,db){
	
	if(!error)
	{
		console.log("db connected");
	}
	else{
		console.log(error);
	}
	
});

});

app.post("/json",function(req,res){

var identity=req.body.identity;
var fullName=req.body.fullName;
var email=req.body.email;
var number=req.body.number;
var password=req.body.password;
var token=req.body.token;

//console.log(identity + " " + fullName + " " + email + " " + number + " " + password + " " +token );
connection(function(error,db){
	
	if(identity==="Seller")
	{   var time= Date();
		var data={identity:identity,fullName:fullName,email:email,number:number,password:password,token:token,time:time};
		db.collection("seller").insert(data,function(err,re){
			if(!err)
			{
				console.log(" inserted seller");
				res.json({"status":"Seller inserted"});
			}
			else
			{
				console.log(err);
				res.json({"status":"Seller not inserted"});
			}
		});
	}
	else
	{
		 var time= Date();
		var data={identity:identity,fullName:fullName,email:email,number:number,password:password,token:token,time:time};
		db.collection("seeker").insert(data,function(err,re){
			if(!err)
			{
				console.log("inserted seeker");
				res.json({"status":"Seeker inserted"});
			}
			else
			{
				console.log(err);
				res.json({"status":"Seller not inserted"});
			}
		});
	}
	
});





});
console.log("working");
app.listen(3000);