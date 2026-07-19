import {  Routes, Route,useLocation } from "react-router-dom";
import Header from './components/Header'
import Home from './components/Home'
import Rajister from "./components/Rajister"
import Login from "./components/Login";
import Contect from "./components/Contect";
import Addstudent from "./components/Addstudent";
import View from "./components/View";
import Massage from "./components/Massage";
import Forgotpass from "./components/Forgotpass";
import WelcomePage from './components/Welcome';
import SendSMS from "./components/SendSMS"
function App() {

  const location = useLocation();

  // जिन paths पर Navbar नहीं दिखाना है, उन्हें यहाँ check कर लो
  const hideNavbarPaths = ['/Login', '/login','/Rajister',]; // safe side के लिए small/capital दोनों रख सकते हैं
  const shouldHideNavbar = hideNavbarPaths.includes(location.pathname);


  return (

    <div>


        {!shouldHideNavbar && <Header />}
        <Routes>
          <Route path='/' element={  <WelcomePage/>} />
          <Route path='/Home' element={<Home />} />
            <Route path='/Sms' element={< SendSMS />} />
          <Route path='/Rajister' element={<Rajister />} />
          <Route path='/Addstudent' element={< Addstudent />} />
           <Route path='/View' element={< View />} />
          <Route path='/Contect' element={<Contect />} />
          <Route path='/login' element={<Login />} />
            <Route path='/Massage' element={<Massage />} />
                <Route path='/Forgotpass' element={<Forgotpass />} />
        </Routes>
      
  
    </div>

  )
}

export default App
