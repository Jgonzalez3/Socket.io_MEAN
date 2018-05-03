const express = require('express');
const session = require('express-session');
const path = require("path");
const app = express();
const bodyParser = require('body-parser');
const server = app.listen(1337);
const io = require("socket.io")(server);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({secret: "codingdojorocks"}));
app.use(express.static(__dirname + "/static"));
app.set('views', path.join(__dirname, './views'));
app.set("view engine", "ejs");
app.get("/", function(req, res){
    res.render("index");
})
var messages = [];
var count = 0;
io.on('connection', function(socket){
    socket.emit("greeting", {msg: "Welcome to the Coversation Board"}, messages, count, socket.id);
    count++;
    if(count == 10){
        count = 0;
    }
    socket.broadcast.emit("joined", {msg:"Has Joined the Room"}, socket.id);
    console.log(socket.id)
    socket.on("newmessage", function(message, user){
        console.log("message",message);
        console.log("user", user);
        messages.push(`${user}: ${message}`);
        console.log(messages);
        io.emit("clientmessage", message, user, socket.id);
    });
    socket.on("disconnect",function(){
        socket.broadcast.emit("userleft", {msg: "User has left"}, socket.id);
    });
})