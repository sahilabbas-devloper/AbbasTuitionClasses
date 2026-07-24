import { useState } from "react";
import { Phone, MessageSquareText, Send } from "lucide-react";

function SendSMS() {
  const [number, setNumber] = useState("");

  const message = `📢 Abbas tuition classes

   Hello Dear Parent 👋
     Your child's fees is pending.
  Please pay your fees on time.

  – Abbas Institute Team
  🌐 www.Abbastuitionclasses.in`;

  const handleSendSMS = () => {
    window.location.href = `sms:${number}?body=${encodeURIComponent(message)}`;
    setNumber('');
  };

  return (
    <div className='w-full min-h-screen bg-slate-100'>

      {/* Top bar */}
      <div className='w-full bg-white border-b border-slate-200'>
        <div className='max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-3'>
          <img className='w-9 h-9 rounded-full object-cover' src="logo.png" alt="logo" />
          <div>
            <p className='text-sm font-semibold text-slate-800 leading-tight'>Admissions</p>
            <p className='text-xs text-slate-400 leading-tight'>Fee reminder via SMS</p>
          </div>
        </div>
      </div>

      <section className='max-w-md mx-auto px-4 sm:px-6 py-10 sm:py-14 flex flex-col items-center'>

        <div className='w-full bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-7'>

          <div className='flex items-center gap-2 mb-1'>
            <div className='w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0'>
              <MessageSquareText size={16} className='text-blue-600' />
            </div>
            <h1 className='text-base font-semibold text-slate-800'>Send fee reminder</h1>
          </div>
          <p className='text-xs text-slate-400 mb-6 pl-10'>Sends a pre-written SMS to the parent's number.</p>

          <div className='flex flex-col gap-1.5'>
            <label className='text-sm font-medium text-slate-700 flex items-center gap-1.5'>
              <Phone size={15} className='text-slate-400' /> Parent's mobile number
            </label>
            <input type="tel"
              required
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              className='border border-slate-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-slate-800/10 focus:border-slate-500 transition'
              placeholder='Enter mobile number'
            />
          </div>

          <div className='mt-5'>
            <p className='text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2'>Message preview</p>
            <div className='bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-3 text-xs text-slate-600 whitespace-pre-line leading-relaxed'>
              {message}
            </div>
          </div>

          <button
            onClick={handleSendSMS}
            disabled={!number.trim()}
            className='w-full mt-6 px-6 py-2.5 rounded-lg text-sm font-semibold text-white bg-slate-800 hover:bg-slate-700 active:scale-[0.98] transition disabled:opacity-60 flex items-center justify-center gap-2'>
            <Send size={16} />
            Send SMS
          </button>

        </div>

      </section>
    </div>
  );
}

export default SendSMS;