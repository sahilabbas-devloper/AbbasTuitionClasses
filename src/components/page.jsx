import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from "framer-motion"
import { FaChalkboardTeacher, FaStar, FaTags, FaLightbulb, FaArrowRight } from 'react-icons/fa'

function Page() {

  const features = [
    {
      icon: <FaChalkboardTeacher />,
      title: "Best Tutors",
      desc: "Learn from industry experts and experienced educators dedicated to your academic and professional growth."
    },
    {
      icon: <FaStar />,
      title: "High Satisfaction",
      desc: "Our priority is your success. We ensure a supportive learning environment that helps you reach your full potential."
    },
    {
      icon: <FaTags />,
      title: "Best Price",
      desc: "High-quality education shouldn't break the bank. We offer a premium learning experience at the most competitive prices."
    },
    {
      icon: <FaLightbulb />,
      title: "Creative Thinking",
      desc: "We move beyond rote learning. Our innovative methods encourage out-of-the-box thinking and practical problem-solving."
    }
  ]

  return (
    <div>
      <section className="relative w-full min-h-screen py-24 bg-white flex flex-col items-center overflow-hidden">

        {/* Decorative gradient blobs */}
        <div className="absolute top-20 -right-32 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 -left-32 w-96 h-96 bg-indigo-100/40 rounded-full blur-3xl pointer-events-none" />

        <div className="relative w-full max-w-6xl px-6 flex flex-col md:flex-row gap-12 md:gap-16">

          {/* LEFT TEXT */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
            className="w-full md:w-2/5 flex flex-col justify-center"
          >
            {/* Badge */}
            <div className="inline-flex w-fit items-center gap-2 bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-full mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
              <p className="text-[11px] font-bold text-blue-800 tracking-wide uppercase">
                Why choose us
              </p>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-[1.15] tracking-tight">
              Why we are
            </h1>
            <h1 className="text-4xl md:text-5xl font-bold leading-[1.15] tracking-tight mt-1">
              <span className="bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent">
                best
              </span>{" "}
              <span className="text-slate-900">from others?</span>
            </h1>

            <p className="text-sm mt-5 leading-relaxed text-slate-500 max-w-md">
              We don't just teach — we empower students with the right skills,
              personalized attention, and a genuine passion for excellence.
            </p>

            <a
              href="#Contact"
              className="group w-fit px-6 h-12 text-sm font-semibold rounded-full text-white flex items-center gap-2 mt-8 bg-slate-900 hover:bg-slate-800 shadow-lg shadow-slate-900/20 transition-all duration-300"
            >
              Go to Contact
              <FaArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </motion.div>

          {/* RIGHT CARDS */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
            className="w-full md:w-3/5 grid grid-cols-2 gap-4"
          >
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.3 }}
                className="bg-white h-full flex flex-col p-5 border border-slate-100 shadow-sm rounded-2xl hover:shadow-lg hover:shadow-slate-900/5 hover:-translate-y-1 hover:border-slate-200 transition-all duration-300"
              >
                <div className="flex items-center justify-center mb-3 bg-slate-900 w-10 h-10 rounded-lg text-white text-sm">
                  {feature.icon}
                </div>
                <h2 className="text-base mb-1 font-bold text-slate-900">
                  {feature.title}
                </h2>
                <p className="text-[12px] leading-relaxed text-slate-600">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>

        </div>

      </section>
    </div>
  )
}

export default Page