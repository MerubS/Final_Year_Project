import { Button , Grid } from "@mui/material";
import axios from "axios";
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useState, useEffect } from "react";



const OngoingExam = (props) => {
  const [currrow , setcurrrow] = useState();
  const [rows,setrows] = useState([]);
  const [examiner] = JSON.parse(localStorage.getItem('examiner'));

  useEffect(() => {
    console.log(examiner);
    axios.get('/api/test/getAllTest',{params:{id:examiner.examiner_id}})
    .then(function (response) {
      setrows(response.data.output);
      console.log("Started" , response.data.output.filter(n=> n.status === 'started   '))
    })

    }, []);

    const edittest = () => props.callback(currrow , true)
    const sendmessage = (show , message ) => props.callbackmessage( show , message)

    const deletetest = () => {
      console.log(currrow.id);
      axios.get('/api/test/DeleteTest',{params:{tid:currrow.id , eid:examiner.examiner_id}})
    .then(function (response) {
      console.log(response.message); 
      if (response.data.message === 'Success') {
        sendmessage(true , true)
      }
      else {
        sendmessage(true , false)
      }    
    })
    }

    const updatestatus = async (e,curr) =>{
      console.log(curr)
      if (curr.status == 'created   ') {
        try {
          const resp = await axios.post('http://localhost:5000/api/test/UpdateTestStatus',{status:'started',test_id:curr.id , timelimit:curr.timelimit , unit: curr.unit});
          console.log(resp.data.message);
         }
         catch (error) {
             console.log(error.response);
         }
      }

      if (curr.status == 'started   ') {
        try {
          const resp = await axios.post('http://localhost:5000/api/test/UpdateTestStatus',{status:'ended',test_id:curr.id});
          console.log(resp.data.message);
         }
         catch (error) {
             console.log(error.response);
         }
      }
    }

    
      const columns = [
          // { field: 'test_id', headerName: 'ID', width: 20 },
          { field: 'name', headerName: 'Assessment Name', width: 130 },
          { field: 'description', headerName: 'Description', width: 130 },
          { field: 'status', headerName: 'Status ', width: 130 , renderCell: (params) => {
            return (
              <Button variant="contained" size="small" onClick={(e)=>{updatestatus(e,params.row)}}>
                {params.row.status}
              </Button>
            );
          } , disableClickEventBubbling: true  },
          { field: 'timelimit' , headerName: 'Timelimit', width: 130 },
          { field: 'difficulty', headerName: 'Difficulty', width: 130 },
        ];
 return(
   <Grid sx={{height:'50vh'}}>
    <Grid container justifyContent='end' style={{padding:'5px'}}> 
    <Button color="primary" size="medium" onClick={deletetest} startIcon={<DeleteIcon />}> </Button>
    <Button color="primary" size="medium" onClick={()=>{rows && edittest()}} startIcon={<EditIcon />}> </Button>
     </Grid>
    <DataGrid
     rows={rows}
     columns={columns}
     pageSize={10}
     rowsPerPageOptions={[10]}
     onRowClick={(e)=>{setcurrrow(e.row)}}
   
      />
 </Grid>
 );

}

export default OngoingExam;