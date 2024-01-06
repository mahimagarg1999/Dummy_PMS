
// =====================================================
const authModel = require("../model/auth.model");
const status = require("../config/status");
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

// //  LOGIN without token
// exports.login = async (req, res) => {
//   console.log("testdugkhdfinvk,")

//   try {
//     var email = req.body && req.body.email ? req.body.email : '';
//     var password = req.body && req.body.password ? req.body.password : '';
//     var user = await authModel.findOne({ email: email }).select("email username password ").lean().exec();

//     if (!user) {
//       res.json({ success: false, status: status.NOTFOUND, msg: 'Authentication failed. User not found.' });
//     } else {

//       let ifPasswordMatch = await authModel.findOne({ password: password }).lean().exec();
//       if (ifPasswordMatch) {

//         var userResp = user;
//         delete userResp.password;

//         res.json({ success: true, msg: 'login successful', user: userResp });
//       } else {
//         res.json({ success: false, status: status.NOTFOUND, msg: 'Authentication failed. Wrong password.' });
//       }
//     }
//   } catch (e) {
//     console.log("e", e)
//     return res.json({ success: false, status: statusCode.INVALIDSYNTAX, err: e, msg: 'Error in login.' });








//   }
// }

// Login with token
exports.login = async (req, res) => {
  try {
    console.log("testdugkhdfinvk,")
    var email = req.body && req.body.email ? req.body.email : '';
    var password = req.body && req.body.password ? req.body.password : '';
    var user = await authModel.findOne({ email: email }).select("email username password ").lean().exec();

    if (!user) {
      res.json({ success: false, status: status.NOTFOUND, msg: 'Authentication failed. User not found.' });
    } else {

      let ifPasswordMatch = await authModel.findOne({ password: password }).lean().exec();
      if (ifPasswordMatch) {

        var userResp = user;
        delete userResp.password;
        // jwt token
        const data = {
          id: user.id,
          email: user.email,
          username: user.username,
          role: user.role,
          // Add more data as needed to increase token size
          additionalData: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ...',
        }
        const authToken = jwt.sign(data, process.env.JWT_SECRET_CODE);

        console.log("jwtData", authToken),
          // ================

          res.json({ success: true, msg: 'login successful', user: userResp, authToken: authToken });
      } else {
        res.json({ success: false, status: status.NOTFOUND, msg: 'Authentication failed. Wrong password.' });
      }
    }
  } catch (e) {
    console.log("e", e)
    return res.json({ success: false, status: statusCode.INVALIDSYNTAX, err: e, msg: 'Error in login.' });
  }
}


// changepassword
exports.changePassword = async (req, res) => {
  console.log("req.body----", req.body)
  try {
    const email = req.body.email;
    const currentPassword = req.body.currentPassword;
    const newPassword = req.body.newPassword;
    const confirmPassword = req.body.confirmPassword; // New field for confirmation password
    // Find the user in the database
    const user = await authModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, msg: 'User not found.' });
    }
    // Verify current password
    if (currentPassword !== user.password) {
      return res.json({ success: false, msg: 'Invalid current password.' });
    }
    // Check if new password and confirmation password match
    if (newPassword !== confirmPassword) {
      return res.json({ success: false, msg: 'New password and confirmation password do not match.' });
    }
    // Update the password in the database
    await authModel.updateOne({ email }, { password: newPassword });
    return res.json({ success: true, msg: 'Password changed successfully.' });
  } catch (e) {
    console.error("Error in change password:", e);
    return res.json({ success: false, err: e, msg: 'Error in change password.' });
  }
};
// user signup
exports.signup = async (req, res) => {
  try {
    let UserExists = await authModel.findOne({ email: req.body.email }).lean().exec();
    if (UserExists) {
      return res.json({ success: false, status: status.INVALIDSYNTAX, msg: 'User already registered.' });
    }

    var obj = {
      fname: req.body.fname,
      lname: req.body.lname,
      email: req.body.email,
      password: req.body.password,
      dob: req.body.dob,
      gender: req.body.gender,
      standard: req.body.standard,
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      role: req.body.role,
      status: req.body.status


    }
    const newauthModel = new authModel(obj);
    let result = await newauthModel.save();
    res.json({ success: true, status: status.OK, msg: 'New user add  successfully.' });

  }
  catch (err) {
    console.log("error", err);
    return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Save Users failed.' });

  }
}
// // user signup
// exports.signup = async (req, res) => {
//   try {

