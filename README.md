# ✦ Perth Numerology Website (Full-Stack)

A mystical Tarot Card Reading & Numerology web application with React.js frontend and Node.js + Express + MongoDB backend.

---

## 🚀 How to Run (Full-Stack)

You need **two terminals** — one for the backend, one for the frontend.

---

### Step 1 — Install Prerequisites

1. **Node.js** — https://nodejs.org (LTS version)
2. **MongoDB Community Server** — https://www.mongodb.com/try/download/community
   - Install and start MongoDB on your machine (default port 27017)
   - Or use a free cloud DB at https://cloud.mongodb.com (MongoDB Atlas)

---

### Step 2 — Open in VS Code

1. Open VS Code → **File → Open Folder** → select `perth-numerology`

---

### Step 3 — Setup & Run the Backend

Open Terminal 1 in VS Code (`Ctrl + `` ` ``):

```bash
cd backend
npm install
npm run dev
```

The backend will start at **http://localhost:5000**

> ⚙️ **MongoDB connection**: By default uses `mongodb://localhost:27017/perth_numerology`
> To use MongoDB Atlas (cloud), edit `backend/.env` and replace `MONGO_URI` with your Atlas connection string.

---

### Step 4 — Run the Frontend

Open Terminal 2 in VS Code (`Ctrl + Shift + `` ` ``):

```bash
npm install
npm start
```

The website opens at **http://localhost:3000**

---

## 📁 Project Structure

```
perth-numerology/
│
├── backend/                        ← Node.js + Express backend
│   ├── models/
│   │   ├── User.js                 ← MongoDB user schema
│   │   └── Reading.js              ← MongoDB reading history schema
│   ├── routes/
│   │   ├── auth.js                 ← Register / Login / Get profile
│   │   └── history.js              ← Save / Get / Delete readings
│   ├── middleware/
│   │   └── auth.js                 ← JWT authentication middleware
│   ├── server.js                   ← Express server entry point
│   ├── .env                        ← Environment variables (MONGO_URI, JWT_SECRET)
│   └── package.json
│
├── public/
│   └── index.html
│
├── src/
│   ├── components/
│   │   ├── Navbar.js
│   │   ├── Starfield.js
│   │   └── FloatingOrbs.js
│   │
│   ├── pages/
│   │   ├── Home.js
│   │   ├── Tarot.js
│   │   ├── Numerology.js
│   │   ├── Guidance.js
│   │   ├── History.js              ← Now with delete/clear via API
│   │   └── Auth.js                 ← Now calls real backend API
│   │
│   ├── utils/
│   │   ├── api.js                  ← All fetch calls to backend
│   │   ├── numerologyUtils.js
│   │   ├── speechUtils.js
│   │   └── translateUtils.js
│   │
│   ├── data/
│   │   ├── tarotData.js
│   │   └── numerologyData.js
│   │
│   ├── App.js                      ← Main app (uses JWT session)
│   ├── index.js
│   └── index.css
│
└── package.json
```

---

## 🔌 API Endpoints

| Method | Route | Description | Auth Required |
|--------|-------|-------------|---------------|
| POST | `/api/auth/register` | Create new account | No |
| POST | `/api/auth/login` | Login and get JWT | No |
| GET | `/api/auth/me` | Get logged-in user | Yes |
| GET | `/api/history` | Get all readings | Yes |
| POST | `/api/history` | Save a reading | Yes |
| DELETE | `/api/history/:id` | Delete one reading | Yes |
| DELETE | `/api/history` | Clear all readings | Yes |

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🃏 Tarot Reading | Draw 3 cards (Past/Present/Future) from the Major Arcana |
| 🔢 Numerology | Calculate Life Path, Destiny & Soul Urge numbers |
| 🔮 Live Guidance | Ask questions and get personalized cosmic messages |
| 📜 Reading History | Saved to MongoDB per user, with delete options |
| 🔐 Secure Login | JWT-based authentication with bcrypt password hashing |
| 🌟 Animated UI | Starfield, floating orbs, card flip animations |

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js, CSS3, Framer Motion |
| Backend | Node.js, Express.js |
| Database | MongoDB + Mongoose |
| Auth | JWT (jsonwebtoken) + bcryptjs |

---

## ⚙️ Environment Variables (`backend/.env`)

```
MONGO_URI=mongodb://localhost:27017/perth_numerology
JWT_SECRET=perth_numerology_super_secret_key_2026
PORT=5000
```

To use MongoDB Atlas: replace `MONGO_URI` with your Atlas connection string:
```
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/perth_numerology
```

---

Made with ✦ cosmic wisdom ✦ for educational purposes  
Students of DR MPS College of Business Studies
