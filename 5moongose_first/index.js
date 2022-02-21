const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/movieApp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }) // returns a promise 
  .then(() => {
    console.log("CONNECTION OPEN!!!");    
  })
  .catch((err) => {
    console.log("OH NO ERROR!!!!");
    console.log(err);
  });

const movieSchema = new mongoose.Schema({
  title: String,
  year: Number,
  score: Number,
  rating: String,
});

const Movie = mongoose.model("Movie", movieSchema);
//const amadeus = new Movie({
//  title: "Amadeus",
//  year: 1986,
//  score: 9.2,
//  rating: "R",
//});

// node >> .load index.js >> amadeus.save()

//Movie.insertMany([
//  { title: "Amelie", year: 2001, score: 8.3, rating: "R" },
//  { title: "Alien", year: 1979, score: 8.1, rating: "R" },
//  { title: "The Iron Giant", year: 1999, score: 7.5, rating: "PG" },
//  { title: "Stand By Me", year: 1986, score: 8.6, rating: "R" },
//  { title: "Moonrise Kingdom", year: 2012, score: 7.3, rating: "PG-13" },
//])
//  .then((data) => {
//  console.log("IT WORKED!");
//  console.log(data);
//});

// insert many returns a promise  and we dont need to .save in this case



//Movie.find({ title: ''}, function (err, docs) {}
// using function callbacking if resolved or not 

Movie.find({title:"Amelie"}).then((movie)=>{console.log("promise resolved") 
console.log(movie)}) // .find returns query object which is not a promise but is thenable  but when chained  to .then it returns our data 


Movie.findOneAndUpdate({title:'Alien'},{title:'new name'},{new:true}).then((data)=>console.log(data)) // gives the data with updation 

Movie.deleteMany({year:{$gte:1999}}).then((messg)=>console.log(messg))
