import { Card , Typography , CardContent , Box , Button , Grid } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import tick from '../Icons/tick.svg';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { useState , useEffect } from "react";
import { DataGrid } from '@mui/x-data-grid';
const Exammanager = (props) => {
  const [examiner] = JSON.parse(localStorage.getItem('examiner'));
  const [rows,setrows] = useState([]);
  const [loading , setloading] = useState(props.loading);
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
  function CustomLoadingOverlay() {
    return (
      <GridOverlay>
        <CircularProgress color="primary" size={40} />
      </GridOverlay>
    );
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
  //   <Card sx={{ minWidth: 275 }}>
  //   <CardContent>
  //   <TableContainer>
  //     <Table sx={{ minWidth: 650 }} aria-label="simple table">
  //       <TableHead>
  //         <TableRow>
  //           <TableCell sx={{borderBottom:'none'}} > Ongoing Sessions </TableCell>
  //         </TableRow>
  //       </TableHead>
  //       <TableBody>
  //         {rows.map((row) => (
  //           <TableRow
  //             key={row.name}
  //             sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
  //           >
  //            <TableCell sx={{borderBottom:'none'}}>
  //            <Box style={{display:'flex'}}>
  //              <img src={tick} style={{ height: '1.5rem' , width: '1.5rem' , paddingTop:5}} alt="tickmark"/>
  //             </Box>
  //             </TableCell>
  //             <TableCell align="left" sx={{borderBottom:'none'}}>
  //               {row.name} 
  //             </TableCell>
  //             <TableCell align="left" sx={{borderBottom:'none'}}>
  //              <Typography> {row.time} min </Typography> 
  //             </TableCell>
  //             <TableCell align="center" sx={{borderBottom:'none'}}> <Paper> {row.level} </Paper> </TableCell>
            
  //           </TableRow>
  //         ))}
  //       </TableBody>
  //     </Table>
  //   </TableContainer>
  //   </CardContent>
    
  // </Card>
);
}

export default Exammanager;