import axios from "axios";
import { Grid , Button} from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import { useState ,useEffect} from "react";
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import ViewReport from "../ViewReport"
import React from 'react';


const Report = () => {
    const [rows,setrows] = useState([]);
    const [data,setdata] = useState([]);
    const [open , setOpen] = useState(false);
    const [examiner] = JSON.parse(localStorage.getItem('examiner'));
    useEffect(() => {
      axios.get('/api/report/getAllReport',{params:{id:examiner.examiner_id}})
      .then(function (response) {
        setrows(response.data.output) });
        }, []);

        useEffect(() => {
          console.log(data)
            }, [data]);

       
    const columns = [
        // { field: 'id', headerName: 'ID', width: 20 },
        { field: 'testname', headerName: 'Test', width: 130 },
        { field: 'name', headerName: 'Candidate', width: 130 },
        { field: 'per_face', headerName: '% Face ', width: 130 },
        { field: 'per_gaze', headerName: '% Gaze', width: 130 },
        { field: 'per_object', headerName: '% Object', width: 130 },
        { field: 'score', headerName: 'Score', width: 130 },
        // { field: 'pass', headerName: 'Pass', width: 130 },
      ];
 return (
  <>
  {open && <ViewReport open={open} data={data} setopen={()=>{setOpen(false)}}/>}
    <Grid container justifyContent='end' style={{padding:'2px'}}> 
  <Button color="primary" size="medium" onClick={()=>{setOpen(true)}} startIcon={<OpenInFullIcon />}> </Button>
   </Grid>
    <Grid container sx={{height:'70vh'}}>
    <DataGrid
     rows={rows}
     columns={columns}
     pageSize={10}
     rowsPerPageOptions={[10]} 
     onRowClick ={(e)=>{setdata(e.row)}}
      />
   </Grid>
  </>

 
 );
}

export default Report;