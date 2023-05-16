import { Navigate } from "react-router-dom";
import Useauth from "./Auth";
const Protectedroute = ({children}) => {
    const isAuthenticated = Useauth();
    console.log(isAuthenticated);
  return (
   
    isAuthenticated.auth? children : <Navigate to='/' replace/>

  );
}

export const Protectedcanroute = ({children}) => {
    const isAuthenticated = Useauth();
    console.log(isAuthenticated);
  return (
   
    isAuthenticated.canauth? children : <Navigate to='/Login' replace/>

  );
}

export default Protectedroute;