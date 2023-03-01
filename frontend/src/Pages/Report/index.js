import axios from "axios";
import { Grid } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import { useState ,useEffect} from "react";
const Report = () => {
    const [rows,setrows] = useState([]);
    const [examiner] = JSON.parse(localStorage.getItem('examiner'));
    useEffect(() => {
      axios.get('/api/report/getAllReport',{params:{id:examiner.examiner_id}})
      .then(function (response) {
        setrows(response.data.output) });
        }, []);
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
    <Grid container sx={{height:'70vh',marginTop:3}}>
    <DataGrid
     rows={rows}
     columns={columns}
     pageSize={10}
     rowsPerPageOptions={[10]}
     checkboxSelection 
      />
   </Grid>
 
 );
}

export default Report;