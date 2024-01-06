const authController = require("../controller/auth.controller");
const express = require("express");
const router = express.Router();
const authenticationdata = require("../config/middleware")

// router.route('/get-auth').get(authController.get);
router.route('/login').post(authController.login);
router.route('/signup').post(authController.signup);
router.route('/signup').put(authController.updateUser);

// router.route('/update-auth').put(authController.update);
// router.route('/delete-auth').delete(authController.delete);
router.route('/get_user_by_email').get(authenticationdata,authController.getUserByEmail);
router.route('/change_password').put(authController.changePassword);
router.route('/send-mail-forget-password').put(authController.sendEmail);
router.route('/forget-change-password').put(authController.forgetChangePassword);


// router.route('/get_user_by_email').get(authenticationdata,authController.getUserByEmail);


module.exports = router;                                                                                                                     