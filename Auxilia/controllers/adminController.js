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

exports.getAddTask = (req, res)=>{
    
    // let task = req.body.task-date
    // let id = req.body.task1
    // console.log(req.body.taskdate)
    // console.log(req.body.task1)
    
    // let date = new Date()
    
    // res.redirect("/")

    // console.log(task)
    if(req.session.email){

        let task1 = req.body.task1
        let task2 = req.body.task2
        let task3 = req.body.task3
        let task4 = req.body.task4
        let task5 = req.body.task5
        let date = req.body.taskdate

        let date_today = new Date()
        task_date = new Date(date)
        let invalid_date = false

        console.log(date_today)
        console.log(task_date)
        if(task_date < date_today){
            // invalid_date = true
            res.render("home-admin.hbs", {
                firstname: req.session.firstname,
                lastname: req.session.lastname,
                tasks: req.session.admintasks ,
                error: "Invalid: Date "+date + " ,should be for succeeding days" 
            })
        }

        else{
            Task.findOne({task_date: date}).then((doc)=>{
                if(doc == null){
                             
                    let taskOne = new Task({
                        task_date:date,
                        task_description:task1
                    })
            
                    let taskTwo = new Task({
                        task_date:date,
                        task_description:task2
                    })
            
                    let taskThree = new Task({
                        task_date:date,
                        task_description:task3
                    })
            
                    let taskFour = new Task({
                        task_date:date,
                        task_description:task4
                    })
            
                    let taskFive = new Task({
                        task_date:date,
                        task_description:task5
                    })
            
                    taskOne.save().then((docA)=>{
                        console.log("Task 1 added")                   
                    }, (error)=>{ //error
                        console.log("ERROR ADDING 1 "+ error)
                    })
            
                    taskTwo.save().then((docB)=>{
                        console.log("Task 2 added")               
                    }, (error)=>{ //error
                        console.log("ERROR ADDING 2 "+ error)
                    })
            
                    taskThree.save().then((docC)=>{
                        console.log("Task 3 added")                    
                    }, (error)=>{ //error
                        console.log("ERROR ADDING 3 "+ error)
                    })
            
                    taskFour.save().then((docD)=>{
                        console.log("Task 4 added")                   
                    }, (error)=>{ //error
                        console.log("ERROR ADDING 4 "+ error)
                    })
            
                    taskFive.save().then((docE)=>{
                        console.log("Task 5 added")
                        res.redirect("/")                   
                    }, (error)=>{ //error
                                console.log("ERROR ADDING 5 "+ error)
                    })
                }
                else{
                    res.render("home-admin.hbs", {
                        firstname: req.session.firstname,
                        lastname: req.session.lastname,
                        tasks: req.session.admintasks ,
                        error: "Invalid: Already made task for " + date
                    })
                }
                    
            console.log(doc)
        
            }, (err)=>{
                    console.log("ERROR "+err)
            })
         
        }

        
    }

    else{
        res.render("login.hbs") 
    }

}

// exports.getEditTask = (req, res)=>{
    
//     let task = req.body.task
//     let id = req.body.edit_id
    
//     console.log(task)

//     if(req.session.email){
//         Task.findOneAndUpdate({
//             _id:id
//         }, {
//             task_description: task
//         }).then(()=>{
//             res.redirect("/")
//         }, (error)=>{ 
//             Task.find({}).then((docs)=>{
//                 res.render("home-admin.hbs", {
//                     error: error,
//                     firstname: req.session.firstname,
//                     lastname: req.session.lastname,
//                     tasks: docs 
//                 })
//             })
//         })
//     }

//     else{
//         res.render("login.hbs") 
//     }

// }

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
