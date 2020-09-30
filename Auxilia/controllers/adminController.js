const Task = require('../models/tasks')
const Meditation = require('../models/meditation')
const { body, validationResult } = require('express-validator')

exports.getAdminHome = (req, res)=>{

    if(req.session.email){
        res.redirect("/")
    }

    else{
        res.render("index.hbs")
    }
}

exports.getEditTask = (req, res)=>{
    
    let task = req.body.task
    let id = req.body.edit_id
    
    console.log(task)

    if(req.session.email){
        Task.findOneAndUpdate({
            _id:id
        }, {
            task_description: task
        }).then(()=>{
            res.redirect("/")
        }, (error)=>{ 
            Task.find({}).then((docs)=>{
                res.render("home-admin.hbs", {
                    error: error,
                    firstname: req.session.firstname,
                    lastname: req.session.lastname,
                    tasks: docs 
                })
            })
        })
    }

    else{
        res.render("login.hbs") 
    }

}

exports.getAddMeditation = (req, res)=>{
    
    let title = req.body.add_title
    let desc = req.body.add_desc
    let link = req.body.add_link
    let date = Date.now()

    if(req.session.email){
        let meditation = new Meditation({
            title: title,
            description: desc,
            link: link,
            date: date
        })

        meditation.save().then((doc)=>{
            res.redirect("/meditation")
        }, (error)=>{ 
            Meditation.find({}).sort({date: 'desc'}).then((docs)=>{
                res.render("meditation-admin.hbs", {
                    error: error,
                    meditations: docs
                })
            })
        })
    }

    else{
        res.render("login.hbs") 
    }

}

exports.getEditMeditation = (req, res)=>{

    let id = req.body.edit_id
    let title = req.body.edit_title
    let desc = req.body.edit_desc
    let link = req.body.edit_link

    if(req.session.email){
        Meditation.findOneAndUpdate({
            _id:id
        }, {
            title: title,
            description: desc,
            link: link
        }).then(()=>{
            res.redirect("/meditation")
        }, (error)=>{ 
            Meditation.find({}).sort({date: 'desc'}).then((docs)=>{
                res.render("meditation-admin.hbs", {
                    error: error,
                    meditations: docs
                })
            })
        })
    }

    else{
        res.render("login.hbs") 
    }
}

exports.getDeleteMeditation = (req, res)=>{

    console.log(req.body.delete_id)
    let id = req.body.delete_id

    if(req.session.email){
        Meditation.deleteOne({
            _id:id
        }).then(()=>{
            res.redirect("/meditation")
        }, (error)=>{ 
            Meditation.find({}).sort({date: 'desc'}).then((docs)=>{
                res.render("meditation-admin.hbs", {
                    error: error,
                    meditations: docs
                })
            })
        })
    }

    else{
        res.render("login.hbs") 
    }
}

exports.getAdminProfile = (req, res)=>{

    if(req.session.email){
        res.render("profile-admin.hbs",{
            firstname: req.session.firstname,
            lastname: req.session.lastname
        })
    }

    else{
        res.render("login.hbs") 
    }
}
