import React, { useState, useRef } from 'react'
import axios from 'axios'
import html2canvas from 'html2canvas-pro'
import jsPDF from 'jspdf'

const BASE_URL = import.meta.env.VITE_API_URL;

// small inline icons — no extra package needed
const Icon = {
  search: (p) => (<svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></svg>),
  alert: (p) => (<svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 9v4" /><path d="M12 17h.01" /><circle cx="12" cy="12" r="9" /></svg>),
  phone: (p) => (<svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.7a2 2 0 0 1-.4 2.1L8 9.9a16 16 0 0 0 6 6l1.4-1.4a2 2 0 0 1 2.1-.4c.9.3 1.8.5 2.7.6a2 2 0 0 1 1.8 2.2Z" /></svg>),
  pin: (p) => (<svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>),
  school: (p) => (<svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 10 12 5 2 10l10 5 10-5Z" /><path d="M6 12v5c0 1.1 2.7 2 6 2s6-.9 6-2v-5" /></svg>),
  calendar: (p) => (<svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>),
  download: (p) => (<svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 3v12" /><path d="m7 10 5 5 5-5" /><path d="M5 21h14" /></svg>),
  user: (p) => (<svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" /></svg>),
  student: (p) => (<svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 3 2 8l10 5 10-5-10-5Z" strokeLinejoin="round" /><path d="M6 10.5V16c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5v-5.5" strokeLinejoin="round" /><path d="M22 8v6" strokeLinecap="round" /></svg>),
  check: (p) => (<svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="m5 13 4 4L19 7" strokeLinecap="round" strokeLinejoin="round" /></svg>),
}

export default function View() {

  const [name, setname] = useState('')
  const [details, setdetails] = useState(null)
  const [Loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [Downloading, setDownloading] = useState(false)
  const cardRef = useRef(null)

  const find = async (e) => {
    e.preventDefault()
    if (!name.trim()) {
      setErrorMsg('Please enter a student name to search.')
      return
    }

    setLoading(true)
    setErrorMsg('')
    setdetails(null)

    try {
      const res = await axios.post(`http://localhost:4004/api/getdata`, { name }, {
        withCredentials: true
      })
      setdetails(res.data.Std)
    } catch (error) {
      console.log("axios", error)
      setErrorMsg(error.response?.data?.message || error.response?.data?.massage || "Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const downloadPDF = async () => {
    if (!cardRef.current) return
    setDownloading(true)
    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 3,
        backgroundColor: '#ffffff',
        useCORS: true,
        scrollX: 0,
        scrollY: -window.scrollY,
        windowWidth: document.documentElement.scrollWidth,
        windowHeight: document.documentElement.scrollHeight
      })
      const imgData = canvas.toDataURL('image/png')

      // size the PDF page in mm to exactly match the card's aspect ratio,
      // so the full image always fits on one page with no cropping
      const imgWidthMM = 100
      const imgHeightMM = (canvas.height * imgWidthMM) / canvas.width

      const pdf = new jsPDF({
        orientation: imgHeightMM > imgWidthMM ? 'portrait' : 'landscape',
        unit: 'mm',
        format: [imgWidthMM, imgHeightMM]
      })
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidthMM, imgHeightMM)
      const fileName = `${(details?.studentname || 'student').trim().replace(/\s+/g, '_')}_ID_card.pdf`
      pdf.save(fileName)
    } catch (err) {
      console.log('pdf error', err)
      setErrorMsg('Could not generate the PDF. Please try again.')
    } finally {
      setDownloading(false)
    }
  }

  return (
    <div className='w-full min-h-screen bg-slate-100'>

      <div className='bg-white border-b border-slate-200'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-3'>
          <img className='w-9 h-9 rounded-full object-cover' src="logo.png" alt="logo" />
          <div>
            <p className='text-sm font-semibold text-slate-800 leading-tight'>Abbas Tuition Classes</p>
            <p className='text-xs text-slate-400 leading-tight'>Student record lookup</p>
          </div>
        </div>
      </div>

      <section className='max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10 flex flex-col items-center'>

        <div className='w-full mb-8'>
          <h1 className='text-2xl sm:text-3xl font-bold text-slate-800'>
            Find student <span className='text-blue-700'>details</span>
          </h1>
          <p className='text-sm text-slate-500 mt-1 mb-5'>Search using the student's registered name.</p>

          <form onSubmit={find} className='flex flex-col sm:flex-row gap-3'>
            <div className='relative flex-1'>
              <Icon.search className='w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2' />
              <input type="text"
                required
                onChange={(e) => setname(e.target.value)}
                className='w-full outline-none pl-10 pr-3 py-2.5 bg-white h-11 rounded-lg border border-slate-300 shadow-sm focus:ring-2 focus:ring-blue-800/10 focus:border-blue-600 transition text-sm'
                placeholder='Enter student name'
              />
            </div>

            <button
              type="submit"
              disabled={Loading}
              className='h-11 px-6 text-sm font-semibold rounded-lg shadow-sm text-white flex items-center gap-2 justify-center bg-slate-800 hover:bg-slate-700 active:scale-[0.98] transition disabled:opacity-60'>
              {Loading ? (
                <>
                  <div className='w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin'></div>
                  Searching...
                </>
              ) : (
                <>
                  <Icon.search className='w-4 h-4' />
                  Find
                </>
              )}
            </button>
          </form>

          {errorMsg && (
            <div className='mt-4 flex items-start gap-2.5 bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm'>
              <Icon.alert className='w-4 h-4 mt-0.5 shrink-0' />
              <span>{errorMsg}</span>
            </div>
          )}
        </div>

        {details && (() => {
          const cleanName = (details.studentname || 'ST').replace(/\s+/g, '').toUpperCase().slice(0, 3)
          const lastDigits = (details.Mobilenumber || '0000').toString().slice(-4)
          const studentId = `ATC-${cleanName}${lastDigits}`
          return (
          <div className='w-full flex flex-col items-center gap-4 px-0 sm:px-0'>

            <div ref={cardRef} className='relative w-full max-w-[420px] bg-white shadow-lg rounded-2xl overflow-hidden border border-slate-200'>

              {/* subtle watermark pattern */}
              <div className='pointer-events-none absolute inset-0 opacity-[0.035]' style={{
                backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)',
                backgroundSize: '14px 14px'
              }}></div>

              {/* top accent stripe */}
              <div className='h-1.5 w-full bg-gradient-to-r from-blue-600 via-blue-500 to-emerald-500'></div>

              {/* header */}
              <div className='relative bg-slate-900 px-6 pt-5 pb-16'>
                <div className='flex items-center justify-between gap-3'>
                  <div className='flex items-center gap-2.5 min-w-0'>
                    <div className='w-8 h-8 rounded-full bg-white/10 overflow-hidden flex items-center justify-center shrink-0'>
                      <img className='w-full h-full object-cover' src="logo.png" alt="logo" />
                    </div>
                    <p className='font-semibold text-[14px] leading-snug text-white break-words'>Abbas Tuition Classes</p>
                  </div>
                  <span className='shrink-0 self-start text-[9px] font-semibold tracking-wide uppercase text-slate-300 border border-slate-700 rounded-full px-2 py-1'>
                    ID card
                  </span>
                </div>
                <p className='text-[11px] text-slate-400 leading-tight mt-1.5 pl-[42px]'>Jaunpur (U.P) · 222001</p>
              </div>

              {/* avatar overlapping header/body */}
              <div className='relative flex justify-center -mt-11'>
                <div className='w-20 h-20 rounded-full bg-blue-50 border-4 border-white shadow-sm flex items-center justify-center'>
                  <Icon.student className='w-10 h-10 text-blue-600' />
                </div>
              </div>

              {/* name + class */}
              <div className='relative text-center px-6 mt-3'>
                <p className='font-bold text-lg text-slate-900 break-words leading-snug'>{details.studentname}</p>
                <div className='flex flex-wrap items-center justify-center gap-2 mt-1.5'>
                  <span className='text-[11px] font-semibold text-blue-700 bg-blue-50 rounded-full px-3 py-1'>
                    Class {details.class ? details.class.trim() : '—'}
                  </span>
                  <span className='text-[11px] font-medium text-slate-400 tracking-wide'>
                    {studentId}
                  </span>
                </div>
              </div>

              {/* details grid */}
              <div className='relative grid grid-cols-2 gap-x-4 gap-y-4 px-6 mt-6 text-sm'>
                <Field icon={<Icon.user className='w-3.5 h-3.5' />} label="Father's name" value={details.fathername} />
                <Field icon={<Icon.calendar className='w-3.5 h-3.5' />} label="Joining date" value={details.Joinningdate} />
                <Field icon={<Icon.phone className='w-3.5 h-3.5' />} label="Mobile no." value={`+91 ${details.Mobilenumber}`} />
                <Field icon={<Icon.school className='w-3.5 h-3.5' />} label="School" value={details.schoolname} />
                <Field icon={<Icon.pin className='w-3.5 h-3.5' />} label="Address" value={details.address} span2 />
              </div>

              <div className='relative border-t border-dashed border-slate-200 mx-6 mt-6'></div>

              {/* signature */}
              <div className='relative flex items-end justify-between px-6 mt-4'>
                <div>
                  <img src="/manager-signature-clean.png" alt="Manager's signature" className='h-9 object-contain object-left' />
                  <p className='text-[10.5px] text-slate-400 mt-1 border-t border-slate-200 pt-1 w-28'>Manager's signature</p>
                </div>
                <div className='w-14 h-14 rounded-full border-2 border-dashed border-slate-200 flex items-center justify-center shrink-0'>
                  <span className='text-[9px] font-semibold text-slate-300 text-center leading-tight'>OFFICIAL<br/>SEAL</span>
                </div>
              </div>

              <div className='relative border-t border-dashed border-slate-200 mx-6 mt-4'></div>

              <div className='relative px-6 py-3.5 flex flex-col gap-1 text-[11px] text-slate-400'>
                <span className='flex items-center gap-1 text-emerald-600 font-semibold'>
                  <span className='w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center shrink-0'>
                    <Icon.check className='w-2.5 h-2.5 text-white' />
                  </span>
                  Verified record
                </span>
                <span>Issued by Abbas Tuition Classes</span>
              </div>
            </div>

            <button
              onClick={downloadPDF}
              disabled={Downloading}
              className='w-full sm:w-auto flex items-center justify-center gap-2 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg px-5 py-2.5 shadow-sm transition active:scale-[0.98] disabled:opacity-60'>
              {Downloading ? (
                <>
                  <div className='w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin'></div>
                  Preparing PDF...
                </>
              ) : (
                <>
                  <Icon.download className='w-4 h-4' />
                  Download as PDF
                </>
              )}
            </button>
          </div>
          )
        })()}

      </section>
    </div>
  )
}

function Field({ icon, label, value, span2 }) {
  return (
    <div className={span2 ? 'col-span-2 min-w-0' : 'min-w-0'}>
      <p className='flex items-center gap-1.5 text-[10.5px] font-semibold text-slate-400 uppercase tracking-wide mb-0.5'>
        {icon} {label}
      </p>
      <p className='font-semibold text-slate-800 break-words'>{value}</p>
    </div>
  )
}