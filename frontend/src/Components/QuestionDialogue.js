import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Typography , Grid } from '@mui/material';


const QuestionDialogue = (props) => {
  
    return (
      <div>
        <Dialog open={props.open} xs={12}>
          <DialogTitle>Add Question</DialogTitle>
          <DialogContent>
         <DialogContentText> Enter Question Details </DialogContentText>
            <Typography> Question </Typography>
            <TextField
              autoFocus
              margin="dense"
              id="question"
              fullWidth
              variant="standard"
            /> 

            <Typography> Difficulty Level </Typography>
            <TextField
              autoFocus
              margin="dense"
              id="question"
              fullWidth
              variant="standard"
            />
          <DialogContentText> Enter Options </DialogContentText>
          </DialogContent>
          
          <DialogActions>
            <Button>Create</Button>
            <Button>Cancel</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
}

export default QuestionDialogue;