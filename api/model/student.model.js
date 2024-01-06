var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var student = mongoose.Schema({
 

    student_id: {
        type: Number,
    },
    student_name: {
        type: String,
    },
    dob: {
        type: Date,
    },
    doj: {
        type: Date
    },
    fee :{
        type: Number,
    },
    gender :{
        type: String,
    },
   
    // timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

module.exports = mongoose.model('student', student); 

// module.exports = /model;