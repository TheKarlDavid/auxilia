const express = require('express')
const adminController = require('../controllers/adminController')
const routes = express();

routes.get("/home", adminController.getAdminHome)
// routes.post("/edit-task", adminController.getEditTask)
routes.post("/add-task", adminController.getAddTask)
routes.post("/add-meditation", adminController.getAddMeditation)
routes.post("/edit-meditation", adminController.getEditMeditation)
routes.post("/delete-meditation", adminController.getDeleteMeditation)
routes.get("/profile", adminController.getAdminProfile)
module.exports = routes