const express = require('express');
const session = require('express-session');
const path = require("path");
const app = express();
const bodyParser = require('body-parser');
const server = app.listen(1337);
const io = require("socket.io")(server);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({secret: "codingdojorocks"}));

app.set('views', path.join(__dirname, './views'));
app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("index");
})
app.post('/survey', function(req, res){
    var survey = req.session.surveydata
})
io.on('connection', function(socket){
    socket.emit("greeting", {msg: "Greetings, from server Node - Server"});
    socket.on("posting_form", function(name, dojo, favoritelanguage, comment){
        console.log(name);
        console.log(dojo);
        console.log(favoritelanguage);
        console.log(comment);
        var survey = {}
        socket.emit("clientdata", {msg: `name: ${name}, location: ${dojo}, language: ${favoritelanguage}, comment: ${comment}`})
        let rand = Math.floor(Math.random()*(1000 - 1)+1)
        console.log(rand);
        socket.emit("random_number", {random: rand})
    })

})
