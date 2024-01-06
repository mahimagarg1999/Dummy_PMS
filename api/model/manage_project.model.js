const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
// var connection = require('../config/mongo-connection');

const manage_Project = mongoose.Schema({
    project_name: {
        type: String,

    },
    description: {
        type: String,

    },
    startDate: {
        type: Date,
    },
    endDate: {
        type: Date,

    },
    project_manager: {
        type: String,
    },
    team_members: {
        type: Array,
    },
    domain: {
        type: String,
    },
    // file:{
    //     type: String,
    // }

},
    {
        timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
    });

module.exports = mongoose.model('manage_Project', manage_Project);