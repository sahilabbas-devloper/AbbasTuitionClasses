import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CalendarDays, KeyRound, CheckCircle2 } from 'lucide-react'

const BASE_URL = import.meta.env.VITE_API_URL;

function Forgotpass() {

  const [dob, setdob] = useState('')
  const [newpass, setnewpass] = useState('')
  const [Loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      const res = await axios.put(`${BASE_URL}/api/forgotpass`, { dob, newpass })
      setSuccess(res.data.message)
      setTimeout(() => navigate('/Login'), 1200)
    } catch (error) {
      console.log("axios", error)
      setError(error.response?.data?.message || "Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }

  }

  return (
    <div className='w-full min-h-screen bg-slate-100'>

      {/* Top bar */}
      <div className='w-full bg-white border-b border-slate-200'>
        <div className='max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-3'>
          <img className='w-9 h-9 rounded-full object-cover' src="logo.png" alt="logo" />
          <div>
            <p className='text-sm font-semibold text-slate-800 leading-tight'>Abbas Tuition Classes</p>
            <p className='text-xs text-slate-400 leading-tight'>Account recovery</p>
          </div>
        </div>
      </div>

      <section className='max-w-md mx-auto px-4 sm:px-6 py-10 sm:py-14 flex flex-col items-center'>

        <form onSubmit={submit} className='w-full bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-7'>

          <div className='text-center mb-6'>
            <h1 className='text-xl font-bold text-slate-800'>Change your password</h1>
            <p className='text-slate-500 text-sm mt-1'>Verify your date of birth to set a new password.</p>
          </div>

          {error && (
            <div className="mb-4 px-4 py-2.5 rounded-lg bg-red-50 border border-red-100 text-red-600 text-[13px] font-medium">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 px-4 py-2.5 rounded-lg bg-green-50 border border-green-100 text-green-600 text-[13px] font-medium">
              {success}
            </div>
          )}

          <div className='flex flex-col gap-5'>

            <div className='flex flex-col gap-1.5'>
              <label className='text-sm font-medium text-slate-700 flex items-center gap-1.5'>
                <CalendarDays size={15} className='text-slate-400' /> Date of birth
              </label>
              <input type="date"
                required
                className='border border-slate-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-slate-800/10 focus:border-slate-500 transition'
                value={dob}
                onChange={(e) => setdob(e.target.value)}
              />
            </div>

            <div className='flex flex-col gap-1.5'>
              <label className='text-sm font-medium text-slate-700 flex items-center gap-1.5'>
                <KeyRound size={15} className='text-slate-400' /> New password
              </label>
              <input type="password"
                placeholder='Enter new password'
                required
                className='border border-slate-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-slate-800/10 focus:border-slate-500 transition'
                value={newpass}
                onChange={(e) => setnewpass(e.target.value)}
              />
            </div>

          </div>

          <button
            type='submit'
            disabled={Loading}
            className='w-full mt-7 px-6 py-2.5 rounded-lg text-sm font-semibold text-white bg-slate-800 hover:bg-slate-700 active:scale-[0.98] transition disabled:opacity-60 flex items-center justify-center gap-2'>
            {Loading ? (
              <>
                <div className='w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin'></div>
                Updating...
              </>
            ) : (
              <>
                <CheckCircle2 size={16} />
                Change password
              </>
            )}
          </button>
        </form>

      </section>
    </div>
  )
}

export default Forgotpass