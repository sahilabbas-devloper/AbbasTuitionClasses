import React from 'react'
import axios from 'axios'
import CountUp from 'react-countup'
import { useEffect, useRef, useContext,useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from "framer-motion"
import { FaArrowRight, FaPlay } from "react-icons/fa"
import { Authcontext } from "../context/authcontext"
import Page from './page'
import Page3 from './Page3'
import Page4 from './Page4'
import Page5 from './Page5'
import Page6 from './Page6'
import Page7 from './Page7'
import Footer from "./Footer"
import AuthLoader from './AuthLoader'

const BASE_URL = import.meta.env.VITE_API_URL;

function Home() {

  const [Loading, setLoading] = useState()
  const { setlogin } = useContext(Authcontext)
  const navigate = useNavigate()
  const called = useRef(false)

  // LocalStorage check Top-Level par hoga
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  
    useEffect(() => {

      if (isAuthenticated) {
      return; 
    }


    if (called.current) return;
    called.current = true;

    

    const func = async () => {

      setLoading(true)
      try {
        const res = await axios.get(`${BASE_URL}/api/Home`, {
          withCredentials: true
        })

        console.log(res)
        setlogin(true)

        if (res.data.massage === "Login required") {
          setlogin(false)
          alert(res.data.massage)
          navigate('/Login')
        }
      } catch (error) {
        setlogin(false)
        navigate('/Login')
        console.log("auth check error !",error)
      }finally{
        setLoading(false)
      }
    }
    func()
  }, [])
  

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" }
    }
  }

  const fadeRight = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: "easeOut" }
    }
  }

  const fadeLeft = {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: "easeOut" }
    }
  }

  const stats = [
    { end: 120, label: "Current Students" },
    { end: 150, label: "Passout Students" },
    { end: 200, label: "Good Feedbacks" },
    { end: 320, label: "Satisfied Parents" }
  ]

  return (
    <div className="overflow-x-hidden bg-white">

      <div className="w-full h-15"></div>

       {Loading && (
                <AuthLoader/>
              )}
              

      {/* HERO SECTION */}
      <section className="relative w-full min-w-screen bg-white flex flex-col items-center pt-14 pb-32 px-4 overflow-hidden">

        {/* Decorative gradient blobs */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-100/60 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-40 -right-32 w-96 h-96 bg-indigo-100/50 rounded-full blur-3xl pointer-events-none" />

        <div className="relative w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-6">

          {/* LEFT SECTION */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="w-full flex flex-col md:pr-6"
          >
            {/* Badge */}
            <div className="inline-flex w-fit items-center gap-2 bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-full mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
              <p className="text-[11px] font-bold text-blue-800 tracking-wide uppercase">
                Education is born to grow
              </p>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-[1.15] tracking-tight">
              Getting Best Quality
            </h1>
            <h1 className="text-4xl md:text-5xl font-bold leading-[1.15] tracking-tight mt-1">
              <span className="bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent">
                Education
              </span>{" "}
              <span className="text-slate-900">is Now</span>
            </h1>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-[1.15] tracking-tight mt-1">
              More Easier
            </h1>

            <p className="text-sm mt-5 leading-relaxed text-slate-500 max-w-md">
              Education is the foundation of growth, and we are here to make that
              foundation stronger than ever. With teaching methods and a curriculum
              designed by industry experts, we help you unlock your full potential
              and achieve your academic dreams.
            </p>

            <div className="flex items-center gap-4 mt-8">
              
              <a
                href="#About"
                className="group px-6 h-12 text-sm font-semibold rounded-full text-white flex items-center gap-2 bg-slate-900 hover:bg-slate-800 shadow-lg shadow-slate-900/20 transition-all duration-300"
              >
                About Us
                <FaArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-1" />
              </a>

              <a
                href="#Contact"
                className="px-6 h-12 text-sm font-semibold rounded-full text-slate-800 flex items-center gap-2 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all duration-300"
              >
                <span className="w-7 h-7 rounded-full bg-blue-50 flex items-center justify-center">
                  <FaPlay className="text-[9px] text-blue-700 ml-0.5" />
                </span>
                Contact Us
              </a>
            </div>
          </motion.div>

          {/* RIGHT IMAGE */}
          {/* RIGHT ILLUSTRATION — replaces photo */}
<motion.div
  variants={fadeLeft}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.3 }}
  className="relative w-full flex justify-center md:justify-end"
>
  <div className="relative w-full max-w-md aspect-[4/5]">

    {/* Decorative gradient frame behind photo */}
    <div className="absolute -inset-3 bg-gradient-to-br from-blue-100 to-indigo-50 rounded-[2rem] -z-10 rotate-2" />

    {/* Real photo */}
    <img
      src="hero.png"
      alt="Students learning together"
      className="w-full h-full object-cover rounded-3xl shadow-2xl shadow-slate-900/10 border-4 border-white"
    />

    {/* Floating stat chip - top left */}
    <div className="absolute top-5 -left-6 flex items-center gap-3 bg-white rounded-2xl px-4 py-3 shadow-lg border border-slate-100">
      <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xs">A+</div>
      <div>
        <p className="text-xs font-bold text-slate-800">Top Results</p>
        <p className="text-[10px] text-slate-500">U.P Board & CBSE</p>
      </div>
    </div>

    {/* Floating stat chip - bottom right */}
    <div className="absolute bottom-5 -right-6 flex items-center gap-3 bg-white rounded-2xl px-4 py-3 shadow-lg border border-slate-100">
      <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs">★</div>
      <div>
        <p className="text-xs font-bold text-slate-800">Expert Tutors</p>
        <p className="text-[10px] text-slate-500">Verified & Certified</p>
      </div>
    </div>

  </div>
</motion.div>

        </div>

        {/* STATS — floating elevated card */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="relative w-full max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 px-6 md:px-10 py-8 mt-16 md:mt-20 bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-900/5"
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              className={`flex flex-col items-center justify-center text-center ${
                i !== stats.length - 1 ? "md:border-r md:border-slate-100" : ""
              }`}
            >
              <div className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent tracking-tight">
                <CountUp start={0} end={stat.end} duration={2.5} enableScrollSpy />+
              </div>
              <h3 className="text-[12px] md:text-sm text-slate-500 mt-1.5 font-medium">
                {stat.label}
              </h3>
            </div>
          ))}
        </motion.div>

      </section>

      <Page />
      <Page3 />
      <Page7 />
      <Page5 />
      <Page6 />
      <Page4 />
      <Footer />

    </div>
  )
}

export default Home