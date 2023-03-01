import {Grid} from "@mui/material"
import Typography from '@mui/material/Typography';

const Thankyou = () => {
return (
    <Grid container sx={{padding:'50px'}}>
        <Grid item sx={{textAlign:'center', borderRadius:10,padding:'50px',borderStyle:'solid',borderImage:'linear-gradient(to right bottom, #00264D, #02386E , #00498D) 1',borderWidth:'5px', margin:'auto'}} >
           <Typography variant="h5" sx={{padding:'10px'}}> Report Generated </Typography>
           <Typography sx={{color:'grey'}}> Thank you for your time. </Typography>
           <Typography sx={{color:'grey'}}> The report of the test has been generated and submitted to the examiner. </Typography>
           <Typography sx={{color:'grey'}}> Best of luck !</Typography>
        </Grid>

    </Grid>
);
}

export default Thankyou;