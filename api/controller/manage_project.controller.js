const manageProjectModel = require("../model/manage_project.model")
const status = require("../config/status");

//add users
exports.add = async (req, res) => {
    try {
        var obj = {

            project_name: req.body.project_name,
            description: req.body.description,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            project_manager: req.body.project_manager,
            team_members: req.body.team_members,
            domain: req.body.domain

        }
        const newmanageProjectModel = new manageProjectModel(obj);
        let result = await newmanageProjectModel.save();
        res.json({ success: true, status: status.OK, msg: 'Adding Project is successfully.' });

    }
    catch (err) {
        // return res.json({ success: false, status: status.INVALIDSYNTAX, err: err, msg: 'Save Users failed.' });
        return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Adding Project  failed.' });

    }
}


//update by id
exports.update = async (req, res) => {
    var id = req.body.id;
    if (id === undefined) {
        return res.json({ success: false, status: status.NOTFOUND, msg: 'Id Parameter Not Available' });
    }
    delete req.query.id;
    try {
        let result = await manageProjectModel.findOneAndUpdate(
            { _id: id },
            {
                $set: {
                    project_name: req.body.project_name,
                    description: req.body.description,
                    startDate: req.body.startDate,
                    endDate: req.body.endDate,
                    project_manager: req.body.project_manager,
                    team_members: req.body.team_members,
                    domain: req.body.domain
                }
            },
        ).lean().exec();

        if (result) {
            res.json({ success: true, status: status.OK, msg: 'Project is updated successfully.' });
        }
        else {
            return res.json({ success: false, status: status.NOTFOUND, msg: 'Project Id not found' });
        }
    }
    catch (err) {
        // return res.json({ success: false, status: status.INVALIDSYNTAX, err: err, msg: 'Update User failed.' });
        return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Update Project failed.' });

    }
}

//get all users
exports.get = async (req, res) => {
    try {
        // const data = await manageProjectModel.find({}).sort({ alias: 1 }).lean().exec();
        const data = await manageProjectModel.find({}).lean().exec();

        return res.json({ data: data, success: true, status: status.OK });
    }
    catch (err) {
        // return res.json({ success: false, status: status.INVALIDSYNTAX, err: err, msg: 'Get Users failed.' });
        return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Get Project failed.' });

    }
}

//delete user by id
exports.delete = async (req, res) => {
    try {
        const ID = req.query.id;
        if (ID === undefined) {
            return res.json({ success: false, status: status.NOTFOUND, msg: 'Id Parameter Not Available' });
        }
        let result = await manageProjectModel.findOneAndDelete({ _id: ID }).lean().exec();
        if (result) {
            res.json({ success: true, status: status.OK, msg: 'Project is Deleted successfully.' });
        }
        else {
            return res.json({ success: false, status: status.NOTFOUND, msg: 'Project Id not found' });
        }
    }
    catch (err) {
        // return res.json({ success: false, status: status.INVALIDSYNTAX, err: err, msg: 'Delete Users Message failed.' });
        return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Delete Project Message failed.' });

    }
}

exports.getProjectById = async (req, res) => {
    try {
        let ID = req.query.id;
        if (ID === undefined) {
            return res.json({ success: false, status: status.NOTFOUND, msg: 'Id Parameter Not Available' });
        }
        const data = await manageProjectModel.findOne({ _id: ID }).lean().exec();

        if (!data) {
            return res.json({ success: false, status: 'NOT_FOUND', msg: 'Project not found with the given ID' });
        }

        return res.json({ data: data, success: true, status: status.OK });
    }
    catch (err) {
        console.log("error", err);
        return res.json({ success: false, status: status.INVALIDSYNTAX, err: err, msg: 'Get User failed.' });
    }

}




exports.deleteTest = async (req, res) => {
    try {
        const project_manager = req.body.project_manager;
        const domain = req.body.domain;

        // Assuming you have a method in your model to find and delete the project
        let result = await manageProjectModel.findOneAndDelete({ project_manager, domain });

        if (result) {
            res.json({ success: true, status: status.OK, msg: 'Deleting Project is successful.' });
        } else {
            res.json({ success: false, status: status.NOT_FOUND, msg: 'Project not found.' });
        }
    } catch (err) {
        console.log("err",err);
        return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Deleting Project failed.' });
    }
};
