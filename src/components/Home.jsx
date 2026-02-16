import React from 'react'
import axios from 'axios'
import { useState } from 'react';
import CountUp from 'react-countup'
import { useEffect, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useContext } from 'react';
import { motion } from "framer-motion";
import { Authcontext } from "../context/authcontext";
import Page from './page';
import Page3 from './Page3';
import Page4 from './Page4';
import Page5 from './Page5';
import Page6 from './Page6';
import Page7 from './Page7';
const BASE_URL= import.meta.env.VITE_API_URL;

function Home() {

const {setlogin} = useContext(Authcontext)
  const navigate = useNavigate()
  const called = useRef(false)

  
   useEffect(() => {
    if (called.current) return;
    called.current = true;

    const func = async () => {
      const res = await axios.get(`${BASE_URL}/api/Home`, {
        withCredentials: true
      })

      setlogin(true)
      alert(res.data.massage)
      if (res.data.massage == "Login required") {
        setlogin(false)
        navigate('/Login')
      }
    }
    func()


  }, [])

  const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const fadeRight = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8 },
  },
};

const fadeLeft = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8 },
  },
};




  return (
    
    
    <div className="overflow-x-hidden">


        <div className='bg-gray-50 w-full h-15'>
       
      </div>




      <section className='w-full min min-w-screen bg-gray-50 flex flex-col items-center py-10'>

        <div className=' w-full mx-auto flex flex-col md:flex-row gap-5 px-4'>

          {/* LEFT SECTION */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            className='w-full flex flex-col p-10 pt-15'
          >

            <div className='flex items-center'>
              <img
                className='w-5 max-w-md h-auto object-cover'
                src="https://img.freepik.com/premium-vector/childrens-learning-entertaining-cartoon-character-vector-illustration-education-media_1253044-90774.jpg?semt=ais_user_personalization&w=740&q=80"
                alt=""
              />
              <div className='flex items-end mt-2'>
                <p className='text-[12px] mb-2 font-semibold text-blue-900'>
                  education is born to grow
                </p>
              </div>
            </div>

            <h1 className='text-4xl font-bold'>Getting Best</h1>
            <h1 className='text-4xl font-bold'>
              Quality <span className='text-blue-900'>Education</span>
            </h1>
            <h1 className='text-4xl font-bold text-blue-900'>
              is Now More Easier
            </h1>

            <p className='text-[12px] mt-3 font-semibold text-gray-600'>
              Education is the foundation of growth, and we are here to make that foundation stronger than ever.<br></br>With our innovative teaching methods and a curriculum designed by industry experts,<br></br>we provide a seamless learning experience that adapts to your pace, helping you unlock your <br></br>full potential and achieve your academic dreams.
            </p>
          

            <a
            href='#About'
              className='w-35 h-10 text-[11px] font-semibold rounded-3xl shadow-xl text-white flex items-center mt-5 justify-center mb-6 hover:bg-gray-700 bg-gray-800'
            >
              About us
            </a>

          </motion.div>


          {/* RIGHT IMAGE */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            className='w-full rounded-2xl mix-blend-darken md:block overflow-hidden'
          >
            <img
              className='w-full max-w-md h-auto object-cover'
              src="new.jpg"
              alt="photo"
            />
          </motion.div>

        </div>


        {/* COUNTER SECTION */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          className='flex items-center text-sm justify-evenly w-full h-30 bg-gray-800'
        >

          <div className='flex items-center justify-center w-full h-auto flex-col border-r-2 border-white'>
            <div style={{ fontSize: "1rem", fontWeight: "bold", color: "white" }}>
             <CountUp start={0} end={120} duration={5.5} enableScrollSpy />+
            </div>
            <h3 className='text-sm text-white'>current students</h3>
          </div>

          <div className='flex items-center justify-center w-full h-auto flex-col border-r-2 border-white'>
            <div style={{ fontSize: "1rem", fontWeight: "bold", color: "white" }}>
              <CountUp start={0} end={150} duration={5.5} enableScrollSpy />+
            </div>
            <h3 className='text-[12px] md:text-sm text-white'>passout students</h3>
          </div>

          <div className='flex items-center justify-center w-full h-auto flex-col border-r-2 border-white'>
            <div style={{ fontSize: "1rem", fontWeight: "bold", color: "white" }}>
              <CountUp start={0} end={200} duration={5.5} enableScrollSpy />+
            </div>
            <h3 className='md:text-sm text-[12px] text-white'>good feedbacks</h3>
          </div>

          <div className='flex items-center justify-center w-full h-auto flex-col'>
            <div style={{ fontSize: "1rem", fontWeight: "bold", color: "white" }}>
              <CountUp start={0} end={320} duration={5.5} enableScrollSpy />+
            </div>
            <h3 className='md:text-sm text-[12px] text-white'>satisfied parents</h3>
          </div>

        </motion.div>

      </section>

      <Page />
      <Page3/>
      <Page7 />
      <Page5 />
      <Page6 />
      <Page4 />

  
</div>


  )
}

export default Home