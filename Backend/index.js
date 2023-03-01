const express = require("express");
const PORT = process.env.PORT || 5000;
const app = express();
const databsase = require("./database"); 
const reportroute = require("./Routes/Report.js");
const questionroute = require("./Routes/Question.js");
const candidateroute = require("./Routes/Candiate");
const testroute = require("./Routes/Test");
const examinerroute = require("./Routes/Examiner");
var cors = require('cors')


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
  databsase.databaseconnection();
});

app.use(cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.json());
app.use('/api/report',reportroute);
app.use('/api/question', questionroute);
app.use('/api/candidate', candidateroute);
app.use('/api/examiner', examinerroute);
app.use('/api/test' , testroute);
