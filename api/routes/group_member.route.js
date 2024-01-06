const groupMemberController = require("../controller/group_member.controller");
const express = require("express");
const router = express.Router();

router.route('/group-member')
    .get(groupMemberController.get)
    .post(groupMemberController.add)
    .put(groupMemberController.update)
    .delete(groupMemberController.delete);

router.route('/group-member/id')
    .get(groupMemberController.getGroupMemberById)

module.exports = router;                                                                                                                     