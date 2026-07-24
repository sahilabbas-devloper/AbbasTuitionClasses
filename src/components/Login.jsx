import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { motion } from 'framer-motion'
import { FaEye, FaEyeSlash, FaUserGraduate } from 'react-icons/fa'
import { Authcontext } from "../context/authcontext"

const BASE_URL = import.meta.env.VITE_API_URL;

function Login() {
  const [role, setrole] = useState('')
  const [username, setusername] = useState('')
  const [passward, setpassward] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [Loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const { setroll, setuser } = useContext(Authcontext)
  const navigate = useNavigate()
  axios.defaults.withCredentials = true;

  const submit = async (e) => {
    e.preventDefault()
    setError('')

    if (!role) {
      setError('Please select a role.')
      return
    }

    setLoading(true)

    try {
      const res = await axios.post(`${BASE_URL}/api/Login`, { role, username, passward })

      if (res.data.message === "successfully Login.") {
        setuser(res.data.user.username)
        localStorage.setItem("username", res.data.user.username)
        setroll(res.data.user.role)
        localStorage.setItem("userrole", res.data.user.role)
        localStorage.setItem("isAuthenticated", "true");
       
        navigate('/Home')
          window.location.href = '/home'
      } else {
        setError(res.data.message || "Login failed. Please try again.")
      }
    } catch (error) {
      setError(
        error.response?.data?.message || "Something went wrong. Please try again."
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full min-h-screen flex bg-white">

      {/* LEFT BRAND PANEL */}
      <div className="hidden lg:flex w-1/2 bg-linear-to-br from-slate-900 to-slate-700 flex-col justify-between p-12 relative overflow-hidden">

        <div className="flex items-center gap-2 z-10">
          <img className="w-9 h-9 rounded-full bg-white p-1" src="logo.png" alt="logo" />
          <span className="text-white font-bold text-lg">YourInstitute</span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="z-10"
        >
          <FaUserGraduate className="text-blue-400 text-5xl mb-6" />
          <h1 className="text-4xl font-bold text-white leading-tight mb-4">
            Learning made <br /> simple & smart.
          </h1>
          <p className="text-slate-300 text-sm max-w-sm leading-relaxed">
            Access your courses, track your progress, and connect with the best
            tutors — all in one place.
          </p>
        </motion.div>

        <p className="text-slate-400 text-xs z-10">
          © {new Date().getFullYear()} YourInstitute. All rights reserved.
        </p>

        {/* Decorative background circles */}
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-blue-600/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl" />
      </div>

      {/* RIGHT FORM PANEL */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center px-6 py-12">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-sm"
        >

          {/* Mobile logo */}
          <div className="flex lg:hidden items-center gap-2 mb-8">
            <img className="w-8 h-8 rounded-full" src="logo.png" alt="logo" />
            <span className="font-bold text-slate-900">Abbas Tution classes</span>
          </div>

          <h1 className="text-2xl font-bold text-slate-900 mb-1">Welcome back</h1>
          <p className="text-sm text-slate-500 mb-8">
            Login to continue your learning journey.
          </p>

          {error && (
            <div className="mb-4 px-4 py-2.5 rounded-lg bg-red-50 border border-red-100 text-red-600 text-[13px] font-medium">
              {error}
            </div>
          )}

          <form onSubmit={submit} className="flex flex-col gap-4">

            {/* Role select */}
            <div>
              <label htmlFor="role" className="text-xs font-semibold text-slate-600 mb-1 block">
                Login as
              </label>
              <select
                id="role"
                required
                value={role}
                className="w-full border border-slate-200 bg-slate-50 outline-none p-2.5 rounded-lg text-sm text-slate-800 focus:border-slate-400 transition-colors"
                onChange={(e) => setrole(e.target.value)}
              >
                <option value="" disabled>Select role</option>
                <option value="admin">admin</option>
                <option value="user">Student</option>
              </select>
            </div>

            {/* Username */}
            <div>
              <label htmlFor="username" className="text-xs font-semibold text-slate-600 mb-1 block">
                Username
              </label>
              <input
                id="username"
                type="text"
                name="username"
                placeholder="Enter your username"
                required
                autoComplete="username"
                className="w-full border border-slate-200 bg-slate-50 outline-none p-2.5 rounded-lg text-sm focus:border-slate-400 transition-colors"
                value={username}
                onChange={(e) => setusername(e.target.value)}
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="passward" className="text-xs font-semibold text-slate-600 mb-1 block">
                Password
              </label>
              <div className="relative">
                <input
                  id="passward"
                  type={showPassword ? "text" : "password"}
                  name="passward"
                  placeholder="Enter your password"
                  required
                  autoComplete="current-password"
                  className="w-full border border-slate-200 bg-slate-50 outline-none p-2.5 pr-10 rounded-lg text-sm focus:border-slate-400 transition-colors"
                  value={passward}
                  onChange={(e) => setpassward(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  tabIndex={-1}
                >
                  {showPassword ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
                </button>
              </div>
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between mt-1">
              <label className="flex items-center gap-2 text-[13px] text-slate-600 cursor-pointer">
                <input type="checkbox" className="accent-slate-800" />
                Remember me
              </label>

              <Link to="/Forgotpass" className="font-semibold text-blue-700 text-[13px] hover:underline">
                Forgot password?
              </Link>
            </div>

            {/* Submit */}
            <button
              disabled={Loading}
              type="submit"
              className="bg-slate-900 hover:bg-slate-700 disabled:opacity-60 disabled:cursor-not-allowed text-white w-full h-11 mt-4 rounded-lg flex items-center justify-center gap-2 font-semibold text-sm transition-colors duration-300"
            >
              {Loading && (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              )}
              {Loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="text-slate-600 text-center font-medium text-sm mt-6">
            Don't have an account?{" "}
            <Link to="/Rajister" className="text-blue-700 font-semibold hover:underline">
              Register
            </Link>
          </p>

        </motion.div>
      </div>
    </div>
  )
}

export default Login