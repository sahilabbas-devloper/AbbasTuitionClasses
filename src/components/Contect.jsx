import { useState } from 'react'
import axios from 'axios'
import { User, ListFilter, PenLine, Trash2, AlertTriangle, CheckCircle2 } from 'lucide-react'

const BASE_URL = import.meta.env.VITE_API_URL;

function Contect() {

    const [username, setusername] = useState('')
    const [student, setstudent] = useState('')
    const [field, setfield] = useState('')
    const [value, setvalue] = useState('')
    const [Loading, setLoading] = useState(false)
    const [DeleteLoading, setDeleteLoading] = useState(false)

    const update = async (e) => {

        e.preventDefault()
        setLoading(true)

        try {
            const res = await axios.put(`${BASE_URL}/api/updatedata`, { username, field, value })
            alert(res.data)

        } catch (error) {
            console.log("axios", error)
        } finally {
            setLoading(false)
        }

    }

    const deletestudent = async (e) => {

        e.preventDefault()
        if (!student.trim()) return
        setDeleteLoading(true)

        try {
            const res = await axios.delete(`${BASE_URL}/api/deletedata`, { data: { studentname: student } })
            alert(res.data)

        } catch (error) {
            console.log("axios", error)
        } finally {
            setstudent('')
            setDeleteLoading(false)
        }

    }

    return (
        <div className='w-full min-h-screen bg-slate-100'>

            {/* Top bar */}
            <div className='w-full bg-white border-b border-slate-200'>
                <div className='max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-3'>
                    <img className='w-9 h-9 rounded-full object-cover' src="logo.png" alt="logo" />
                    <div>
                        <p className='text-sm font-semibold text-slate-800 leading-tight'>Admissions</p>
                        <p className='text-xs text-slate-400 leading-tight'>Manage student records</p>
                    </div>
                </div>
            </div>

            <section className='max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-10'>

                <div className='mb-8'>
                    <h1 className='text-2xl font-bold text-slate-800'>Edit student records</h1>
                    <p className='text-sm text-slate-500 mt-1'>Update a field or remove a student from the system.</p>
                </div>

                <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 items-start'>

                    {/* Update card */}
                    <form onSubmit={update} className='bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-7'>

                        <div className='flex items-center gap-2 mb-1'>
                            <div className='w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0'>
                                <PenLine size={16} className='text-blue-600' />
                            </div>
                            <h2 className='text-base font-semibold text-slate-800'>Update student data</h2>
                        </div>
                        <p className='text-xs text-slate-400 mb-6 pl-10'>Change one field for an existing student.</p>

                        <div className='flex flex-col gap-5'>

                            <div className='flex flex-col gap-1.5'>
                                <label className='text-sm font-medium text-slate-700 flex items-center gap-1.5'>
                                    <User size={15} className='text-slate-400' /> Student name
                                </label>
                                <input type="text"
                                    value={username}
                                    required
                                    onChange={(e) => setusername(e.target.value)}
                                    className='border border-slate-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-slate-800/10 focus:border-slate-500 transition'
                                    placeholder='Enter the exact registered name'
                                />
                            </div>

                            <div className='flex flex-col gap-1.5'>
                                <label className='text-sm font-medium text-slate-700 flex items-center gap-1.5'>
                                    <ListFilter size={15} className='text-slate-400' /> Field to update
                                </label>
                                <select
                                    value={field}
                                    required
                                    className='border border-slate-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-slate-800/10 focus:border-slate-500 transition bg-white'
                                    onChange={(e) => setfield(e.target.value)}>
                                    <option value="">Select field</option>
                                    <option value="studentname">Student name</option>
                                    <option value="fathername">Father's name</option>
                                    <option value="schoolname">School name</option>
                                    <option value="class">Class</option>
                                    <option value="address">Address</option>
                                    <option value="Joinningdate">Joining date</option>
                                    <option value="Mobilenumber">Mobile number</option>
                                </select>
                            </div>

                            <div className='flex flex-col gap-1.5'>
                                <label className='text-sm font-medium text-slate-700'>New value</label>
                                <input type="text"
                                    required
                                    value={value}
                                    onChange={(e) => setvalue(e.target.value)}
                                    className='border border-slate-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-slate-800/10 focus:border-slate-500 transition'
                                    placeholder='Enter the new value'
                                    maxLength={30}
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
                                    Update record
                                </>
                            )}
                        </button>
                    </form>

                    {/* Delete card */}
                    <div className='bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-7'>

                        <div className='flex items-center gap-2 mb-1'>
                            <div className='w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center shrink-0'>
                                <Trash2 size={16} className='text-red-600' />
                            </div>
                            <h2 className='text-base font-semibold text-slate-800'>Delete student</h2>
                        </div>
                        <p className='text-xs text-slate-400 mb-6 pl-10'>This permanently removes the record. It can't be undone.</p>

                        <div className='flex flex-col gap-1.5'>
                            <label className='text-sm font-medium text-slate-700 flex items-center gap-1.5'>
                                <User size={15} className='text-slate-400' /> Student name
                            </label>
                            <input type="text"
                                required
                                value={student}
                                onChange={(e) => setstudent(e.target.value)}
                                className='border border-slate-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-red-600/10 focus:border-red-500 transition'
                                placeholder='Enter the exact registered name'
                            />
                        </div>

                        <div className='mt-4 flex items-start gap-2.5 bg-amber-50 border border-amber-200 text-amber-700 rounded-lg px-3.5 py-2.5 text-xs'>
                            <AlertTriangle size={15} className='mt-0.5 shrink-0' />
                            <span>Double check the name before deleting — this action cannot be reversed.</span>
                        </div>

                        <button
                            onClick={deletestudent}
                            disabled={DeleteLoading}
                            className='w-full mt-6 px-6 py-2.5 rounded-lg text-sm font-semibold text-white bg-red-600 hover:bg-red-700 active:scale-[0.98] transition disabled:opacity-60 flex items-center justify-center gap-2'>
                            {DeleteLoading ? (
                                <>
                                    <div className='w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin'></div>
                                    Deleting...
                                </>
                            ) : (
                                <>
                                    <Trash2 size={16} />
                                    Delete permanently
                                </>
                            )}
                        </button>
                    </div>

                </div>
            </section>
        </div>
    )
}

export default Contect