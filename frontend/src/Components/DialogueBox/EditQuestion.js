import {Dialog, Button , DialogActions , DialogContent , TextField , DialogTitle, Grid, MenuItem, Checkbox, tabScrollButtonClasses} from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';

const EditQuestion = (props) => {
  const chars = props.row.options.split(',');
  const [questiondata,setquestiondata] = useState({question_id:props.row.id , question:props.row.question , difficulty: props.row.difficulty  , answer:props.row.answer , option1: chars[0] ,  option2: chars[1],  option3: chars[2],  option4: chars[3] })
  const sendmessage = (show , message ) => props.callback( show , message)
  const onChangeHandler = (event) => {
    setquestiondata(prevState=>({
      ...prevState,
      [event.target.id] : event.target.value
    }))
  }
  const onCheckHandler = (event) => {
    let lanswer;
    if (event.target.checked){
      switch (event.target.id) {
        case 'checkbox1':
          lanswer = questiondata.option1;
        break;
        case 'checkbox2':
          lanswer = questiondata.option2;
        break;
        case 'checkbox3':
          lanswer = questiondata.option3;
        break;
        case 'checkbox4':
          lanswer = questiondata.option4;
      }
      setquestiondata(prevState=>({
        ...prevState,
        answer : lanswer
      }))
  }}
 
  useEffect(()=>{
  console.log(questiondata);
  },[questiondata])
 
 
  const onSubmit = async () =>{
    if (questiondata.question !== '' && questiondata.difficulty !== '' && questiondata.option1 !== '' &&
    questiondata.option2 !== '' && questiondata.option3 !== '' && questiondata.option4 !== '' ){
      try {
        const resp = await axios.post('http://localhost:5000/api/question/UpdateQuestion',questiondata);
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
      console.log("Incomplete");
    }
  }
 
 
  return (
    <Dialog
    open={props.open}
    // onClose={handleClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle> Edit Test </DialogTitle>
    <DialogContent>
        <form>
    <Grid container justifyContent="space-evenly">
        <TextField
          autoFocus
          margin="dense"
          id="question"
          fullWidth
          value={questiondata.question}
          variant="outlined"
          label="Question"
          onChange={onChangeHandler}
        /> 
    </Grid>    
    <Grid container justifyContent="space-evenly">
        <TextField
          autoFocus
          margin="dense"
          id="difficulty"
          fullWidth
          variant="outlined"
          label= "Difficulty"
          sele
          defaultValue={questiondata.difficulty}
          onChange={onChangeHandler}
          SelectProps={{
            native: true,
          }}
          select 
        >
            <option> Easy </option>
            <option> Medium </option>
            <option> Hard </option>
            </TextField> 
    </Grid>
    <Grid container sx={{padding:'10px'}}>
      <Grid xs={9}>
      <TextField
          autoFocus
          margin="dense"
          id="option1"
          fullWidth
          variant="standard"
          value={questiondata.option1}
          label= "Option1"
          onChange={onChangeHandler}
        /> 
      </Grid>
      <Grid xs = {2}>
      <Checkbox
      onChange={onCheckHandler}
      id="checkbox1"
      checked={questiondata.option1 == questiondata.answer? true : false}
      sx={{marginTop:'15px'}}
      />
      </Grid>
      <Grid xs={9}>
      <TextField
          autoFocus
          margin="dense"
          id="option2"
          fullWidth
          variant="standard"
          value={questiondata.option2}
          label= "Option2"
          onChange={onChangeHandler}
        /> 
      </Grid>
      <Grid xs = {2}>
      <Checkbox
      id="checkbox2"
      onChange={onCheckHandler}
      checked={questiondata.option2 == questiondata.answer? true : false}
      sx={{marginTop:'15px'}}
      />
      </Grid>
      <Grid xs={9}>
      <TextField
          autoFocus
          margin="dense"
          id="option3"
          fullWidth
          variant="standard"
          label= "Option3"
          value={questiondata.option3}
          onChange={onChangeHandler}
        /> 
      </Grid>
      <Grid xs = {2}>
      <Checkbox
      id="checkbox3"
      checked={questiondata.option3 == questiondata.answer? true : false}
      onChange={onCheckHandler}
      sx={{marginTop:'15px'}}
      />
      </Grid>
      <Grid xs={9}>
      <TextField
          autoFocus
          margin="dense"
          id="option4"
          fullWidth
          variant="standard"
          label= "Option4"
          value={questiondata.option4}
          onChange={onChangeHandler}
        /> 
      </Grid>
      <Grid xs = {2}>
      <Checkbox
      id="checkbox4"
      onChange={onCheckHandler}
      checked={questiondata.option4 === questiondata.answer? true : false}
      sx={{marginTop:'15px'}}
      />
      </Grid>
    </Grid>
   </form>
   </DialogContent>
   <DialogActions>
          <Button variant='contained' onClick={onSubmit} style={{background: 'linear-gradient(to right bottom, #00264D, #02386E , #00498D)'}}>Submit</Button>
          <Button variant='contained'  onClick={()=>{props.setopen()}} style={{background: 'linear-gradient(to right bottom, #00264D, #02386E , #00498D)'}}> Cancel </Button>
        </DialogActions>
   </Dialog>
 );
}

export default EditQuestion;