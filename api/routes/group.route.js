const groupController = require("../controller/group.controller");
const express = require("express");
const router = express.Router();

router.route('/group')
    .get( groupController.get)
    .post(groupController.add)
    .put(groupController.update)
    .delete(groupController.delete);

    router.route('/group/id')
    .get( groupController.getGroupsById)   


    router.route('/get-group-member')
    .get( groupController.getGroupMember)
   

module.exports= router;                                                                                                                     