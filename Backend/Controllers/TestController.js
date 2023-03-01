var sql = require("mssql");
const { sqlConfig } = require("../config");
const services = require("../Utils");

const getAllTest = ((req,res)=>{
    const examinerid = req.query.id;
    if (examinerid) {
    try {sql.connect(sqlConfig)    
        .then(function () {
            console.log('CONNECTED');
            var req = new sql.Request();
            req.verbose = true;
            req.input('eid', examinerid)
            req.execute("getAllTest" , (err,result) => {
                console.log("Recordset" , result.recordset);
                res.send({message: "Success", output: result.recordset}); 
            })
      })
    }
      catch (error) {
        console.log(error)
      }
    }
})

const getTestbyId = ((req,res)=>{
    try {
    let testid = req.query.id;
    console.log(testid)
    sql.connect(sqlConfig)    
    .then(function () {
        console.log('CONNECTED');
        var req = new sql.Request();
        req.verbose = true;
        req.input('tid',  testid)
        req.execute("getTestbyId" , (err,result) => {
          if (err) {console.log(err);}
          console.log("Recordset" , result.recordset);
          res.send({message: "Success", output:result.recordset});
        })
  })
}
  catch (error) {
    console.log(error)
  }})

const CreateTest = ((req,res)=>{
  let {name , description, nquestions, difficulty,timelimit , unit , selectedques , examinerid } = req.body;
  console.log(selectedques);
  if (name && description && nquestions && difficulty && timelimit && unit && selectedques && examinerid) {
    try {
        
        sql.connect(sqlConfig)    
        .then(function () {
            console.log('CONNECTED');
            var req = new sql.Request();
            req.verbose = true;
            req.input('tname',name)
            req.input('tdes',  description)
            req.input('tnques',  nquestions)
            req.input('tdifficulty',difficulty)
            req.input('ttlimit',timelimit)
            req.input('tunit', unit)
            req.input('tstatus','created')
            req.input('teid', examinerid)
            req.execute("CreateTest" , (err,result) => {
              if (err) {console.log(err);}
              console.log("Recordset" , result);
              selectedques.map((ques)=>{
                req.query(`INSERT INTO TestContains (test_id,question_id) VALUES (${result.returnValue},${ques.id})`,(err,result)=>{
                  console.log(result);
                });
              })
              res.send({message: "Success"});
            })

      })
    }
      catch (error) {
        console.log(error)
      }
    }
    else {
      res.send({message:"Incomplete data"});
    }
})

const UpdateTest = ((req,res)=> {
  let {name , description, nquestions, difficulty,timelimit , unit , selectedques , test_id , examinerid } = req.body;
  console.log(name , description, nquestions, difficulty,timelimit , unit , selectedques , test_id , examinerid);
  if (name && description && nquestions && difficulty && timelimit && test_id && examinerid) {
    try {
        sql.connect(sqlConfig)    
        .then(function () {
            console.log('CONNECTED');
            var req = new sql.Request();
            req.verbose = true;
            req.input('tname', name)
              req.input('tdes', description)
              req.input('tnques', nquestions)
              req.input('tdifficulty', difficulty)
              req.input('ttlimit', timelimit)
              req.input('tunit', unit)
              req.input('tstatus', 'created')
              req.input('tid', test_id)
              req.input('teid',  examinerid)
            req.execute("UpdateTest" , (err,result) => {
              if (err) {
                console.log(err);
              }
              else {
              console.log("Recordset" , result.recordset);
              res.send({message: "Success"});
        }})
      })
    }
      catch (error) {
        console.log(error)
      }
  }
  else {
    res.send({message:"Incomplete Data"});
  }
})

const DeleteTest = ((req,res)=>{
    let testid = req.query.tid;
    let examinerid = req.query.eid;
    console.log(testid, examinerid)
    if (testid && examinerid) {
    try {
      sql.connect(sqlConfig)    
      .then(function () {
          console.log('CONNECTED');
          var req = new sql.Request();
          req.verbose = true;
          req.input('tid', testid)
          req.input('eid' , examinerid)
          req.execute("DeleteTest" , (err,result) => {
            console.log("Recordset" , result.recordset);
            res.send({message: "Success"});
          })
    })
  }
    catch (error) {
      console.log(error)
    }
  }
  else {
    console.log("Not enough data");
  }
})

const UpdateTestStatus = ((req,res)=>{
  const {status, timelimit , unit , test_id} = req.body;
  let start_date
  let end_date
  if (status === 'started') {
    start_date = new Date();
    end_date = services.getEndDate(start_date,timelimit,unit);
    console.log("started", timelimit , unit, start_date , end_date , test_id);

  }
  try {
    sql.connect(sqlConfig)    
    .then(function () {
        console.log('CONNECTED');
        var req = new sql.Request();
        req.verbose = true;
        req.input('tid', test_id)
        req.input('status' , status)
        req.input('startdate', start_date)
        req.input('enddate',end_date)
        req.execute("UpdateStatusStarted" , (err,result) => {
          console.log("Recordset" , result.recordset);
          res.send({message: "Success"});
        })
  })
}
  catch (error) {
    console.log(error)
  }
  
  }

)

module.exports = {
    getAllTest,
    getTestbyId,
    CreateTest,
    UpdateTest,
    DeleteTest,
    UpdateTestStatus
}