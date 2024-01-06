var jwt = require('jsonwebtoken');
require('dotenv').config();

const authentication = (req, res, next) => {
    // get the user from the jwt token and add id to req object
    const token = req.header('authorization')
    if (!token) {
        res.status(401).send({ error: "please authenticate using a valid token " })
    }
try{ const data = jwt.verify(token, process.env.JWT_SECRET_CODE);

    req.user = data.user
    next();}
catch(error){
    res.status(401).send({ error: "please authenticate using a valid token " })}
}
module.exports = authentication