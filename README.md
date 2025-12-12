<h1>🚀 Jobby – Full Stack Web Application</h1>

<p>A complete end-to-end job portal system built with a modern full-stack architecture, consisting of:</p>

<p>• User Web App</p>
<p>• Admin / Recruiter Panel</p>
<p>• Backend REST API</p>

<p>The platform allows job seekers to explore jobs, apply using detailed profiles & resumes, and recruiters to manage job listings and applicants with powerful filters.</p>

<h2>📂 Project Structure</h2>

<pre>
<code>
Jobby-Full-Stack-Web-App/
│
├── user/                 # User-facing React application
│
├── admin/                # Recruiter/Admin React application
│
├── backend/              # Node.js + Express REST API server
│
└── README.md
</code>
</pre>

<h2>🎯 Core Features</h2>

<h3>👨‍💻 User (Job Seeker) Features</h3>

<h4>🔐 1. Gmail-Based OTP Authentication</h4>
<p>User receives OTP via Gmail.</p>
<p>Only verified users can sign in.</p>
<p>OTP implemented via backend email service.</p>

<h4>🔍 2. Advanced Job Filtering & Search</h4>
<p>Available on the Job Listings Page:</p>
<p>• Keyword-based search</p>
<p>• Job type filtering</p>
<p>• Salary-based filtering</p>

<h4>📝 3. Profile Completion Requirement</h4>
<p>Users must complete their profile form to apply.</p>
<p>Mandatory resume upload via Cloudinary SDK.</p>

<h4>📄 4. Resume Upload (Cloudinary Integration)</h4>
<p>Resume stored in Cloudinary.</p>
<p>Only verified users with uploaded resumes can apply.</p>

<h4>📊 5. Jobs Board Page</h4>
<p>Allows filtering applications based on:</p>
<p>• Applied</p>
<p>• Accepted</p>
<p>• Rejected</p>

<h3>🛠️ Admin (Recruiter) Features</h3>

<h4>🆔 1. Admin Verification</h4>
<p>Recruiter is verified only after completing profile details.</p>

<h4>📌 2. Job Management</h4>
<p>• Add Jobs</p>
<p>• Update Jobs</p>
<p>• Delete Jobs</p>
<p>Actions allowed only if the recruiter is verified.</p>

<h4>👀 3. Applicants Management</h4>
<p>• View all applicants for each job</p>
<p>• Open applicant resume via Cloudinary link</p>
<p>• Accept or reject applicants</p>

<h4>🔎 4. Enhanced Searching</h4>
<p>• Search & filter on Jobs Page</p>
<p>• Search & filter on Applicants Page</p>

<h2>🧭 Pages Overview</h2>

<h3>🧑‍💼 User Pages</h3>

<table>
<tr><th>Page</th><th>Description</th></tr>
<tr><td>Landing Page</td><td>Intro screen for new visitors</td></tr>
<tr><td>Sign In Page</td><td>OTP-based login</td></tr>
<tr><td>Sign Up Page</td><td>User registration + OTP</td></tr>
<tr><td>Home Page</td><td>Main dashboard with job categories</td></tr>
<tr><td>Job Listings Page</td><td>Search + job filters</td></tr>
<tr><td>Job Details Page</td><td>Full job description + Apply</td></tr>
<tr><td>Profile Section Page</td><td>User details + Resume upload</td></tr>
<tr><td>Jobs Board Page</td><td>Track Applied, Accepted, Rejected jobs</td></tr>
</table>

<h3>👑 Admin Pages</h3>

<table>
<tr><th>Page</th><th>Description</th></tr>
<tr><td>Jobs Page</td><td>Create, update, delete jobs</td></tr>
<tr><td>Applicants Page</td><td>View, accept, reject applicants</td></tr>
<tr><td>Profile Page</td><td>Admin profile verification</td></tr>
</table>

<h2>🧰 Tech Stack</h2>

<h3>🌐 Frontend</h3>
<p>• React.js + Vite</p>
<p>• React Router</p>
<p>• Context API / Custom Hooks</p>
<p>• Cloudinary Upload Widget</p>
<p>• Tailwind / CSS</p>

<h3>⚙️ Backend</h3>
<p>• Node.js</p>
<p>• Express.js</p>
<p>• MongoDB (Mongoose)</p>
<p>• JWT Authentication</p>
<p>• Nodemailer (Gmail SMTP for OTP)</p>

<h3>☁️ Cloud Services</h3>
<p>• Cloudinary for resume storage</p>
<p>• Gmail SMTP for OTP sending</p>

<h2>🔧 Environment Variables</h2>

<h3>📌 Backend <code>.env</code></h3>
<pre>
<code>
MONGODB_URI=
JWT_SECRET=
PORT=
FRONTEND_PORT=
EMAIL_PASSWORD=
EMAIL=
CLOUD_NAME=
CLOUD_API_SECRET=
CLOUD_API_KEY=
</code>
</pre>

<h3>📌 User App <code>.env</code></h3>
<pre>
<code>
VITE_REACT_APP_BASE_URL=http://localhost:8000/
VITE_REACT_APP_ADMIN_URL=http://localhost:5173/
</code>
</pre>

<h3>📌 Admin App <code>.env</code></h3>
<pre>
<code>
VITE_REACT_APP_BASE_URL=http://localhost:8000/
VITE_REACT_APP_FRONTEND_URL=http://localhost:5174/
</code>
</pre>

<h2>⚙️ Installation & Setup</h2>

<h3>1️⃣ Clone the Repository</h3>
<pre>
<code>
git clone https://github.com/Aditya-799/Jobby-Full-Stack-Web-App
cd Jobby-Full-Stack-Web-App
</code>
</pre>

<h3>🖥️ Backend Setup</h3>
<pre>
<code>
cd backend
npm install
npm start
</code>
</pre>

<p>Backend will run on:</p>
<p><code>http://localhost:8000</code></p>

<h3>👨‍💻 User Frontend Setup</h3>
<pre>
<code>
cd user
npm install
npm run dev
</code>
</pre>

<p>Runs on:</p>
<p><code>http://localhost:5174/</code></p>

<h3>👑 Admin Frontend Setup</h3>
<pre>
<code>
cd admin
npm install
npm run dev
</code>
</pre>

<p>Runs on:</p>
<p><code>http://localhost:5173/</code></p>
