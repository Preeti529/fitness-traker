itTrack — Full-Stack Fitness Tracker 🏋️
A fitness and nutrition tracker with AI-powered food photo logging, built with React, TypeScript, and Strapi.
fitTrack React TypeScript Tailwind Strapi

🌐 Live Demo
View Live Website →

📸 Features
✅ AI Food Photo Analysis — snap a meal photo, Gemini auto-fills name and calories
✅ Manual food & activity logging
✅ Dashboard — calories, BMI, weekly progress
✅ Personalized onboarding — sets daily targets from age, weight, goal
✅ Auth — signup/login via Strapi
✅ Dark / Light mode
✅ Responsive — sidebar on desktop, bottom nav on mobile

🛠️ Tech Stack
Frontend: React, TypeScript, Tailwind CSS, Vite
Backend: Strapi v5 (Node.js/TypeScript)
AI: Google Gemini API
Database: SQLite (dev)

🚀 How to Run Locally
git clone https://github.com/Preeti529/fittrack.git
cd fittrack

cd server
npm install
cp .env.example .env      # add GEMINI_API_KEY, JWT_SECRET, etc.
npm run develop           # http://localhost:1337

cd ../client
npm install
npm run dev                # http://localhost:5173

Requires Node.js 18+ and a free Gemini API key.

👩‍💻 Built By
Preeti — Full-Stack Developer
GitHub · LinkedIn
