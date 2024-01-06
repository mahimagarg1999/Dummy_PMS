const usersDataController = require("../controller/users-data.controller");
const express = require('express');
const router = express.Router();

router.route('/users')
    .get( usersDataController.get)
    .post(usersDataController.add)
    .put(usersDataController.update)
    .delete(usersDataController.delete);

    router.route('/users/id')
    .get( usersDataController.getUsersById)         

module.exports = router;