import {Dialog, Button , DialogActions , DialogContent , Typography , TextField , DialogTitle, Grid, MenuItem} from '@mui/material';
import { useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { PieChart, Pie, Cell } from 'recharts';

const ViewReport = (props) => {
    const chartRef = useRef(null);
    const facedata = [
        { name: 'Red', value: 300, color: '#FF6384' },
        { name: 'Blue', value: props.data.per_face, color: '#36A2EB' },
      ];
      const gazedata = [
        { name: 'Red', value: 300, color: '#FFCE56' },
        { name: 'Blue', value: props.data.per_gaze, color: '#36A2EB' },
      ];
      const objectdata = [
        { name: 'Red', value: 300, color: '#36A2EB' },
        { name: 'Blue', value: props.data.per_object, color: '#FFCE56' },
      ];
      const handleExportToPDF = () => {const chartContainer = chartRef.current;
        const doc = new jsPDF();
        html2canvas(chartContainer)
          .then((canvas) => {
            
            const chartImage = canvas.toDataURL('image/png', 1.0);
            doc.setFontSize(12);
            doc.text('Candidate Name:'+ props.data.name, 20, 20);
            doc.text('Candidate Contact:'+ props.data.contact, 20, 28);
            doc.text('Test:'+ props.data.testname, 20, 36);
            doc.text('Score:'+ props.data.score, 20, 44);
            doc.addImage(chartImage, 'PNG', 20, 54, 100, 100); 
            doc.save('chart.pdf');
          })
          .catch((error) => {
            console.error('Error exporting chart to PDF:', error);
          });}
return (
<Dialog
        open={props.open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="lg" // Set the maximum width of the dialog
        fullWidth 
      >
        <DialogTitle> Report </DialogTitle>
        <DialogContent>
            <Typography> Candidate Name:  {props.data.name}</Typography>
            <Typography> Test:  {props.data.testname}</Typography>
            <Typography> Timelimit:  {props.data.time}</Typography>
            <Typography> Score:  {props.data.score}</Typography>
            <div ref={chartRef} style= {{display:'flex'}}>
      <div>
      <h3>Face Detection</h3>
      <PieChart width={300} height={300}>
        <Pie
          dataKey="value"
          data={facedata}
          cx={150}
          cy={150}
          outerRadius={80}
          fill="#8884d8"
          label
        >
          {facedata.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
      </PieChart>
    </div>
    <div>
      <h3>Gaze Detection</h3>
      <PieChart width={300} height={300}>
        <Pie
          dataKey="value"
          data={gazedata}
          cx={150}
          cy={150}
          outerRadius={80}
          fill="#8884d8"
          label
        >
          {gazedata.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
      </PieChart>
    </div>
    <div>
      <h3>Object Detection</h3>
      <PieChart width={300} height={300}>
        <Pie
          dataKey="value"
          data={objectdata}
          cx={150}
          cy={150}
          outerRadius={80}
          fill="#8884d8"
          label
        >
          {objectdata.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
      </PieChart>
    </div>
      </div>
            
        
        </DialogContent>
        <DialogActions>
          <Button variant='contained' onClick={handleExportToPDF} style={{background: 'linear-gradient(to right bottom, #00264D, #02386E , #00498D)'}}> Download PDF </Button>
          <Button variant='contained' onClick={()=>{props.setopen()}} style={{background: 'linear-gradient(to right bottom, #00264D, #02386E , #00498D)'}}> Cancel </Button>
        </DialogActions>
      </Dialog>
  );
}

export default ViewReport;