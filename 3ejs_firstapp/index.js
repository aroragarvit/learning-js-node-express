// EJS EMBEDDED JAVASCRIPT JUST LIKE PHP 
// WHEN DEVELOPING CLIENT SERVER  MODEL WE MAKE APIS DIFFERENTLY  AND FRONT END SIDE DIFFEERENTLY AND USING API AND EVENT LISTENERS OF JS WE CAN MAKE CONSTANT REQUESTS TO LOAD OUR DATA 
// THEN USING JAVASCRIPT OR REACT WE MAKE ELEMENTS  OF HTML FILL IN OUR DATA ETC AND MAKE  WEBSITE THIS WAY 
// BUT IN EJS WE MAKE JAVASCRIPT IN  HTML AND USING ROUTES MAKE SEARCHES AND  SEND HTML TEMPELATES IN RESPONSE TO THAT PARTICULAR SEARCH AND IN THOSE EJS(HTML TEMMPELATES)  WE HAVE EMBEDED JS AND THROUGH EXPRESS WE CAN SEND DATA AND THROUGH THAT EMBEDED JS  WE CAN SHOW THAT DATA 
const express = require("express");
const app = express();
const path = require('path')
const animals = ["dogs" , "cats" , "bats" , "lions" , "tigers" , "wolves" ]
const data = require("./data.json")
app.use(express.static (path.join(__dirname,'public')))       // all the files of public folder are shared we dont need to set any response directly we will get the files once we enter that url path 

app.set('view engine' , 'ejs')
app.set('views',path.join(__dirname,'/views'))

app.get('/' , (req,res)=>{res.render("home.ejs")})         // when we render it it looks for javascript in that tempelate and evaluate it and then spits out html 

app.get('/random',(req,res)=>{
    const num = Math.floor(Math.random()*10)+1
    res.render("random.ejs" , {rand:num})       // replace rand with num
})

app.get('/r/:subreddit',(req,res)=>{const variable = req.params.subreddit 
    const details =  data[variable]   // data is itself a json object                               //  cannot use it in this case when its a variable use bracket format data.variable
    if(details) // if found the data for the subreddit
    res.render("subreddit.ejs",{details})    // data is a object we can also pass like ...data so that we  can access directly without using dot 
    else
    res.render("error.ejs",{variable})
    }) 
app.get('/animals', (req,res)=>{res.render('animals.ejs',{animals})})
app.listen('3000', ()=>{console.log("server up and running")} )