'use strict';

var express = require('express');
var http = require('http');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');

var nodemailer = require('nodemailer');
var mg = require('nodemailer-mailgun-transport');

// This is your API key that you retrieve from www.mailgun.com/cp (free up to 10K monthly emails)
var auth = {
  auth: {
    api_key: 'key-eabf6a6b00d0805658ab06e9f10e30ec',
    domain: 'mg.testophotography.com'
  }
}

var nodemailerMailgun = nodemailer.createTransport(mg(auth));

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// app.post('/contact', function (req, res) {
//   console.log(req.body);
// });

app.post('/contact', function(req, res) {
    nodemailerMailgun.sendMail({
      from: 'website@testophotography.com',
      to: 'cryptomonger@hotmail.com', // An array if you have multiple recipients.
    //   cc:'second@domain.com',
    //   bcc:'secretagent@company.gov',
      subject: req.body.subject,
      'h:Reply-To': 'gtesto@testophotography.com',
      //You can use "html:" to send HTML email content. It's magic!
      html: "From: " +  req.body.name + "<br><br>Email: " + req.body.email + "<br><br>Phone: " + req.body.mobile + "<br><br>Message: <br><br>" + req.body.message
      // //You can use "text:" to send plain-text content. It's oldschool!
      // text: 
      
    }, function (err, info) {
      if (err) {
        console.log('Error: ' + err);
      }
      else {
        console.log('Response: ' + info);
      }
    });
});


// Command to run Server: nodemon ./server.js
http.createServer(app).listen(process.env.PORT, process.env.IP);

app.use(express.static("public"));
    
app.get('/', (req, res)=>{res.sendFile(process.cwd() + '/public/layout.html')});
module.exports = app;