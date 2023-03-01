
app.get('/api/getAllTest', (req,res) => {
    try {sql.connect(sqlConfig)    
      .then(function () {
          console.log('CONNECTED');
          var req = new sql.Request();
          req.verbose = true;
          req.input('eid', 1)
          req.execute("getAllTest" , (err,result) => {
            console.log("Recordset" , result.recordset);
            res.send({message: "Success"});
          })
    })
  }
    catch (error) {
      console.log(error)
    }
  })
  
  app.post('/api/UpdateTest' , (req,res)=> {
    try {
      let {name , description, nquestions, difficulty,timelimit , unit , selectedques , test_id } = req.body;
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
            req.input('teid',  1)
          req.execute("UpdateTest" , (err,result) => {
            console.log("Recordset" , result.recordset);
            res.send({message: "Success"});
          })
    })
  }
    catch (error) {
      console.log(error)
    }
  })
  
  app.get('/api/DeleteTest' , (req,res) => {
    try {
      let testid = req.query.id;
      sql.connect(sqlConfig)    
      .then(function () {
          console.log('CONNECTED');
          var req = new sql.Request();
          req.verbose = true;
          req.input('tid', testid)
          req.input('eid', 1)
          req.execute("DeleteTest" , (err,result) => {
            if (err) {console.log(err);}
            console.log("Recordset" , result.recordset);
            res.send({message: "Success"});
          })
    })
  }
    catch (error) {
      console.log(error)
    }
  })
  
  app.post('/api/CreateTest', (req,res)=>{
    try {
      let {name , description, nquestions, difficulty,timelimit , unit , selectedques } = req.body;
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
          req.input('tid', 10)
          req.input('teid', 1)
          req.execute("CreateTest" , (err,result) => {
            if (err) {console.log(err);}
            console.log("Recordset" , result.recordset);
            res.send({message: "Success"});
          })
    })
  }
    catch (error) {
      console.log(error)
    }
  })
  
  app.get('/api/getTestbyId' , (req,res)=>{
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
            res.send({message: "Success"});
          })
    })
  }
    catch (error) {
      console.log(error)
    }
  })
  
  app.get('/api/getAllQuestion', (req,res) => {
    try {sql.connect(sqlConfig)    
      .then(function () {
          console.log('CONNECTED');
          var req = new sql.Request();
          req.verbose = true;
          req.input('eid' , 2)
          req.execute("getAllQuestion" , (err,result) => {
            console.log("Recordset" , result.recordset);
            res.send({message: "Success"});
          })
    })
  }
    catch (error) {
      console.log(error)
    }
  })
  
  app.post('/api/UpdateQuestion', (req,res)=>{
    try {
      let {question_id , question , answer , difficulty , option1 , option2 , option3 , option4 } = req.body;
      let options = option1.concat(",",option2).concat(",",option3).concat(",",option4);
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
          req.input('eid', 1)
          req.execute("UpdateQuestion" , (err,result) => {
            console.log("Recordset" , result.recordset);
            res.send({message: "Success"});
          })
    })
  }
    catch (error) {
      console.log(error)
    }
  })
  
  app.get('/api/DeleteQuestion', (req,res)=>{
    let questionid = req.query.id;
    try {
      sql.connect(sqlConfig)    
      .then(function () {
          console.log('CONNECTED');
          var req = new sql.Request();
          req.verbose = true;
          req.input('qid', questionid)
          req.input('eid' , 1)
          req.execute("DeleteQuestion" , (err,result) => {
            console.log("Recordset" , result.recordset);
            res.send({message: "Success"});
          })
    })
  }
    catch (error) {
      console.log(error)
    }
  })
  
  app.post('/api/CreateQuestion', (req,res) => {
    let {question , difficulty , option1, option2,option3 , option4 , answer} = req.body;
    let options = option1.concat(",",option2).concat(",",option3).concat(",",option4)
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
          req.input('qid', 11)
          req.input('eid', 1)
          req.execute("CreateQuestion" , (err,result) => {
            console.log("Recordset" , result.recordset);
            res.send({message: "Success"});
          })
    })
  }
    catch (error) {
      console.log(error)
    }
  }) 
  
  app.get('/api/getQuestionbyId', (req,res)=> {
    let questionid = req.query.id;
    try {
      sql.connect(sqlConfig)    
      .then(function () {
          console.log('CONNECTED');
          var req = new sql.Request();
          req.verbose = true;
          req.input('qid',questionid)
          req.input('eid', 1)
          req.execute("getQuestionbyId" , (err,result) => {
            console.log("Recordset" , result.recordset);
            res.send({message: "Success"});
          })
    })
  }
    catch (error) {
      console.log(error)
    }
  })
  
  app.get('/api/getAllReport',(req,res)=> {
    let examinerid = req.query.id;
    try {
      sql.connect(sqlConfig)    
      .then(function () {
          console.log('CONNECTED');
          var req = new sql.Request();
          req.verbose = true;
          req.input('eid', examinerid)
          req.execute("getAllReport" , (err,result) => {
            console.log("Recordset" , result.recordset);
            res.send({message: "Success"});
          })
    })
  }
    catch (error) {
      console.log(error)
    }
  })
  
  app.post('/api/CreateCandidate', (req,res)=>{
    let {cnic , name , city , email , contact , dob , gender } = req.body;
    try {
      sql.connect(sqlConfig)    
      .then(function () {
          console.log('CONNECTED');
          var req = new sql.Request();
          req.verbose = true;
          req.input('cid', sql.Numeric , cnic)
          req.input('bdate', sql.Date , dob)
          req.input('cname', sql.NVarChar(30), name)
          req.input('cgender',sql.Char(1), gender)
          req.input('ccity', sql.NVarChar(30), city)
          req.input('cemail',sql.NVarChar(50),email)
          req.execute("CreateCandidate" , (err,result) => {
            console.log("Recordset" , result.recordset);
            res.send({message: "Success"});
          })
    })
  }
    catch (error) {
      console.log(error)
    }
  })
  
  app.post('/api/CreateReport',(req,res)=> {
    let {question, answers, testid , canid } = req.body;
    let totalquestion = question.length;
        let correctanswers = 0;
        let rans ;
        answers.map((a)=>{
          rans = a.value + '' + a.id + ','    
          var r = question.find(item => item.question_id[0] === a.id)
          if (r.answer == a.value) {
            correctanswers++
          }
        })
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
          req.execute("CreateCandidate" , (err,result) => {
            console.log("Recordset" , result.recordset);
            res.send({message: "Success"});
          })
    })
  }
    catch (error) {
      console.log(error)
    }
  })