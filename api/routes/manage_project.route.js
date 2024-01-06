const manageProjectController = require("../controller/manage_project.controller");
const express = require("express");
const router = express.Router();

router.route('/manage-project')
    .get( manageProjectController.get)
    .post(manageProjectController.add)
    .put(manageProjectController.update)
    .delete(manageProjectController.delete);

    router.route('/manage-project/id')
    .get( manageProjectController.getProjectById)  
    
    router.route('/manage-project-delete-test')
    .delete( manageProjectController.deleteTest) 

module.exports= router;                                                                                                                     