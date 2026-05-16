import React, { useState } from 'react'
import axios from 'axios'
const BASE_URL= import.meta.env.VITE_API_URL;

function Addstudent() {

    const [name, setname] = useState()
    const [fathername, setfathername] = useState()
    const [clas, setclas] = useState()
    const [address, setaddress] = useState()
    const [number, setnumber] = useState()
    const [schoolname, setschoolname] = useState()
    const [date, setdate] = useState()
    const [Loading, setLoading] = useState(false)



    const send = async (e) => {

        e.preventDefault()
        setLoading(true)


        try {
            const res = await axios.post(`${BASE_URL}/api/senddata`, { name, fathername, clas, address, number, schoolname, date })
            alert(res.data)
           
        } catch (error) {
            console.log("axios", error)
        } finally {
            setLoading(false)
            setname('')
            setfathername('')
            setaddress('')
            setnumber('')
            setschoolname('')
        }

           


    }
    return (
        <div>
            <div className='bg-gray-50  w-full h-15'>

            </div>

            <section className='w-full  min-h-screen bg-gray-50  pt-10 max-w-full h-full flex flex-col  items-center'>
                <div className='w-full  justify-center flex flex-col md:gap-2 gap-20 md:flex-row '>
                     
                     
                     <form onSubmit={send}>
                    <div className='w-auto bg-white flex  flex-col rounded-xl p-4 gap-1 '>

                        <div className='flex items-center'>
                            <div className='w-10 h-auto  rounded-full '>
                                <img
                                    className='w-10 h-auto  rounded-full'
                                    src="logo.png" alt="logo" />
                            </div>
                          
                        </div>

                     

                        <h1 className='text-xl font-bold mb-8'>Student informations</h1>
                        <label htmlFor="" className='text-md mb-1'>Student name</label>
                        <input type="text"
                        value={name}
                            required
                            onChange={(e) => setname(e.target.value)}
                            className='border outline-none p-2 mb-2 '
                            placeholder='enter name'
                        />

                        <label htmlFor="" className='text-md mb-1'>father name</label>
                        <input type="text"
                            required
                            value={fathername}
                            onChange={(e) => setfathername(e.target.value)}
                            className='border outline-none p-2 mb-2 '
                            placeholder='enter fathername'
                        />



                        <label htmlFor="" className='text-md mb-1'>select class</label>
                        <select
                            className='w-full border outline-none p-2 rounded-sm'
                            onChange={(e) => setclas(e.target.value)}>
                            <option>select class</option>
                            <option value=" P.G">class P.G</option>
                            <option value=" L.K.G">class L.K.G</option>
                            <option value=" U.K.G">class U.K.G</option>
                            <option value="1st">class 1st</option>
                            <option value="2nd">class 2nd</option>
                            <option value="3rd">class 3rd</option>
                            <option value="4th">class 4th</option>
                            <option value="5th">class 5th</option>
                            <option value="6th">class 6th</option>
                            <option value="7th">class 7th</option>
                            <option value="8th">class 8th</option>
                            <option value="9th">class 9th</option>
                            <option value="10th">class 10th</option>
                            <option value="11th">class 11th</option>
                            <option value="12th">class 12th</option>
                        </select>

                        <label htmlFor="" className='text-md mb-1'> enter address</label>
                        <input type="text"
                            required
                            value={address}
                            onChange={(e) => setaddress(e.target.value)}
                            className='border outline-none p-2 mb-2 '
                            placeholder='enter address'
                        />

                        <label htmlFor="" className='text-md mb-1'>Joinnig date</label>
                        <input type="date"
                            required
                            value={date}
                            onChange={(e) => setdate(e.target.value)}
                            className='border outline-none p-2 mb-2'
                            placeholder='joinnig date'
                        />

                        <label htmlFor="" className='text-md mb-1'>mobile.number</label>
                        <input type="text"
                            required
                            value={number}
                            onChange={(e) => setnumber(e.target.value)}
                            className='border outline-none p-2 mb-2 '
                            placeholder='enter mobile.no'
                        />

                        <label htmlFor="" className='text-md mb-1'>School name</label>
                        <input type="text"
                            required
                            value={schoolname}
                            onChange={(e) => setschoolname(e.target.value)}
                            className='border outline-none p-2 mb-2 '
                            placeholder='enter school name'
                        />


                        <button
                            type='send'
                             disabled={Loading}
                            className=' w-full h-10 text-[11px] font-semibold rounded-sm shadow-xl text-white flex items-center mt-5 hover:bg-gray-600 justify-center mb-6 bg-gray-800'>
                            {Loading && (
                                <div className='fixed inset-0 bg-black/40 flex items-center justify-center z-50'>

                                    <div className='w-14 h-14 border-4 border-white border-t-transparent rounded-full animate-spin'></div>

                                </div>

                            )}
                            Saved</button>
                         
                    </div>
                            </form>
                </div>

            </section>
        </div>
    )
}

export default Addstudent