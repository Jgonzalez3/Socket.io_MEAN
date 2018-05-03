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
var color;

io.on('connection', function(socket){
    io.emit("greeting", {msg: "Greetings, from server Node - Server"}, color);
    socket.on("color", function(data){
        console.log(data);
        color = data.color;
        io.emit("clientcolor", {color: `${data}`})
    })
})