import { useState } from 'react'
const BASE_URL = import.meta.env.VITE_API_URL;
import axios from 'axios'

function Massage() {

      const [phone, setphone] = useState('')
    const [Loading, setLoading] = useState(false)

     
       const sendsms = async () => {
       
        setLoading(true)
        try {
        const res = await axios.post(`${BASE_URL}/api/send-whatsapp`, { phone })
        
        alert(res.data.massage);
        setuser(username)
      }  catch (error) {
        console.log("axios",error)
    } finally{
        setLoading(false)
    }
}
  return (
    <div>
        <div className='bg-gray-50 ,w-full h-15'>

            </div>

            <section className='w-full  min-h-screen pt-5 bg-gray-50 max-w-full h-full flex flex-col  items-center'>
                <div className='w-full   justify-center flex flex-col md:gap-2 gap-20 md:flex-row '>

                       <div className='w-auto bg-white flex flex-col rounded-xl p-4 gap-1 mt-20 '>
                        <h1 className='text-lg font-bold mb-8'>send a via sms for fees.</h1>
                        <label htmlFor="" className='text-md mb-1'>enter number</label>
                        <input type="text"
                            required
                            onChange={(e) => setphone(e.target.value)}
                            className='border outline-none p-2 mb-2 '
                            placeholder='enter number '
                        />

                       
                       

                        <button
                         onClick={sendsms}
                         disabled={Loading}
                            className=' w-full h-10 text-[13px] hover:bg-gray-600 font-semibold rounded-sm shadow-xl text-white flex items-center mt-5 justify-center mb-6 bg-gray-700'>
                            {Loading && (
                                <div className='fixed inset-0 bg-black/40 flex items-center justify-center z-50'>

                                    <div className='w-14 h-14 border-4 border-white border-t-transparent rounded-full animate-spin'></div>

                                </div>

                            )}
                            SEND SMS</button>



                    </div>

                </div>

            </section>
    </div>
  )
}

export default Massage