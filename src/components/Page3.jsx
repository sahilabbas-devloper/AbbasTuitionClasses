import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaArrowRight, FaCertificate } from 'react-icons/fa'

function Page3() {

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  }

  // Image floating animation — kept separate from entrance variants
  const floatAnimation = {
    y: [0, -12, 0],
    transition: {
      duration: 3.5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      <section
        id="About"
        className="relative w-full min-h-screen bg-white max-w-full flex flex-col items-center justify-center px-6 py-24 overflow-hidden"
      >

        {/* Decorative gradient blobs */}
        <div className="absolute top-10 -left-32 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 -right-32 w-96 h-96 bg-indigo-100/40 rounded-full blur-3xl pointer-events-none" />

        <div className="relative w-full max-w-6xl flex flex-col-reverse md:flex-row items-center justify-between gap-16 md:gap-20">

          {/* Left Text Content */}
          <motion.div className="w-full flex flex-col" variants={itemVariants}>

            {/* Badge */}
            <div className="inline-flex w-fit items-center gap-2 bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-full mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
              <p className="text-[11px] font-bold text-blue-800 tracking-wide uppercase">
                Meet the mentor
              </p>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-[1.15] tracking-tight">
              We Have Highly
            </h1>
            <h1 className="text-4xl md:text-5xl font-bold leading-[1.15] tracking-tight mt-1 mb-6">
              <span className="bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent">
                Expert
              </span>{" "}
              <span className="text-slate-900">Tutors</span>
            </h1>

            <div className="space-y-4 mb-8 border-t border-slate-100 pt-6">
              <div className="flex flex-wrap items-baseline gap-2">
                <h2 className="text-base font-bold text-slate-900">Name:</h2>
                <span className="text-sm font-medium text-slate-600">Abbas Jafar</span>
              </div>

              <div>
                <h2 className="text-base font-bold text-slate-900">Qualification:</h2>
                <span className="text-sm font-medium text-slate-600 block mt-1">
                  Master's in Economics, B.Ed + M.Ed + D.El.Ed + BTC + MA
                </span>
              </div>

              <div>
                <h2 className="text-base font-bold text-slate-900">Qualified Exams:</h2>
                <span className="text-sm font-medium text-slate-600 block mt-1">
                  TET + CTET + REET
                </span>
              </div>
            </div>

            <a
              href="#Contact"
              className="group w-fit px-6 h-12 text-sm font-semibold rounded-full text-white flex items-center gap-2 bg-slate-900 hover:bg-slate-800 shadow-lg shadow-slate-900/20 transition-all duration-300"
            >
              Go to Contact
              <FaArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </motion.div>

          {/* Right Image Content */}
          <motion.div className="relative w-full flex justify-center" variants={itemVariants}>
            <div className="relative w-72 h-72 md:w-96 md:h-96">

              {/* Rotated gradient frame behind photo */}
              <div className="absolute -inset-3 bg-gradient-to-br from-blue-100 to-indigo-50 rounded-full -z-10 rotate-3" />

              <motion.div
                animate={floatAnimation}
                className="w-full h-full rounded-full bg-white overflow-hidden shadow-2xl shadow-slate-900/10 border-4 border-white flex items-center justify-center"
              >
                <img
                  className="w-full h-full object-cover"
                  src="aboutimg.jpg"
                  alt="Abbas Jafar"
                />
              </motion.div>

              {/* Floating credential chip */}
              <div className="absolute bottom-2 -left-6 md:-left-10 flex items-center gap-3 bg-white rounded-2xl px-4 py-3 shadow-lg border border-slate-100">
                <div className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center text-blue-700 shrink-0">
                  <FaCertificate className="text-sm" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800">Certified Tutor</p>
                  <p className="text-[10px] text-slate-500">TET · CTET · REET</p>
                </div>
              </div>

              {/* Floating experience chip */}
              <div className="absolute top-4 -right-4 md:-right-8 flex items-center gap-3 bg-white rounded-2xl px-4 py-3 shadow-lg border border-slate-100">
                <div className="w-9 h-9 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs shrink-0">
                  M.A
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800">Master's Degree</p>
                  <p className="text-[10px] text-slate-500">Economics</p>
                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </section>
    </motion.div>
  )
}

export default Page3