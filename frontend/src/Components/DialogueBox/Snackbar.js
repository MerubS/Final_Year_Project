import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import { Alert } from '@mui/material';

export default function PositionedSnackbar(props) {
  const [state, setState] = React.useState ({vertical: 'bottom', horizontal: 'left',});
  const { vertical, horizontal } = state;

  return (
      <Snackbar
        anchorOrigin={{ vertical , horizontal }}
        autoHideDuration={3000}
        open={props.open}
        onClose={()=>{props.handleClose()}}
        message="I love snacks"
        key={vertical + horizontal}
      >
        {props.success ? <Alert severity="success" sx={{ width: '100%' }}> Processed Successfully </Alert> 
        : <Alert severity="error" sx={{width : '100%'}}> Unable to process </Alert>
      }
    </Snackbar>
  );
}