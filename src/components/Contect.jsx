import { useState } from 'react'
const BASE_URL = import.meta.env.VITE_API_URL;
import axios from 'axios'
function Contect() {

    const [username, setusername] = useState()
    const [student, setstudent] = useState()
    const [field, setfield] = useState()
    const [value, setvalue] = useState()
    const [Loading, setLoading] = useState(false)

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
        setLoading(true)

        try {
            const res = await axios.delete(`${BASE_URL}/api/deletedata`, { data: { studentname: student } })
            alert(res.data)


        } catch (error) {
            console.log("axios", error)
        } finally {
            setstudent('')
            setLoading(false)
        }




    }



    return (
        <div>
            <div className='bg-gray-50 w-full h-15'>

            </div>

            <section className='w-full  min-h-screen pt-10 bg-gray-50 max-w-full h-full flex flex-col  items-center'>
                <div className='w-full   justify-center flex flex-col md:gap-2 gap-20 md:flex-row '>


                    <form onSubmit={update}>


                        <div className='w-auto bg-white flex  flex-col rounded-xl p-4 gap-1 '>
                            <h1 className='text-lg font-bold mb-8'>Modification of student data.</h1>
                            <label htmlFor="" className='text-md mb-1'>Student name</label>
                            <input type="text"
                                value={username}
                                required
                                onChange={(e) => setusername(e.target.value)}
                                className='border outline-none p-2 mb-2 '
                                placeholder='enter your email'
                            />

                            <label htmlFor="" className='text-md mb-1'>Updated field</label>
                            <select name="" id=""
                                className='w-full border-none bg-gray-100 outline-none p-2 rounded-sm'
                                value={field}
                                required
                                onChange={(e) => setfield(e.target.value)}>
                                <option>Select Field</option>
                                <option value="studentname">Student name</option>
                                <option value="fathername">fathername</option>
                                <option value="schoolname">schoolname</option>
                                <option value="class">class</option>
                                <option value="address">address</option>
                                <option value="Joinningdate">Joinning date</option>
                                <option value="Mobilenumber">Mobilenumber</option>
                            </select>

                            <label htmlFor="" className='text-md mb-1'>Updated value</label>
                            <input type="text"
                                required
                                value={value}
                                onChange={(e) => setvalue(e.target.value)}
                                className='border p-2 outline-none'
                                placeholder='enter value'
                                max={30} />


                            <button
                                type='update'
                                disabled={Loading}
                                className=' w-full h-10 text-[13px] hover:bg-gray-600 font-semibold rounded-sm shadow-xl text-white flex items-center mt-5 justify-center mb-6 bg-gray-700'>
                                {Loading && (
                                    <div className='fixed inset-0 bg-black/40 flex items-center justify-center z-50'>

                                        <div className='w-14 h-14 border-4 border-white border-t-transparent rounded-full animate-spin'></div>

                                    </div>

                                )}
                                update</button>

                        </div>
                    </form>


                    <div className='w-auto bg-white flex  flex-col rounded-xl p-4 gap-1 '>
                        <h1 className='text-lg font-bold mb-8'>delete student</h1>
                        <label htmlFor="" className='text-md mb-1'>Student name</label>
                        <input type="text"
                            required
                            value={student}
                            onChange={(e) => setstudent(e.target.value)}
                            className='border outline-none p-2 mb-2 '
                            placeholder='enter username '
                        />




                        <button
                            onClick={deletestudent}
                            disabled={Loading}
                            className=' w-full h-10 text-[13px] hover:bg-gray-600 font-semibold rounded-sm shadow-xl text-white flex items-center mt-5 justify-center mb-6 bg-gray-700'>
                            {Loading && (
                                <div className='fixed inset-0 bg-black/40 flex items-center justify-center z-50'>

                                    <div className='w-14 h-14 border-4 border-white border-t-transparent rounded-full animate-spin'></div>

                                </div>

                            )}
                            delete</button>



                    </div>







                </div>

            </section>
        </div>
    )
}

export default Contect