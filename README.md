# TrueTravelMoments

**TrueTravelMoments** is a full-stack React + Node.js web app for sharing and exploring travel stories with secure JWT authentication, email OTP verification, and interactive engagement features. It allows users to post stories, browse an aggregated feed, and connect through likes — all built on a secure and responsive architecture.

---

## Tech Stack

- **Frontend Framework**: [React.js](https://react.dev/)
- **Styling**: [Bootstrap 5](https://getbootstrap.com/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Routing**: [React Router](https://reactrouter.com/)
- **Backend Framework**: [Node.js](https://nodejs.org/) + [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/)

---

## Features

- **Secure Full-Stack Architecture**: Developed a full-stack application using React, Redux, Express, and MongoDB for robust data handling and scalability.  
- **JWT Authentication**: Implemented JWT-based authentication with HttpOnly cookies and protected API routes for secure user sessions.  
- **Email OTP Verification**: Configured Gmail SMTP for OTP verification to ensure secure user registration and recovery.  
- **RESTful API Design**: Built modular, RESTful backend routes with Express.js for clean data flow and easy integration.  
- **Interactive Story Feed**: Created story creation, aggregation, and user-linked feeds with like/unlike interactions.  
- **Session Management**: Integrated session restoration, error handling, and consistent login states using Redux and Axios interceptors.  
- **CORS & Cookie Security**: Configured environment-aware CORS and secure cookies for cross-origin communication between client and server.  
- **Responsive UI**: Designed a clean, mobile-friendly interface using React, Bootstrap, and modern UI patterns.  

---

## Installation

```bash
# 1️⃣ Clone the repository
git clone https://github.com/your-username/truetravelmoments.git
cd truetravelmoments

# 2️⃣ Install and run the server
cd server
npm install
cp .env.example .env   # Add environment variables (Mongo URI, JWT secret, Gmail SMTP credentials, etc.)
npm run dev

# 3️⃣ Install and run the client
cd ../client
npm install
npm start

# 4️⃣ Access the app
# Open your browser at http://localhost:3000
