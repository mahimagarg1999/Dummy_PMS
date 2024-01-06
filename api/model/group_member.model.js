const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
// var connection = require('../config/mongo-connection');

const GroupMember = mongoose.Schema({
    group_member: {
        type: String,
    },


},
    {
        timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
    });

module.exports = mongoose.model('GroupMember', GroupMember);