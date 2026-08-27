import React, { useState, useContext, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { motion, AnimatePresence } from 'framer-motion'
import { FaBars, FaTimes } from 'react-icons/fa'
import { Authcontext } from "../context/authcontext"

const BASE_URL = import.meta.env.VITE_API_URL;

function Header() {
  const { roll, user, login, setlogin, setUser, setRoll } = useContext(Authcontext)
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const isAuth = localStorage.getItem("isAuthenticated")
    if (!isAuth || isAuth === "false") {
      if (typeof setlogin === 'function') setlogin(false)
      if (typeof setUser === 'function') setUser("")
      if (typeof setRoll === 'function') setRoll("")
    }
  }, [login])

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
    setLoading(true)
    try {
      await axios.post(`${BASE_URL}/api/logout`, {}, { withCredentials: true })
    } catch (error) {
      console.log("logout error", error)
    } finally {
      localStorage.removeItem("username")
      localStorage.removeItem("userrole")
      localStorage.removeItem("isAuthenticated")
      localStorage.clear()
      
      if (typeof setlogin === 'function') setlogin(false)
      if (typeof setUser === 'function') setUser("")
      if (typeof setRoll === 'function') setRoll("")
      
      setOpen(false)
      setLoading(false)

      window.location.href = '/login'
    }
  }

  // Separate Full Screen Overlay Component with Portal
  const LogoutLoader = () => {
    if (!loading) return null;

    return ReactDOM.createPortal(
      <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/40 backdrop-blur-sm w-screen h-screen">
        <div className="bg-white px-8 py-6 rounded-2xl shadow-2xl flex flex-col items-center justify-center min-w-[260px]">
          <div className="w-10 h-10 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
          <p className="mt-4 text-slate-800 font-semibold text-sm">
            Logout ho raha hai...
          </p>
        </div>
      </div>,
      document.body
    );
  };

  return (
    <div>
      <LogoutLoader />

      <nav className="fixed top-0 left-0 w-full h-16 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm z-50 px-4 md:px-10 flex items-center justify-between">

        {/* Left: Logo + User pill */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <img
            className="w-7 h-7 rounded-full object-cover border border-slate-100"
            src="logo.png"
            alt="logo"
          />
          {login && user && (
            <div className="flex items-center bg-slate-50 px-2 py-1 rounded-full gap-2 border border-slate-100">
              <img
                className="w-5 h-5 rounded-full object-cover"
                src="https://i.pinimg.com/736x/30/00/bc/3000bc660ae976e66c5d5b101ee714bf.jpg"
                alt="user avatar"
              />
              <span className="text-xs font-bold text-slate-800 truncate max-w-25">
                {user}
              </span>
            </div>
          )}
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

        {/* Right: Auth buttons / Hamburger */}
        <div className="flex items-center gap-3">
          {/* Desktop Logout Button (Mobile par hide rahega) */}
          {login ? (
            <button
              onClick={logout}
              disabled={loading}
              className="hidden lg:flex bg-slate-900 shadow-sm hover:bg-slate-700 transition-colors w-20 h-9 text-xs font-bold text-white rounded-full items-center justify-center disabled:opacity-50 cursor-pointer"
            >
              Logout
            </button>
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              <Link
                to="/Login"
                className="bg-slate-900 shadow-sm hover:bg-slate-700 transition-colors w-20 h-9 text-xs font-bold text-white rounded-full flex items-center justify-center"
              >
                Login
              </Link>
              <Link
                to="/Rajister"
                className="bg-slate-100 shadow-sm hover:bg-slate-200 transition-colors w-20 h-9 text-xs font-bold text-slate-900 rounded-full flex items-center justify-center"
              >
                Register
              </Link>
            </div>
          )}

          {/* Hamburger button */}
          <button
            className="lg:hidden text-xl text-slate-800 p-2 cursor-pointer focus:outline-none"
            onClick={toggle}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <FaTimes /> : <FaBars />}
          </button>
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
            className="lg:hidden fixed top-16 left-0 w-full bg-white border-b border-slate-100 shadow-xl z-40 flex flex-col p-5 gap-2 text-sm font-semibold text-slate-700"
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

            {/* Hamburger ke andar Login / Register / Logout options */}
            {login ? (
              <button
                onClick={logout}
                disabled={loading}
                className="w-full mt-2 py-3 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl font-bold flex items-center justify-center transition-colors cursor-pointer"
              >
                Logout
              </button>
            ) : (
              <div className="flex flex-col gap-2 mt-2 pt-2 border-t border-slate-100">
                <Link
                  to="/Login"
                  onClick={() => setOpen(false)}
                  className="w-full py-2.5 bg-slate-900 text-white rounded-xl text-center font-bold"
                >
                  Login
                </Link>
                <Link
                  to="/Rajister"
                  onClick={() => setOpen(false)}
                  className="w-full py-2.5 bg-slate-100 text-slate-800 rounded-xl text-center font-bold"
                >
                  Register
                </Link>
              </div>
            )}
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Header