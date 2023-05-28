// Require file server
"use strict";
var fs = require("fs");
var http = require("http");
var path = require("path");
var url = require("url");

var express = require("express");
// var request = require("request");


const ejs = require("ejs");
var app = express();

const router = express.Router();

app.set("view engine", "ejs");
app.engine("ejs", require("ejs").__express);


var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const session = require("express-session");
app.use(session({secret:"secret", saveUninitialized:true, resave:true}));
var sess; 

// Set up your routing
router.get("/", function (req, res) {
    console.log("Route Succesfull")
    sess = req.session; 
  res.render("index", { pagename: "Home", sess:sess }); //Views/index.ejs
}); 

router.get("/profile", function(req, res){ 
  console.log("Route Successful");
    sess = req.session; 
    if(typeof(sess)=="undefinded" || sess.loggedin != true){ 
        var errors = ["Not a authenticated user"]
        res.render("index", {pagename: "Home", errors:errors })
    } else { 
        res.render("profile", {pagename: "Profile", sess:sess})
    }
})

router.get("/logout", function(req,res){
    sess = req.session; 
    sess.destroy(function(err){
        res.redirect("/"); 
    })

})

router.get("/about", function (req, res) {
    // console.log(errors);
    var errors = []
    sess = req.session; 
  res.render("about", { pagename: "About", sess:sess , errors:errors }); //views/about.ejs
});

router.post("/login", function (req, res) {
  var errors = [];


//   Verify that the email and password are not empty 
  if(req.body.email ==""){
    errors.push("Email is required")
  }
  if(req.body.passwor==""){
    errors.push("Password is required")
  }

//   Check to see if the email or password are in correct. 
  if (req.body.email !== "mike@aol.com" || req.body.password !== "abc123") {
    errors.push("Invalid email or password");
  }


  // if the errrors length is greater than 0, shwo errors. otherwise show the session. 
if (errors.length > 0 ) { 
    res.render('index', {pagename: "Home", errors:errors})
} else { 
    req.session.loggedin = true; 
    res.render('profile', {pagename:"Profile", sess: sess})
}




})

// router.post("/reg", function(req, res){ 
//     res.redirect("/")
//     var errors = []; 

//     // VAlidate to ensure that each field is not empty 
//   if (req.body.first === "") {
//     errors.push("First Name is required");
//   }

//   if (req.body.last === "") {
//     errors.push("Last Name is required");
//   }

//   if (req.body.address === "") {
//     errors.push("Address is required");
//   }

//   if (req.body.city === "") {
//     errors.push("City is required");
//   }

//   if (req.body.state === "") {
//     errors.push("State is required");
//   }

// //   Validate that zip is a number 
//   if (req.body.zip === "") {
//     errors.push("Zip is required");
//   } else if (isNaN(req.body.age)){
//     errors.push("Zip Code must be a number!")
//   }

//   if (req.body.age === undefined) {
//     errors.push("Age is required");
//   }

//   if (req.body.gender === undefined) {
//     errors.push("Gender is required");
//   }

//   if (!req.body.consent) {
//     errors.push("Consent is required");
//   }

//   if (req.body.bio === "") {
//     errors.push("Bio is required");
//   }

//   res.render("index", { pagename: "Home", errors: errors }); //Views/index.ejs

// })

router.post("/reg", function(req, res){
  var errors = [];
  

  // Validate to ensure that each field is not empty
  if (req.body.first === "") {
    errors.push("First Name is required");
  }

  if (req.body.last === "") {
    errors.push("Last Name is required");
  }

  if (req.body.address === "") {
    errors.push("Address is required");
  }

  if (req.body.city === "") {
    errors.push("City is required");
  }

  if (req.body.state === "") {
    errors.push("State is required");
  }

  // Validate that zip is a number
  if (req.body.zip === "") {
    errors.push("Zip is required");
  } else if (isNaN(req.body.zip)){
    errors.push("Zip Code must be a number!");
  }

  if (req.body.age === undefined) {
    errors.push("Age is required");
  }

  if (req.body.gender === undefined) {
    errors.push("Gender is required");
  }

  if (!req.body.consent) {
    errors.push("Consent is required");
  }

  if (req.body.bio === "") {
    errors.push("Bio is required");
  }

  res.render("about", { pagename: "Reg", errors: errors });
  // Views/index.ejs
});



app.use(express.static("public"));
app.use("/", router);
var server = app.listen("8080");
