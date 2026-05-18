import { useState } from "react";

function SendSMS() {
  const [number, setNumber] = useState("");

  const handleSendSMS = () => {
    const message = `📢 Abbas tuition classes

       Hello Dear Parent 👋
         Your child’s fees is pending.
      Please pay  your fees on  Time.

      – Abbas Institute Team
      🌐 www.Abbastuitionclasses.in`
    window.location.href = `sms:${number}?body=${encodeURIComponent(message)}`;
    setNumber('')
  };

  return (
    <div>
      <div className='w-full h-15 bg-gray-50'>

      </div>

      <section className='w-full min-h-screen bg-gray-50 max-w-full h-full flex flex-col ju items-center'>
       <div className='flex items-center flex-col h-full mt-25 md:mt-15 rounded-lg bg-white shadow-lg justify-center'>


                       <div className='w-auto bg-white flex shadow-lg flex-col rounded-xl p-4 gap-1 mt-20 '>
                        <h1 className='text-lg font-bold mb-8'>send a via sms for fees.</h1>
                        <label htmlFor="" className='text-md mb-1'>enter number</label>
                        <input type="text"
                            required
                            value={number}
                            onChange={(e) => setNumber(e.target.value)}
                            className='border outline-none p-2 mb-2 '
                            placeholder='enter number '
                        />

                       
                       

                        <button
                         onClick={handleSendSMS}
                         
                            className=' w-full h-10 text-[13px] hover:bg-gray-600 font-semibold rounded-sm shadow-xl text-white flex items-center mt-5 justify-center mb-6 bg-gray-700'>
                           
                            SEND SMS</button>



                    </div>





        </div>
      </section>

    </div>
  );
}

export default SendSMS;