//     let UserExists = await authModel.findOne({ email: req.body.email }).lean().exec();
//     if (UserExists) {
//       return res.json({ success: false, status: status.INVALIDSYNTAX, msg: 'User already registered.' });
//     }
//     var obj = {
//       fname: req.body.fname,
//       lname: req.body.lname,
//       email: req.body.email,
//       password: req.body.password,
//       dob: req.body.dob,
//       gender: req.body.gender,
//       standard: req.body.standard,
//       address: req.body.address,
//       city: req.body.city,
//       state: req.body.state,
//       role: req.body.role,
//       status: req.body.status
//     }
//     const newauthModel = new authModel(obj);
//     let result = await newauthModel.save();
//     // jwt token
//     const data = {
//       id: obj.id
//     }
//     const authToken = jwt.sign(data, process.env.JWT_SECRET_CODE);
//     console.log("jwtData", authToken),



//       res.json({ success: true, status: status.OK, msg: 'New user add  successfully.', authToken: authToken });

//   }
//   catch (err) {
//     console.log("error", err);
//     return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Save Users failed.' });

//   }
// }
// GETUSERBYEMAIL
exports.getUserByEmail = async (req, res) => {
  try {
    let email = req.query.email;
    if (email === undefined) {
      return res.json({ success: false, status: status.NOTFOUND, msg: 'email Not Available' });
    }
    const data = await authModel.findOne({ email: email }).lean().exec();

    if (!data) {
      return res.json({ success: false, status: 'NOT_FOUND', msg: 'User not found with the given email' });
    }
    console.log("data", data);
    return res.json({ data: data, success: true, status: status.OK });
  }
  catch (err) {
    console.log("error", err);
    return res.json({ success: false, status: status.INVALIDSYNTAX, err: err, msg: 'Get User failed.' });
  }
}

exports.updateUser = async (req, res) => {
  var id = req.body.id;
  if (id === undefined) {
    return res.json({ success: false, status: status.NOTFOUND, msg: 'Id Parameter Not Available' });
  }
  delete req.query.id;
  try {
    let result = await authModel.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          fname: req.body.fname,
          lname: req.body.lname,
          email: req.body.email,
          password: req.body.password,
          dob: req.body.dob,
          gender: req.body.gender,
          standard: req.body.standard,
          address: req.body.address,
          city: req.body.city,
          state: req.body.state,
        }
      },
    ).lean().exec();

    if (result) {
      res.json({ success: true, status: status.OK, msg: 'User is updated successfully.' });
    }
    else {
      return res.json({ success: false, status: status.NOTFOUND, msg: 'User Id not found' });
    }
  }
  catch (err) {
    // return res.json({ success: false, status: status.INVALIDSYNTAX, err: err, msg: 'Update User failed.' });
    return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Update User failed.' });

  }
}


exports.forgetChangePassword = async (req, res) => {
  console.log("req.body----", req.body);
  try {
    const email = req.body.email;
    const newPassword = req.body.newPassword;
    const confirmPassword = req.body.confirmPassword;

    // Find the user in the database
    const user = await authModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, msg: 'User not found.' });
    }

    // Check if new password and confirmation password match
    if (newPassword !== confirmPassword) {
      return res.json({ success: false, msg: 'New password and confirmation password do not match.' });
    }

    // Update the password in the database
    await authModel.updateOne({ email }, { password: newPassword });

    return res.json({ success: true, msg: 'Password changed successfully. You can now go to your login site.' });
  } catch (e) {
    console.error("Error in change password:", e);
    return res.json({ success: false, err: e, msg: 'Error in change password.' });
  }
};

