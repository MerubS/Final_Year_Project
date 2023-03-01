var sql = require("mssql");
const { sqlConfig } = require("../config");

const getAllQuestion = ((req,res)=>{
   let examinerid = req.query.id;
   console.log(examinerid);
    try {
      sql.connect(sqlConfig)    
        .then(function () {
            console.log('CONNECTED');
            var req = new sql.Request();
            req.verbose = true;
            req.input('eid' , examinerid)
            req.execute("getAllQuestion" , (err,result) => {
              if (result !== undefined) {
                res.send({message: "Success", output: result.recordset});
              }
            })
      })
    }
      catch (error) {
        console.log(error)
      }
})

const getQuestionbyTestId = ((req,res)=> {
  let testid = req.query.id;
  try {
    sql.connect(sqlConfig)    
    .then(function () {
        console.log('CONNECTED');
        var req = new sql.Request();
        req.verbose = true;
        req.input('tid',testid)
        req.execute("getQuestionbyTestId" , (err,result) => {
          console.log("Recordset" , result.recordset);
          res.send({message: "Success", output:result.recordset});
        })
  })
}
  catch (error) {
    console.log(error)
  }
})

const getQuestionbyId = ((req,res)=>{
    let questionid = req.query.qid;
    let examinerid = req.query.eid
    try {
      sql.connect(sqlConfig)    
      .then(function () {
          console.log('CONNECTED');
          var req = new sql.Request();
          req.verbose = true;
          req.input('qid',questionid)
          req.input('eid', examinerid)
          req.execute("getQuestionbyId" , (err,result) => {
            console.log("Recordset" , result.recordset);
            res.send({message: "Success", output:result.recordset});
          })
    })
  }
    catch (error) {
      console.log(error)
    }
})

const CreateQuestion = ((req,res)=>{
    let {question , difficulty , option1, option2,option3 , option4 , answer , examinerid} = req.body;
    let options = option1.concat(",",option2).concat(",",option3).concat(",",option4)
    if (question && difficulty && answer && options && examinerid) {
    try {
      sql.connect(sqlConfig)    
      .then(function () {
          console.log('CONNECTED');
          var req = new sql.Request();
          req.verbose = true;
          req.input('qquestion',question)
          req.input('qdifficulty', difficulty)
          req.input('qoptions', options)
          req.input('qanswer',answer)
          req.input('eid', examinerid)
          req.execute("CreateQuestion" , (err,result) => {
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
      res.send({message:"Imcomplete data"});
    }
})

const UpdateQuestion = ((req,res)=>{
  let {question_id , question , answer , difficulty , option1 , option2 , option3 , option4 } = req.body;
  let options = option1.concat(",",option2).concat(",",option3).concat(",",option4);
  if (question_id , question , answer , difficulty , options) {
    try {
        sql.connect(sqlConfig)    
        .then(function () {
            console.log('CONNECTED');
            var req = new sql.Request();
            req.verbose = true;
            req.input('qquestion',question)
            req.input('qdifficulty', difficulty)
            req.input('qoptions', options)
            req.input('qanswer',answer)
            req.input('qid',question_id)
            req.execute("UpdateQuestion" , (err,result) => {
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
      res.send({message:"Incomplete data"});
    }
})

const DeleteQuestion = ((req,res)=>{
    let questionid = req.query.qid;
    let examinerid = req.query.eid;
    if (questionid && examinerid) {
    try {
      sql.connect(sqlConfig)    
      .then(function () {
          console.log('CONNECTED');
          var req = new sql.Request();
          req.verbose = true;
          req.input('qid', questionid)
          req.input('eid' , examinerid)
          req.execute("DeleteQuestion" , (err,result) => {
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
    res.send({message:"Incomplete data"});
  }
})

module.exports = {
    getAllQuestion,
    getQuestionbyId,
    CreateQuestion,
    UpdateQuestion,
    DeleteQuestion,
    getQuestionbyTestId
}