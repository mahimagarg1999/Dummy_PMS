const express = require("express");
const studentRoute = require("../routes/student.route")
const authRoute = require("../routes/auth.route")
const userDataRoute = require('../routes/users-data.route')
const manageProjectRoute = require('../routes/manage_project.route')
const groupRoute = require('../routes/group.route')
const groupMemberRoute = require('../routes/group_member.route')


const router = express.Router();
router.use('/',studentRoute);
router.use('/',authRoute);
router.use('/',userDataRoute);
router.use('/',manageProjectRoute);
router.use('/',groupRoute);
router.use('/',groupMemberRoute);



module.exports = router;