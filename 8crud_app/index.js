const express = require("express");
const app = express();
const path = require('path')
const mongoose = require('mongoose')
const Product= require("./models/product") 

mongoose.connect("mongodb://localhost:27017/GeneralStore", { useNewUrlParser: true,useUnifiedTopology: true}) // returns a promise 
  .then(() => {
    console.log("MONGO CONNECTION OPEN!!!");    
  })
  .catch((err) => {
    console.log("OH NO MONGO CONNECTION ERROR!!!!");
    console.log(err);
  });

app.set('view engine' , 'ejs')
app.set('views',path.join(__dirname,'/views'))




const server = app.listen(3000, () => {
    console.log("listening call back "); // At first app.listen is runned
    const port = server.address().port; // when app.call is runned server variable is created
    const host = server.address().address; // Then callback function is runned
    console.log(`Running at host ${host} and port ${port}`);
  });
  
  
  