import { createContext , useState , useContext  } from "react";
export const authContext = createContext();
export const ContextProvider = ({ children }) => {
  const [auth, setauth] = useState(false);
  const [canauth,setcanauth] = useState(false);
  return <authContext.Provider value={{auth,setauth,canauth,setcanauth}}>{children}</authContext.Provider>
}
const Useauth = () => {
  const context = useContext(authContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};


export default Useauth;