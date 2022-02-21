const express = require("express");
const app = express();
const path = require('path')
const {v4:uuid} = require('uuid')  // Package to get new universal unique identifier
const methodOverride = require('method-override')

app.set('view engine' , 'ejs')
app.set('views',path.join(__dirname,'/views'))

app.use(express.urlencoded({extended:true}))  // its to tell to parse data sent through form for post request 
app.use(express.json())   // now its able to parse both form encoded or json format data
app.use(methodOverride('_method'))
// html forms have only got 2 methods get and post so to use any other than them we need to use this 

let comments_var = [
    {
        id:"1",
        username: 'Todd',
        comment: 'lol that is so funny!'
    },
    {    id:uuid(),
        username: 'Skyler',
        comment: 'I like to go birdwatching with my dog'
    },
    {
        id:uuid(),
        username: 'Sk8erBoi',
        comment: 'Plz delete your account, Todd'
    },
    {
        id:uuid(),
        username: 'onlysayswoof',
        comment: 'woof woof woof'
    }
]            //  fake data

app.get("/comments",(req,res)=>{
    res.render('comments_folder/index',{comments_var})
    
})

app.get("/comments/new",(req,res)=>{     // we will render a ejs page containing a form to add new comment
    res.render('comments_folder/new')
})                                

app.post('/comments',(req,res)=>{console.log(req.body)  // form method = post must have same path as "/comments" as specified in express   
const username = req.body.username
const comment = req.body.comment
comments_var.push({username,comment,id:uuid()}) // pushing tha object to array containing tha objects hence changing the data base 
//res.send("It worked")     // after submission (/comments) page will open up that is being set as post route and if you keep on refreshing then it would send the same messge  of form again and again 
res.redirect("/comments")  // after form submitted we redirect to /comments get route 

})                                             
                                    
app.get("/comments/:id",(req,res)=>{                       // Finding some particular post from our data base 
const id = req.params.id
const required_comment= comments_var.find(c=>c.id===(id))  // !!
res.render('comments_folder/show.ejs',{required_comment})

}) 
                                                
app.patch("/comments/:id",(req,res)=>{    // update  a prticular comment 
    const id = req.params.id
    const required_comment= comments_var.find(c=>c.id===(id))
    const new_comment = req.body.new_comment // either sent through form or json data where new_comment will be  as a key for json and as a form filling in form from where patch request is sent so we have to set name in form in update file as new_comment(it makes req body as we have seen above in post request) 
    required_comment.comment = new_comment  // changing our object comments_var 
  
    res.redirect("/comments") // to again go to our idex.ejs page 
})

app.delete('/comments/:id',(req,res)=>{
    const id = req.params.id
   
    comments_var = comments_var.filter(c=>c.id!== id)
    res.redirect('/comments')
})

app.get('/comments/:id/update',(req,res)=>{      // HTML form only have methods post and get so to patch we have to use post method but set _method as patch in our ejs 
const id = req.params.id

const required_comment= comments_var.find(c=>c.id===(id))
res.render("comments_folder/update",{required_comment})
})

app.get('/tacos',(req,res)=>{
res.send("Get /tacos response")
 })


 app.post('/tacos',(req,res)=>{            // even the route is same but response pages are different for post as well as 
    res.send(`Post /tacos response meat${req.body.meat} and qty${req.body.qty}`)
         // we can send data in different formats using post request so express needs to know which format is need to be parsed 
    // req.body contains key value pairs of data submitted in request body
     })
 app.listen('3000', ()=>{console.log("server up and running")} )





 /// we are using html forms to do all the crud applications so we have to do this method only  we have to use method override for working with it  if we would be making requests from client side using axios and  javascript we could do directly using routes 