const groupMemberModel = require("../model/group_member.model")
const status = require("../config/status");

//add users
exports.add = async (req, res) => {
    try {
        var obj = {
            group_member: req.body.group_member
        }
        const newgroupMemberModel = new groupMemberModel(obj);
        let result = await newgroupMemberModel.save();
        res.json({ success: true, status: status.OK, msg: 'Adding Group Member is successfully.' });

    }
    catch (err) {

        return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Adding group member  failed.' });

    }
}


//update by id
exports.update = async (req, res) => {
    console.log("req.body",req.body);

    var id = req.body.id;
    if (id === undefined) {
        return res.json({ success: false, status: status.NOTFOUND, msg: 'Id Parameter Not Available' });
    }
    delete req.query.id;
    try {
        let result = await groupMemberModel.findOneAndUpdate(
            { _id: id },
            {           
                $set: {
                    group_member: req.body.group_member
                }
            },
        ).lean().exec();





        


        if (result) {
            res.json({ success: true, status: status.OK, msg: 'group member is updated successfully.' });
        }
        else {
            return res.json({ success: false, status: status.NOTFOUND, msg: 'group member Id not found' });
        }
    }
    catch (err) {
        // return res.json({ success: false, status: status.INVALIDSYNTAX, err: err, msg: 'Update User failed.' });
        return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Update group member failed.' });

    }
}

//get all users
exports.get = async (req, res) => {
    try {
        // const data = await manageProjectModel.find({}).sort({ alias: 1 }).lean().exec();
        const data = await groupMemberModel.find({}).select("group_member").lean().exec();

        return res.json({ data: data, success: true, status: status.OK });
    }
    catch (err) {
        // return res.json({ success: false, status: status.INVALIDSYNTAX, err: err, msg: 'Get Users failed.' });
        return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Get group member failed.' });

    }
}

//delete user by id
exports.delete = async (req, res) => {
    try {
        const ID = req.query.id;
        if (ID === undefined) {
            return res.json({ success: false, status: status.NOTFOUND, msg: 'Id Parameter Not Available' });
        }
        let result = await groupMemberModel.findOneAndDelete({ _id: ID }).lean().exec();
        if (result) {
            res.json({ success: true, status: status.OK, msg: 'Group Member is Deleted successfully.' });
        }
        else {
            return res.json({ success: false, status: status.NOTFOUND, msg: 'Group Member Id not found' });
        }
    }
    catch (err) {
        // return res.json({ success: false, status: status.INVALIDSYNTAX, err: err, msg: 'Delete Users Message failed.' });
        return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Delete Project Message failed.' });

    }
}

exports.getGroupMemberById = async (req, res) => {
    try {
        let ID = req.query.id;
        if (ID === undefined) {
            return res.json({ success: false, status: status.NOTFOUND, msg: 'Id Parameter Not Available' });
        }
        const data = await groupMemberModel.findOne({ _id: ID }).lean().exec();

        if (!data) {
            return res.json({ success: false, status: 'NOT_FOUND', msg: 'Group Member not found with the given ID' });
        }

        return res.json({ data: data, success: true, status: status.OK });
    }
    catch (err) {
        console.log("error", err);
        return res.json({ success: false, status: status.INVALIDSYNTAX, err: err, msg: 'Get Group Member failed.' });
    }

}

