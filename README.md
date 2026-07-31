# 🍽️ Smart Canteen Queue & Pre-Order System

<div align="center">

![License](https://img.shields.io/badge/License-MIT-green.svg)
![React](https://img.shields.io/badge/React-19-blue)
![Next.js](https://img.shields.io/badge/Next.js-15-black)
![Node.js](https://img.shields.io/badge/Node.js-Express-green)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-brightgreen)
![Socket.IO](https://img.shields.io/badge/Socket.IO-Realtime-black)
![Gemini AI](https://img.shields.io/badge/Gemini-AI-blueviolet)
![Hackathon](https://img.shields.io/badge/Hackathon-Ready-orange)

### 🚀 AI-Powered Smart Canteen Queue & Pre-Order Management System

**Skip the Queue. Enjoy Your Meal.**

*A next-generation intelligent canteen management platform designed to eliminate long queues, optimize food preparation, provide AI-powered wait-time prediction, and deliver a seamless dining experience for students and vendors.*

</div>

---

## 📸 Preview

> *(Add your screenshots here)*

| Landing Page | Student Dashboard |
| ------------ | ----------------- |
| Screenshot   | Screenshot        |

| Vendor Dashboard | AI Analytics |
| ---------------- | ------------ |
| Screenshot       | Screenshot   |

---

## 📖 Table of Contents

- [About](#-about)
- [Problem Statement](#-problem-statement)
- [Solution](#-solution)
- [Key Features](#-key-features)
- [AI Features](#-ai-features)
- [Dashboard Features](#-dashboard-features)
- [System Architecture](#-system-architecture)
- [Tech Stack](#-tech-stack)
- [Folder Structure](#-folder-structure)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [Running Locally](#-running)
- [API Modules](#-api-modules)
- [Future Scope](#-future-scope)
- [Achievements](#-achievements)
- [Contributors](#-contributors)
- [License](#-license)

---

## 📌 About

Managing campus canteens during peak hours is challenging due to long queues, overcrowding, inefficient order handling, and uncertainty about food preparation times.

The **Smart Canteen Queue & Pre-Order System** leverages Artificial Intelligence, Real-Time Communication, and Predictive Analytics to create a faster, smarter, and more organized food ordering experience.

The platform enables students to pre-order meals, receive digital queue tokens, monitor live order status, and collect food without waiting in long lines. Vendors receive intelligent dashboards for order management, inventory monitoring, and demand forecasting.

---

## 🚨 Problem Statement

During lunch hours:

- Students spend excessive time waiting in queues.
- Vendors become overwhelmed with simultaneous orders.
- Food preparation lacks organization.
- Students have no idea when their food will be ready.
- Peak-hour congestion reduces overall efficiency.

---

## 💡 Solution

The Smart Canteen Platform provides:

- ✅ Online Food Ordering
- ✅ AI Wait-Time Prediction
- ✅ Digital Queue Management
- ✅ Smart Pickup Slots
- ✅ Live Queue Tracking
- ✅ QR Code Pickup
- ✅ Vendor Dashboard
- ✅ Admin Analytics
- ✅ Inventory Management
- ✅ AI Demand Forecasting

---

## ✨ Key Features

### 👨‍🎓 Student Module

- Secure Login
- Browse Menu
- Smart Search
- Categories
- Food Recommendations
- Add to Cart
- Digital Payment
- Pickup Slot Booking
- Digital Queue Token
- Live Queue Tracking
- Order History
- Notifications
- Reward Points
- QR Pickup
- Feedback System

### 👨‍🍳 Vendor Module

- Order Dashboard
- Accept Orders
- Reject Orders
- Update Order Status
- Live Kitchen Queue
- Inventory Tracking
- Revenue Dashboard
- Popular Items
- Peak Hour Monitoring
- Customer Ratings

### 🛡️ Admin Module

- User Management
- Vendor Management
- Analytics Dashboard
- Revenue Reports
- Complaint Management
- Inventory Monitoring
- Food Management
- Role-Based Access

---

## 🤖 AI Features

**AI Wait Time Prediction** — predicts waiting time using queue length, preparation time, historical data, number of chefs, and peak hour.

**AI Food Recommendation** — suggests food based on previous orders, popular foods, similar students, weather, and time of day.

**Peak Hour Prediction** — predicts lunch rush, evening rush, and weekend demand.

**Demand Forecasting** — estimates daily orders, required ingredients, and staff requirement.

**AI Chat Assistant** — students can ask things like:
- "What is my token number?"
- "When will my food be ready?"
- "What's the fastest meal?"
- "Which counter should I visit?"

---

## 📊 Dashboard Features

**Student Dashboard**
- Live Token
- Current Queue
- AI Wait Time
- Previous Orders
- Reward Points
- Favorite Foods
- Notifications

**Vendor Dashboard**
- Pending Orders
- Preparing Orders
- Ready Orders
- Revenue
- Kitchen Status
- Inventory
- Analytics

**Admin Dashboard**
- Daily Revenue
- Total Orders
- Student Count
- Peak Hours
- Complaint Statistics
- Food Analytics

---

## 🧠 System Architecture

```text
Student App
      │
      ▼
Next.js Frontend
      │
 REST API + Socket.IO
      │
Node.js + Express
      │
────────────────────────────
│            │             │
MongoDB   Gemini AI     Firebase
│            │             │
Inventory   Prediction   Authentication
│
Analytics
```

---

## 🛠 Tech Stack

**Languages**
TypeScript · JavaScript · HTML5 · CSS3

**Frontend**
Next.js · React.js · Tailwind CSS · Shadcn UI · Framer Motion · React Hook Form · Axios

**Backend**
Node.js · Express.js · Socket.IO · JWT · Firebase Authentication · REST API

**Database**
MongoDB Atlas · Redis

**Authentication**
Firebase Authentication · JWT

**Real-Time**
Socket.IO

**Charts**
Recharts

**Deployment**
Vercel · Render · MongoDB Atlas

---

## 📂 Folder Structure

```text
smart-canteen/
│
├── client/
│   ├── app/
│   ├── components/
│   ├── hooks/
│   ├── lib/
│   ├── context/
│   ├── services/
│   ├── assets/
│   └── styles/
│
├── server/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── models/
│   ├── services/
│   ├── sockets/
│   ├── config/
│   └── utils/
│
├── ai/
│   ├── wait_prediction/
│   ├── recommendation/
│   ├── forecasting/
│   └── chatbot/
│
├── docs/
├── public/
└── README.md
```

---

## ⚙ Installation

Clone the repository:

```bash
git clone https://github.com/yourusername/smart-canteen.git
```

Go inside the project:

```bash
cd smart-canteen
```

Install frontend dependencies:

```bash
cd client
npm install
```

Install backend dependencies:

```bash
cd ../server
npm install
```

---

## 🔑 Environment Variables

Create a `.env` file inside `server/` with the following keys:

```env
MONGODB_URI=

JWT_SECRET=

FIREBASE_API_KEY=

FIREBASE_AUTH_DOMAIN=

GOOGLE_CLIENT_ID=

GEMINI_API_KEY=

RAZORPAY_KEY_ID=

RAZORPAY_SECRET=

SOCKET_PORT=
```

---

## ▶ Running

**Frontend**

```bash
npm run dev
```

**Backend**

```bash
npm run server
```

---

## 📡 API Modules

**Authentication**
- Login
- Register
- Logout

**Food**
- Get Menu
- Add Food
- Update Food
- Delete Food

**Orders**
- Create Order
- Update Status
- Cancel Order
- Get Order History

**Queue**
- Generate Token
- Live Queue
- AI Wait Prediction

**Vendor**
- Dashboard
- Revenue
- Inventory

---

## 📈 Future Scope

- Voice Ordering
- Face Recognition Pickup
- Blockchain Loyalty Points
- Indoor Navigation
- Smart Cafeteria Robots
- IoT Kitchen Monitoring
- Dynamic Pricing
- AI Nutrition Advisor
- Multi-Campus Support

---

## 🏆 Achievements

✔ AI Powered
✔ Real-Time Queue
✔ Responsive Design
✔ Scalable Architecture
✔ Cloud Ready
✔ Hackathon Ready

---

## 🤝 Contributors

| Name         | Role                    |
| ------------ | ----------------------- |
| Harsh Pal    | Full Stack Developer    |
| Team Members | AI • Backend • Frontend |

---

## 📜 License

This project is licensed under the **MIT License**.

---

<div align="center">

### 🌟 If you like this project, don't forget to give it a ⭐ on GitHub!

**Built with ❤️, AI, and Coffee ☕**

</div>
