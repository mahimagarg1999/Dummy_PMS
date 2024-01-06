const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// var connection = require('../config/mongo-connection');

const UserData = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    hobbies: {
        type: Array,
        required: true
    },
},
    {
        timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
    });

// const model = connection.model('userData', UserData);
module.exports = mongoose.model('UserData', UserData); 

// module.exports = model;