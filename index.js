const express = require("express");
const app = express();


app.use(express.urlencoded({ extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));


const auth = require("./middlewares/passageiroAuth");
require('dotenv/config');
const session = require("express-session");



//session
app.use(session({
    secret:'ifpe',
    saveUninitialized: false,
    resave: false
}));

//conexão banco
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI);

const passageiroRoutes = require("./routes/passageiroRoutes");
const vooRoutes = require("./routes/vooRoutes")

app.use(passageiroRoutes);
app.use(vooRoutes);

 app.get("/", auth, function(req, res){
    res.render("index");
});

app.listen(process.env.PORT, function(){
    console.log("Servidor iniciado");
});




