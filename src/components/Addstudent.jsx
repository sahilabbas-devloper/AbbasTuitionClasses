import React, { useState } from 'react'
import axios from 'axios'
import { User, Users, GraduationCap, MapPin, Phone, School, CalendarDays, CheckCircle2 } from 'lucide-react'

const BASE_URL = import.meta.env.VITE_API_URL;

function Addstudent() {

    const [name, setname] = useState("")
    const [fathername, setfathername] = useState("")
    const [clas, setclas] = useState("")
    const [address, setaddress] = useState('')
    const [number, setnumber] = useState('')
    const [schoolname, setschoolname] = useState('')
    const [date, setdate] = useState('')
    const [Loading, setLoading] = useState(false)

    const send = async (e) => {

        e.preventDefault()
        setLoading(true)

        try {
            const res = await axios.post(`${BASE_URL}/api/senddata`, { name, fathername, clas, address, number, schoolname, date }, {
                withCredentials: true
            })
            alert(res.data.message)

        } catch (error) {
            console.log("axios", error)
            alert(error.response?.data?.message || "Something went wrong !")
        } finally {
            setLoading(false)
            setname('')
            setfathername('')
            setaddress('')
            setnumber('')
            setschoolname('')
            setdate('')
            setclas('')
        }

    }

    const initials = name.trim() ? name.trim().split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase() : 'ST'

    return (
        <div className='w-full min-h-screen bg-slate-100'>

            {/* Top bar */}
            <div className='w-full bg-white border-b border-slate-200'>
                <div className='max-w-5xl mx-auto px-6 py-4 flex items-center gap-3'>
                    <img className='w-9 h-9 rounded-full object-cover' src="logo.png" alt="logo" />
                    <div>
                        <p className='text-sm font-semibold text-slate-800 leading-tight'>Admissions</p>
                        <p className='text-xs text-slate-400 leading-tight'>New student registration</p>
                    </div>
                </div>
            </div>

            <section className='max-w-5xl mx-auto px-6 py-10'>

                <div className='mb-8'>
                    <h1 className='text-2xl font-bold text-slate-800'>Add student</h1>
                    <p className='text-sm text-slate-500 mt-1'>Fill in the details below to register a new student.</p>
                </div>

                <form onSubmit={send} className='grid grid-cols-1 lg:grid-cols-3 gap-6 items-start'>

                    {/* Form card */}
                    <div className='lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8'>

                        <div className='mb-6'>
                            <p className='text-xs font-semibold tracking-wide text-slate-400 uppercase'>Student details</p>
                        </div>

                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>

                            <div className='flex flex-col gap-1.5'>
                                <label className='text-sm font-medium text-slate-700 flex items-center gap-1.5'>
                                    <User size={15} className='text-slate-400' /> Student name
                                </label>
                                <input type="text"
                                    value={name}
                                    required
                                    onChange={(e) => setname(e.target.value)}
                                    className='border border-slate-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-slate-800/10 focus:border-slate-500 transition'
                                    placeholder='Enter full name'
                                />
                            </div>

                            <div className='flex flex-col gap-1.5'>
                                <label className='text-sm font-medium text-slate-700 flex items-center gap-1.5'>
                                    <Users size={15} className='text-slate-400' /> Father's name
                                </label>
                                <input type="text"
                                    required
                                    value={fathername}
                                    onChange={(e) => setfathername(e.target.value)}
                                    className='border border-slate-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-slate-800/10 focus:border-slate-500 transition'
                                    placeholder="Enter father's name"
                                />
                            </div>

                            <div className='flex flex-col gap-1.5'>
                                <label className='text-sm font-medium text-slate-700 flex items-center gap-1.5'>
                                    <GraduationCap size={15} className='text-slate-400' /> Class
                                </label>
                                <select
                                    value={clas}
                                    required
                                    className='border border-slate-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-slate-800/10 focus:border-slate-500 transition bg-white'
                                    onChange={(e) => setclas(e.target.value)}>
                                    <option value="">Select class</option>
                                    <option value=" P.G">P.G</option>
                                    <option value=" L.K.G">L.K.G</option>
                                    <option value=" U.K.G">U.K.G</option>
                                    <option value="1st">1st</option>
                                    <option value="2nd">2nd</option>
                                    <option value="3rd">3rd</option>
                                    <option value="4th">4th</option>
                                    <option value="5th">5th</option>
                                    <option value="6th">6th</option>
                                    <option value="7th">7th</option>
                                    <option value="8th">8th</option>
                                    <option value="9th">9th</option>
                                    <option value="10th">10th</option>
                                    <option value="11th">11th</option>
                                    <option value="12th">12th</option>
                                </select>
                            </div>

                            <div className='flex flex-col gap-1.5'>
                                <label className='text-sm font-medium text-slate-700 flex items-center gap-1.5'>
                                    <CalendarDays size={15} className='text-slate-400' /> Joining date
                                </label>
                                <input type="date"
                                    required
                                    value={date}
                                    onChange={(e) => setdate(e.target.value)}
                                    className='border border-slate-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-slate-800/10 focus:border-slate-500 transition'
                                />
                            </div>

                            <div className='flex flex-col gap-1.5 sm:col-span-2'>
                                <label className='text-sm font-medium text-slate-700 flex items-center gap-1.5'>
                                    <MapPin size={15} className='text-slate-400' /> Address
                                </label>
                                <input type="text"
                                    required
                                    value={address}
                                    onChange={(e) => setaddress(e.target.value)}
                                    className='border border-slate-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-slate-800/10 focus:border-slate-500 transition'
                                    placeholder='Enter address'
                                />
                            </div>

                            <div className='flex flex-col gap-1.5'>
                                <label className='text-sm font-medium text-slate-700 flex items-center gap-1.5'>
                                    <Phone size={15} className='text-slate-400' /> Mobile number
                                </label>
                                <input type="text"
                                    required
                                    value={number}
                                    onChange={(e) => setnumber(e.target.value)}
                                    className='border border-slate-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-slate-800/10 focus:border-slate-500 transition'
                                    placeholder='Enter mobile number'
                                />
                            </div>

                            <div className='flex flex-col gap-1.5'>
                                <label className='text-sm font-medium text-slate-700 flex items-center gap-1.5'>
                                    <School size={15} className='text-slate-400' /> School name
                                </label>
                                <input type="text"
                                    required
                                    value={schoolname}
                                    onChange={(e) => setschoolname(e.target.value)}
                                    className='border border-slate-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-slate-800/10 focus:border-slate-500 transition'
                                    placeholder='Enter school name'
                                />
                            </div>

                        </div>

                        <button
                            type='submit'
                            disabled={Loading}
                            className='w-full sm:w-auto mt-8 px-8 py-2.5 rounded-lg text-sm font-semibold text-white bg-slate-800 hover:bg-slate-700 active:scale-[0.98] transition disabled:opacity-60 flex items-center justify-center gap-2'>
                            {Loading ? (
                                <>
                                    <div className='w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin'></div>
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <CheckCircle2 size={16} />
                                    Save student
                                </>
                            )}
                        </button>

                    </div>

                    {/* Live preview card */}
                    <div className='bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sticky top-6'>
                        <p className='text-xs font-semibold tracking-wide text-slate-400 uppercase mb-4'>Preview</p>

                        <div className='rounded-xl bg-slate-800 text-white p-5'>
                            <div className='flex items-center gap-3 mb-4'>
                                <div className='w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-sm font-semibold'>
                                    {initials}
                                </div>
                                <div className='min-w-0'>
                                    <p className='text-sm font-semibold truncate'>{name || 'Student name'}</p>
                                    <p className='text-xs text-slate-300 truncate'>{schoolname || 'School name'}</p>
                                </div>
                            </div>

                            <div className='space-y-2 text-xs border-t border-white/10 pt-3'>
                                <div className='flex justify-between'>
                                    <span className='text-slate-400'>Class</span>
                                    <span className='font-medium'>{clas ? clas.trim() : '—'}</span>
                                </div>
                                <div className='flex justify-between'>
                                    <span className='text-slate-400'>Father's name</span>
                                    <span className='font-medium truncate ml-3'>{fathername || '—'}</span>
                                </div>
                                <div className='flex justify-between'>
                                    <span className='text-slate-400'>Mobile</span>
                                    <span className='font-medium'>{number || '—'}</span>
                                </div>
                                <div className='flex justify-between'>
                                    <span className='text-slate-400'>Joining date</span>
                                    <span className='font-medium'>{date || '—'}</span>
                                </div>
                            </div>
                        </div>

                        <p className='text-xs text-slate-400 mt-4 leading-relaxed'>
                            Card updates live as you fill the form. Confirm details before saving.
                        </p>
                    </div>

                </form>
            </section>
        </div>
    )
}

export default Addstudent