exports.sendEmail = async (req, res) => {
  try {
    var email = req.body && req.body.email ? req.body.email : '';
    var user = await authModel.findOne({ email: email }).lean().exec();

    if (!user) {
      res.json({ success: false, status: status.NOTFOUND, msg: 'Authentication failed. User not found.' });
    } else {
      let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'mahimagarg1602@gmail.com',
          pass: 'uixv laul bjpd tqcc'
        }
      });

     
      let mailOptions = {
        from: 'mailto:mahimagarg1602@gmail.com',
        to: email,
        subject: 'Hello ✔',
        text: 'Hello world?',
        html: `
        <h1>Password Reset Request</h1>
        <b>Welcome</b>
          <p>This is your mail id ${email} </p>
          
          <p>We have recieved a request to reset your password, to complete the password reset process , please click on the button below:</p>
          <a href="http://localhost:4200/forget-change-password/${email}" style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none;">Verify</a>
          <p>Thank you</p>
        `,
      };
      
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        // res.status({ status: status.OK });
      return  res.json({ success: true, status: status.OK, msg: 'Send mail in your given mail id ' });

      });

    }
  } catch (e) {
    console.log("e", e)
    return res.json({ success: false, status: statusCode.INVALIDSYNTAX, err: e, msg: 'Error in login.' });
  }
}

// bcrpt===
// exports.signup = async (req, res) => {
//   try {
//     let userExists = await authModel.findOne({ email: req.body.email }).lean().exec();
//     if (userExists) {
//       return res.json({ success: false, status: status.INVALIDSYNTAX, msg: 'User already registered.' });
//     }

//     const hashedPassword = await bcrypt.hash(req.body.password, 10);

//     var obj = {
//       fname: req.body.fname,
//       lname: req.body.lname,
//       email: req.body.email,
//       password: hashedPassword, // Store the hashed password
//       dob: req.body.dob,
//       gender: req.body.gender,
//       standard: req.body.standard,
//       address: req.body.address,
//       city: req.body.city,
//       state: req.body.state,
//       role: req.body.role,
//       status: req.body.status
//     };

//     const newAuthModel = new authModel(obj);
//     let result = await newAuthModel.save();
//     res.json({ success: true, status: status.OK, msg: 'New user added successfully.' });
//   } catch (err) {
//     console.error("Error in signup:", err);
//     return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Save Users failed.' });
//   }
// };

// uncomment below

// // ================================================
// // add jwt
// const authModel = require("../model/auth.model");
// const status = require("../config/status");
// const bcrypt = require('bcrypt');
// var jwt = require('jsonwebtoken');
// require('dotenv').config();


// //  LOGIN
// exports.login = async (req, res) => {
//   try {
//     var email = req.body && req.body.email ? req.body.email : '';
//     var password = req.body && req.body.password ? req.body.password : '';
//     var user = await authModel.findOne({ email: email }).select("email username password ").lean().exec();

//     if (!user) {
//       res.json({ success: false, status: status.NOTFOUND, msg: 'Authentication failed. User not found.' });
//     } else {

//       let ifPasswordMatch = await authModel.findOne({ password: password }).lean().exec();
//       if (ifPasswordMatch) {

//         var userResp = user;
//         delete userResp.password;
//         // jwt token
//         const data = {
//           id: user.id,
//           email: user.email,
//           username: user.username,
//           role: user.role,
//           // Add more data as needed to increase token size
//           additionalData: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ...',
//         }
//         const authToken = jwt.sign(data, process.env.JWT_SECRET_CODE);
//         console.log("jwtData", authToken),
//           // ================

//           res.json({ success: true, msg: 'login successful', user: userResp, authToken: authToken });
//       } else {
//         res.json({ success: false, status: status.NOTFOUND, msg: 'Authentication failed. Wrong password.' });
//       }
//     }
//   } catch (e) {
//     console.log("e", e)
//     return res.json({ success: false, status: statusCode.INVALIDSYNTAX, err: e, msg: 'Error in login.' });
//   }
// }
// // changepassword
// exports.changePassword = async (req, res) => {
//   try {
//     const email = req.body.email;
//     const currentPassword = req.body.currentPassword;
//     const newPassword = req.body.newPassword;
//     const confirmPassword = req.body.confirmPassword; // New field for confirmation password
//     // Find the user in the database
//     const user = await authModel.findOne({ email });
//     if (!user) {
//       return res.json({ success: false, msg: 'User not found.' });
//     }
//     // Verify current password
//     if (currentPassword !== user.password) {
//       return res.json({ success: false, msg: 'Invalid current password.' });
//     }
//     // Check if new password and confirmation password match
//     if (newPassword !== confirmPassword) {
//       return res.json({ success: false, msg: 'New password and confirmation password do not match.' });
//     }
//     // Update the password in the database
//     await authModel.updateOne({ email }, { password: newPassword });
//     return res.json({ success: true, msg: 'Password changed successfully.' });
//   } catch (e) {
//     console.error("Error in change password:", e);
//     return res.json({ success: false, err: e, msg: 'Error in change password.' });
//   }
// };
// // user signup
// exports.signup = async (req, res) => {
//   try {

