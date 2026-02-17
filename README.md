# FinTrack 💰

FinTrack is a modern **Personal Finance Tracker Web App** built as part of the Frontend Developer Internship assignment.

It includes:

- JWT Authentication (Register/Login/Logout)
- Protected Dashboard
- Profile Update (Username + Password)
- Transactions CRUD (Income/Expense)
- Search + Filter UI (by type, category, description)
- Summary Cards (Income, Expense, Balance)
- Responsive UI with TailwindCSS v4

---

## 🚀 Tech Stack

### Frontend
- React.js + Vite
- TailwindCSS v4
- React Router DOM
- Axios
- Lucide Icons

### Backend
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- bcrypt Password Hashing

---

## 📂 Project Structure

```
FinTrack/
  backend/
  frontend/
  README.md
  FinTrack.postman_collection.json
  API_DOCS.md
```

---

## ⚙️ Setup Instructions

### 1. Clone Repository
```bash
git clone <your-repo-link>
cd FinTrack
```

---

## 🔥 Backend Setup

```bash
cd backend
npm install
npm run dev
```

Create a `.env` file:

```
PORT=3000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
```

---

## 🌐 Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

Backend runs at:

```
http://localhost:5000
```

---

## 🔑 API Endpoints

### Auth Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register user |
| POST | /api/auth/login | Login user |
| POST | /api/auth/logout | Logout user |
| GET  | /api/auth/profile | Get profile |
| PATCH| /api/user/update-profile | Update profile (username/password) |

### Transaction Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST   | /api/transactions | Create transaction |
| GET    | /api/transactions | Get all transactions |
| PATCH  | /api/transactions/:id | Update transaction |
| DELETE | /api/transactions/:id | Delete transaction |

---

## 📌 Postman Collection / API Docs

A Postman API collection is included:

✅ `FinTrack.postman_collection.json`

It contains:

- Register/Login requests
- Profile fetch & update
- Full Transactions CRUD

Import it into Postman:

Postman → Import → Select the JSON file

---

## 🛡️ Security & Scalability Notes

### Current Security Practices
- Passwords are securely hashed with bcrypt
- JWT tokens are validated using middleware
- Protected routes prevent unauthorized access
- Clean modular folder structure for scaling

---

## 🚀 How to Scale Frontend–Backend Integration for Production

For a production-ready scalable deployment, the following improvements would be applied:

### Backend Scaling
- Use **Refresh Tokens + Access Tokens** instead of only JWT cookies
- Add **Rate Limiting** (prevent brute-force attacks)
- Use **Helmet + CORS policies** for stronger security
- Add DB Indexing on `userId` and `date` fields for fast queries

### Frontend Scaling
- Migrate React SPA into **Next.js** for SSR + SEO improvements
- Implement global API handling with React Query caching
- Add optimistic updates and pagination for large transaction history

---

## 🌍 Live Demo

Website: https://fin-track-eta-gilt.vercel.app  

---

### 👨‍💻 Developed by
Raghvendra Singh
