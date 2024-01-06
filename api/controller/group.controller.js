const groupModel = require("../model/group.model")
const fs = require('fs')
const status = require("../config/status")


exports.get = async (req, res) => {
    try {
        const data = await groupModel.find({}).sort({ created_at: 1 }).lean().exec();
        return res.json({ data: data, success: true, status: 200 });
    }
    catch (err) {
        console.log("group-get", err)
        return res.json({ success: false, status: status.INVALIDSYNTAX, err: err, msg: 'Get group failed.' });
    }
}

// exports.add = async (req, res) => {
//     console.log("mahima garg")
//     var obj = {
//         group_name: req.body.group_name,
//         group_member: req.body.group_member
//     }
//     const newgroupModel = new groupModel(obj);

//     try {
//         let result = await newgroupModel.save();
//         res.json({ success: true, status: 200, result: result })
//     } catch (err) {

//         console.log("err", err)
//         return res.json({ success: false, status: statusCode.INVALIDSYNTAX, err: e, msg: 'Error in adding group.' });
//     }
// }
// exports.add = async (req, res) => {
//     try {
//         var obj = {

//             group_name: req.body.group_name,
//             group_member: req.body.group_member,


//         }
//         const newgroupModel = new groupModel(obj);
//         let result = await newgroupModel.save();
//         res.json({ success: true, status: status.OK, msg: 'Adding group is successfully.' });

//     }
//     catch (err) {
//         // return res.json({ success: false, status: status.INVALIDSYNTAX, err: err, msg: 'Save Users failed.' });
//         return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Adding Group  failed.' });

//     }
// }




exports.add = async (req, res) => {
    const obj = {
        group_name: req.body.group_name,
        group_member: req.body.group_member
    };

    try {
        // Check if a group with the same name and member already exists
        const existingGroup = await groupModel.findOne({
            group_name: obj.group_name,
            group_member: obj.group_member
        });

        if (existingGroup) {
            return res.json({
                success: false,
                status: status.DUPLICATE_ENTRY,
                msg: 'Group with the same name and member already exists.'
            });
        }

        const newGroupModel = new groupModel(obj);
        const result = await newGroupModel.save();
        res.json({ success: true, status: 200, result: result, msg: 'Add Group Successfully ' });
    } catch (err) {
        console.error('Error in adding group:', err);
        return res.json({
            success: false,
            status: statusCode.INVALIDSYNTAX,
            err: err,
            msg: 'Error in adding group.'
        });
    }
};


exports.update = async (req, res) => {
    console.log("req.body", req.body)
    var id = req.body.id;
    console.log(id)
    if (id === undefined) {
        return res.json({ success: false, status: status.NOTFOUND, msg: 'Id Parameter Not Available' });
    }
    delete req.body.id;
    try {
        let result = await groupModel.findOneAndUpdate({ _id: id }, {
            $set: {
                group_name: req.body.group_name,
                group_member: req.body.group_member
            }
        }).lean().exec();
        if (result) {
            console.log(result)
            res.json({ success: true, status: status.OK, msg: 'Group is update successful' })
        }
        else {
            res.json({ success: false, status: status.NOTFOUND, msg: 'Group id not found' })
        }
    }
    catch (err) {
        res.json({ success: false, status: status.INVALIDSYNTAX, msg: 'update Group failed' })


    }
}

exports.delete = async (req, res) => {
    try {
        const id = req.query.id;
        if (id === undefined) {
            return res.json({ success: false, status: status.NOTFOUND, msg: "Id parameter not available" });
        }
        let result = await groupModel.findOneAndDelete({ _id: id }).lean().exec();
        if (result) {
            res.json({
                success: true, status: status.OK, msg: 'Group Message is Deleted successfully.'
            });

        } else {
            return res.json({ success: false, status: status.INVALIDSYNTAX, err: err, msg: 'Delete Group Message failed.' });

        }

    } catch (err) {
        return res.status(403).send({ success: false, status: status.UNAUTHORIZED, msg: 'Unauthorized.' });

    }
}

exports.getGroupsById = async (req, res) => {
    try {
        let id = req.query.id;
        // const ID = req.query.userid;
        if (id === undefined) {
            return res.json({ success: false, status: status.NOTFOUND, msg: 'Id Parameter Not Available' });
        }
        const data = await groupModel.findOne({ _id: id }).lean().exec();
        if (!data) {
            return res.json({ success: false, status: 'NOT_FOUND', msg: 'Group not found with the given ID' });
        }
        return res.json({ data: data, success: true, status: status.OK });
    }
    catch (err) {
        console.log("error", err);
        return res.json({ success: false, status: status.INVALIDSYNTAX, err: err, msg: 'Get Group failed.' });
    }

}


exports.getGroupMember = async (req, res) => {
    try {
        const data = await groupModel.find({}).sort({ created_at: 1 }).select('group_member').lean().exec();
        return res.json({ data: data, success: true, status: 200 });
    }
    catch (err) {
        console.log("group-get", err)
        return res.json({ success: false, status: status.INVALIDSYNTAX, err: err, msg: 'Get group failed.' });
    }
}

