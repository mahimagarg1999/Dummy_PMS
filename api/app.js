const express = require('express');
// const router = require('.routes');
const router = require('./routes');
// import bodyParser from 'body-parser'
const bodyParser = require('body-parser')
const cors  = require('cors');
const studentRoute = require("./routes/student.route")
const mongoose = require('mongoose');
const app = express();
const port = 5000;
const { MongoClient } = require('mongodb');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({"extended":true}))
app.use(cors())
app.use('/api', router);

mongoose.connect('mongodb://localhost:27017/student', {
  useNewUrlParser: true,
  serverSelectionTimeoutMS: 30000, // Set a higher timeout value (e.g., 30 seconds)
});

app.listen(port, () => {
   console.log(`Example app listening at http://localhost:${port}`)
})



