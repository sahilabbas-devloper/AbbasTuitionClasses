import React, { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import html2canvas from 'html2canvas-pro'
import jsPDF from 'jspdf'

const BASE_URL = import.meta.env.VITE_API_URL;

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
  table: (p) => (<svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3h18v18H3zM3 9h18M3 15h18M9 3v18M15 3v18" /></svg>),
  excel: (p) => (<svg {...p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><path d="M8 13h8M8 17h8M10 9h4"/></svg>)
}

export default function View() {
  const [viewFilter, setViewFilter] = useState('one')
  const [name, setname] = useState('')
  const [details, setdetails] = useState(null)
  const [allStudentsList, setAllStudentsList] = useState([])
  const [tableSearch, setTableSearch] = useState('')
  const [Loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [Downloading, setDownloading] = useState(false)
  const [hasFetchedAll, setHasFetchedAll] = useState(false)
  const cardRef = useRef(null)

  // Suggestion & Total count states
  const [StudentNames, setStudentNames] = useState([])
  const [totalStudent, settotalstudent] = useState(0)
  const [suggestions, setSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const wrapperRef = useRef(null)

  // 1. Initial Load: Only fetch names list & count for autocomplete and badge
  useEffect(() => {
    const fetchNames = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/getallnames`, {
          withCredentials: true
        })
        setStudentNames(res.data.names || [])
        settotalstudent(res.data.count || 0)
      } catch (error) {
        console.log('fetchNames error', error)
      }
    }
    fetchNames()
  }, [])

  // 2. Single Student Search (Only triggered on button click)
  const find = async (e) => {
    if (e) e.preventDefault()
    if (!name.trim()) {
      setErrorMsg('Please enter a student name to search.')
      return
    }

    setShowSuggestions(false)
    setLoading(true)
    setErrorMsg('')
    setdetails(null)

    try {
      const res = await axios.post(`${BASE_URL}/api/getdata`, { name: name.trim(), type: 'ONE' }, {
        withCredentials: true
      })
      setdetails(res.data.Std)
    } catch (error) {
      console.log("axios error", error)
      setErrorMsg(error.response?.data?.message || "Record not found.")
    } finally {
      setLoading(false)
    }
  }

  // 3. All Students Table Fetch (Only triggered on button click)
  const handleFetchAllData = async () => {
    setLoading(true)
    setErrorMsg('')
    try {
      const res = await axios.post(`${BASE_URL}/api/getdata`, { type: 'ALL' }, {
        withCredentials: true
      })
      if (res.data.isAll) {
        setAllStudentsList(res.data.Std || [])
        setHasFetchedAll(true)
      }
    } catch (error) {
      console.log("Fetch all error", error)
      setErrorMsg(error.response?.data?.message || "Could not load students list.")
    } finally {
      setLoading(false)
    }
  }

  // Input change & autocomplete filtering
  const handleNameChange = (e) => {
    const value = e.target.value
    setname(value)
    setActiveIndex(-1)

    if (value.trim().length === 0) {
      setSuggestions([])
      setShowSuggestions(false)
      return
    }

    const filtered = (StudentNames || []).filter((n) =>
      n.toLowerCase().includes(value.toLowerCase())
    )
    setSuggestions(filtered)
    setShowSuggestions(filtered.length > 0)
  }

  const handleSuggestionClick = (selectedName) => {
    setname(selectedName)
    setSuggestions([])
    setShowSuggestions(false)
    setActiveIndex(-1)
  }

  const handleKeyDown = (e) => {
    if (!showSuggestions || suggestions.length === 0) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex((prev) => (prev + 1) % suggestions.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex((prev) => (prev <= 0 ? suggestions.length - 1 : prev - 1))
    } else if (e.key === 'Enter' && activeIndex >= 0) {
      e.preventDefault()
      handleSuggestionClick(suggestions[activeIndex])
    } else if (e.key === 'Escape') {
      setShowSuggestions(false)
    }
  }

  // Close dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Export Table Data to CSV
  const downloadCSV = () => {
    if (filteredTableData.length === 0) return
    const headers = ["Index,Student Name,Class,Father Name,Mobile Number,School Name,Joining Date,Address"]
    const rows = filteredTableData.map((st, i) => 
      `"${i + 1}","${st.studentname || ''}","${st.class || ''}","${st.fathername || ''}","${st.Mobilenumber || ''}","${st.schoolname || ''}","${st.Joinningdate || ''}","${(st.address || '').replace(/"/g, '""')}"`
    )
    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n")
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", `ATC_Students_Sheet_${new Date().toISOString().slice(0, 10)}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // PDF ID Card Generator
  const downloadPDF = async () => {
    if (!cardRef.current) return
    setDownloading(true)
    try {
      const images = cardRef.current.querySelectorAll('img')
      await Promise.all(Array.from(images).map(img => {
        if (img.complete) return Promise.resolve()
        return new Promise(resolve => {
          img.onload = resolve
          img.onerror = resolve
        })
      }))

      const canvas = await html2canvas(cardRef.current, {
        scale: 3,
        backgroundColor: '#ffffff',
        useCORS: true,
        scrollX: 0,
        scrollY: -window.scrollY,
        width: cardRef.current.offsetWidth,
        height: cardRef.current.offsetHeight
      })
      const imgData = canvas.toDataURL('image/png')
      const imgWidthMM = 100
      const imgHeightMM = (canvas.height * imgWidthMM) / canvas.width

      const pdf = new jsPDF({
        orientation: imgHeightMM > imgWidthMM ? 'portrait' : 'landscape',
        unit: 'mm',
        format: [imgWidthMM, imgHeightMM]
      })
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidthMM, imgHeightMM)
      pdf.save(`${(details?.studentname || 'student').trim().replace(/\s+/g, '_')}_ID_card.pdf`)
    } catch (err) {
      console.log('pdf error', err)
      setErrorMsg('Could not generate the PDF. Please try again.')
    } finally {
      setDownloading(false)
    }
  }

  const filteredTableData = allStudentsList.filter((item) => {
    const sName = item.studentname?.toLowerCase() || ''
    const sClass = item.class?.toLowerCase() || ''
    const sPhone = (item.Mobilenumber || '').toString()
    const sFather = item.fathername?.toLowerCase() || ''
    const q = tableSearch.toLowerCase()
    return sName.includes(q) || sClass.includes(q) || sPhone.includes(q) || sFather.includes(q)
  })

  return (
    <div className='w-full min-h-screen bg-slate-100 font-sans'>

      {/* Top Header */}
      <div className='bg-white border-b border-slate-200'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <img className='w-9 h-9 rounded-full object-cover' src="logo.png" alt="logo" />
            <div>
              <p className='text-sm font-semibold text-slate-800 leading-tight'>Abbas Tuition Classes</p>
              <p className='text-xs text-slate-400 leading-tight'>Admin Database Panel</p>
            </div>
          </div>
          <span className='text-xs font-semibold px-3 py-1 bg-slate-100 text-slate-700 rounded-full border border-slate-200'>
            Total Students: <strong className='text-blue-700 font-bold'>{totalStudent}</strong>
          </span>
        </div>
      </div>

      <section className='max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col items-center'>

        {/* Title & Mode Switcher */}
        <div className='w-full mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4'>
          <div>
            <h1 className='text-2xl sm:text-3xl font-bold text-slate-800'>
              Student <span className='text-blue-700'>Records</span>
            </h1>
            <p className='text-xs sm:text-sm text-slate-500 mt-1'>
              {viewFilter === 'one' ? "Search student ID Card by name." : "Excel database view with export options."}
            </p>
            <p className='text-xs font-semibold text-slate-600 mt-1'>
              Total Registered Students: <span className='text-blue-700 font-bold'>{totalStudent}</span>
            </p>
          </div>

          {/* Toggle Buttons */}
          <div className='flex items-center p-1 bg-slate-200 rounded-xl border border-slate-300'>
            <button
              onClick={() => { setViewFilter('one'); setErrorMsg(''); }}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                viewFilter === 'one' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Icon.user className='w-3.5 h-3.5' />
              Single (ID Card)
            </button>
            <button
              onClick={() => { setViewFilter('all'); setErrorMsg(''); }}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                viewFilter === 'all' ? 'bg-emerald-700 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Icon.table className='w-3.5 h-3.5' />
              All (Excel Sheet)
            </button>
          </div>
        </div>

        {/* ----------------- MODE 1: SINGLE STUDENT SEARCH ----------------- */}
        {viewFilter === 'one' && (
          <div className='w-full max-w-4xl mb-6'>
            <form onSubmit={find} className='flex flex-col sm:flex-row gap-3'>
              <div className='relative flex-1' ref={wrapperRef}>
                <Icon.search className='w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2' />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={handleNameChange}
                  onKeyDown={handleKeyDown}
                  onFocus={() => { if (suggestions.length > 0) setShowSuggestions(true) }}
                  autoComplete="off"
                  className='w-full outline-none pl-10 pr-3 py-2.5 bg-white h-11 rounded-lg border border-slate-300 shadow-sm focus:ring-2 focus:ring-blue-800/10 focus:border-blue-600 transition text-sm'
                  placeholder='Enter student name...'
                />

                {/* Suggestions Dropdown List */}
                {showSuggestions && (
                  <ul className='absolute z-30 left-0 right-0 mt-1.5 bg-white border border-slate-200 rounded-lg shadow-xl max-h-56 overflow-y-auto'>
                    {suggestions.map((sug, idx) => (
                      <li
                        key={sug + idx}
                        onMouseDown={() => handleSuggestionClick(sug)}
                        onMouseEnter={() => setActiveIndex(idx)}
                        className={`px-4 py-2.5 text-sm cursor-pointer flex items-center gap-2 ${
                          idx === activeIndex ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <Icon.user className='w-3.5 h-3.5 text-slate-400 shrink-0' />
                        <span className='truncate'>{sug}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <button
                type="submit"
                disabled={Loading}
                className='h-11 px-6 text-sm font-semibold rounded-lg shadow-sm text-white flex items-center gap-2 justify-center bg-slate-900 hover:bg-slate-800 active:scale-[0.98] transition disabled:opacity-60 cursor-pointer'
              >
                {Loading ? (
                  <>
                    <div className='w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin'></div>
                    Searching...
                  </>
                ) : (
                  <>
                    <Icon.search className='w-4 h-4' />
                    Find ID Card
                  </>
                )}
              </button>
            </form>
          </div>
        )}

        {/* ----------------- MODE 2: ALL STUDENTS FETCH TRIGGER ----------------- */}
        {viewFilter === 'all' && (
          <div className='w-full mb-6 bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4'>
            <div>
              <h3 className='text-sm font-bold text-slate-900 flex items-center gap-2'>
                <span className='w-2.5 h-2.5 rounded-full bg-emerald-600'></span>
                Excel Records Generator
              </h3>
              <p className='text-xs text-slate-500 mt-0.5'>
                Click fetch to pull latest student database directly into sheet.
              </p>
            </div>

            <div className='flex items-center gap-3 w-full sm:w-auto'>
              <button
                onClick={handleFetchAllData}
                disabled={Loading}
                className='flex-1 sm:flex-none h-10 px-5 text-xs font-bold rounded-lg shadow-sm text-white flex items-center gap-2 justify-center bg-emerald-700 hover:bg-emerald-800 transition active:scale-95 cursor-pointer disabled:opacity-60'
              >
                {Loading ? (
                  <>
                    <div className='w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin'></div>
                    Loading Sheet...
                  </>
                ) : (
                  <>
                    <Icon.search className='w-3.5 h-3.5' />
                    {hasFetchedAll ? "Refresh Sheet Data" : "Fetch & View Table"}
                  </>
                )}
              </button>

              {hasFetchedAll && filteredTableData.length > 0 && (
                <button
                  onClick={downloadCSV}
                  className='h-10 px-4 text-xs font-bold rounded-lg border border-emerald-700 text-emerald-800 bg-emerald-50 hover:bg-emerald-100 flex items-center gap-1.5 transition cursor-pointer'
                >
                  <Icon.excel className='w-4 h-4 text-emerald-700' />
                  Export .CSV
                </button>
              )}
            </div>
          </div>
        )}

        {/* Error Box */}
        {errorMsg && (
          <div className='w-full max-w-4xl mb-6 flex items-start gap-2.5 bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm'>
            <Icon.alert className='w-4 h-4 mt-0.5 shrink-0' />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* ----------------- SINGLE ID CARD VIEW ----------------- */}
        {viewFilter === 'one' && details && (() => {
          const cleanName = (details.studentname || 'ST').replace(/\s+/g, '').toUpperCase().slice(0, 3)
          const lastDigits = (details.Mobilenumber || '0000').toString().slice(-4)
          const studentId = `ATC-${cleanName}${lastDigits}`

          return (
            <div className='w-full flex flex-col items-center gap-4'>
              <div ref={cardRef} className='relative w-full max-w-[420px] bg-white shadow-lg rounded-2xl overflow-hidden border border-slate-200'>
                <div className='h-1.5 w-full bg-gradient-to-r from-blue-600 via-blue-500 to-emerald-500'></div>

                <div className='relative bg-slate-900 px-6 pt-5 pb-16'>
                  <div className='flex items-center justify-between gap-3'>
                    <div className='flex items-center gap-2.5 min-w-0'>
                      <div className='w-8 h-8 rounded-full bg-white/10 overflow-hidden flex items-center justify-center shrink-0'>
                        <img className='w-full h-full object-cover' src="logo.png" alt="logo" />
                      </div>
                      <p className='font-semibold text-[14px] leading-snug text-white break-words'>Abbas Tuition Classes</p>
                    </div>
                    <span className='shrink-0 text-[9px] font-semibold tracking-wide uppercase text-slate-300 border border-slate-700 rounded-full px-2 py-1'>
                      ID card
                    </span>
                  </div>
                  <p className='text-[11px] text-slate-400 leading-tight mt-1.5 pl-[42px]'>Jaunpur (U.P) · 222001</p>
                </div>

                <div className='relative flex justify-center -mt-11'>
                  <div className='w-20 h-20 rounded-full bg-blue-50 border-4 border-white shadow-sm flex items-center justify-center'>
                    <Icon.student className='w-10 h-10 text-blue-600' />
                  </div>
                </div>

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

                <div className='relative grid grid-cols-2 gap-x-4 gap-y-4 px-6 mt-6 text-sm'>
                  <Field icon={<Icon.user className='w-3.5 h-3.5' />} label="Father's name" value={details.fathername} />
                  <Field icon={<Icon.calendar className='w-3.5 h-3.5' />} label="Joining date" value={details.Joinningdate} />
                  <Field icon={<Icon.phone className='w-3.5 h-3.5' />} label="Mobile no." value={`+91 ${details.Mobilenumber}`} />
                  <Field icon={<Icon.school className='w-3.5 h-3.5' />} label="School" value={details.schoolname} />
                  <Field icon={<Icon.pin className='w-3.5 h-3.5' />} label="Address" value={details.address} span2 />
                </div>

                <div className='relative border-t border-dashed border-slate-200 mx-6 mt-6'></div>

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
                className='w-full sm:w-auto flex items-center justify-center gap-2 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg px-5 py-2.5 shadow-sm transition active:scale-[0.98] disabled:opacity-60 cursor-pointer'
              >
                {Downloading ? "Preparing PDF..." : "Download as PDF"}
              </button>
            </div>
          )
        })()}

        {/* ----------------- REAL EXCEL SPREADSHEET VIEW ----------------- */}
        {viewFilter === 'all' && hasFetchedAll && (
          <div className='w-full bg-white border border-slate-300 rounded-lg shadow-md overflow-hidden font-mono text-xs'>
            
            {/* Excel Header */}
            <div className='bg-[#217346] text-white px-4 py-2.5 flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <Icon.excel className='w-5 h-5 text-white' />
                <span className='font-bold tracking-wide font-sans text-sm'>ATC_Students_Master_Sheet.xlsx</span>
              </div>
              <span className='text-[11px] bg-black/20 px-2 py-0.5 rounded font-mono'>
                COUNT: {filteredTableData.length}
              </span>
            </div>

            {/* Excel Search Box */}
            <div className='p-2.5 bg-slate-100 border-b border-slate-300 flex items-center gap-2 font-sans'>
              <span className='text-xs font-bold text-slate-600 px-1'>fx</span>
              <div className='relative flex-1 max-w-sm'>
                <input
                  type="text"
                  placeholder="Filter by name, class, phone, school..."
                  value={tableSearch}
                  onChange={(e) => setTableSearch(e.target.value)}
                  className="w-full pl-3 pr-3 py-1.5 text-xs rounded border border-slate-300 bg-white focus:outline-none focus:border-emerald-600"
                />
              </div>
            </div>

            {/* Table Grid */}
            <div className='overflow-x-auto max-h-[600px]'>
              <table className='w-full border-collapse border border-slate-300 text-left'>
                <thead className='bg-[#f3f4f6] text-slate-500 font-bold text-[10px] select-none'>
                  <tr className='border-b border-slate-300'>
                    <th className='w-12 border-r border-slate-300 px-2 py-1 text-center bg-[#e5e7eb]'></th>
                    <th className='border-r border-slate-300 px-3 py-1 text-center'>A</th>
                    <th className='border-r border-slate-300 px-3 py-1 text-center'>B</th>
                    <th className='border-r border-slate-300 px-3 py-1 text-center'>C</th>
                    <th className='border-r border-slate-300 px-3 py-1 text-center'>D</th>
                    <th className='border-r border-slate-300 px-3 py-1 text-center'>E</th>
                    <th className='border-r border-slate-300 px-3 py-1 text-center'>F</th>
                    <th className='border-r border-slate-300 px-3 py-1 text-center'>G</th>
                  </tr>
                  <tr className='bg-[#e5e7eb] text-slate-800 font-bold border-b border-slate-300 text-[11px] font-sans'>
                    <th className='border-r border-slate-300 px-2 py-2 text-center'>#</th>
                    <th className='border-r border-slate-300 px-3 py-2'>STUDENT_NAME</th>
                    <th className='border-r border-slate-300 px-3 py-2'>CLASS</th>
                    <th className='border-r border-slate-300 px-3 py-2'>FATHER_NAME</th>
                    <th className='border-r border-slate-300 px-3 py-2'>MOBILE_NO</th>
                    <th className='border-r border-slate-300 px-3 py-2'>SCHOOL</th>
                    <th className='border-r border-slate-300 px-3 py-2'>JOINING_DATE</th>
                    <th className='px-3 py-2'>ADDRESS</th>
                  </tr>
                </thead>
                <tbody className='divide-y divide-slate-200 text-slate-800 text-[11px] font-mono'>
                  {filteredTableData.length === 0 ? (
                    <tr>
                      <td colSpan={8} className='text-center py-8 text-slate-400 font-sans'>
                        No matching student records in sheet.
                      </td>
                    </tr>
                  ) : (
                    filteredTableData.map((st, idx) => (
                      <tr key={st._id || idx} className='hover:bg-[#dbeafe] transition-colors border-b border-slate-200'>
                        <td className='border-r border-slate-300 px-2 py-2 text-center bg-[#f3f4f6] text-slate-500 font-bold select-none'>
                          {idx + 1}
                        </td>
                        <td className='border-r border-slate-200 px-3 py-2 font-bold font-sans text-slate-950'>{st.studentname || '—'}</td>
                        <td className='border-r border-slate-200 px-3 py-2'>
                          <span className='bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded text-[10px] font-bold'>
                            {st.class ? `Class ${st.class.trim()}` : '—'}
                          </span>
                        </td>
                        <td className='border-r border-slate-200 px-3 py-2'>{st.fathername || '—'}</td>
                        <td className='border-r border-slate-200 px-3 py-2 text-blue-700 font-semibold'>
                          {st.Mobilenumber ? `+91 ${st.Mobilenumber}` : '—'}
                        </td>
                        <td className='border-r border-slate-200 px-3 py-2'>{st.schoolname || '—'}</td>
                        <td className='border-r border-slate-200 px-3 py-2 text-slate-600'>{st.Joinningdate || '—'}</td>
                        <td className='px-3 py-2 text-slate-600 max-w-xs truncate'>{st.address || '—'}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Excel Status Bar */}
            <div className='bg-[#f3f4f6] border-t border-slate-300 px-4 py-1.5 flex items-center justify-between text-[11px] text-slate-600 font-sans'>
              <span className='flex items-center gap-1.5'>
                <span className='w-2 h-2 rounded-full bg-emerald-600'></span> Ready
              </span>
              <span>Sheet1 (Auto-Synced)</span>
            </div>
          </div>
        )}

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
      <p className='font-semibold text-slate-800 wrap-words'>{value || '—'}</p>
    </div>
  )
}