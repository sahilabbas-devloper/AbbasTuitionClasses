
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useContext } from 'react';
import { Authcontext } from "../context/authcontext";
const BASE_URL = import.meta.env.VITE_API_URL;



function Login() {
    const [role, setrole] = useState('')
  const [username, setusername] = useState('')
  const [passward, setpassward] = useState('')
  const [Loading, setLoading] = useState(false)

  const { setroll, setuser } = useContext(Authcontext)

  const navigate = useNavigate()
  axios.defaults.withCredentials = true;


  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await axios.post(`${BASE_URL}/api/Login`, { role, username, passward })
      
      alert(res.data.massage);
      setuser(res.data.user.username)
       localStorage.setItem("username",res.data.user.username)
   setroll(res.data.user.role)
   localStorage.setItem("userrole",res.data.user.role)
      if (res.data.massage == "sucessfully Login.") {
        navigate('/Home')
      }
    } catch (error) {
      console.log("axios", error)
    } finally {
      setLoading(false)
    }


  }
  return (
    <div>
      <div className='w-full h-15 bg-gray-50'>

      </div>
      <section className='w-full min-h-screen bg-gray-50 max-w-full h-full flex flex-col ju items-center' >
        <div className='flex items-center flex-col h-full mt-25 md:mt-15 rounded-lg bg-white shadow-lg justify-center'>
          <div
            className='flex flex-col p-4 gap-2 w-90 '
          >
            <div className='flex items-center  mb-5'>
              <div className='w-10 h-auto  rounded-full '>
                <img
                  className='w-8 h-auto  rounded-full'
                  src="logo.png" alt="logo" />
              </div>

            </div>


            <div className='flex justify-center'>
              <h1 className='text-2xl font-semibold mb-15'>Welcome Back</h1>
            </div>




              <form 
              onSubmit={submit}
              >
            <select name="" id=""
              className='w-full border-none bg-gray-100 outline-none p-2 rounded-sm'
              onChange={(e) => setrole(e.target.value)}>
              <option>select role</option>
              <option value="admin">admin</option>
              <option value="user">user</option>
            </select>

            <label htmlFor="" className='font-semibold  text-sm text-gray-600'>Usename</label>
            <input type="text"
              placeholder='Username'
              required
              className='w-full border-none bg-gray-100 outline-none p-2 rounded-sm'
              value={username}
              onChange={(e) => setusername(e.target.value)}
            />



            <label htmlFor="" className='font-semibold  text-sm text-gray-600'>passward</label>
            <input type="text"
              placeholder='passward'
              required
              className='w-full border-none bg-gray-100 outline-none p-2 rounded-sm'
              value={passward}
              onChange={(e) => setpassward(e.target.value)}
            />

            <div className='flex gap-10 mb-5 items-center w-full mt-2 justify-between'>
              <input type="checkbox"
                required
              />
             

              <Link to={"/FOrgotpass"} className='font-semibold text-blue-800 text-[13px]'>Forgot passward?</Link>
            </div>
          
            <div className='flex justify-center'>
              <button
                disabled={Loading}
               type='submit' 
                className='bg-gray-800 hover:bg-gray-600 text-white w-full h-9 mb-5 shadow-lg rounded-lg flex  items-center justify-center font-semibold mt-9'>
                {Loading && (
                  <div className='fixed inset-0 bg-black/40 flex items-center justify-center z-50'>

                    <div className='w-14 h-14 border-4 border-white border-t-transparent rounded-full animate-spin'></div>

                  </div>

                )}
                Login</button>

            </div>
             </form>
            <p className='text-gray-600 ml-12 font-semibold text-sm mb-10 shadow-'>Already have Account? <Link to={"/Rajister"} className='text-blue-800'>Rajister</Link></p>
          </div>

        </div>
      </section>

    </div>
  )
}

export default Login