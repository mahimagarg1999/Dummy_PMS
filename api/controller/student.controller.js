const stdmodel = require("../model/student.model")
const fs = require('fs')
const status = require("../config/status")


exports.get = async (req, res) => {
    try {
        const data = await stdmodel.find({}).sort({ created_at: 1 }).lean().exec();
        return res.json({ data: data, success: true, status: 200 });
    }
    catch (err) {
        return res.json({ success: false, status: status.INVALIDSYNTAX, err: err, msg: 'Get role failed.' });
    }
}

exports.add = async (req, res) => {
    var obj = {
        student_id: req.body.student_id,
        student_name: req.body.student_name,
        dob: req.body.dob,
        doj: req.body.doj, 
        fee: req.body.fee,
        gender: req.body.gender,
    }
    const newstdmodel = new stdmodel(obj);

    try {
        let result = await newstdmodel.save();
        res.json({ success: true, status: 200, result: result })
    } catch (err) {

        console.log("err", err)
    }
}

exports.update = async(req, res) => {
 var id = req.body.id;
 if(id === undefined){
    return res.json({ success: false, status: status.NOTFOUND, msg: 'Id Parameter Not Available' });
 }
 delete req.body.id;
 try{
    let result = await stdmodel.findOneAndUpdate({_id:id},{$set:{
        student_id: req.body.student_id,
        student_name: req.body.student_name,
        dob: req.body.dob,
        doj: req.body.doj, 
        fee: req.body.fee,
        gender: req.body.gender,
    }
    }).lean().exec();
    if(result){
        res.json({success:true, status:status.OK, msg:'Student is update successful'})
    }
    else{
        res.json({success:false, status:status.NOTFOUND, msg:'student id not found'})
    }
}
 catch (err){
    res.json({success:false, status:status.INVALIDSYNTAX, msg:'update student failed'})


 }
}

exports.delete = async(req,res) => {
    try{
const id = req.query.id;
if(id === undefined){
    return res.json({success:false, status:status.NOTFOUND, msg:"Id parameter not available"});
}
let result = await stdmodel.findOneAndDelete({_id:id}).lean().exec();
if(result){
    res.json({ success: true, status: status.OK, msg: 'Student Message is Deleted successfully.' });

}else{
    return res.json({ success: false, status: status.INVALIDSYNTAX, err: err, msg: 'Delete Student Message failed.' });

}

    }catch(err){
        return res.status(403).send({ success: false, status: status.UNAUTHORIZED, msg: 'Unauthorized.' });

    }
}