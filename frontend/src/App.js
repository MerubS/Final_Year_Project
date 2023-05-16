
import TabPanel from "./Pages/BasicTabs"
import Login from "./Pages/Login"
import Register from "./Pages/Register"
import Test from "./Pages/Test"
import Uploadpic from "./Pages/Uploadpic"
import Home from "./Pages/Home"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Protectedroute, { Protectedcanroute } from "./Routes/Protectedroute"
import { ContextProvider } from "./Routes/Auth"
import Thankyou from "./Pages/Thankyou";


function App() {
 
  return (
   <>
    <Router>
      <ContextProvider>
        <Routes>
            <Route path="/" element={<Home />} />
             <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={ <Protectedroute> <TabPanel /> </Protectedroute> } />
            <Route path="/register" element={<Register/>}/>
            <Route path="/test" element={<Protectedcanroute> <Test/> </Protectedcanroute>}/>
            <Route path="/upload" element={<Protectedcanroute> <Uploadpic/> </Protectedcanroute>}/>
            <Route path="/thankyou" element={<Thankyou/>}/>
        </Routes>
        </ContextProvider>
      </Router>
      
    </>
  );
}

export default App;
