import { Grid, FormControl, Button, FormLabel, RadioGroup , FormControlLabel , Radio, Typography } from "@mui/material";
import { useRef,useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom';
import Countdown from 'react-countdown';
import axios from "axios";
import { Box } from "@mui/system";
import AlertDialog from "../../Components/DialogueBox/AlertDialogue";
import socketio from "socket.io-client";
import Webcam from 'react-webcam';
import moment from "moment/moment";
import Useauth from "../../Routes/Auth";

const Test = () => {


  const interval_ms = 3000;
  const navigate = useNavigate();
  const candidate = JSON.parse(localStorage.getItem('Candidatedetails'));
  const test = JSON.parse(localStorage.getItem('Testdetails'));
  const [question,setquestions] = useState('');
  const questionRef = useRef();
  const [loading , setloading] = useState(false);
  const [answers,setanswers] = useState([]);
  const webcamRef = useRef(null);
  const time = moment();

  const refAnswers = useRef();
  refAnswers.current = answers;

  const [timelimit , settimelimit] = useState('');
  const [open,setopen] = useState(false);
  const end = useRef();
  end.current = "ATANKWADI";
  const [disable , setdisable] = useState(timelimit === 0 ? true : false)
  const [invigilance , setinvigilance] = useState({face:0 , gaze:0 , object:0})


  const [numTabChanges, setnumTabChanges] = useState(0);
  const [TabResizing, setTabResizing] = useState(0);
  const tabChangesRef = useRef();
  tabChangesRef.current = numTabChanges;
  const resizesRef = useRef();
  resizesRef.current = TabResizing;

useEffect(()=>{
  console.log("Question value is", question)
},[question])
  const handleUserMedia = () => {
    console.log("Reference Assigned streaming started")
    startStream()
  }

  const handleBlur = () => {
    setnumTabChanges(numTabChanges+1)
    console.log('Tab CHANGED    ' + numTabChanges);
  };

  const updateSize = () => {
    setTabResizing(TabResizing+1)
    console.log('Window resized    ' + TabResizing);
  }



  useEffect(() => {

    window.addEventListener('resize', updateSize);
    window.addEventListener('blur', handleBlur);

    return () => {
      window.removeEventListener('resize', updateSize);
      window.removeEventListener('blur', handleBlur);
    };
  });

  const videoConstraints = {
    width: 550,
    height: 550,
    facingMode: "user"
  };
  const socket = socketio("http://127.0.0.1:9000", {
    autoConnect: false,
  });  

  
  const sendData = async (data,test_state, identification_data , gaze_data, face_encoding, ) => {



    console.log('send data : ', end)  
      socket.emit("identification", {
       identification_payload: identification_data,
       id: candidate.cnic,
       data: data,
       message : test_state,
       gaze_payload : gaze_data,
       face_encoding: face_encoding
     });

   };
    

   socket.on("SEND_LIVE_STREAM", async(identification_result , identification_data, gaze_result , inference_result , message, gaze_data , face_encoding) => {
        // console.log("Result : ",result) 
        console.log(gaze_data);
        var invi = invigilance;
        if (message === 'ACKNOWLEDGE') {
          end.current = 'ACKNOWLEDGE';
          console.log("The responce of end : ", end.current)
          invi.face = identification_result;
          invi.gaze = gaze_result;
          invi.object = inference_result;
          setinvigilance(invi)
          console.log("Invigilance : ")
          console.log(invigilance)

        await updateDatabase();
          socket.disconnect()
        }

        await axios.post('/api/candidate/SaveCandidateLogs',{identification_result , gaze_result , inference_result}).then((response)=>{
            console.log(response.data.message);                         // get a message of stream ended then generate report
        })
        // console.log('ABCD')    
        let im = webcamRef.current.getScreenshot();
        im = im.substring(23, im.length);
        // socket.emit("identification" , picture)
        console.log("SAMMAM SAYS "+end.current); 
        await sendData(im, end.current, identification_data ,gaze_data, face_encoding)
        
        // console.log(result1)
       });

      
  const startStream = async () => {

    

    const respons = await axios.get("/api/candidate/GetFaceEncoding", {params: {...candidate}});
    console.log('Response : ' )

      let gaze_data = {
			counter : 0,
			total_blinks : 0,
			closed_eyes_frame : 3,
			video_path : "Video/Your Eyes Independently_Trim5.mp4",
			frame_counter : 0,
			start_time : time.toISOString(),
			fps : 0,
			left_movement : 0,
			right_movement : 0,
			no_movement : 0  
		} 

    let identification_payload = {
      'total_snapshots' : 0,
      'no_face' : 0,
      'correct_face' : 0,
      'wrong_face' : 0
      }

  try {
    socket.connect();
    
    console.log('StartSTREAM : ', end)  
        let im = webcamRef.current.getScreenshot();
        im = im.substring(23, im.length);
        console.log("ssss" , im)
        socket.emit("identification" , {

          identification_payload,
          data: im,
          id: candidate.cnic,
          message: end,                              // assign state
          gaze_payload: gaze_data,
          face_encoding: respons.data.data[0].face_encodings
        })
  
  } catch (error) {
    console.log('Error : ' , error)  
  }
      }

//  /////////////////////////// Streaming

  useEffect(() =>{

  socket.connect();       ///////// connect to socket
  
  console.log("PAGE STARTED");
  

  console.log(test , candidate);
  axios.get('/api/report/getReportbyId',{params:{tid:test.test_id , cid:candidate.cnic}}).then((response)=>{
    console.log(response.data.output)
    let [data] = response.data.output;
    let enddate = new Date(data.end_time);
    let currdate = new Date();
    console.log(enddate.getTime() - currdate.getTime() );
    settimelimit(enddate.getTime() - currdate.getTime() );

  })
  axios.get('/api/question/getQuestionbyTestId',{params:{id : test.test_id}})
  .then(function (response) {
    console.log("Question", response.data.output);
    console.log(response.data.output)
    setquestions(response.data.output);
    questionRef.current = response.data.output;
 })
},[]);

useEffect(()=>{
  if (timelimit !== '' && question!== '') {
    setloading(true);
  }
  
},[timelimit,question]);



useEffect(()=>{
console.log(answers)
  
},[answers]);


const updateDatabase = async () => {
  console.log(end.current + "In update database")
  if (end.current === 'ACKNOWLEDGE') {
    console.log("BHAI INVIGILANCE KO BHEJDO ", invigilance)
    console.log("BHAI answers KO BHEJDO ", refAnswers.current)
    console.log("Screen resizing ", tabChangesRef.current,"    ",resizesRef.current)
    console.log("Question in updateDatabase", question);
    
     try {
    await axios.post('http://localhost:5000/api/report/UpdateReport', {tabChanges : tabChangesRef.current, resizes : resizesRef.current, question: questionRef.current , answer : refAnswers.current , testid:test.test_id , canid:candidate.cnic , per_face:invigilance.face , per_object:invigilance.object , per_gaze:invigilance.gaze}  )
    .then((response)=>{
      console.log("Response is:" , response.data.message);
      authenticate.setcanauth(false)
      navigate('/thankyou');
    });
   }
   catch (error) {
       console.log(error.response);
   }
  }

}
const authenticate= Useauth();
const submitHandler = async () => {
  end.current = 'TEST ENDED';
}
const changeHandler = (event, qid) => {
  var r = answers.find(item => item.id === qid)
  if (r) {
    let objIndex = answers.findIndex((obj => obj.id === qid));
    answers[objIndex].value = event.target.value

  }
  else {
    setanswers([ 
    ...answers, 
    { value: event.target.value , id: qid} 
  ])
  }
}
const renderer = ({ hours, minutes, seconds, completed }) => {
  if (completed) {
    setdisable(true);
    setopen(true);
  } else {
    return  <div style={{ fontSize: '25px' }}>
    Time Remaining: {hours}h {minutes}m {seconds}s
  </div>
  }
};

  return (
    <Grid container justifyContent="Center" sx={{padding:'30px'}}>
        <Webcam audio={false} ref={webcamRef} width={500} height={500} screenshotFormat="image/jpeg"  videoConstraints={videoConstraints} onUserMedia={handleUserMedia}/>
        {open && <AlertDialog open={open} setopen={()=>{setopen(false)}} submit={()=>{submitHandler()}} timeup={disable}/>}
        <Grid container justifyContent="center" sx={{padding:'30px'}} >
         {loading && <Countdown date={Date.now()+ test.timelimit} renderer={renderer} /> }
        </Grid>
        <Grid container sx={{borderRadius:10,padding:'50px',borderStyle:'solid',borderImage:'linear-gradient(to right bottom, #00264D, #02386E , #00498D) 1',borderWidth:'5px'}}>
        <Grid  item xs={12}>
        <Box style={{display:'block'}}>
        <span style={{display:'block'}}> Name: {candidate.name}  </span>
        <span style={{display:'block'}}> Questions: {test.no_questions} </span>
        </Box>
        </Grid>
        <Grid item xs={12}>
        <form>
    {loading && question.map((q,index)=>{
      let a = q.options.split(',')
      console.log(a)
      return (
      <FormControl sx={{display:'block', margin:'40px'}} variant="standard">
        <FormLabel>{index+1}.  {q.question}</FormLabel>
        <RadioGroup
          aria-labelledby="demo-error-radios"
          name="quiz"
          // value={value}
          onChange={(e)=>{changeHandler(e,q.question_id)}}
        >         
        {a.map((o)=>{
          return(
       <FormControlLabel disabled={disable} value={o} control={<Radio />} label={o} />
          )
        })}
        </RadioGroup>
        </FormControl>
        )
    }
        
     
      )
    }
         </form> 
         </Grid>
         <Grid container justifyContent='center'>
         <Button variant="contained" onClick={()=>{setopen(true)}} style={{background: 'linear-gradient(to right bottom, #00264D, #02386E , #00498D)', color:'white' , marginBottom:'2px'}} > Submit </Button>
         </Grid>
        </Grid>
    </Grid>
);
}

export default Test;