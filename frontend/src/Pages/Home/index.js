import { Typography , Grid} from "@mui/material";
import {Button} from "@mui/material";
import pic from '../../Images/test.svg';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar'
import qpic from '../../Images/question.svg';
import ActionAreaCard from "../../Components/Card";
import {Box} from "@mui/material";
import bullet from '../../Icons/bulletpoint.png';
import { useNavigate } from "react-router-dom";
const Home = () => {
    const navigate = useNavigate();
    const data = [
        {title:'Face Recognition' , description:"User authentication using face detection making sure that the genuine candidate takes the test and no other person is along with the candidate." , icon: './Icons.audio.png'} ,
        {title:'Gaze Detection',description:"Real time tracking of candidates eye movement though advanced algorithms to check candidate’s focus." , icon: ''} , 
        {title:'Object Detection',description:"Use of mobile phones and gadgets are the greatest risk, through this feature presence of such gadgets is detected." , icon:''}];
    
    const reasons = [
        {heading:'Free:' , description: 'No hidden charges or limits on any resource. Everything just one step away from save of time, money and effort!'},
        {heading:'Security:' , description: 'Candidate authentication and proctoring using robust AI frameworks that minimizes the chances of cheating. Generation of proctoring report for examiners convenience that includes analysis of candidate monitoring.'},
        {heading:'Easy to use:' , description: 'Smooth workflow and automated proctoring with tailored features makes sure candidates and admins get the best utilization of the tool according to their needs.'},
    ]

    const loginHandler = () => {
        navigate("/login");
    }

    return (
        <>
        <AppBar position="static" style={{background: 'linear-gradient(to right bottom, #00264D, #02386E , #00498D)'}}>
        <Toolbar sx={{ display: { xs: "flex" }, flexDirection: "row", justifyContent: "space-between"}}>
          <Typography variant="h6" component="div" > Smart Invigilance Tool </Typography>
          <Box component="span" sx={{display: { md: "flex" }, flexDirection: "row", justifyContent: "space-evenly",}}>
          <Typography variant="h8" component="div" sx={{paddingRight:'30px'}} >
           <Button variant='contained' style={{background: 'linear-gradient(to right bottom, #00264D, #02386E , #00498D)'}} onClick={loginHandler}> Login </Button> 
          </Typography>
          </Box>        
        </Toolbar>
      </AppBar>
        <Grid container style={{padding:40}}>
     <Grid item xs={6}  style={{display:"flex" , marginBottom:50}} > 
      <Box style={{margin:'auto', padding:50}} >
         <Typography variant="h5" style={{textalign:"center",paddingBottom:10 }}> Online Exam Builder </Typography>
         <Typography style={{textalign:"center",paddingBottom:10}}>
          Thinking about scheduling an online test?
          Smart invigilance tools gives you seamless experience to develop online tests with efficiency. State of the art technology
          incorporated with user friendly interface that meets all the requirements to design a test.
        </Typography>
        <Button variant="contained" onClick={loginHandler} style={{background: 'linear-gradient(to right bottom, #00264D, #02386E , #00498D)'}}> Get Started </Button>
     </Box>
     </Grid>
     <Grid item xs={6} style={{marginBottom:50}}>
         <img src={pic} style={{ height: '30rem' , width: '30rem' , margin:'auto' , display:'block' }} alt="website logo"/>
     </Grid>
       <Grid item xs={6} style={{marginBottom:50}}> 
       <img src={qpic} style={{ height: '30rem' , width: '30rem' , margin:'auto' , display:'block' }} alt="website logo"/>
       </Grid>
       <Grid item xs={6} style={{ display:"flex" , marginBottom:50}}>
       <Box style={{margin:'auto' , padding:50 , textAlign:"center"}} >
         <Typography variant="h5" style={{textalign:"center",paddingBottom:10 }}> Why choose us ? </Typography>
         {reasons.map((r)=>{
              return( 
              <Box style={{textalign:'left'}}>
                <Box style={{display:'flex'}}>
               <img src={bullet} style={{ height: '1.5rem' , width: '1.5rem' , paddingRight:8 , paddingTop:5}} alt="website logo"/>
              <Typography variant='h6'> {r.heading} </Typography>
              </Box>
               <Typography style={{textalign:"left",paddingBottom:10}}> {r.description} </Typography>
              </Box>
              );
         })}
     </Box>
         </Grid>
     <Grid container justifyContent="center" style={{marginBottom:10}}>
        <Typography variant="h5" style={{display:'block',padding:20}}> Features We Provide </Typography>
     </Grid>
     <Grid container justifyContent="center" style={{ padding:20 , marginBottom:50 }}>
        {data.map((info , index) =>{ 
        return <ActionAreaCard key={index} title={info.title} description={info.description} icon={info.icon} /> })}
     </Grid>
</Grid>
        </>
        
    );
}

export default Home;