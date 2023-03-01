var sql = require("mssql");
const { sqlConfig } = require("../config");

const getExaminerbyId = ((req,res)=>{
    let {examinerid , password} = req.body
    try {
      sql.connect(sqlConfig)    
      .then(function () {
          console.log('CONNECTED');
          var req = new sql.Request();
          req.verbose = true;
          req.input('eid', examinerid)
          req.input('pass', password)
          req.execute("getExaminerbyId" , (err,result) => {
            if (result.recordset) {
            console.log("Recordset" , result.recordset);
            }
            res.send({message: "Success" , output: result.recordset});
          })
    })
  }
    catch (error) {
      console.log(error)
    }
})

module.exports = {
    getExaminerbyId
}