//     let UserExists = await authModel.findOne({ email: req.body.email }).lean().exec();
//     if (UserExists) {
//       return res.json({ success: false, status: status.INVALIDSYNTAX, msg: 'User already registered.' });
//     }
//     var obj = {
//       fname: req.body.fname,
//       lname: req.body.lname,
//       email: req.body.email,
//       password: req.body.password,
//       dob: req.body.dob,
//       gender: req.body.gender,
//       standard: req.body.standard,
//       address: req.body.address,
//       city: req.body.city,
//       state: req.body.state,
//       role: req.body.role,
//       status: req.body.status
//     }
//     const newauthModel = new authModel(obj);
//     let result = await newauthModel.save();
//     // jwt token
//     const data = {
//       id: obj.id
//     }
//     const authToken = jwt.sign(data, process.env.JWT_SECRET_CODE);
//     console.log("jwtData", authToken),



//       res.json({ success: true, status: status.OK, msg: 'New user add  successfully.', authToken: authToken });

//   }
//   catch (err) {
//     console.log("error", err);
//     return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Save Users failed.' });

//   }
// }
// // GETUSERBYEMAIL
// exports.getUserByEmail = async (req, res) => {
//   // if ( req.user.email) {

//   try {
//     let email = req.query.email;
//     if (email === undefined) {
//       return res.json({ success: false, status: status.NOTFOUND, msg: 'email Not Available' });
//     }
//     const data = await authModel.findOne({ email: email }).lean().exec();

//     if (!data) {
//       return res.json({ success: false, status: 'NOT_FOUND', msg: 'User not found with the given email' });
//     }
//     console.log("data", data);
//     const data1 = {
//       id: data.id
//     }
//     const authToken = jwt.sign(data1, process.env.JWT_SECRET_CODE);
//     console.log("jwtData", authToken);


//     return res.json({ data: data, success: true, status: status.OK });
//   }
//   catch (err) {
//     console.log("error", err);
//     return res.json({ success: false, status: status.INVALIDSYNTAX, err: err, msg: 'Get User failed.' });
//   }
//   // } else {
//   //   return res.status(403).send({ success: false, status: status.UNAUTHORIZED, msg: 'Unauthorized.' });
//   // }
// }
// // bcrpt===
// // exports.signup = async (req, res) => {
// //   try {
// //     let userExists = await authModel.findOne({ email: req.body.email }).lean().exec();
// //     if (userExists) {
// //       return res.json({ success: false, status: status.INVALIDSYNTAX, msg: 'User already registered.' });
// //     }

// //     const hashedPassword = await bcrypt.hash(req.body.password, 10);

// //     var obj = {
// //       fname: req.body.fname,
// //       lname: req.body.lname,
// //       email: req.body.email,
// //       password: hashedPassword, // Store the hashed password
// //       dob: req.body.dob,
// //       gender: req.body.gender,
// //       standard: req.body.standard,
// //       address: req.body.address,
// //       city: req.body.city,
// //       state: req.body.state,
// //       role: req.body.role,
// //       status: req.body.status
// //     };

// //     const newAuthModel = new authModel(obj);
// //     let result = await newAuthModel.save();
// //     res.json({ success: true, status: status.OK, msg: 'New user added successfully.' });
// //   } catch (err) {
// //     console.error("Error in signup:", err);
// //     return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Save Users failed.' });
// //   }
// // };


