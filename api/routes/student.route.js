const stdController = require("../controller/student.controller");
const express = require("express");
const router = express.Router();

// app.get('/get_student') {
//     res.send('Hello Sir')
// }
router.route('/get-student').get(stdController.get);
router.route('/add-student').post(stdController.add);
router.route('/update-student').put(stdController.update);
router.route('/delete-student').delete(stdController.delete);
// router.route('/get-student-byname').get(stdController.GETBYID);


module.exports= router;