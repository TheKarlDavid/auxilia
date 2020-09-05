const express = require("express")
const session = require("express-session")
const bodyparser = require("body-parser")
const cookieparser = require("cookie-parser")
const hbs = require("hbs")

const app = express()

app.set("view engine", "hbs")

const urlencoder = bodyparser.urlencoded({
    extended:false
})

let users = []

app.use(session({
    secret: "very secret",
    resave: false,
    saveUninitialized: true,
    cookie:{
        maxAge: 1000 * 60 * 60
    }
}))

app.use(express.static(__dirname + "/public"))

app.get("/", (req, res)=>{

    if(req.session.email){
        //it means that has already sgned in
        // go to home.html
        // res.sendFile(__dirname+"/public/home.html")

        res.render("home.hbs",{
            email: req.session.email
        })
    }

    
    else{
        // the user has not registered or logged
        //go to index.html
        // res.sendFile(__dirname+"/public/index.html")
        res.render("index.hbs")
    
    }
})

app.post("/register", urlencoder, (req,res)=>{
    // email: em     password: pw

    let email = req.body.em
    let password = req.body.pw
    let first_name = req.body.fname
    let last_name = req.body.lname

    if(email.trim() == "" || password.trim() == ""){
        res.render("index.hbs", {
            error:"Enter an email and password"
        })
    }

    else if(!isAvailable(email)){
        res.render("index.hbs", {
            error:"Email address not available"
        })
    }
    
    else{
        //save user to db users[]

        users.push({
            email: email,
            password: password,
            first_name: first_name,
            last_name: last_name

        })

        req.session.email = req.body.em
        // res.render("home.hbs",{
        //     email: req.session.email
        // })

        console.log(JSON.stringify(users))

        res.redirect("/")
    }

    //SUCCESSFUL REGISTER save user to the db   users[]
    // req.session.email = req.body.em

    // res.sendFile(__dirname+"/public/home.html")

})

function isAvailable(email){
    for(let i=0; i <users.length; i++){
        if(users[i].email == email){
            return false
        }
    }
    return true
}

app.post("/login", urlencoder, (req,res)=>{
    // email: em     password: pw

    //check if user credentials     users[]
    req.session.email = req.body.em
    // res.sendFile(__dirname+"/public/home.html")

    if(!matches(req.body.em, req.body.pw)){
        res.render("index.hbs",{
            error:"Email and password does not match"
        })

    }
    else{
        res.render("home.hbs",{
            email:req.session.email
        })
    }
    
})

function matches(email, password){
    for(let i=0; i<users.length; i++){
        if(users[i].email == email && users[i].password == password){
            return true
        }
    }
    return false
}

app.get("/signout", (req,res)=>{
    req.session.destroy()
    res.redirect("/")
})

app.listen(3000, function(){
    console.log("now listening to port 3000")
})


// app.get("/", (req,res)=>{
//     res.sendFile(__dirname+"/public/index.html")
// })

// app.post("/login", (req,res)=>{

// })

// app.listen(3000, function(){
//     console.log("listening to port 3000")
// })

