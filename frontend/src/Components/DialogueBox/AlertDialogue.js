import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AlertDialog(props) {
  return (
      <Dialog
        open={props.open}
        onClose={()=>{props.setopen()}}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {props.timeup ?  'Timeup' : 'Submit' }
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           {props.timeup ? 'The time is up please submit the test' : 'Are you sure you want to submit?' } 
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        {props.timeup ? <Button  onClick={()=>{props.submit()}} autoFocus> Submit </Button> :
         <><Button onClick={()=>{props.setopen()}}> Cancel </Button>
         <Button  onClick={()=>{props.submit()}} autoFocus>
           Submit
         </Button></>
          }
         
        </DialogActions>
      </Dialog>
  );
}