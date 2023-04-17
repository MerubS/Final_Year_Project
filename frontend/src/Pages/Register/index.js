import { Typography , TextField , Button , Box , Grid , Snackbar , Alert} from '@mui/material';
import examiner from '../../Images/examiner.svg';
import examinee from '../../Images/examinee.svg';
import {useNavigate} from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';




const Register = () => {
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(window.location.search);
    const [registerdata , setregisterdata] = useState({cnic:0 , name: '' , email: '' , contact: '' , dob:'' , city:'' , gender:''});
    const [errors , seterrors] = useState({cnic:'' , email: '' , contact: '' , dob:''}) 
    const [message, setmessage] = useState('');
    const [disable , setdisable] = useState(false);
    const [testid , settesid] = useState(queryParams.get('test'));

    const onSubmit = async () => {
        axios.get('/api/test/getTestbyId',{params:{id : testid}})
    .then(function (response) {
      console.log(response.data.output)
      let [testdata] = response.data.output
      if (testdata.status == 'ended     ') {
        setmessage("Test has been ended by the examiner");
      }
      else if (testdata.status == 'created   ') {
        setmessage("Test not started by the examiner");
      }
      else {
      localStorage.setItem('Testdetails', JSON.stringify(testdata));
         if (registerdata.city!=='' && registerdata.cnic!=='' && registerdata.contact!='' && registerdata.dob!='' && registerdata.email!=''
       && registerdata.gender!='' && registerdata.name!='') {
       try {
          axios.post('http://localhost:5000/api/candidate/CreateCandidate',{registerdata, testdata}).then((response)=>{
            console.log(response.data.message);
            if (response.data.message === 'Success') {
                localStorage.setItem('Candidatedetails', JSON.stringify(registerdata));
                navigate('/upload');
            }
        }). catch((err)=>{
            console.log(err);
        });
       }
       catch (error) {
           console.log(error.response);
       }
    }
    else {
        console.log("Incomplete");
    }

      }
   })
}

useEffect(()=>{
console.log(testid)
},[testid])

    useEffect(() => {
     console.log(registerdata);
  
      }, [registerdata]);
    const changehandler = (event) => {
       switch (event.target.id) {
        case 'email':
            if (!/\S+@\S+\.\S+/.test(event.target.value)) {
                seterrors(prevstate=>({
                    ...prevstate,
                    email : "Invalid email"
                }))
            setdisable(true)
            }
            else {
                seterrors(prevstate=>({
                    ...prevstate,
                    email : ''
                }))
            setdisable(false)
            }
        break;
        case 'contact':
            if (!/^\d{11}$/.test(event.target.value)) {
                seterrors(prevstate=>({
                    ...prevstate,
                    contact : "Invalid phone number"
                }))
                setdisable(true)
            }
            else {
                seterrors(prevstate=>({
                    ...prevstate,
                    contact : ''
                }))
                setdisable(false)
            }
        break;
        case 'dob':
            if (!/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/.test(event.target.value)) {
                seterrors(prevstate=>({
                    ...prevstate,
                    dob : "Proper Format YYYY-MM-DD"
                }))
                setdisable(true)
            }
            else {
                seterrors(prevstate=>({
                    ...prevstate,
                    dob : ''
                }))
                setdisable(false)
            }
        break;
        case 'cnic':
            if (!/^[0-9+]{5}[0-9+]{7}[0-9]{1}$/.test(event.target.value)) {
                seterrors(prevstate=>({
                    ...prevstate,
                    cnic : "Proper Format XXXXXXXXXXXXX"
                }))
                setdisable(true)
            }
            else {
                seterrors(prevstate=>({
                    ...prevstate,
                    cnic : ''
                }))
                setdisable(false)
            }
        break;
       }
       setregisterdata(prevstate => ({
        ...prevstate,
        [event.target.id] : event.target.value
       }))
      
    }
 return (
    <Grid container alignItems="center" justifyContent='center' style={{ padding:'50px'}}>
    <Grid item xs={6} style={{display:'grid', textAlign:'center' , paddingBottom:'10px' , paddingTop:'50px'}}>
     <Typography variant='h6'> Welcome to Smart Invigilance Tool ! </Typography>
     <Typography> Register to start your test </Typography>
     <Grid container alignItems="center" justifyContent='center' style={{marginBottom:'25px'}}>
        <Box style={{marginRight:'15px' , textAlign:'center' }}>
            <img src={examiner} style={{ height: '10rem' , width: '7rem' ,display:'block'  , borderRadius:'100px'}}/>
            <Button variant='outlined' sx={{ backgroundColor: registerdata.gender == 'F' ? '#00264D' : 'white', color: registerdata.gender == 'F' ? 'white' : '#00264D' }}
                onClick={()=>{
                setregisterdata(prevState=>({
                    ...prevState,
                    gender: 'F'
                }))
            }}> Female </Button>
        </Box>
        <Box style={{marginRight:'15px' , textAlign:'center'}}>
        <img src={examinee} style={{ height: '10rem' , width: '7rem' , display:'block' , borderRadius:'100px'}}/>
            <Button variant='outlined' sx={{ backgroundColor: registerdata.gender == 'M' ? '#00264D' : 'white', color: registerdata.gender == 'M' ? 'white' : '#00264D' }} onClick={()=>{
                setregisterdata(prevState=>({
                    ...prevState,
                    gender: 'M'
                }))
            }}> Male </Button>
        </Box>
     </Grid>
     <TextField id="cnic" label="CNIC" error={errors.cnic} helperText={errors.cnic} variant="outlined" onChange={changehandler} style={{marginBottom:'20px'}} />
     <TextField id="name" label="Name" variant="outlined" onChange={changehandler} style={{marginBottom:'20px'}} />
     <TextField id="email" error={errors.email} helperText={errors.email} label="Email Address" variant="outlined" onChange={changehandler} style={{marginBottom:'20px'}} />
     <TextField id="contact" label="Phone Contact" error={errors.contact} helperText={errors.contact} variant="outlined" onChange={changehandler} style={{marginBottom:'20px'}} />
     <TextField id="dob" label="Date of Birth" error={errors.dob} helperText={errors.dob} variant="outlined" onChange={changehandler} style={{marginBottom:'20px'}} />
     <TextField id="city" label="City" variant="outlined" onChange={changehandler} style={{marginBottom:'20px'}} />
     <Button variant="contained" onClick={onSubmit} disabled={disable} style={{background: 'linear-gradient(to right bottom, #00264D, #02386E , #00498D)', marginBottom:'5px'}}> Register </Button>
     <Grid container alignItems="center" justifyContent='center' style={{marginBottom:'25px'}}>
     <Typography style={{color:'red'}}> {message}  </Typography>
     </Grid>
     </Grid>
    </Grid>
 );
}

export default Register;