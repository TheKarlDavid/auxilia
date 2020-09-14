const express = require("express")
const session = require("express-session")
const bodyparser = require("body-parser")
const cookieparser = require("cookie-parser")
const hbs = require("hbs")
const mongoose = require("mongoose")
const {User} = require("./models/user.js")
const {Meditation} = require("./models/meditation.js")
const bcrypt = require("bcryptjs")
const { body, validationResult } = require('express-validator')
const { runInNewContext } = require("vm")
const app = express()

mongoose.connect("mongodb://127.0.0.1:27017/userdb",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

app.set("view engine", "hbs")

const urlencoder = bodyparser.urlencoded({
    extended:false
})

app.use(session({
    secret: "very secret",
    resave: false,
    saveUninitialized: true,
    cookie:{
        maxAge: 1000 * 60 * 30
    }
}))

app.use(express.static(__dirname + "/public"))

app.get("/", (req, res)=>{

    if(req.session.email){
        //user already signed in
        res.render("home.hbs",{
            firstname: req.session.firstname,
            lastname: req.session.lastname
        })
    }

    else{
        // the user has not registered or logged
        res.render("index.hbs")
    
    }
})

// registering a new user

app.post("/register", urlencoder, (req,res)=>{
    // reading fields from hbs
    let email = req.body.em
    let password = req.body.pw
    let first_name = req.body.firstname
    let last_name = req.body.lastname

    //checking if valid
    body("email").notEmpty();
    body("email").isEmail();
    body("password").notEmpty();
    body("password").isLength({min:6});
    body("first_name").notEmpty();
    body("last_name").notEmpty();

    //check errors
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.render("login.hbs",{errors:errors});
    }
    else{

        // var salt = bcrypt.genSaltSync(10);
        // var hash = bcrypt.hashSync(password,salt);
        // password = hash;


        let user = new User({
             email: email,
             password: password,
             firstname: first_name,
             lastname: last_name
        })

        user.save().then((doc)=>{
            console.log("Succesfully added: "+ doc)

            req.session.email = doc.email
            res.render("login.hbs", {
            message:"Registration successful"
            })
        }, (err)=>{
            console.log("Error in adding " + err)
            res.render("login.hbs", {
                errors:"Error in registering: email already in use"
            })
        })
        
    }
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
    let email = req.body.email
    let password = req.body.password
    

        User.findOne({email: email, password: password}).then(result=>{
            if(result == null){     
                console.log(result)

                res.render("login.hbs", {
                    errors:"Invalid email/password" 
                })
            }
            else{
                req.session.email = req.body.email
                req.session.password = req.body.password

                req.session.firstname = result.firstname
                req.session.lastname = result.lastname
                // console.log("Name is " +result.firstname)

                res.redirect("/")
            }
        
    }, (err)=>{
        res.send(err)
    })

    
})

app.get("/login-register", (req, res)=>{

    if(req.session.email){
        res.render("home.hbs",{
            firstname: req.session.firstname,
            lastname: req.session.lastname
        })
    }

    else{
        res.render("login.hbs")
    }
})


app.get("/home", (req, res)=>{

    if(req.session.email){
        res.render("home.hbs",{
            firstname: req.session.firstname,
            lastname: req.session.lastname
        })
    }

    else{
        res.render("index.hbs")
    }
})

app.get("/meditation", (req, res)=>{

    if(req.session.email){
        // res.render("meditation.hbs", {
            
        // })

        Meditation.find({}).then((docs)=>{
            res.render("meditation.hbs", {
                meditations: docs
            })
        }, (err)=>{
            res.render("meditation.hbs",{
                error: err
            })
        })
    }

    else{
        res.render("login.hbs") 
    }
})

app.get("/about", (req, res)=>{

    if(req.session.email){
        res.render("about.hbs")
    }

    else{
        res.render("about-not.hbs") 
    }
})

app.get("/profile", (req, res)=>{

    if(req.session.email){
        res.render("profile.hbs",{
            firstname: req.session.firstname,
            lastname: req.session.lastname
        })
    }

    else{
        res.render("login.hbs") 
    }
})

app.get("/signout", (req,res)=>{
    req.session.destroy()
    res.redirect("/")
})

app.listen(3000, function(){
    console.log("now listening to port 3000")
})


