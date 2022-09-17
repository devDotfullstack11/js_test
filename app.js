const express = require("express");
const app = express();
var bodyParser = require('body-parser');
const path = require('path');
const cluster =  require("cluster"); // Node's Core Cluster Module
let port =3200;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const products = require("./modules/products.js");
const users = require("./modules/users.js");
const passport = require('passport');
require('./modules/auth');
app.use("/products",passport.authenticate('jwt', { session: false }), products);
app.use("/users",users);
app.set('view engine', 'ejs');
app.get("/:name",function(req,res){
    res.json({name: req.params.name});
});
const db = require("./models");
db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });
app.listen(3200,() =>{
    console.log(`request to ${port}  at ${process.pid}`);
})
