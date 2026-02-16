import { useState } from "react";
import {Authcontext} from '../context/authcontext.js'


const AuthProvider = ({ children }) => {

  const [login,setlogin] = useState()
   const [user,setuser] = useState(localStorage.getItem("username"))
   const [roll,setroll] = useState(localStorage.getItem("userrole"))
  return (
    <Authcontext.Provider value={{login,setlogin,user,setuser,roll,setroll}}>
      {children}
    </Authcontext.Provider>
  );
}

export default AuthProvider;