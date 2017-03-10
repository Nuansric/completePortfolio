var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var nodemailer = require("nodemailer");

// var bunyan = require("bunyan");




// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Static directory
app.use(express.static("public"));



// =============================================================


app.get("/", function(req, res) {

    // console.log((path.join(__dirname + "/../public/index.html")));
    res.sendFile(path.join(__dirname + "/public/index.html"));

});

app.get("/portfolio", function(req, res) {

    res.sendFile(path.join(__dirname + "/public/portfolio.html"));


});
app.get("/contact", function(req, res) {

    res.sendFile(path.join(__dirname + "/public/contact.html"));

});
app.get("/close", function(req, res) {

    res.send("/");

});
app.post("/email", function(req, res) {


    console.log("inside node mailer");

    // create reusable transporter object using the default SMTP transport
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'rating.neighborhood.network@gmail.com',
            pass: 'utCodingCamp'
        }
    });

    // setup email data with unicode symbols
    var mailOptions = {
        from: req.body.email, // sender address
        to: "chanita_n@icloud.com", // list of receivers
        subject: req.body.emailSubject, // Subject line
        text: req.body.emailBody + "\nPlease Reply to: " + req.body.email, // plain text body
        // html: '<b>Hello world ?</b>' // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            res.json({ error: error });
            return console.log(error);
        } else {
            console.log('Message %s sent: %s', info.messageId, info.response);

            res.json({ sent: true });


        }

    });












});







app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});