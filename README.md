# 🛡️ Web3 Asset Vault

A professional-grade, full-stack **Asset Portfolio Manager** built with the **MERN** stack (MongoDB, Express, React, Node.js) and **Next.js 15**. This application features secure JWT-based authentication, Role-Based Access Control (RBAC), and a theme-adaptive UI.

## Note: The backend is hosted on Render's free tier. If the app hasn't been used recently, the first request may take 30–60 seconds to process while the server instances spin up.

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js** (v18.0 or higher)  
- **MongoDB** (Local instance or Atlas URI)

---

### 2. Installation

#### 🔧 Backend Setup
```bash
cd backend
npm install
# Ensure .env is configured with:
# PORT=5000
# MONGO_URI=your_mongodb_connection_string
# JWT_SECRET=your_secret_key
npm run dev
```

#### 💻 Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

---

## 📊 Database Schema

The system utilizes a relational-style document schema in MongoDB to handle user ownership and role hierarchy.

### 👤 User Entity

| Field         | Type     | Validation                   | Description                     |
|--------------|----------|------------------------------|---------------------------------|
| email        | String   | Unique, Required             | Primary identifier for auth     |
| password     | String   | Hashed (Bcrypt)              | Securely stored credential      |
| role         | String   | Enum: `user`, `admin`        | Controls access level           |
| walletAddress| String   | Optional                     | Web3 identifier (0x...)         |

---

### 💰 Asset Entity

| Field   | Type      | Description                                               |
|----------|----------|-----------------------------------------------------------|
| name     | String   | Name of the crypto asset (e.g., Ethereum)               |
| symbol   | String   | Ticker symbol (e.g., ETH)                               |
| balance  | Number   | Quantity held (supports decimals)                       |
| owner    | ObjectId | Ref: User. Links the asset to its owner                 |

---

## 🔌 API Documentation

**Base URL:**  
```
http://localhost:5000/api/v1
```

---

### 🔐 Authentication

- `POST /auth/register`  
  Registers a new user with `user` role.

- `POST /auth/login`  
  Validates credentials and returns JWT token + user data.

---

### 📁 Asset Management (Protected Routes)

- `GET /assets`  
  - Users: Fetch their own assets  
  - Admins: Fetch all assets  

- `POST /assets`  
  Creates a new asset linked to the authenticated user.

- `DELETE /assets/:id`  
  Removes an asset (validated against owner ID or Admin role).

---

## 📈 Scalability & Architecture

This project is built with a focus on future growth and production-readiness:

### 🧾 Stateless JWT Authentication
Session data is stored in tokens instead of server memory.  
This allows horizontal scaling across multiple server instances without session loss.

### 🏗️ Modular Architecture
Backend follows the **Controller → Service → Repository** pattern.  
Benefits:
- Clear separation of concerns  
- Easier unit testing  
- Database layer can be swapped (e.g., PostgreSQL) with minimal impact  

### 🎨 Tailwind v4 Integration
- CSS-first configuration  
- Lightweight & performant  
- Native dark/light mode support  

### 🛡️ Input Validation
Backend middleware ensures:
- Data integrity  
- Protection against malicious injections  
- Prevention of malformed JSON payloads  

---

## 🔑 Demo Credentials

### 👑 Admin Access
- **Email:** admin@web3.com  
- **Password:** admin123  
- **Capability:** View and delete assets from all users  

### 👤 Regular User
- Use the **Register** page to create a unique account.  
- **Capability:** Manage only personal portfolio assets.  

---

## ✨ Key Features

- 🔐 **Authentication** – Secure JWT-based login/register flow  
- 🌙 **Dark Mode** – Theme persistence using `next-themes` + Tailwind v4  
- 🔄 **CRUD Operations** – Create, read, and delete assets  
- 📱 **Responsive UI** – Optimized for mobile, tablet, and desktop  
- 🔒 **Security** – Bcrypt password hashing + JWT-protected middleware  

---

## 🧠 Tech Stack

**Frontend**
- Next.js 15  
- React  
- Tailwind CSS v4  
- next-themes  

**Backend**
- Node.js  
- Express.js  
- MongoDB  
- Mongoose  
- JWT  
- Bcrypt  

---

## 📌 Future Improvements

- Asset price integration (CoinGecko API)
- Portfolio analytics dashboard
- Asset update functionality
- Web3 wallet connection (MetaMask)
- Two-factor authentication (2FA)
- Deployment with Docker & CI/CD pipeline

---

## 📜 License

This project is intended for educational and portfolio purposes.

---

**Built using MERN + Next.js 15**