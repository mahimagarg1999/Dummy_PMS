const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
// var connection = require('../config/mongo-connection');

const groupData = mongoose.Schema({
    group_name: { type: String, },
    group_member: {
        type: Array,

    },

},
    {
        timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
    });

module.exports = mongoose.model('groupData', groupData);

