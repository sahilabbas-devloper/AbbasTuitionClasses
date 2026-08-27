import React from 'react';
import { 
  FaInstagram, 
  FaFacebookF, 
  FaWhatsapp, 
  FaYoutube, 
  FaHeart, 
  FaPhoneAlt, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaGraduationCap, 
  FaBookOpen, 
  FaCheckCircle 
} from 'react-icons/fa';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-gray-50 text-black font-sans border-t border-gray-300">
      
      {/* 1. TOP HELP & ADMISSION BANNER STRIP */}
      <div className="bg-gray-100 border-b border-gray-300 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-900 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
              <FaGraduationCap size={20} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-black">New Admissions Open for Session {currentYear}–{currentYear + 1}</h4>
              <p className="text-xs text-gray-600">Get free counseling & expert guidance for board exams.</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <a
              href="tel:+917985106600"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-gray-300 text-black text-xs font-bold hover:bg-gray-50 transition shadow-sm"
            >
              <FaPhoneAlt className="text-blue-600" />
              <span>Call Helpline: +91 79851 06600</span>
            </a>
            <a
              href="https://wa.me/917985106600?text=Hello%20ATC,%20I%20want%20admission%20details"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-sm"
            >
              <FaWhatsapp size={14} />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. MAIN MEGA FOOTER GRID */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">
          
          {/* Column 1: Brand & Contact Info (Spans 2 cols on Large screens) */}
          <div className="sm:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-blue-900 text-white flex items-center justify-center font-black text-lg">
                ATC
              </div>
              <h2 className="text-lg font-black text-black tracking-tight">
                Abbas Tuition Classes
              </h2>
            </div>

            <p className="text-xs text-gray-600 leading-relaxed">
              India's dedicated academic foundation institute providing quality classroom coaching, personalized doubt sessions, and proven board results.
            </p>

            {/* Direct Contact Details */}
            <div className="space-y-2 pt-1 text-xs text-gray-700">
              <div className="flex items-start gap-2.5">
                <FaMapMarkerAlt className="text-blue-600 shrink-0 mt-0.5" />
                <span>Main Campus, Near akber ka imam bada pandariba road jaunpur, Uttar Pradesh, India</span>
              </div>
              <div className="flex items-center gap-2.5">
                <FaPhoneAlt className="text-blue-600 shrink-0" />
                <a href="tel:+917985106600" className="hover:text-black font-medium">+91 79851 06600</a>
              </div>
              <div className="flex items-center gap-2.5">
                <FaEnvelope className="text-blue-600 shrink-0" />
                <span className="font-medium">abbastutitionclasses.netlify.app</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="pt-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500 block mb-2">
                Connect With Us
              </span>
              <div className="flex items-center gap-2">
                <a
                  href="https://www.instagram.com/abbasKhanmoazzam"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-white hover:bg-pink-600 text-gray-700 hover:text-white flex items-center justify-center transition border border-gray-300 shadow-sm"
                  aria-label="Instagram"
                >
                  <FaInstagram size={14} />
                </a>
                <a
                  href="https://www.facebook.com/AbbasKhanMoazzam"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-white hover:bg-blue-600 text-gray-700 hover:text-white flex items-center justify-center transition border border-gray-300 shadow-sm"
                  aria-label="Facebook"
                >
                  <FaFacebookF size={13} />
                </a>
                <a
                  href="https://www.youtube.com/@alexanderabbasKhan3956"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-white hover:bg-red-600 text-gray-700 hover:text-white flex items-center justify-center transition border border-gray-300 shadow-sm"
                  aria-label="YouTube"
                >
                  <FaYoutube size={14} />
                </a>
                <a
                  href="https://wa.me/917985106600"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-white hover:bg-emerald-600 text-gray-700 hover:text-white flex items-center justify-center transition border border-gray-300 shadow-sm"
                  aria-label="WhatsApp"
                >
                  <FaWhatsapp size={14} />
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Batches & Programs */}
          <div>
            <h3 className="text-xs font-bold text-black uppercase tracking-wider mb-3.5 flex items-center gap-1.5">
              <FaBookOpen className="text-blue-600 text-[10px]" />
              Academic Batches
            </h3>
            <ul className="space-y-2 text-xs text-gray-600">
              <li><span className="hover:text-black cursor-pointer transition">Class 9th Foundation</span></li>
              <li><span className="hover:text-black cursor-pointer transition">Class 10th Board Booster</span></li>
              <li><span className="hover:text-black cursor-pointer transition">Class 11th Science Batch</span></li>
              <li><span className="hover:text-black cursor-pointer transition">Class 12th Board Target</span></li>
              <li><span className="hover:text-black cursor-pointer transition">Crash Course {currentYear}</span></li>
              <li><span className="hover:text-black cursor-pointer transition">Doubt Special Batch</span></li>
            </ul>
          </div>

          {/* Column 3: Subjects Covered */}
          <div>
            <h3 className="text-xs font-bold text-black uppercase tracking-wider mb-3.5">
              Key Subjects
            </h3>
            <ul className="space-y-2 text-xs text-gray-600">
              <li><span className="hover:text-black cursor-pointer transition">Mathematics (9th–12th)</span></li>
              <li><span className="hover:text-black cursor-pointer transition">Physics Concepts & Labs</span></li>
              <li><span className="hover:text-black cursor-pointer transition">Chemistry Reactions</span></li>
              <li><span className="hover:text-black cursor-pointer transition">Biology & Diagrams</span></li>
              <li><span className="hover:text-black cursor-pointer transition">English & Grammar</span></li>
              <li><span className="hover:text-black cursor-pointer transition">PYQ Practice Sets</span></li>
            </ul>
          </div>

          {/* Column 4: Free Resources / Student Zone */}
          <div>
            <h3 className="text-xs font-bold text-black uppercase tracking-wider mb-3.5">
              Study Resources
            </h3>
            <ul className="space-y-2 text-xs text-gray-600">
              <li><span className="hover:text-black cursor-pointer transition">Chapter-wise PDF Notes</span></li>
              <li><span className="hover:text-black cursor-pointer transition">Weekly Mock Test Series</span></li>
              <li><span className="hover:text-black cursor-pointer transition">Daily Practice Papers (DPP)</span></li>
              <li><span className="hover:text-black cursor-pointer transition">Important Formula Sheets</span></li>
              <li><span className="hover:text-black cursor-pointer transition">Previous 5-Year Papers</span></li>
              <li><span className="hover:text-black cursor-pointer transition">Topper Answer Sheets</span></li>
            </ul>
          </div>

          {/* Column 5: Center & Support */}
          <div>
            <h3 className="text-xs font-bold text-black uppercase tracking-wider mb-3.5">
              Admissions & Help
            </h3>
            <ul className="space-y-2 text-xs text-gray-600">
              <li><span className="hover:text-black cursor-pointer transition">Offline Campus Visit</span></li>
              <li><span className="hover:text-black cursor-pointer transition">Scholarship Test (SAT)</span></li>
              <li><span className="hover:text-black cursor-pointer transition">Fee Structure & Plans</span></li>
              <li><span className="hover:text-black cursor-pointer transition">Batch Timetable</span></li>
              <li><span className="hover:text-black cursor-pointer transition">Parent-Teacher Meeting</span></li>
              <li><span className="hover:text-black cursor-pointer transition">FAQ & Help Desk</span></li>
            </ul>
          </div>

        </div>

        {/* 3. TRUST STATS STRIP (PW Style Key Highlights) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-y border-gray-300 my-8 bg-gray-50/50 rounded-2xl p-4">
          <div className="flex items-center gap-3">
            <FaCheckCircle className="text-emerald-600 text-lg shrink-0" />
            <div>
              <p className="text-sm font-black text-black">100% Result</p>
              <p className="text-[11px] text-gray-500">Board Exam Focused</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <FaCheckCircle className="text-emerald-600 text-lg shrink-0" />
            <div>
              <p className="text-sm font-black text-black">Expert Faculty</p>
              <p className="text-[11px] text-gray-500">Experienced Teachers</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <FaCheckCircle className="text-emerald-600 text-lg shrink-0" />
            <div>
              <p className="text-sm font-black text-black">Doubt Support</p>
              <p className="text-[11px] text-gray-500">1-on-1 Guidance</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <FaCheckCircle className="text-emerald-600 text-lg shrink-0" />
            <div>
              <p className="text-sm font-black text-black">Smart Classes</p>
              <p className="text-[11px] text-gray-500">Modern Study Setup</p>
            </div>
          </div>
        </div>

        {/* 4. POPULAR SEARCHES & TAGS (PW SEO Style) */}
        <div className="mb-8 text-[11px] text-gray-500 leading-relaxed">
          <span className="font-bold text-black uppercase tracking-wider block mb-1">
            Popular Programs & Searches:
          </span>
          <p>
            Best Tuition Classes in Uttar Pradesh <span className="mx-1.5">•</span> 
            Class 10th Science & Math Coaching <span className="mx-1.5">•</span> 
            Class 12th Board Target Batch <span className="mx-1.5">•</span> 
            Physics Wallah Style Concept Classes <span className="mx-1.5">•</span> 
            Offline Coaching Center <span className="mx-1.5">•</span> 
            Board Exam Previous Year Questions <span className="mx-1.5">•</span> 
            Weekly Mock Test Series <span className="mx-1.5">•</span> 
            V.B.S.P. University Affiliated Mentors <span className="mx-1.5">•</span> 
            M.H. College Academic Faculty
          </p>
        </div>

        {/* 5. COPYRIGHT & DISCLAIMER BOTTOM BAR */}
        <div className="pt-6 border-t border-gray-300 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <p>
            © {currentYear} <strong className="text-gray-800">Abbas Tuition Classes (ATC)</strong>. All rights reserved.
          </p>
          <p className="flex items-center gap-1 text-gray-600">
            Dedicated to Student Excellence & Growth. Built with <FaHeart className="text-red-500 inline" size={11} />
          </p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;