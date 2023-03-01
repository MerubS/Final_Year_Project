import { AppBar , Box, IconButton, Toolbar , Typography , BottomNavigation } from "@mui/material";
const Footer = () => {
  return (
    <Box sx={{ flexGrow: 1 , position: 'fixed', bottom: 0, left: 0, right: 0 , marginTop:'30px'}}>
    <AppBar position="static" style={{background: 'linear-gradient(to right bottom, #00264D, #02386E , #00498D) ' , height:'2rem'}}>
      <Toolbar sx={{ display: { xs: "flex" }, flexDirection: "row", justifyContent: "space-between"}}>
        {/* <Typography variant="h6" component="div" > Smart Invigilance Tool </Typography> */}
        {/* <Box component="span" sx={{display: { md: "flex" }, flexDirection: "row", justifyContent: "space-evenly",}}>
        <Typography variant="h8" component="div" sx={{paddingRight:'30px'}} >
          About
        </Typography>
        <Typography variant="h8" component="div" sx={{paddingRight:'30px'}}>
          Contact us
        </Typography>
        <Typography variant="h8" component="div" sx={{paddingRight:'30px'}}>
          Terms
        </Typography>
        <Typography variant="h8" component="div" sx={{paddingRight:'30px'}} >
          Privacy
        </Typography>
        </Box> */}
        
      </Toolbar>
    </AppBar>
  </Box>
  );
}

export default Footer;