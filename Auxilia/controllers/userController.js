const User = require('../models/user')
const Task = require('../models/tasks')
const Meditation = require('../models/meditation')
const { body, validationResult } = require('express-validator')
const bcrypt = require("bcryptjs")

//home page

exports.getIndex = (req, res)=>{

    if(req.session.email){
        //user already signed in
        if(req.session.task){
            res.render("home.hbs", {
                firstname: req.session.firstname,
                lastname: req.session.lastname,
                tasks:req.session.tasks
            })
        }
        else{
            req.session.task = 1
            req.session.tasks = []

            Task.find({}).then((docs)=>{
                // console.log(docs[0].task_description)
                for(let i=0; i<docs.length; i++){
                    let task = {task_description: docs[i].task_description, accomplished: false}
                    req.session.tasks.push(task)
                }

                User.findOneAndUpdate({email:req.session.email}, 
                    {tasks:req.session.tasks}).then((doc)=>{
                        // console.log(doc.tasks)
                        res.render("home.hbs", {
                            firstname: req.session.firstname,
                            lastname: req.session.lastname,
                            tasks:req.session.tasks
                        })
                })
                
            })
        }
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
            res.redirect("/")
    }
    
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
            console.log(result.tasks)
            element = req.body.dropCount
            let temp = result.tasks[req.body.dropCount].accomplished
            console.log("DESC :"+req.body.taskDesc)

            User.findOneAndUpdate({task_description: req.body.taskDesc}, 
            {$set: {accomplished:true}}).then((doc)=>{
                console.log("SUCCESS UPDATE")
                // res.render("home.hbs", {
                //     firstname: req.session.firstname,
                //     lastname: req.session.lastname,
                //     tasks: doc.tasks
                // })
            })

            // console.log(result.firstname)
            // console.log("temp "+temp)
            // tasks[parseInt(req.body.dropCount, 10)-1] = 1
            // User.findOneAndUpdate(
            //     {email: req.session.email},
            //     {tasks:temp}
            // )
        })
        console.log(req.body.dropCount)
        element = req.body.dropCount

        // User.findOneAndUpdate({email:req.session.email}, {"tasks.element.accomplished":true}).then((docs)=>{
        //     console.log("UPDATE"+ docs)
        //     // let docObj = docs.toObject()
        //     // console.log(docObj)
        //     // console.log(JSON.stringify(docs.firstname))
        //     // console.log(docs[0].task_description)
        //     // User.findOneAndUpdate({email:req.session.email}, 
        //     //     {tasks:docs}).then((doc)=>{
        //     //         // console.log(doc.tasks)
        //     //         res.render("home.hbs", {
        //     //             firstname: req.session.firstname,
        //     //             lastname: req.session.lastname,
        //     //             tasks: doc.tasks
        //     //         })
        //     // })
        // }, (err)=>{
        //     res.render("home.hbs",{
        //         error: err
        //     })
        // })

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