import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Grid , Card , CardContent , Button } from '@mui/material';
const DTable = (props) => {
    const rows = [
        {name: 'Software Engineering' , status: 'Start', time:'06:00' , level:'medium'},
        {name: 'Agile Practices' , status: 'Resume' , time:'03:23', level:'hard'}
      ];
 return(
   <Card sx={{ minWidth: 275 , marginBottom:'20px'}}>
    <CardContent>
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell > Sno </TableCell>
            {props.heading.map((head)=> (
              <TableCell align='center'> {head} </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" sx={{borderBottom:'none'}}>
                {row.name}
              </TableCell>
              <TableCell align="center" sx={{borderBottom:'none'}}> <Button variant='outlined' sx={{color:row.color , borderColor:row.color}}> {row.status} </Button> </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </CardContent>
  </Card>
 );
}

export default DTable;