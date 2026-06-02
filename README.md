

A real client project — a full-stack Progressive Web App for managing a tuition center's students, courses, announcements, and ID cards.

🌐 Live Site: abbastuitionclasses.netlify.app
📱 Install as App: Click "Add to Home Screen" on mobile
📁 GitHub: github.com/sahil/abbas-tuition

⚠️ Note: This is a live production site for a real client. Admin credentials not included.


✨ Features

👨‍🎓 Student Management — Add, edit, delete student records (CRUD)
🪪 ID Card Generation — Auto-generate printable student ID cards
📢 Announcements — Admin can post notices for students/parents
📚 Course Management — Manage subjects, batches, and schedules
🔐 Cookie-based Auth — Secure admin login with HTTP-only cookies
📱 PWA Support — Installable on Android/iOS for easy daily use


🛠️ Tech Stack
LayerTechnologyFrontendReact.js, Tailwind CSSBackendNode.js, Express.jsDatabaseMongoDB, MongooseAuthJWT, HTTP-only CookiesPWAService Worker, Web App ManifestDeploymentNetlify (Frontend), Render (Backend)

📋 Project Context
This was delivered as a real client project for Abbas Jafer's tuition center in Lucknow. Built and deployed a production-ready application used by real students and staff. Includes proper admin dashboard, data persistence, and mobile-first design.

🚀 Getting Started (Dev Setup)
Installation
bashgit clone https://github.com/sahil/abbas-tuition.git
cd abbas-tuition

# Backend
cd backend && npm install

# Frontend
cd ../frontend && npm install
Environment Variables
envPORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
Run Locally
bash# Backend
cd backend && npm run dev

# Frontend
cd frontend && npm run dev

📱 PWA Installation
Android: Open in Chrome → tap menu → "Add to Home Screen"
iOS: Open in Safari → tap Share → "Add to Home Screen"

🧠 Key Learnings

Delivered a real production project for an actual client
Implemented ID card generation with dynamic data rendering and print CSS
Built PWA with Service Worker for reliable mobile performance
Cookie-based auth for secure admin panel without exposing tokens


👨‍💻 Developer
Sahil — Fresher MERN Stack Developer
📧 Sa9300421@gmail.com | 📱 +91 7080254021
