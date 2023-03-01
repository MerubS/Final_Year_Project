import { Grid , Typography} from "@mui/material";
import OngoingExam from "../../Components/OngoingExam";
import Exammanager from "../../Components/Exammanager";
import Fab from '@mui/material/Fab';
import Add from '../../Icons/add.svg';
import Createtest from "../../Components/DialogueBox/CreateTest";
import Edittest from "../../Components/DialogueBox/EditTest";
import axios from "axios";
import PositionedSnackbar from "../../Components/DialogueBox/Snackbar";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [open , setOpen] = useState(false);
  const [isEdit , setisEdit] = useState(false);
  const [currrow , setcurrrow] = useState();
  const [sbar , setsbar] = useState({sopen:false , sstatus:''});

  const showMessage = (open , status ) => {
   setsbar ({
    sopen : open,
    sstatus: status
   })
  }

  const editingdata = (currrow , edit) => {
    // console.log("Curr row" , currrow)
    setcurrrow(currrow) 
    axios.get('/api/question/getQuestionbyTestId',{params:{id:currrow.id}})
    .then(function (response) {
      setcurrrow(prevState=>({
        ...prevState,
        selectedques : response.data.output
      }))
     setisEdit(edit)
      })
    
  }

  // useEffect(()=>{
  //  console.log("Data in dashboard" , currrow , isEdit)
  // },[currrow])


 return (
   <Grid container spacing={3}>
   <Grid item xs={6}>
     <OngoingExam callback={editingdata} callbackmessage={showMessage}/>
   </Grid>
   <Grid item xs={6}>
     <Exammanager/>
   </Grid>
   <Grid item xs={3}>
   {sbar.sopen && <PositionedSnackbar success={sbar.sstatus} open={sbar.sopen} handleClose={()=>{setsbar({sopen:false , sstatus:''})}}/>}
   {open && <Createtest open={open} setopen={()=>{setOpen(false)}} callback={showMessage}/>}
   {isEdit && <Edittest open={isEdit} setopen={()=>{setisEdit(false)}} row={currrow} callback={showMessage}/>}
   </Grid>
   <Grid container alignItems="left" justifyContent='left' style={{margin:'25px'}}>
        <Fab color="primary" aria-label="add" onClick={()=>{setOpen(true)}}> 
        <img src={Add} style={{ height: '1.5rem' , width: '1.5rem' , padding:5}} alt="tickmark"/>
        </Fab>
        <Typography style={{paddingTop:'15px' , paddingLeft:'8px'}}> Create Test</Typography>
    </Grid>
   </Grid>
 );
}

export default Dashboard;