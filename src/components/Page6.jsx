
import { useState } from 'react'
import axios from 'axios'
import { motion } from 'framer-motion';
import {  FaPhoneAlt,FaEnvelope  } from 'react-icons/fa'
const BASE_URL= import.meta.env.VITE_API_URL;

function Page6() {

    const [email, setemail] = useState()
    const [massage, setmassage] = useState()
    const [Loading, setLoading] = useState(false)

    const sendfeedback = async (e) => {

        e.preventDefault()
        setLoading(true)


        try {
            const res = await axios.post(`${ BASE_URL}/api/sendfeedback`, { email, massage })
            alert(res.data)

        } catch (error) {
            console.log("axios", error)
        } finally {
            setLoading(false)
        }




    }
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
        <div>
            <div className='w-full h-15 bg-gray-50'>

      </div>

           <motion.section
           id='Contect'
  initial="hidden"
  whileInView="visible"
  viewport={{ once: false, amount: 0.3 }}
  variants={containerVariants}
  className='w-full bg-gray-50 min-h-screen max-w-full h-full flex flex-col items-center'
>
  <div className='w-full max-w-6xl justify-center flex flex-col md:gap-2 gap-20 md:flex-row'>

    {/* LEFT : FEEDBACK FORM */}
    <motion.div
      variants={itemVariants}
      className='w-auto bg-white flex shadow-lg flex-col rounded-xl p-4 gap-1'
    >
      <h1 className='text-lg font-bold mb-8'>Send Feedback</h1>

      <label className='text-md mb-1'>Enter email</label>
      <input
        type="text"
        required
        onChange={(e) => setemail(e.target.value)}
        className='border outline-none p-2 mb-2'
        placeholder='enter your email'
      />

      <label className='text-md mb-1'>Send a message</label>
      <input
        type="text"
        required
        onChange={(e) => setmassage(e.target.value)}
        className='border p-4 h-40 outline-none'
        placeholder='Message'
        max={30}
      />

      <button
        onClick={sendfeedback}
        disabled={Loading}
        className='w-full h-10 text-[11px] font-semibold rounded-sm shadow-xl text-white flex items-center mt-5 justify-center mb-6 bg-gray-800'
      >
        {Loading && (
          <div className='fixed inset-0 bg-black/40 flex items-center justify-center z-50'>
            <div className='w-14 h-14 border-4 border-white border-t-transparent rounded-full animate-spin'></div>
          </div>
        )}
        Send Feedback
      </button>
    </motion.div>

    {/* RIGHT : CONTACT INFO */}
    <motion.div
      variants={itemVariants}
      className='w-auto bg-white rounded-2xl p-4 shadow-lg pt-4'
    >
      <h1 className='text-3xl font-bold mb-10'>
        Lets <span className='text-blue-800'>Connect</span>
      </h1>

      <motion.div variants={itemVariants} className='flex items-center gap-5 mb-4'>
        <div className='bg-blue-800 rounded-full flex items-center justify-center w-12 h-12 text-white'>
          <FaPhoneAlt />
        </div>
        <div className='text-sm'>
          <h1 className='text-lg font-bold'>call us</h1>
          <p className='text-[12px] font-semibold text-gray-600'>
            +91 79851-06600 | +91 89601-51890
          </p>
          <p className='text-[12px] font-semibold text-gray-600'>
            monday-saturday 2pm-8pm IST
          </p>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className='flex items-center gap-5 mb-4'>
        <div className='bg-blue-800 rounded-full flex items-center justify-center w-12 h-12 text-white'>
          <FaEnvelope />
        </div>
        <div className='text-sm'>
          <h1 className='text-lg font-bold'>Email us</h1>
          <p className='text-[12px] font-semibold text-gray-600'>
            abbasjafer0581999@gmail.com
          </p>
          <p className='text-[12px] font-semibold text-gray-600'>
            Response within 24 hours
          </p>
        </div>
      </motion.div>

      {/* FAQ */}
      <motion.div variants={itemVariants} className='flex flex-col'>
        <h1 className='text-lg font-bold mb-2'>Frequently Asked Question</h1>

        <div className='border-b mb-2'>
          <h1 className='text-md font-semibold mb-1'>
            Why only us? how many facility provied?
          </h1>
          <p className='text-[12px] font-semibold text-gray-600'>
            1.Modern Infrastructure: State-of-the-art labs and classrooms equipped with the latest technology for a superior learning experience.<br></br>2.Comprehensive Career Support: Dedicated placement assistance, resume building workshops, and mock interview sessions to help you land your dream job.<br></br>3.Affordable Fee Structure: Quality education and training programs offered at competitive and flexible fee structures.<br></br>4.Certification Programs: Receive recognized certificates upon completion that add significant value to your professional portfolio.
          </p>
        </div>

        <div className='border-b mb-2'>
          <h1 className='text-md font-semibold mb-1'>
            Why only us? How many facility provied?
          </h1>
          <p className='text-[12px] font-semibold text-gray-600'>
1.Student-Centric Approach: We focus on individual learning paces to ensure every student understands the core concepts thoroughly.<br></br>2.Expert Faculty: Learn from experienced professionals who bring real-world industry insights into the classroom.<br></br>3.Job-Oriented Training: Our curriculum is designed to make students industry-ready with hands-on projects and internships.<br></br>4.Flexible Timing: We offer flexible batch timings to accommodate working professionals and students alike.
          </p>
        </div>
      </motion.div>
    </motion.div>

  </div>
</motion.section>

        </div>
    )
}

export default Page6
