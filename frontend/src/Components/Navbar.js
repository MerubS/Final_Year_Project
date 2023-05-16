import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import { useNavigate } from "react-router-dom";
import Useauth from '../Routes/Auth';


const Navbar = () => {
  const navigate = useNavigate();
  const authenticate= Useauth();
  const loginHandler = () => {
    authenticate.setauth(false);
    navigate("/login");
  }
 return (
    <AppBar position="static" style={{background: 'linear-gradient(to right bottom, #00264D, #02386E , #00498D)'}}>
      <Toolbar sx={{ display: { xs: "flex" }, flexDirection: "row", justifyContent: "space-between"}}>
        <Typography variant="h6" component="div" > Smart Invigilance Tool </Typography>
        <Box component="span" sx={{display: { md: "flex" }, flexDirection: "row", justifyContent: "space-evenly",}}>
        <Typography variant="h8" component="div" sx={{paddingRight:'30px'}} >
        <Button variant='contained' style={{background: 'linear-gradient(to right bottom, #00264D, #02386E , #00498D)'}} onClick={loginHandler}> Logout </Button> 
        </Typography>
        </Box>
        
      </Toolbar>
    </AppBar>
 );
}

export default Navbar;