
import axios from "axios"
import {  FaUser  } from 'react-icons/fa'
import { useEffect,useState } from 'react'
const BASE_URL= import.meta.env.VITE_API_URL;


function Page5() {

const [feedback, setfeedback] = useState([])

useEffect(() => {
  
const getfeedbacks = async() => {
         const res = await axios.get(`${BASE_URL}/api/getfeedbacks`)
         setfeedback(Array.isArray(res.data) ? res.data : res.data.feedbacks || []) 
        
      }
      getfeedbacks()
 
}, [])

      

  return (
    <div>
        
      <section className='w-full bg-gray-50 md:min-h-screen  max-w-full h-full flex flex-col  items-center'>
        <div className='w-full max-w-6xl mt-5 flex flex-col  md:flex-col gap-5'>

          <div className='w-full  flex  flex-col p-10 justify-center items-center  pt-15 '>
           
           <h1 className='text-4xl mb-6 font-bold '>What our parents says </h1>
           <p className='text-[12px]  font-semibold text-gray-600 '>Here from the parents who have witnessed their children's growth first-hand. Our mission has alaways <br></br>been to provide more than just lessons- we provide a foundation for life. Through consistent hard work <br></br>and a student-centric approach, we have earned the trust of over 150+ families, and <br></br>we continue to strive for excellence in every session.</p>
          </div>




          
          <div className='w-full h-auto p-4 md:p-9 flex overflow-x-auto  flex-nowrap   gap-10  '>


{ feedback && feedback.map((item,index) => (

             <div 
               key={index}
             className='md:w-40 w-40 h-50 flex-none  overflow-hidden bg-white  flex flex-col p-4 shadow-lg rounded-xl'>
              <div className='flex items-center justify-center mb-2 bg-gray-700 w-10 h-10 rounded-full text-white'>
            <FaUser/>
              </div>
              <div className='text-[13px] mb-1  font-bold'>
              <h1 >{item.Email}</h1>
             
           </div>
            <div>

                 <p className='text-[8px] text-gray-600  '>{item.Massage} </p>
            </div>
             
             </div>
))}

          </div>


        </div>
      
      </section>
    </div>
  )
}

export default Page5