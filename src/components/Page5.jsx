import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { motion } from 'framer-motion'
import { FaUser, FaQuoteLeft } from 'react-icons/fa'

const BASE_URL = import.meta.env.VITE_API_URL;

function Page5() {

  const [feedback, setfeedback] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getfeedbacks = async () => {
      setLoading(true)
      try {
        const res = await axios.get(`${BASE_URL}/api/getfeedbacks`)
        setfeedback(Array.isArray(res.data) ? res.data : res.data.feedbacks || [])
      } catch (error) {
        console.log("fetch feedback error", error)
        setfeedback([])
      } finally {
        setLoading(false)
      }
    }
    getfeedbacks()
  }, [])

  // Masks email for privacy: "abbasjafer0581999@gmail.com" -> "abb***@gmail.com"
  const maskEmail = (email) => {
    if (!email) return "Anonymous Parent"
    const [name, domain] = email.split('@')
    if (!domain) return email
    return `${name.slice(0, 3)}***@${domain}`
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  }

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  }

  return (
    <div>
      <section className="relative w-full bg-white md:min-h-screen max-w-full h-full flex flex-col items-center py-24 px-6 overflow-hidden">

        {/* Decorative gradient blobs */}
        <div className="absolute top-10 -left-32 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 -right-32 w-96 h-96 bg-indigo-100/40 rounded-full blur-3xl pointer-events-none" />

        <div className="relative w-full max-w-6xl flex flex-col gap-10">

          {/* Heading */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            className="w-full flex flex-col justify-center items-center text-center"
          >
            <div className="inline-flex w-fit items-center gap-2 bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-full mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
              <p className="text-[11px] font-bold text-blue-800 tracking-wide uppercase">
                Testimonials
              </p>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold leading-[1.15] tracking-tight mb-4">
              <span className="text-slate-900">What Our</span>{" "}
              <span className="bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent">
                Parents Say
              </span>
            </h1>

            <p className="text-sm leading-relaxed font-medium text-slate-500 max-w-2xl">
              Hear from the parents who have witnessed their children's growth first-hand.
              Our mission has always been to provide more than just lessons — we provide a
              foundation for life. Through consistent hard work and a student-centric approach,
              we have earned the trust of over 150+ families.
            </p>
          </motion.div>

          {/* Feedback cards */}
          {loading ? (
            <div className="w-full flex gap-6 overflow-hidden px-4 md:px-9">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-64 h-44 flex-none rounded-2xl bg-slate-100 animate-pulse" />
              ))}
            </div>
          ) : feedback.length === 0 ? (
            <div className="w-full flex flex-col items-center justify-center py-10 text-center">
              <p className="text-sm font-medium text-slate-400">
                No feedback yet — be the first to share your experience!
              </p>
            </div>
          ) : (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={containerVariants}
              className="w-full flex overflow-x-auto flex-nowrap gap-6 px-4 md:px-9 pb-4 snap-x snap-mandatory scrollbar-thin"
            >
              {feedback.map((item, index) => (
                <motion.div
                  key={index}
                  variants={fadeUp}
                  className="w-72 flex-none snap-start bg-white border border-slate-100 flex flex-col p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 rounded-2xl"
                >
                  <FaQuoteLeft className="text-blue-100 text-2xl mb-3" />

                  <p className="text-[13px] text-slate-600 leading-relaxed mb-5 line-clamp-4">
                    {item.Massage}
                  </p>

                  <div className="flex items-center gap-3 mt-auto pt-4 border-t border-slate-50">
                    <div className="flex items-center justify-center bg-slate-900 w-9 h-9 rounded-full text-white shrink-0">
                      <FaUser className="text-xs" />
                    </div>
                    <div>
                      <h3 className="text-[13px] font-bold text-slate-800">
                        {maskEmail(item.Email)}
                      </h3>
                      <p className="text-[11px] text-slate-400">Verified Parent</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

        </div>
      </section>
    </div>
  )
}

export default Page5