import React from 'react'
import { Link ,useNavigate} from 'react-router-dom'
import axios from 'axios'
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useContext } from 'react';
import { Authcontext } from "../context/authcontext";
const BASE_URL= import.meta.env.VITE_API_URL;

function Header() {

  const { roll, user, login, setlogin } = useContext(Authcontext)
  

  const [open, setopen] = useState(false)
const [hide, sethide] = useState(false)

  const navigate = useNavigate()

  const toggle = () => {
    if (open == false) {
      setopen(true)
    } else {
      setopen(false)
    }
  }

 


  const logout = async () => {
    axios.post(`${ BASE_URL}/api/logout`, {}, {
      withCredentials: true
    })
    localStorage.removeItem("username")
    localStorage.removeItem("userrole")
    setlogin(false)
   navigate('/login')
  }
  

  return (
    <div>
      <nav className="fixed top-0 left-0 w-full h-16 md:justify-evenly bg-gray-100 shadow-md z-50 px-4 md:px-30 flex items-center gap-32 md:gap-70">

        {/* Left Side: Logo and User Info */}
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2">
            <img
              className="w-10 h-10 rounded-full object-cover border border-gray-100 shadow-sm"
              src="logo.png"
              alt="logo"
            />
            <div className=" flex sm:flex items-center bg-blue-50 px-3 py-1 rounded-full gap-2 border border-blue-100">
              <img
                className="w-5 h-5 rounded-full object-cover"
                src="https://i.pinimg.com/736x/30/00/bc/3000bc660ae976e66c5d5b101ee714bf.jpg"
                alt="user"
              />
              <span className="text-xs font-bold text-gray-900 truncate max-w-20">
                { user || "Guest"}
              </span>
            </div>
          </Link>
        </div>

        {/* Middle: Navigation Links */}
        {roll == "admin" &&<div className="hidden lg:flex items-center mr-5  gap-8 text-gray-800 font-semibold text-sm">
          {['Home', 'Addstudent', 'View', 'Update', 'Message'].map((item) => (
            <motion.div key={item} whileHover={{ y: -2, color: '#1e3a8a' }}>
              <Link
                to={item === 'Update' ? '/Contect' : item === 'Message' ? '/Sms' : `/${item}`}
                className="hover:text-blue-900 transition-colors"
              >
                {item}
              </Link>
            </motion.div>
          ))}
        </div>}
        {roll == "user" && <div className="hidden lg:flex items-center mr-5  gap-8 text-gray-800 font-semibold text-sm">
          {['Home'].map((item) => (
            <motion.div key={item} whileHover={{ y: -2, color: '#1e3a8a' }}>
              <Link
                to={item === 'Update' ? '/Contect' : item === 'Message' ? '/Massage' : `/${item}`}
                className="hover:text-blue-900 transition-colors"
              >
                {item}
              </Link>
            </motion.div>
          ))}
        </div>}

        {/* Right Side: Auth Buttons */}
        <div className="flex items-center gap-3">
          {login ? (
            <button
              onClick={logout}
              className="bg-gray-800 shadow-md hover:bg-gray-700 cursor-pointer transition-all w-20 h-9 text-xs font-bold text-white rounded-full flex items-center justify-center"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/Login"
              className="bg-gray-800 shadow-md  hover:bg-gray-700 transition-all w-20 h-9 text-xs font-bold text-white rounded-full  flex md:flex items-center justify-center"
            >
              Login
            </Link>
          )}

          <Link
            to="/Rajister"
            className="bg-gray-300 shadow-md hover:bg-gray-200 transition-all w-20 h-9 text-xs font-bold text-black hidden  rounded-full md:flex items-center justify-center"
          >
            Register
          </Link>



        {  roll == "admin" && (<button className= ' text-2xl font-bold md:hidden ' 
            onClick={toggle}
          >&#9776;</button>)
}
          <div className='w-30 h-auto fixed mt-56 shadow-lg bg-white ml-67.5'>

          </div>

        </div>


      </nav>


      <div className='bg-gray-50 flex justify-end '>
        <nav className={`md:text-md gap-3 md:hidden ${open ? "block" : "hidden"} mt-16 w-40 flex p-4 flex-col text-md font-bold text-gray-700  bg-gray-100 md:gap-15 `} >
          <Link to="/Home" className=' hover:text-green-600 border-b '>Home</Link>
          <Link to="/Addstudent" className=' hover:text-green-600 border-b '>Addstudent</Link>
          <Link to="/View" className=' hover:text-green-600 border-b '>View</Link>
          <Link to="/Contect" className=' hover:text-green-600 border-b '>update</Link>
          <Link to="/Massage" className=' hover:text-green-600 border-b '>Message</Link>
        </nav>
      </div>


    </div>

  )
}

export default Header