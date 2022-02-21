const express = require("express");
const app = express();

//app.use((req, res) => {
//  console.log("we got a request");
//  res.send('<h1> HELLO GUYS </h1>');
// });

app.get('/r/:subredit',(req,res)=>{
const variable  = req.params.subredit // req and res objs have many methods and properties (req.params.subreddit gives the value passed in /r/value )
console.dir(req.params)
res.send(`<h1> Browing the ${variable }  in  place of subreddit </h1>`)
 })
app.get("/cats", (req, res) => {
  res.send("Meow");
}); // req and res are objects made by express that we must use as arguments in our call back function
app.get("/dogs", (req, res) => {
  res.send("Woof");// we can only have one response for a route request 
});
app.get("/", (req, res) => {
  res.send("HOME PAGE");
});
app.get('/search' , (req,res)=>{      // http://localhost:3000/search?q=dogs&color=cats
  
    const q= req.query.q
    const color = req.query.color
    res.send("<h1> HELLO  </h1>")
    console.dir(req.query) 
}
)

const server = app.listen(3000, () => {
  console.log("listening call back "); // At first app.listen is runned
  const port = server.address().port; // when app.call is runned server variable is created
  const host = server.address().address; // Then callback function is runned
  console.log(`Running at host ${host} and port ${port}`);
});


