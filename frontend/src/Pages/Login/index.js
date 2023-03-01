import { Typography , TextField , Button , Grid} from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import hi from '../../Images/login.svg';
const Login = () => {
   const navigate = useNavigate();
   const [userdetails , setuserdetails] = useState({cnic:'' , password: ''})
   const [errors , seterrors] =  useState({cnic:'' , password:''})
   const [disable, setdisable] = useState(true);
   useEffect(()=>{
      console.log(userdetails);
   },[userdetails])

   const SubmitHandler = async () => {
      if (userdetails.cnic !== '' && userdetails.password!==''){
         try {
            const resp = await axios.post('http://localhost:5000/api/examiner/getExaminerbyId',{examinerid: userdetails.cnic , password: userdetails.password});
            console.log(resp.data.message);
            let validation = resp.data.output;
            if (validation.length == 1) {
               localStorage.setItem('examiner',JSON.stringify(validation))
               navigate("/dashboard");
            }
           }
           catch (error) {
               console.log(error.response);
           }
      }

   }
   const changeHandler = (event) => {
      switch (event.target.id) {
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
      setuserdetails(prevState=>({
         ...prevState,
         [event.target.id] : event.target.value
        }))
     
   }

 return (
    <Grid container alignItems="center" justifyContent='center' style={{ padding:'50px' , paddingTop:'15px'}}>
        <Grid item xs={6} style={{display:'grid' , textAlign:'center' , padding:'40px'}}>
        <img src={hi} style={{ height: '20rem' , width: '20rem' , margin:'auto' , display:'block' }}/>
        <Typography variant='h6'> Welcome Back to Smart Invigilance Tool ! </Typography>
        <Typography style={{paddingBottom:'20px'}}> Enter details to login. </Typography>
        <TextField id="cnic" helperText={errors.cnic} label="CNIC" variant="outlined" style={{marginBottom:'20px'}} onChange={changeHandler}/>
        <TextField id="password" helperText={errors.password} type="password" label="Password" variant="outlined" style={{marginBottom:'20px'}} onChange={changeHandler} />
        <Button variant="contained" disabled={disable} onClick={SubmitHandler} style={{background: 'linear-gradient(to right bottom, #00264D, #02386E , #00498D)', color:'white' , marginBottom:'5px'}}> Sign in </Button>
     {/* <Button> Forgot Password? </Button> */}
        </Grid>
    </Grid>
 )
}

export default Login;