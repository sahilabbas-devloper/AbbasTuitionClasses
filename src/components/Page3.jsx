import React from 'react'
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function Page3() {

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  // Image Floating Animation
  const floatAnimation = {
    y: [0, -15, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };
  return (
<motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: false, amount: 0.3 }}
  variants={containerVariants}
>
  <section id="About" className='w-full min-h-screen bg-gray-50 max-w-full flex flex-col items-center justify-center '>
    <div className='w-full max-w-6xl flex flex-col-reverse md:flex-row items-center justify-between md:gap-20 '>

      {/* Left Text Content */}
      <motion.div 
        className='w-full flex flex-col p-4'
        variants={itemVariants}
      >
        <h1 className='text-4xl md:text-5xl font-bold text-gray-950 mb-2'>
          We Have Highly Experts
        </h1>

        <h1 className='text-4xl md:text-5xl font-bold mb-6 text-blue-800'>
          Experienced Tutors.
        </h1>
        
        <div className="space-y-4 text-gray-800 mb-8">
          <h1 className='text-xl font-bold'>
            Name : <span className='text-gray-700 font-semibold'>Abbas jafar</span>
          </h1>
          
          <div>
            <h1 className='text-xl font-bold'>Qualification :</h1>
            <span className='text-md font-semibold text-gray-700 ml-4 block'>
              Master in economics, B.Ed + M.Ed + D.Eled + BTC + MA
            </span>
          </div>
          
          <div>
            <h1 className='text-xl font-bold'>Qualified exams :</h1>
            <span className='text-md font-semibold text-gray-700 ml-4 block'>
              TET + CTET + REET
            </span>
          </div>
        </div>

        <a 
         href='#Contect'
          className='w-40 h-12 text-sm font-semibold rounded-full shadow-lg text-white flex items-center justify-center bg-gray-800 hover:bg-gray-700 transition-all duration-300 transform hover:-translate-y-1'
        >
          GO TO CONTACT
        </a>
      </motion.div>

      {/* Right Image Content */}
      <motion.div 
        className='w-full h-auto flex justify-center  mb-10 md:mb-0'
        variants={itemVariants}
        animate={floatAnimation}
      >
        <div className='flex items-center  justify-center '>
          <div className='w-80 h-70 md:w-96 md:h-96 rounded-full pl-22 bg-white overflow-hidden shadow-2xl border-8 border-white'>
          <img
            className='w-full h-full  object-cover'
            src="aboutimg.jpg" 
            alt="Abbas Jafar" 
          />
           </div>
        </div>
       
      </motion.div>

    </div>
  </section>
</motion.div>

  )
}

export default Page3