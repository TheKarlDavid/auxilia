const User = require('../models/user')
const Task = require('../models/tasks')
const Meditation = require('../models/meditation')
const { body, validationResult } = require('express-validator')
const bcrypt = require("bcryptjs")

//home page

exports.getIndex = (req, res)=>{

    if(req.session.email){
        //user already signed in
        req.session.tasks = []
        req.session.accomplished = 0
        User.find({}).then((docs)=>{
            for(let i=0; i<docs[0].tasks.length; i++){
                let task = {
                    task_description: docs[0].tasks[i].task_description, 
                    accomplished: docs[0].tasks[i].accomplished, 
                    logged_date: docs[0].tasks[i].logged_date
                }
                req.session.tasks.push(task)
            }

            User.findOne({email:req.session.email}).then(result=>{
                // console.log(result.tasks)
                for(let i=0; i<result.tasks.length; i++){
                    if(result.tasks[i].accomplished){
                        console.log(result.tasks[i].accomplished)
                        req.session.accomplished++;
                        
                    }
                    
                }
                console.log("nums "+req.session.accomplished)
                
                res.render("home.hbs", {
                    firstname: req.session.firstname,
                    lastname: req.session.lastname,
                    tasks:req.session.tasks,
                    plant: req.session.accomplished
                })
            })
        })
    }

    else{
        // the user has not registered or logged
        res.render("index.hbs")
    
    }

}

exports.getRegister = (req,res)=>{
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

        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(password,salt);
        password = hash;


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
}

exports.getLogin = async (req,res)=>{
    let email = req.body.email
    let password = req.body.password
    let remember_me = req.body.remember

    var user = await User.findOne({ email: email }).exec();
    if(!user) {
        res.render("login.hbs", {
            errors:"Invalid email/password" 
        })
    }
    if(!bcrypt.compareSync(password, user.password)) {
        res.render("login.hbs", {
            errors:"Invalid email/password" 
        })
    }
    else{
        req.session.email = req.body.email
        req.session.password = req.body.password
        req.session.firstname = user.firstname
        req.session.lastname = user.lastname

        if(remember_me){    
            req.session.cookie.maxAge = 1000 * 3600 * 24 * 30
        }

        // let today = new Date();
        let date_today = new Date();
        let date = ("0" + date_today.getDate()).slice(-2);
        let month = ("0" + (date_today.getMonth() + 1)).slice(-2);
        let year = date_today.getFullYear();
        req.session.today = (year + month  + date)
        console.log(req.session.today)

        req.session.tasks = []

        User.find({}).then((docs)=>{
            
            last_login = docs[0].tasks[0].logged_date
            console.log(last_login)
            console.log(req.session.today)

            if(last_login < req.session.today){
                Task.find({}).then((docs)=>{
                    for(let i=0; i<docs.length; i++){
                        let task = {task_description: docs[i].task_description, accomplished: false, logged_date: req.session.today}
                        req.session.tasks.push(task)
                    }
            
                    User.findOneAndUpdate({email:req.session.email}, 
                        {tasks:req.session.tasks}).then((doc)=>{
                            console.log(req.session.tasks)
                            res.redirect("/")
                    })
                            
                })
            }
            else{
                res.redirect("/")
            }
            
        })
 
        // Task.find({}).then((docs)=>{
        // // console.log(docs[0].task_description)
        //     for(let i=0; i<docs.length; i++){
        //         let task = {task_description: docs[i].task_description, accomplished: false, logged_date: date_today}
        //         req.session.tasks.push(task)
        //     }

        //     User.findOneAndUpdate({email:req.session.email}, 
        //         {tasks:req.session.tasks}).then((doc)=>{
        //             console.log(req.session.tasks)
        //             res.redirect("/")
        //     })
                
        // })
    }

    // res.redirect("/")

    
}

exports.getLoginRegister = (req, res)=>{

    if(req.session.email){
        res.render("home.hbs",{
            firstname: req.session.firstname,
            lastname: req.session.lastname
        })
    }

    else{
        res.render("login.hbs")
    }
}

exports.getHome = (req, res)=>{

    if(req.session.email){
        res.redirect("/")
    }

    else{
        res.render("index.hbs")
    }
}

exports.getUpdateTask = (req, res)=>{

    if(req.session.email){
        User.findOne({email:req.session.email}).then(result=>{
            // console.log(result.tasks)
            element = req.body.dropCount
            let task_id = result.tasks[req.body.dropCount]
            // console.log(result._id)
            console.log(task_id._id)

            User.findOneAndUpdate({
                _id:result._id,
                "tasks._id": task_id
                }, {
                    "$set": {
                    "tasks.$": {
                        task_description: task_id.task_description,
                        accomplished: true,
                        logged_date: req.session.today
                    }
                }
            }).then((doc)=>{
                console.log("UP")
                // console.log("User: " + JSON.stringify(doc))
                }, (err)=>{
                console.log("Error: " +err)
            })

        })
        console.log(req.body.dropCount)
        element = req.body.dropCount

    }

    else{
        res.render("index.hbs")
    }
}

exports.getMeditation = (req, res)=>{

    if(req.session.email){
        Meditation.find({}).sort({date: 'desc'}).then((docs)=>{
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
}

exports.getAbout = (req, res)=>{

    if(req.session.email){
        res.render("about.hbs")
    }

    else{
        res.render("about-not.hbs") 
    }
}

exports.getProfile = (req, res)=>{

    if(req.session.email){
        res.render("profile.hbs",{
            firstname: req.session.firstname,
            lastname: req.session.lastname
        })
    }

    else{
        res.render("login.hbs") 
    }
}

exports.getSignout = (req,res)=>{
    req.session.destroy()
    res.redirect("/")
}