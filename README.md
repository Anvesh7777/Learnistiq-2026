# 🎓 Learnistiq – MERN Stack Course Platform

Learnistiq is a modern and responsive **online course platform** built using the **MERN Stack**, **TailwindCSS**, and **Razorpay Payment Gateway**.  
Users can browse courses, register, and securely purchase them.  
Admin can add, edit, update, and manage courses.

---

## 🚀 Features

### ⭐ User Features
- User Signup & Login (JWT Auth)
- Browse all courses
- Buy courses using **Razorpay**
- View purchased courses
- Fully responsive UI (TailwindCSS)
- Secure payment verification

### ⭐ Admin Features
- Add new courses
- Edit courses
- Delete courses
- Manage prices
- Fetch all courses

---

## 🛠 Tech Stack

### **Frontend**
- React.js  
- Vite  
- TailwindCSS  
- Axios  
- React Router  

### **Backend**
- Node.js  
- Express.js  
- MongoDB + Mongoose  
- JWT Authentication  
- bcrypt  

### **Payment**
- Razorpay Checkout  
- Secure Payment Signature Verification  

---

## 📂 Folder Structure

```
Learnistiq/
│
├── client/               # React Frontend
│   ├── src/
│   ├── components/
│   └── pages/
│
├── server/               # Node + Express Backend
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   └── utils/
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 🔹 1. Clone the Repository
```sh
git clone https://github.com/Anvesh7777/Learnistiq.git
cd Learnistiq
```

---

## 🔹 2. Install Frontend Dependencies
```sh
cd client
npm install
```

Run frontend:
```sh
npm run dev
```

---

## 🔹 3. Install Backend Dependencies
```sh
cd ../server
npm install
```

Run backend:
```sh
npm start
```

---

## 🔐 Environment Variables (Backend)

Create a `.env` inside **server** folder:

```
MONGODB_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
RAZORPAY_KEY=your_key_id
RAZORPAY_SECRET=your_key_secret
FRONTEND_URL=http://localhost:5173
```

---

## 💳 Razorpay Payment Flow

```
User selects course →
Backend creates Razorpay order →
User completes payment →
Razorpay returns signature →
Backend verifies →
Course unlocked for user
```

---

## 🚀 Deployment

### 🌐 **Frontend (Vercel)**
