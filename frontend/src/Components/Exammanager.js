import { Card , Typography , CardContent , Box , Button , Grid } from "@mui/material";
import axios from 'axios';
import { useState , useEffect } from "react";
import { DataGrid , GridOverlay } from '@mui/x-data-grid';
const Exammanager = () => {
  const [examiner] = JSON.parse(localStorage.getItem('examiner'));
  const [rows,setrows] = useState([]);
  const columns = [
    { field: 'name', headerName: 'Assessment Name', width: 130 },
    { field: 'url', headerName: 'URL', width: 300 },
    { field: 'difficulty', headerName: 'Difficulty', width: 130 },
  ];
   
  const getAllTest = () => {
    axios.get('/api/test/getAllTest',{params:{id:examiner.examiner_id}})
    .then(function (response) {
      let modrows = []
      response.data.output.filter(n=> n.status === 'started   ').map((e)=>{
        let URL = 'http://localhost:3000/register?test=' + e.id;
        modrows.push({id:e.id , name:e.name , difficulty:e.difficulty , url:URL})
      })
      setrows(modrows);
    })
      
  }
  
  useEffect(() => {
  getAllTest()
    }, []);
  

return (
  <Grid container>

<Grid xs={12} sx={{height:'50vh',paddingTop:'40px'}}>
  <DataGrid
   rows={rows}
   columns={columns}
   pageSize={10}
   rowsPerPageOptions={[10]}
   checkboxSelection 
    />

  </Grid>
  
    </Grid>
);
}

export default Exammanager;