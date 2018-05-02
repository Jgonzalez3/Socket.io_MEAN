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

io.on('connection', function(socket){
    socket.emit("greeting", {msg: "Greetings, from server Node - Server"});
    socket.on("epic", function(data){
        socket.emit("epicdata", {epic: `${data}`})
        
    })
    socket.on("reset", function(data){
        socket.emit("clientreset", {reset: `${data}`})
        
    })
})
