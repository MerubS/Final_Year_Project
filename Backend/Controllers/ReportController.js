const sql = require('mssql');
const { sqlConfig } = require("../config");
const _ = require('lodash');
const { Console } = require('winston/lib/winston/transports');

const UpdateReport = ((req,res)=> {
    let {tabChanges,resizes, question, answer, testid , canid , per_face , per_object  , per_gaze } = req.body;
    let enddate = new Date();
    console.log("Question is", question , req.body.question);
    console.log(req.body);
    console.log("BHAI ANSWER " + tabChanges.toString() + " " + resizes.toString())

    per_gaze = _.replace(per_gaze , new RegExp("\n","g") , ' , ')
    per_face = _.replace(per_face , new RegExp("\n","g") , ' , ')
    per_object = _.replace(per_object , new RegExp("\n","g") , ' , ')

    console.log(per_face , per_object , per_gaze );
    let totalquestion = question.length;
        let correctanswers = 0;
        let rans = '' ;
        answer.map((a)=>{
          rans = rans + a.value + '-' + a.id + ','    
          var r = question.find(item => item.question_id === a.id)
          if (r.answer == a.value) {
            correctanswers++
          }
        })
        // rans = 'abcd' 
      let score = (correctanswers/totalquestion)*100;
    try {
      sql.connect(sqlConfig)    
      .then(function () {
          console.log('CONNECTED');
          var req = new sql.Request();
          req.verbose = true;
          req.input('tid', testid )
          req.input('cid',  canid)
          req.input('rscore',  score )
          req.input('ranswers', rans )
          req.input('enddate',enddate)
          req.input('face',per_face)
          req.input('object',per_object)
          req.input('gaze',per_gaze)
          req.input('tabChanges', tabChanges.toString())
          req.input('resizes', resizes.toString())
          req.execute("UpdateReport" , (err,result) => {
            if (err) {
              console.log(err)}
            if (result !== undefined) {
              console.log("Recordset" , result.recordset);
            res.send({message: "Success"});  
            }
          })
    })
  }
    catch (error) {
      console.log(error)
      
    }
})

const getAllReport = ((req,res)=> {
    let examinerid = req.query.id;
    if (examinerid) {
    try {
      sql.connect(sqlConfig)    
      .then(function () {
          console.log('CONNECTED');
          var req = new sql.Request();
          req.verbose = true;
          req.input('eid', examinerid)
          req.execute("getAllReport" , (err,result) => {
            console.log("Recordset" , result.recordset);
            res.send({message: "Success", output:result.recordset});
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

const getReportbyId = ((req,res)=>{
  let testid = req.query.tid;
  let candidateid = req.query.cid;
  console.log(testid , candidateid);
  if (testid && candidateid) {
    try {
      sql.connect(sqlConfig)    
      .then(function () {
          console.log('CONNECTED');
          var req = new sql.Request();
          req.verbose = true;
          req.input('tid', testid)
          req.input('cid',candidateid)
          req.execute("getReportbyId" , (err,result) => {
            console.log("Recordset" , result.recordset);
            res.send({message: "Success", output:result.recordset});
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


module.exports = {
    UpdateReport,
    getAllReport,
    getReportbyId
}