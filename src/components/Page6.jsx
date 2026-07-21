import React, { useState } from 'react'
import axios from 'axios'
import { motion } from 'framer-motion'
import { FaPhoneAlt, FaEnvelope, FaChevronDown } from 'react-icons/fa'

const BASE_URL = import.meta.env.VITE_API_URL;

const faqs = [
  {
    q: "What facilities do you provide?",
    a: "Modern Infrastructure: State-of-the-art labs and classrooms equipped with the latest technology for a superior learning experience. Comprehensive Career Support: Dedicated placement assistance, resume building workshops, and mock interview sessions to help you land your dream job. Affordable Fee Structure: Quality education and training programs offered at competitive and flexible fee structures. Certification Programs: Receive recognized certificates upon completion that add significant value to your professional portfolio."
  },
  {
    q: "What makes your teaching approach different?",
    a: "Student-Centric Approach: We focus on individual learning paces to ensure every student understands the core concepts thoroughly. Expert Faculty: Learn from experienced professionals who bring real-world industry insights into the classroom. Job-Oriented Training: Our curriculum is designed to make students industry-ready with hands-on projects and internships. Flexible Timing: We offer flexible batch timings to accommodate working professionals and students alike."
  }
]

function Page6() {

  const [email, setemail] = useState('')
  const [massage, setmassage] = useState('')
  const [Loading, setLoading] = useState(false)
  const [status, setStatus] = useState(null)
  const [openFaq, setOpenFaq] = useState(null)



  const sendfeedback = async (e) => {
    e.preventDefault()
    setStatus(null)
    setLoading(true)

    try {
      await axios.post(`${BASE_URL}/api/sendfeedback`, { email, massage }, {
        withCredentials: true
      })
      setStatus({ type: 'success', text: "Thanks! Your feedback has been sent." })
      setemail('')
      setmassage('')
    } catch (error) {
      setStatus({
        type: 'error',
        text: error.response?.data?.message || "Something went wrong. Please try again."
      })
    } finally {
      setLoading(false)
    }
  }

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

  return (
    <div>
      <motion.section
        id="Contact"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
        className="relative w-full bg-white min-h-screen max-w-full h-full flex flex-col items-center py-24 px-6 overflow-hidden"
      >

        {/* Decorative gradient blobs */}
        <div className="absolute top-10 -right-32 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 -left-32 w-96 h-96 bg-indigo-100/40 rounded-full blur-3xl pointer-events-none" />

        <motion.div variants={itemVariants} className="relative w-full max-w-3xl text-center mb-14">
          {/* Badge */}
          <div className="inline-flex w-fit items-center gap-2 bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-full mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
            <p className="text-[11px] font-bold text-blue-800 tracking-wide uppercase">
              Get In Touch
            </p>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold leading-[1.15] tracking-tight">
            <span className="text-slate-900">Let's</span>{" "}
            <span className="bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent">
              Connect
            </span>
          </h1>
        </motion.div>

        <div className="relative w-full max-w-6xl flex flex-col md:flex-row gap-10">

          {/* LEFT: FEEDBACK FORM */}
          <motion.form
            onSubmit={sendfeedback}
            variants={itemVariants}
            className="w-full md:w-2/5 bg-white flex flex-col rounded-2xl border border-slate-100 shadow-sm p-6 gap-1 h-fit"
          >
            <h2 className="text-lg font-bold text-slate-900 mb-6">Send Feedback</h2>

            {status && (
              <div
                className={`mb-4 px-4 py-2.5 rounded-lg text-[13px] font-medium border ${status.type === 'success'
                    ? 'bg-green-50 border-green-100 text-green-700'
                    : 'bg-red-50 border-red-100 text-red-600'
                  }`}
              >
                {status.text}
              </div>
            )}

            <label htmlFor="email" className="text-xs font-semibold text-slate-600 mb-1">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"             
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setemail(e.target.value)}
              className="w-full border border-slate-200 bg-slate-50 outline-none p-2.5 mb-4 rounded-lg text-sm focus:border-slate-400 transition-colors"
              placeholder="you@example.com"
            />

            <label htmlFor="massage" className="text-xs font-semibold text-slate-600 mb-1">
              Message
            </label>
            <textarea
              id="massage"
              name="massage"
              required
              value={massage}
              onChange={(e) => setmassage(e.target.value)}
              maxLength={500}
              rows={5}
              className="w-full border border-slate-200 bg-slate-50 outline-none p-3 rounded-lg text-sm resize-none focus:border-slate-400 transition-colors"
              placeholder="Write your message..."
            />
            <p className="text-[11px] text-slate-400 text-right mt-1">{massage.length}/500</p>

            <button
              type="submit"
              disabled={Loading}
              className="w-full h-11 text-sm font-semibold rounded-lg shadow-sm text-white flex items-center gap-2 mt-4 justify-center bg-slate-900 hover:bg-slate-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-300"
            >
              {Loading && (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              )}
              {Loading ? "Sending..." : "Send Feedback"}
            </button>
          </motion.form>

          {/* RIGHT: CONTACT INFO */}
          <motion.div
            variants={itemVariants}
            className="w-full md:w-3/5 bg-white rounded-2xl p-6 border border-slate-100 shadow-sm"
          >

            <motion.div variants={itemVariants} className="flex items-center gap-5 mb-5">
              <div className="bg-slate-900 rounded-full flex items-center justify-center w-12 h-12 text-white shrink-0">
                <FaPhoneAlt />
              </div>
              <div className="text-sm">
                <h3 className="text-base font-bold text-slate-900">Call Us</h3>
                <p className="text-[12px] font-medium text-slate-600">
                  +91 79851-06600 | +91 89601-51890
                </p>
                <p className="text-[12px] font-medium text-slate-500">
                  Monday – Saturday, 2 PM – 8 PM IST
                </p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-center gap-5 mb-6">
              <div className="bg-slate-900 rounded-full flex items-center justify-center w-12 h-12 text-white shrink-0">
                <FaEnvelope />
              </div>
              <div className="text-sm">
                <h3 className="text-base font-bold text-slate-900">Email Us</h3>
                <p className="text-[12px] font-medium text-slate-600">
                  abbasjafer0581999@gmail.com
                </p>
                <p className="text-[12px] font-medium text-slate-500">
                  Response within 24 hours
                </p>
              </div>
            </motion.div>

            {/* FAQ */}
            <motion.div variants={itemVariants} className="flex flex-col border-t border-slate-100 pt-5">
              <h3 className="text-base font-bold text-slate-900 mb-3">
                Frequently Asked Questions
              </h3>

              {faqs.map((faq, i) => (
                <div key={i} className="border-b border-slate-100 py-3">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between text-left"
                  >
                    <span className="text-sm font-semibold text-slate-800">{faq.q}</span>
                    <FaChevronDown
                      className={`text-slate-400 text-xs shrink-0 ml-2 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''
                        }`}
                    />
                  </button>

                  {openFaq === i && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.3 }}
                      className="text-[12px] font-medium text-slate-600 mt-2 leading-relaxed overflow-hidden"
                    >
                      {faq.a}
                    </motion.p>
                  )}
                </div>
              ))}
            </motion.div>
          </motion.div>

        </div>
      </motion.section>
    </div>
  )
}

export default Page6