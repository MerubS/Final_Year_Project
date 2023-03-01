import {Dialog, Button , DialogActions , DialogContent , Typography , TextField , DialogTitle, Grid, MenuItem} from '@mui/material';
import { margin } from '@mui/system';
import axios from 'axios';
import { useState , useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';

const Createtest = (props) => {
  const [examiner] = JSON.parse(localStorage.getItem('examiner'))
  const [rows,setrows] = useState([]);
  const [testdata , settestdata] = useState({examinerid:examiner.examiner_id , name:'' , description: '' , nquestions: 0 , difficulty: '' , timelimit:'' , unit:'' , selectedques:[]});
  const [errors, seterrors] = useState({nquestions: '' , timelimit:'' });
  const [disable , setdisable] = useState(false);
  const sendmessage = (show , message ) => props.callback( show , message)
  const onRowsSelectionHandler = (ids) => {
    const selectedRowsData = ids.map((id) => rows.find((row) => row.id === id));
    settestdata(prevState=>({
      ...prevState,
      selectedques : selectedRowsData
    }))
    console.log(selectedRowsData);
  };

  useEffect(() => {
    axios.get('/api/question/getAllQuestion', {params:{id:examiner.examiner_id}})
    .then(function (response) {
      setrows(response.data.output);
  
      }) }, []);
  const columns = [
      { field: 'question', headerName: 'Question', width: 300 },
      { field: 'difficulty', headerName: 'Difficulty', width: 130 },
    ];

const changehandler = (event) => {
  console.log(testdata)
  console.log(event.target.id)
  console.log(parseInt(event.target.value))
  console.log(testdata.selectedques.length)
  switch (event.target.id) {
    case 'nquestions':
    case 'timelimit': 
    if (event.target.value < 0 ) {seterrors(prevState=>({
        ...prevState, 
        [event.target.id] : 'Cannot be negative'
      }))
    setdisable(true)
    }
      else {seterrors(prevState=>({
        ...prevState, 
        [event.target.id] : ''
      }))
    setdisable(false)
  }
  }
       settestdata(prevState=>({
        ...prevState,
        [event.target.id] : event.target.value
       }));
}

useEffect(()=>{
  if (testdata.selectedques.length !== parseInt(testdata.nquestions)) {
    seterrors(prevState=>({
      ...prevState, 
      nquestions : 'Not equal to no.of selected questions'
    }))
  setdisable(true)
    }
  else {
    seterrors(prevState=>({
      ...prevState, 
      nquestions : ''
    }))
    setdisable(false)
  }
},[testdata.nquestions,testdata.selectedques])

const onSubmit = async () => {
 if (testdata.name !== '' && testdata.description !== '' && testdata.nquestions!=='' 
  && testdata.difficulty!=='' && testdata.timelimit!=='' && testdata.unit!==''){

    try {
      const resp = await axios.post('http://localhost:5000/api/test/CreateTest',testdata);
      console.log(resp.data.message);
      if (resp.data.message === 'Success') {
        sendmessage(true , true)
        props.setopen()
      }
     }
     catch (error) {
         console.log(error.response);
         sendmessage(true , false)
     }
  }
  else {
 console.log("Not complete");
}
}

return (
<Dialog
        open={props.open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle> Create Test </DialogTitle>
        <DialogContent>
            <form>
        <Grid container justifyContent="space-evenly">
            <TextField
              autoFocus
              margin="dense"
              id="name"
              fullWidth
              variant="outlined"
              label="Name"
              type="text"
              onChange={changehandler}
            /> 
        </Grid>    
        <Grid container justifyContent="space-evenly">
            <TextField
              autoFocus
              margin="dense"
              id="description"
              fullWidth
              variant="outlined"
              label= "Description"
              type="text"
              onChange={changehandler}
              multiline
            /> 
        </Grid>
       <Grid container justifyContent="space-evenly">
        <Grid item xs={5}>
        <TextField
              autoFocus
              error={errors.nquestions}
              helperText = {errors.nquestions}
              margin="dense"
              id="nquestions"
              fullWidth
              variant="outlined"
              label= "No.of Questions"
              type="number"
              onChange={changehandler}
            /> 
            <TextField
              autoFocus
              error={errors.timelimit}
              helperText = {errors.timelimit}
              margin="dense"
              id="timelimit"
              fullWidth
              variant="outlined"
              label= "Timelimit"
              type= "number"
              onChange={changehandler}
            />    
        </Grid>
        <Grid item xs={5}>
        <TextField
              autoFocus
              select
              margin="dense"
              id="difficulty"
              fullWidth
              variant="outlined"
              label= "Difficulty"
              onChange={changehandler}
              SelectProps={{
                native: true,
              }}
    
            >
        <option> Easy </option> 
        <option> Medium </option>
        <option> Hard </option>
        </TextField> 
           <TextField
              autoFocus
              select
              margin="dense"
              id="unit"
              fullWidth
              variant="outlined"
              label= "Unit"
              onChange={changehandler}
              SelectProps={{
                native: true,
              }}
            >
                 <option> hr </option> 
        <option> min </option>
                </TextField> 

        </Grid>
       </Grid>
       </form>
       <Grid container sx={{height:400,marginTop:3}}>
       <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        onSelectionModelChange={(ids) => onRowsSelectionHandler(ids)}
        checkboxSelection
        />
      </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant='contained' disabled={disable} onClick={onSubmit} style={{background: 'linear-gradient(to right bottom, #00264D, #02386E , #00498D)'}}>Submit</Button>
          <Button variant='contained' onClick={()=>{props.setopen()}} style={{background: 'linear-gradient(to right bottom, #00264D, #02386E , #00498D)'}}> Cancel </Button>
        </DialogActions>
      </Dialog>
  );
}

export default Createtest;