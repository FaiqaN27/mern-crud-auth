# Authify

**Authify** is a simple and secure full-stack authentication web application built with the **MERN stack** (MongoDB, Express.js, React, Node.js). It allows users to **register, log in, and manage their profiles** effortlessly, with modern security standards and a clean user interface.

---

## 🚀 Features

- User registration and login with secure authentication
- Login with **Google account** via Firebase
- Profile management (update username, email, password)
- Full-stack MERN architecture for scalable and responsive design
- Password hashing with bcrypt for security
- JWT-based authentication for session management
- Responsive frontend built with React and Tailwind CSS

---

## 📸 Screenshots

**Home Page**  
![Home Page](./frontend/public/screenshot1.PNG)

**SignIn Page**  
![SignIn Page](./frontend/public/screenshot2.PNG)

**SignUp Page**  
![SignUp Page](./frontend/public/screenshot3.PNG)

**Profile Page**  
![Profile Page](./frontend/public/screenshot4.PNG)

---

## 🛠 Tech Stack

- **Frontend:** React, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT, bcrypt, Firebase Authentication (Google Sign-In)

---

## ⚡ Getting Started

### 1. Clone the repository

- git clone https://github.com/your-username/Authify.git
- cd mern-crud-auth

### 2. Install dependencies

**Api:**

- cd api
- npm install

**Frontend:**

- cd ../frontend
- npm install

### 3. Set up environment variables

Create a `.env` file in the api folder:

PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

FIREBASE_API_KEY=your_firebase_api_key

_(You can get these values from your Firebase project settings.)_

### 4. Run the app locally

**Api:**

npm run dev

**Frontend:**

npm run dev

Your app should now be running at `http://localhost:5173` (or Vite default port).

---

## 🔑 Google Sign-In Setup

1. Go to [Firebase Console](https://console.firebase.google.com/) and create a project.
2. Enable **Google Authentication** in the Authentication section.
3. Copy Firebase config keys into your `.env` file.
4. The frontend automatically handles sign-in with Google using Firebase SDK.

---

## 📄 Folder Structure

mern-crud-auth/
│
├─ api/
│ ├─ models/
│ ├─ routes/
│ ├─ controllers/
│ └─ server.js
│
|
├─ frontend/ # React frontend
│ ├─ src/
│ │ ├─ components/
│ │ ├─ pages/
│ │ └─ App.jsx
│ └─ index.css
│
|
└─ README.md

---

This version highlights **Firebase + Google Sign-In**, and guides the user on **how to set it up**.
