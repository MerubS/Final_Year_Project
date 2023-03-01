import { Typography , Grid , Button , Box } from "@mui/material";
import { useParams } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import socketio from "socket.io-client";
import Webcam from 'react-webcam';
import { useNavigate } from "react-router-dom";



////////// UserID will come from node backend after SignUp of student
///////////////////////// Here i will take pictures for model training


const Uploadpic = () => {


   const params = useParams();
   const candidate = JSON.parse(localStorage.getItem('Candidatedetails'));
   const navigate = useNavigate();
   const webcamRef = useRef(null);
   const [picCount, SetPicCount] = useState(0);

   const videoConstraints = {
     width: 550,
     height: 550,
     facingMode: "user"
   };
 
   const socket = socketio("http://127.0.0.1:9000", {
     autoConnect: false,
   });  
 
   useEffect(() => {
     
      socket.connect();

   }, []);

   const sleep = ms => new Promise(
      resolve => setTimeout(resolve, ms)
    );
 
 
   const sendData = async (data, pic_number) => {
    await socket.emit("register_user", {
       id: candidate.cnic,
       data: data,
       count: pic_number
     });
   };
 
   const capture = async () => {
      
     
 
      for (let i = 0; i < 30 ; i++){
         
         let im = webcamRef.current.getScreenshot();
         im = im.substring(23, im.length);
         SetPicCount(i+1)
         console.log(im)
        await sendData(im,i)
         await sleep(1000);
         
      }

      socket.disconnect();
      navigate('/test');

   }



   return (

<>
      <Grid container justifyContent="center" alignItems="center" style={{background: 'linear-gradient(#FFFFFF,#02386E)',height:'100vh'}}>
         <Grid alignItems="center" style={{ width:'70vh',borderRadius: '0.5rem' , padding:"25px", borderStyle:'dashed', borderColor:'white' }}>
         <Typography align="center" variant="h6"> Capture Picture </Typography>
         <Typography align="center" sx={{color:'grey'}}> Please capture picture to complete the registration </Typography>
         <Typography align="center" sx={{color:'grey'}}> Wait Time : {30 - picCount} </Typography>
         <Box align="center" style={{padding:'10px'}}>
         <Webcam audio={false}  height={300} ref={webcamRef} screenshotFormat="image/jpeg" width={300} videoConstraints={videoConstraints}/>
          </Box>   
             <Box align="center" style={{padding:'10px'}}>
             <Button variant="contained" onClick={capture} style={{color:'white' , background: 'linear-gradient(to right bottom, #00264D, #02386E , #00498D)' , margin:'auto'}} > Take Picture  </Button>
             </Box>
         </Grid>
      </Grid>
      </>
   );
} 

export default Uploadpic;