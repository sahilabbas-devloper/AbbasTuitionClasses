import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { motion, AnimatePresence } from 'framer-motion'
import { FaBars, FaTimes } from 'react-icons/fa'
import { Authcontext } from "../context/authcontext"

const BASE_URL = import.meta.env.VITE_API_URL;

function Header() {
  const { roll, user, login, setlogin } = useContext(Authcontext)
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const toggle = () => setOpen(!open)

  const navLinks =
    roll === "admin"
      ? [
          { label: "Home", to: "/Home" },
          { label: "Add Student", to: "/Addstudent" },
          { label: "View", to: "/View" },
          { label: "Update", to: "/Contact" },
          { label: "Message", to: "/Sms" },
        ]
      : roll === "user"
      ? [{ label: "Home", to: "/Home" }]
      : []

  const logout = async () => {
    try {
      await axios.post(`${BASE_URL}/api/logout`, {}, { withCredentials: true })
    } catch (error) {
      console.log("logout error", error)
    } finally {
      localStorage.removeItem("username")
      localStorage.removeItem("userrole")
      setlogin(false)
      setOpen(false)
      navigate('/Login')
    }
  }

  return (
    <div>
      <nav className="fixed top-0 left-0 w-full h-16 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm z-50 px-4 md:px-10 flex items-center justify-between">

        {/* Left: Logo + User pill */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <img
            className="w-9 h-9 rounded-full object-cover border border-slate-100"
            src="logo.png"
            alt="logo"
          />
          <div className="hidden sm:flex items-center bg-slate-50 px-2 py-1 rounded-full gap-2 border border-slate-100">
            <img
              className="w-5 h-5 rounded-full object-cover"
              src="https://i.pinimg.com/736x/30/00/bc/3000bc660ae976e66c5d5b101ee714bf.jpg"
              alt="user avatar"
            />
            <span className="text-xs font-bold text-slate-800 truncate max-w-[100px]">
              {user || "Guest"}
            </span>
          </div>
        </Link>

        {/* Middle: Desktop nav links */}
        {navLinks.length > 0 && (
          <div className="hidden lg:flex items-center gap-8 text-slate-700 font-semibold text-sm">
            {navLinks.map((item) => (
              <motion.div key={item.label} whileHover={{ y: -2 }}>
                <Link to={item.to} className="hover:text-blue-700 transition-colors">
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        {/* Right: Auth buttons + hamburger */}
        <div className="flex items-center gap-3">
          {login ? (
            <button
              onClick={logout}
              className="bg-slate-900 shadow-sm hover:bg-slate-700 transition-colors w-20 h-9 text-xs font-bold text-white rounded-full flex items-center justify-center"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/Login"
                className="bg-slate-900 shadow-sm hover:bg-slate-700 transition-colors w-20 h-9 text-xs font-bold text-white rounded-full flex items-center justify-center"
              >
                Login
              </Link>
              <Link
                to="/Rajister"
                className="bg-slate-100 shadow-sm hover:bg-slate-200 transition-colors w-20 h-9 text-xs font-bold text-slate-900 rounded-full hidden md:flex items-center justify-center"
              >
                Register
              </Link>
            </>
          )}

          {/* Hamburger — visible for ANY role on small screens, not just admin */}
          {(navLinks.length > 0 || !login) && (
            <button
              className="lg:hidden text-lg text-slate-800"
              onClick={toggle}
              aria-label={open ? "Close menu" : "Open menu"}
            >
              {open ? <FaTimes /> : <FaBars />}
            </button>
          )}
        </div>
      </nav>

      {/* Mobile dropdown menu */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="lg:hidden fixed top-16 left-0 w-full bg-white border-b border-slate-100 shadow-md z-40 flex flex-col p-4 gap-1 text-sm font-semibold text-slate-700"
          >
            {navLinks.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                onClick={() => setOpen(false)}
                className="hover:text-blue-700 border-b border-slate-100 px-2 py-3 transition-colors"
              >
                {item.label}
              </Link>
            ))}

            {!login && (
              <Link
                to="/Rajister"
                onClick={() => setOpen(false)}
                className="hover:text-blue-700 px-2 py-3 transition-colors"
              >
                Register
              </Link>
            )}
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Header