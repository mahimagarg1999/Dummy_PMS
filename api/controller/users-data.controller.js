const usersDataModel = require("../model/users-data.model")
const status = require("../config/status");


//add users
exports.add = async (req, res) => {
        try {
            var obj = {
                username: req.body.username,
                age:req.body.age,
                hobbies:req.body.hobbies,
                role:req.body.role

            }
            const newusersDataModel = new usersDataModel(obj);
            let result = await newusersDataModel.save();
            res.json({ success: true, status: status.OK, msg: 'Users is created successfully.' });

        }
        catch (err) {
            // return res.json({ success: false, status: status.INVALIDSYNTAX, err: err, msg: 'Save Users failed.' });
            return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Save Users failed.' });

        }
}


//update by id
exports.update = async (req, res) => {
        var id = req.query.userid;
        if (id === undefined) {
            return res.json({ success: false, status: status.NOTFOUND, msg: 'Id Parameter Not Available' });
        }
        delete req.query.userid;
        try {
            let result = await usersDataModel.findOneAndUpdate(
                { _id: id },
                {
                    $set: {
                        username: req.body.username,
                        age:req.body.age,
                        hobbies:req.body.hobbies,
                        role:req.body.role
                    }
                },
            ).lean().exec();

            if (result) {
                res.json({ success: true, status: status.OK, msg: 'Users is updated successfully.' });
            }
            else {
                return res.json({ success: false, status: status.NOTFOUND, msg: 'Users Id not found' });
            }
        }
        catch (err) {
            // return res.json({ success: false, status: status.INVALIDSYNTAX, err: err, msg: 'Update User failed.' });
            return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Update User failed.' });

        }
}

//get all users
exports.get = async (req, res) => {
        try {
            const data = await usersDataModel.find({}).sort({ alias: 1 }).lean().exec();
            return res.json({ data: data, success: true, status: status.OK });
        }
        catch (err) {
            // return res.json({ success: false, status: status.INVALIDSYNTAX, err: err, msg: 'Get Users failed.' });
            return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Get Users failed.' });

        }
}

//delete user by id
exports.delete = async (req, res) => {
        try {
            const ID = req.query.userid;
            if (ID === undefined) { 
                return res.json({ success: false, status: status.NOTFOUND, msg: 'Id Parameter Not Available' });
            }
            let result = await usersDataModel.findOneAndDelete({ _id: ID }).lean().exec();
            if (result) {
                res.json({ success: true, status: status.OK, msg: 'Users Message is Deleted successfully.' });
            }
            else {
                return res.json({ success: false, status: status.NOTFOUND, msg: 'Users Id not found' });
            }
        }
        catch (err) {
            // return res.json({ success: false, status: status.INVALIDSYNTAX, err: err, msg: 'Delete Users Message failed.' });
            return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Delete Users Message failed.' });

        } 
}



exports.getUsersById = async (req, res) => {
        try {
            let userid = req.query.userid;
            // const ID = req.query.userid;
        if (userid === undefined) { 
            return res.json({ success: false, status: status.NOTFOUND, msg: 'Id Parameter Not Available' });
        }
            const data = await usersDataModel.findOne({ _id: userid }).lean().exec();
            return res.json({ data: data, success: true, status: status.OK });
        }
        catch (err) {
            console.log("error",err);
            return res.json({ success: false, status: status.INVALIDSYNTAX, err: err, msg: 'Get User failed.' });
        }
   
}

// ==========self
// if (!ID) {
//     return res.json({  success: false, status: status.NOTFOUND, msg: 'Id Parameter Not Available'});
// }

// if (!uuidValidate(ID)) {
//     return res.json({ success: false, status:status.INVALIDSYNTAX, msg: 'Invalid userId. Please provide a valid UUID.' });
// }