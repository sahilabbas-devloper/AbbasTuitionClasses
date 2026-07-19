import React from 'react'
import { FaBook, FaStar } from 'react-icons/fa'
import { motion } from 'framer-motion'

const courses = [
  {
    title: "Class 12th",
    board: "U.P. Board",
    subjects: ["Hindi", "English", "Geography", "Education", "Sociology", "Psychology", "Civics", "History", "Economics"],
    popular: false
  },
  {
    title: "Class 10th",
    board: "U.P. Board + CBSE",
    subjects: ["Hindi", "English", "Geography", "Math", "Physics", "Chemistry", "Biology", "History", "Economics", "Computer"],
    popular: true
  },
  {
    title: "Class 1st to 9th",
    board: "U.P. Board + CBSE",
    subjects: ["Hindi", "English", "Geography", "Civics", "History", "Computer", "Economics"],
    popular: false
  }
]

function Page7() {

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
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
        className="relative w-full bg-white min-h-screen max-w-full h-full flex flex-col items-center py-24 px-6 overflow-hidden"
      >

        {/* Decorative gradient blobs */}
        <div className="absolute top-10 -left-32 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 -right-32 w-96 h-96 bg-indigo-100/40 rounded-full blur-3xl pointer-events-none" />

        <div className="relative w-full max-w-6xl flex flex-col items-center">

          {/* Heading */}
          <motion.div
            variants={itemVariants}
            className="w-full flex flex-col justify-center items-center text-center mb-14"
          >
            {/* Badge */}
            <div className="inline-flex w-fit items-center gap-2 bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-full mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
              <p className="text-[11px] font-bold text-blue-800 tracking-wide uppercase">
                What we teach
              </p>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold leading-[1.15] tracking-tight mb-4">
              <span className="text-slate-900">Courses for</span>{" "}
              <span className="bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent">
                Every Class
              </span>
            </h1>

            <p className="text-sm leading-relaxed font-medium text-slate-500 max-w-xl">
              Explore our comprehensive courses for all levels — tailored educational
              programs designed to provide in-depth knowledge and exam excellence for
              U.P. Board and CBSE students.
            </p>
          </motion.div>

          {/* Cards */}
          <motion.div
            variants={itemVariants}
            className="flex md:flex-row flex-col gap-6 w-full justify-center md:items-stretch"
          >
            {courses.map((course) => (
              <motion.div
                key={course.title}
                variants={itemVariants}
                className={`relative md:w-72 w-full p-6 flex flex-col rounded-2xl transition-all duration-300 gap-2 ${
                  course.popular
                    ? "bg-slate-900 border-2 border-slate-900 shadow-xl shadow-slate-900/20 md:-translate-y-3"
                    : "bg-white border-2 border-slate-100 shadow-sm hover:border-slate-300 hover:-translate-y-1"
                }`}
              >
                {course.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-md">
                    <FaStar className="text-[9px]" />
                    MOST POPULAR
                  </div>
                )}

                <div
                  className={`rounded-full flex items-center justify-center w-12 h-12 mb-2 ${
                    course.popular ? "bg-white text-slate-900" : "bg-slate-900 text-white"
                  }`}
                >
                  <FaBook className="w-5 h-5" />
                </div>

                <h2 className={`text-xl font-bold ${course.popular ? "text-white" : "text-slate-900"}`}>
                  {course.title}
                </h2>

                <p className={`text-sm font-semibold ${course.popular ? "text-slate-200" : "text-slate-700"}`}>
                  Board:{" "}
                  <span className={`font-medium ${course.popular ? "text-slate-400" : "text-slate-500"}`}>
                    {course.board}
                  </span>
                </p>

                <h3 className={`text-sm font-bold mt-2 ${course.popular ? "text-slate-100" : "text-slate-800"}`}>
                  Subjects
                </h3>

                <div className="flex flex-wrap gap-1.5 mt-1">
                  {course.subjects.map((subject) => (
                    <span
                      key={subject}
                      className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${
                        course.popular
                          ? "text-slate-200 bg-white/10 border-white/10"
                          : "text-slate-600 bg-slate-50 border-slate-100"
                      }`}
                    >
                      {subject}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </motion.section>
    </div>
  )
}

export default Page7