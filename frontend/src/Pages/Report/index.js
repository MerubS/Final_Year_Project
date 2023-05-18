import axios from "axios";
import { Grid , Button} from "@mui/material";
import { DataGrid , GridOverlay} from '@mui/x-data-grid';
import { useState ,useEffect} from "react";
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import ViewReport from "../ViewReport"
import CircularProgress from '@mui/material/CircularProgress';
import React from 'react';


const Report = () => {
    const [rows,setrows] = useState([]);
    const [data,setdata] = useState([]);
    const [open , setOpen] = useState(false);
    const [loading , setloading] = useState(false);
    
    const [examiner] = JSON.parse(localStorage.getItem('examiner'));

    useEffect(() => {
      getAllReport();
        }, []);


const getAllReport = () => {
  setloading(true)
  axios.get('/api/report/getAllReport',{params:{id:examiner.examiner_id}})
  .then(function (response) {
    console.log(response.data.output)
    setrows(response.data.output.reverse()) 
    setloading(false);
  });
}

const dataHandler = () => {  
if (data.length !== 0) {
  let objectdata , countList = null , uniqueValues , onlyEmptyStrings , facedata , count = null, gazedata , secondData = null;
  if (data.per_object !== null) {
  objectdata = data.per_object.split(',') 
  countList= null
  uniqueValues = [...new Set(objectdata)].filter((o) => o !==  ' ');
  onlyEmptyStrings = uniqueValues.every(item => item === '');
 if (onlyEmptyStrings === false) {
  countList = uniqueValues.reduce((count, value) => {
  const occurrences = objectdata.filter(item => item === value).length;
  count.push({ name: value, value: occurrences });
  return count;
}, []);
 }
}
console.log("Countlist" , countList)
console.log(uniqueValues);
if (data.per_face !== null) {  
  facedata = data.per_face.split("\\")
  count = facedata[1].match(/\d+(?:\.\d+)?/g).map((o) => Math.round(o , 1));
  console.log("Face After Split",facedata)
  console.log(count)
}
if (data.per_gaze != null) {
        gazedata = data.per_gaze.split(",")
        secondData = gazedata.map(item => {
        const [_, secondPart] = item.split('=');
        return Number(secondPart);
      });
      console.log(secondData)
    }
      setdata(prevState=>({
        ...prevState,
        per_gaze : secondData,
        per_face : count,
        per_object: countList
      }))
      setOpen(true)
    }
}
    
function CustomLoadingOverlay() {
  return (
    <GridOverlay>
      <CircularProgress color="primary" size={40} />
    </GridOverlay>
  );
}

    const columns = [
        // { field: 'id', headerName: 'ID', width: 20 },
        { field: 'testname', headerName: 'Test', width: 130 },
        { field: 'name', headerName: 'Candidate', width: 130 },
        { field: 'per_face', headerName: 'Face ', width: 130 },
        { field: 'per_gaze', headerName: 'Gaze', width: 130 },
        { field: 'per_object', headerName: 'Object', width: 130 },
        { field: 'score', headerName: 'Score %', width: 130 },
        {field: 'tabchange', headerName: 'Tab Changes' , width:130},
        {field: 'resize' , headerName: 'Resize' , width: 130}
        // { field: 'pass', headerName: 'Pass', width: 130 },
      ];
 return (
  <>
  {open && <ViewReport open={open} data={data} setopen={()=>{setOpen(false)}}/>}
    <Grid container justifyContent='end' style={{padding:'2px'}}> 
  <Button color="primary" size="medium" onClick={dataHandler} startIcon={<OpenInFullIcon />}> Expand Report </Button>
   </Grid>
    <Grid container sx={{height:'70vh'}}>
    <DataGrid
     rows={rows}
     columns={columns}
     pageSize={10}
     rowsPerPageOptions={[10]} 
     onRowClick ={(e)=>{setdata(e.row)}}
     components={{
      LoadingOverlay: CustomLoadingOverlay
    }}
    loading={loading}
      />
   </Grid>
  </>

 
 );

  }
export default Report;