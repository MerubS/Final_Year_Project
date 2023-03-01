import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Dashboard from '../Dashboard';
import Report from '../Report';
import QuestionBank from '../QuestionBank';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event , newValue) => {
    setValue(newValue);
  };

  return (
    <>
    <Navbar> </Navbar>
    <Box sx={{ width: '100%' , marginBottom:'50px'}}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Dashboard" {...a11yProps(0)} />
          <Tab label="Question Bank" {...a11yProps(1)} />
          <Tab label="Report" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
       <Dashboard/>
      </TabPanel>
      <TabPanel value={value} index={1}>
       <QuestionBank/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Report/>
      </TabPanel>
    </Box>
    <Footer/>
    </>
    
  );
}