import {Dialog, Button , DialogActions , DialogContent , Typography , TextField , DialogTitle, Grid, MenuItem} from '@mui/material';
import { useRef, useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import html2canvas from 'html2canvas';
import { PieChart, Pie, Cell } from 'recharts';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const ViewReport = (props) => {
  console.log(props.data)
    const chartRef = useRef(null);
    const COLORS = ['#8884d8', '#83a6ed', '#8dd1e1', '#82ca9d', '#a4de6c', '#d0ed57'];
    console.log("Report in View Report", props.data)

    const facedata = [
        { name: 'Correct Face', value: props.data.per_face[0], color: '#36A2EB' },
        { name: 'No Face', value: props.data.per_face[1], color: '#FF6384' },
        { name: 'Wrong Face', value: props.data.per_face[2], color: '#FF6384' },
      ];
      const gazedata = [
        { name: 'Left Movement', value: props.data.per_gaze[0], color: '#FFCE56' },
        { name: 'Right Movement', value: props.data.per_gaze[1], color: '#36A2EB' },
        { name: 'No Movement', value: props.data.per_gaze[2], color: '#FF6384' }
      ];
     
      const handleExportToPDF = () => {const chartContainer = chartRef.current;
        const doc = new jsPDF();
        let yaxis = 20;
        const xaxis = 20;
        html2canvas(chartContainer)
          .then((canvas) => {
            let concatenatedString = null;
            if (props.data.per_object !== null) {
            concatenatedString = props.data.per_object.map(obj => obj.name).join(', ');
            }
            const tableData = [
              ['Heading', 'Information'],
              ['Face Recognition', "Unknown: " + props.data.per_face[0] + ", Candidate: " + props.data.per_face[1]],
              ['Gaze Detection', 'Left Movement: ' + props.data.per_gaze[0]+ ' ,Right Movement: ' + props.data.per_gaze[1] + ' ,No Movement: ' + props.data.per_gaze[2]],
              ['Objection Detection', concatenatedString],
              ['Tabs Changed' , props.data.tabchange],
              ['Tabs Resized' , props.data.resize]
            ];
          
      
            const chartImage = canvas.toDataURL('image/png', 1.0);
            doc.setFont("Helvetica"); 
            doc.setFontSize(20);
            doc.setTextColor('#00264D'); 
            doc.text('Smart Invigilance Tool' , xaxis , yaxis)
            yaxis += 6
            const today = new Date();
            doc.setFontSize(12);
            doc.text('Report Generated: '+ today.toLocaleDateString() , xaxis + 5 , yaxis)
            doc.setTextColor('#000000');
            yaxis += 20
            doc.setFont("Helvetica", "bold"); 
            doc.text('Candidate Details', xaxis , yaxis)
            yaxis += 8
            doc.setFont("Arial","regular"); 
            doc.setFontSize(10)
            doc.text('Name: '+ props.data.name, xaxis+5, yaxis);
            yaxis += 5
            doc.text('Contact: '+ props.data.contact, xaxis+5, yaxis);
            yaxis += 5
            doc.text('Email: '+ props.data.email, xaxis +5, yaxis);
            yaxis += 5
            doc.text('Date of Birth: '+ props.data.birthdate.substring(0, 10), xaxis+5, yaxis);
            yaxis += 5
            doc.text('City: '+ props.data.City, xaxis+5, yaxis);

            yaxis = 36
            yaxis += 10
            doc.setFont("Helvetica", "bold"); 
            doc.setFontSize(12)
            doc.text('Test Details', 100 ,yaxis)
            yaxis += 8
            doc.setFont("Arial","regular"); 
            doc.setFontSize(10)
            doc.text('Test:'+ props.data.testname, 105, yaxis);
            yaxis += 5
            doc.text('Questions:'+ props.data.noques, 105, yaxis);
            yaxis += 5
            doc.text('Time Limit:'+ props.data.time, 105, yaxis);
            yaxis += 5
            doc.text('Score:'+ props.data.score, 105, yaxis);

            yaxis += 30
            doc.setFont("Helvetica", "bold"); 
            doc.setFontSize(12)
            doc.text('Proctoring Results', xaxis,yaxis)
            yaxis += 5
            doc.autoTable({
              head: [tableData[0]], // Table header row
              startY: yaxis,
              body: tableData.slice(1), // Table data rows
            });
            yaxis += 60
            doc.addImage(chartImage, 'PNG', xaxis, yaxis, 180, 0); 
            doc.save(`${props.data.name}.pdf`);
        
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
        <DialogTitle style={{fontSize:'30px'}}> Report Results </DialogTitle>
        <DialogContent>
            <Typography> Candidate Name:  {props.data.name}</Typography>
            <Typography> Test:  {props.data.testname}</Typography>
            <Typography> Timelimit:  {props.data.time}</Typography>
            <Typography> Score:  {props.data.score}</Typography>
            <div ref={chartRef} style= {{display:'flex'}}>
     {facedata && <div>
      <h3>Face Verification</h3>
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
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      <Legend />
      </PieChart>
    </div>
}
{gazedata && 
    <div>
    <h3>Gaze Detection</h3>
    <BarChart width={500} height={300} data={gazedata} style={{marginRight:'60px'}}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>

    </div>
}
{props.data.per_object &&
    <div>
      <h3>Object Detection</h3>
      <PieChart width={300} height={300}>
        <Pie
          dataKey="value"
          data={props.data.per_object}
          cx={150}
          cy={150}
          outerRadius={80}
          fill="#8884d8"
          label
        >
                 {
          props.data.per_object.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))
        }
        </Pie>
        <Tooltip/>
        <Legend/>
      </PieChart>
    </div>
}
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