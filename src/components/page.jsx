import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from "framer-motion";
import {  FaUser  } from 'react-icons/fa'
function Page() {
  return (
    <div>
      <div className='bg-gray-50 w-full h-15'>

      </div>
     <section className='w-full min-h-screen pt-10 bg-gray-50 max-w-full h-full flex flex-col items-center'>

  <div className='w-full max-w-6xl mt-5 flex flex-col md:flex-row gap-10'>

    {/* LEFT TEXT */}
    <motion.div
      initial={{ opacity: 0, x: -60 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: false, amount: 0.3 }}
      className='w-full flex flex-col p-10 pt-25'
    >

      <h1 className='text-4xl font-bold'>Why we are best</h1>
      <h1 className='text-4xl font-bold'>from others?</h1>

      <p className='text-[12px] mt-3 font-semibold text-gray-600'>
        
      </p>
      <p className='text-[12px] font-semibold text-gray-600'>
        We don't just teach; we empower students with the right skills, personalized attention and a passion for excellence. 
      </p>

      <a
       href='#Contect'
        className='w-35 h-10 text-[11px] font-semibold rounded-3xl shadow-xl text-white flex items-center mt-5 justify-center mb-6 bg-gray-800'
      >
        GO TO CONTECT
      </a>

    </motion.div>



    {/* RIGHT CARDS */}
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: false, amount: 0.3 }}
      className='w-auto h-auto p-5 md:p-0 flex md:flex-wrap flex-wrap gap-2'
    >

      {/* Card 1 */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: false }}
        className='md:w-55 w-40 bg-white h-auto flex flex-col p-4 shadow-lg rounded-xl hover:scale-105 transition-transform duration-300'
      >
        <div className='flex items-center justify-center mb-2 bg-gray-700 w-10 h-10 rounded-md text-white'>
          <FaUser />
        </div>
        <h1 className='text-xl mb-1 font-bold'>best Tutors</h1>
        <p className='text-[12px] font-semibold text-gray-600'>
          Learn form industry experts abd experienced educators dedicated to your academic and professional growth.
        </p>
        
      </motion.div>

      {/* Card 2 */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: false }}
        className='md:w-55 w-40 bg-white h-auto flex flex-col p-4 shadow-lg rounded-xl hover:scale-105 transition-transform duration-300'
      >
        <div className='flex items-center justify-center mb-2 bg-gray-700 w-10 h-10 rounded-md text-white'>
          ⭐
        </div>
        <h1 className='text-xl mb-1 font-bold'>Best satisfaction</h1>
        <p className='text-[12px] font-semibold text-gray-600'>
          Our priority is your success.<br></br>We ensure supportive learning environment that helps you reach your full potential.
        </p>
      </motion.div>

      {/* Card 3 */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: false }}
        className='md:w-55 w-40 bg-white h-auto flex flex-col p-4 shadow-lg rounded-xl hover:scale-105 transition-transform duration-300'
      >
        <div className='flex items-center justify-center mb-2 bg-gray-700 w-10 h-10 rounded-md text-white'>
          💰
        </div>
        <h1 className='text-xl mb-1 font-bold'>best price</h1>
        <p className='text-[12px] font-semibold text-gray-600'>
          High-quality education shouldn't break the bank.<br></br>We offer premium learning experience at the most competitive prices. 
        </p>
      </motion.div>

      {/* Card 4 */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        viewport={{ once: false }}
        className='md:w-55 w-40 bg-white h-auto flex flex-col p-4 shadow-lg rounded-xl hover:scale-105 transition-transform duration-300'
      >
        <div className='flex items-center justify-center mb-2 bg-gray-700 w-10 h-10 rounded-md text-white'>
          💡
        </div>
        <h1 className='text-xl mb-1 font-bold'>Creative Thinking</h1>
        <p className='text-[12px] font-semibold text-gray-600'>
          We move beyond rote learning. Our innovative methods encourage out-of-the-box thinking and practical problem-solving.
        </p>
      </motion.div>

    </motion.div>

  </div>

</section>

 
</div>
)
}

export default Page