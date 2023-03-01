import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const Navbar = () => {
 return (
    <AppBar position="static" style={{background: 'linear-gradient(to right bottom, #00264D, #02386E , #00498D)'}}>
      <Toolbar sx={{ display: { xs: "flex" }, flexDirection: "row", justifyContent: "space-between"}}>
        <Typography variant="h6" component="div" > Smart Invigilance Tool </Typography>
        <Box component="span" sx={{display: { md: "flex" }, flexDirection: "row", justifyContent: "space-evenly",}}>
        <Typography variant="h8" component="div" sx={{paddingRight:'30px'}} >
          Logout
        </Typography>
        {/* <Typography variant="h8" component="div" sx={{paddingRight:'30px'}}>
          About
        </Typography>
        <Typography variant="h8" component="div" sx={{paddingRight:'30px'}}>
          Contact
        </Typography>
        <Typography variant="h8" component="div" sx={{paddingRight:'30px'}} >
          Sign in
        </Typography> */}
        </Box>
        
      </Toolbar>
    </AppBar>
 );
}

export default Navbar;