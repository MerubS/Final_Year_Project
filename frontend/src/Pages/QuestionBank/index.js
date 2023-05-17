import { Grid , Box, Typography , Button } from "@mui/material";
import Fab from '@mui/material/Fab';
import Add from '../../Icons/add.svg';
import CreateQuestion from "../../Components/DialogueBox/CreateQuestion";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import EditQuestion from "../../Components/DialogueBox/EditQuestion";
import axios from "axios";
import { DataGrid , GridOverlay } from '@mui/x-data-grid';
import { useState ,useEffect} from "react";
import PositionedSnackbar from "../../Components/DialogueBox/Snackbar";
import CircularProgress from '@mui/material/CircularProgress';

const QuestionBank = () => {
    const [examiner] = JSON.parse(localStorage.getItem('examiner'));
    const [loading,setloading] = useState(false);
    const [open , setOpen] = useState(false);
    const [rows,setrows] = useState([]);
    const [currques , setcurrques] = useState();
    const [isEdit , setisEdit] = useState(false);
    const [sbar , setsbar] = useState({sopen:false , sstatus:''});

    const showMessage = (open , status ) => {
     setsbar ({
      sopen : open,
      sstatus: status
     })
    }

   const getAllQuestion = () => {
    setloading(true)
    axios.get('/api/question/getAllQuestion',{params:{id:examiner.examiner_id}})
  .then(function (response) {
    setrows(response.data.output);
    setloading(false)
  })
   }

    useEffect(() => {
      if (sbar.sstatus == '' || sbar.sstatus == 'success') {
      getAllQuestion()
      }
        }, [sbar]);

        function CustomLoadingOverlay() {
          return (
            <GridOverlay>
              <CircularProgress color="primary" size={40} />
            </GridOverlay>
          );
        }

   const deleteques = () => {
    axios.get('/api/question/DeleteQuestion',{params:{qid:currques.id , eid:examiner.examiner_id}})
    .then(function (response) {
      console.log(response.data.message); 
      if (response.data.message === 'Success') {
      setsbar({sopen:true , sstatus:true})
      }       
    })
        }
        

    const columns = [
        { field: 'question', headerName: 'Question', width: 300 },
        { field: 'difficulty', headerName: 'Difficulty', width: 130 },
      ];
    return(
       <Grid>
        {sbar.sopen && <PositionedSnackbar success={sbar.sstatus} open={sbar.sopen} handleClose={()=>{setsbar({sopen:false , sstatus:''})}}/>}
        <CreateQuestion open={open} setopen={()=>{setOpen(false)}} callback={showMessage}/>
        {isEdit && <EditQuestion open={isEdit} setopen={()=>{setisEdit(false)}} callback={showMessage} row={currques}/>}
       <Grid container sx={{height:'70vh',marginTop:0.2, marginBottom:6}}>
       <Grid container justifyContent='end' style={{padding:'2px'}}> 
    <Button color="primary" size="medium" onClick={deleteques} startIcon={<DeleteIcon />}> </Button>
    <Button color="primary" size="medium" onClick={()=>{currques && setisEdit(true)}} startIcon={<EditIcon />}> </Button>
     </Grid>
    <DataGrid
     rows={rows}
     columns={columns}
     pageSize={10}
     rowsPerPageOptions={[10]}
     onRowClick ={(e)=>{setcurrques(e.row)}}
     components={{
      LoadingOverlay: CustomLoadingOverlay
    }}
    loading={loading}
      />
   </Grid>
        <Grid container alignItems="left" justifyContent='left' style={{marginBottom:'25px'}}>
        <Fab color="primary" aria-label="add" onClick={()=>{setOpen(true)}}> 
        <img src={Add} style={{ height: '1.5rem' , width: '1.5rem' , padding:5}} alt="tickmark"/>
        </Fab>
        <Typography style={{paddingTop:'15px' , paddingLeft:'8px'}}> Create Question </Typography>
        </Grid>
    </Grid>

    );
}

export default QuestionBank;