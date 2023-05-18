var sql = require("mssql");
const { sqlConfig } = require("../config");
const service = require("../Utils");
const {logger} = require("./../logger/createLog")
// const winston = require("winston");

const Saveface_encoding = async (req,res)=>{
  let {encodings , cnic} = req.body;
  
  if (encodings) {
  try {
    sql.connect(sqlConfig)    
    .then(function () {
        console.log('CONNECTED');
        var req = new sql.Request();
        req.verbose = true;
        req.input('enc', encodings)
        req.input('cid', cnic)
        req.execute("SaveFaceEncoding" , (err,result) => {
          if (err) {console.log(err)}
          console.log(result.recordset , result.rowsAffected);
          res.send({message: "Success" });
        })
  })
}
  catch (error) {
    console.log(error)
  }
  }
  else {
    res.send({message:"Incomplete data"})
  }
}

const Getface_encoding = async (req,res)=>{
  let {cnic} = req.query;
  console.log(cnic);
 
  if (cnic) {
  try {
    sql.connect(sqlConfig)    
    .then(function () {
        console.log('CONNECTED');
        var req = new sql.Request();
        req.verbose = true;
        req.input('cid', cnic)
        req.execute("GetFaceEncoding" , (err,result) => {
          if (err) {console.log(err)}
          console.log(result.recordset , result.rowsAffected);
          res.send({message: "Success" , data: result.recordset });
        })
  })
}
  catch (error) {
    console.log(error)
  }
  }
  else {
    res.send({message:"Incomplete data"})
  }
}
 
const CreateCandidate = async (req,res)=>{
    let {registerdata , testdata } = req.body;
    console.log("Registerdata" , registerdata, "Testdata",testdata);
    let startdate = new Date();
    if (testdata.unit === 'min       ') {
       testdata.timelimit = testdata.timelimit/60000
    }
    else if (testdata.unit === 'hr       '){
      testdata.timelimit = testdata.timelimit/3600000
    }

    let enddate = service.getEndDate( startdate , testdata.timelimit , testdata.unit);
    enddate = new Date(enddate);
   
    if (registerdata.cnic && registerdata.name && registerdata.contact && registerdata.city && registerdata.email && registerdata.dob && registerdata.gender && registerdata.contact
      && testdata.test_id) {
    try {
      sql.connect(sqlConfig)    
      .then(function () {
          console.log('CONNECTED');
          var req = new sql.Request();
          req.verbose = true;
          req.input('cid', registerdata.cnic)
          req.input('bdate',  registerdata.dob)
          req.input('cname',  registerdata.name)
          req.input('cgender', registerdata.gender)
          req.input('contact' , registerdata.contact)
          req.input('ccity', registerdata.city)
          req.input('cemail', registerdata.email)
          req.input('tid', testdata.test_id)
          req.input('tstart', startdate)
          req.input('tend', enddate)
          req.execute("CreateCandidate" , (err,result) => {
            if (err) {console.log(err)}
            console.log(result.recordset , result.rowsAffected);
            res.send({message: "Success" });
          })
    })
  }
    catch (error) {
      console.log(error)
    }
    }
    else {
      res.send({message:"Incomplete data"})
    }
}

const SaveLogsOfCandidate = async (req , res)=>{
  const {body} = req;
  console.log("Body" , body)

  try {

    logger.log({
      method: req.method,
      level: 'info',
      message: body,
  })
  
    res.send({"message" : "Logs Generated"})

  } catch (error) {
    console.log('Error : ',error)
  }
}

module.exports = {
    CreateCandidate,
    SaveLogsOfCandidate,
    Getface_encoding,
    Saveface_encoding
}
