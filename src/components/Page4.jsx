import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const partners = [
  { img: "td collage.jpg", name: "T.D. College", location: "Jaunpur (U.P.)" },
  { img: "mhpg collage.png", name: "M.H.P.G. College", location: "(U.P.)" },
  { img: "pnp collage.jpg", name: "P.N.P. College", location: "Prayagraj (U.P.)" },
  { img: "up board.jpg", name: "U.P. Board", location: "" },
]

export default function Page4() {

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  }

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  }

  return (
    <div>
      <section className="relative w-full bg-white min-h-screen max-w-full h-auto flex flex-col items-center py-24 px-6 overflow-hidden">

        {/* Decorative gradient blobs */}
        <div className="absolute top-10 -right-32 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 -left-32 w-96 h-96 bg-indigo-100/40 rounded-full blur-3xl pointer-events-none" />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="relative w-full max-w-3xl flex flex-col items-center text-center mb-16"
        >
          {/* Badge */}
          <div className="inline-flex w-fit items-center gap-2 bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-full mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
            <p className="text-[11px] font-bold text-blue-800 tracking-wide uppercase">
              Our Network
            </p>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold leading-[1.15] tracking-tight mb-4">
            <span className="text-slate-900">Education</span>{" "}
            <span className="bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent">
              Partners
            </span>
          </h1>

          <p className="text-sm leading-relaxed font-medium text-slate-500 max-w-xl">
            Our network of partners ensures a comprehensive learning experience for every
            student. We work closely with industry leaders to bridge the gap between
            academic knowledge and market needs — building a brighter future together.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
          className="relative flex items-center flex-wrap gap-6 md:gap-10 justify-center w-full max-w-5xl"
        >
          {partners.map((partner) => (
            <motion.div
              key={partner.name}
              variants={fadeUp}
              className="flex items-center justify-center flex-col text-center bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 px-8 py-6 w-40"
            >
              <img
                className="w-14 md:w-20 h-14 md:h-20 object-contain grayscale hover:grayscale-0 transition-all duration-300 mb-3"
                src={partner.img}
                alt={partner.name}
              />
              <h3 className="text-sm font-bold text-slate-800">{partner.name}</h3>
              {partner.location && (
                <p className="text-[11px] font-medium text-slate-500">{partner.location}</p>
              )}
            </motion.div>
          ))}
        </motion.div>

      </section>
    </div>
  )
}