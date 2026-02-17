# FinTrack API Documentation 📌

Base URL:

```
http://localhost:3000/api
```

---

## 🔑 Authentication

### Register User
**POST** `/auth/register`

Request Body:
```json
{
  "username": "testuser",
  "email": "test@example.com",
  "password": "123456"
}
```

---

### Login User
**POST** `/auth/login`

```json
{
  "email": "test@example.com",
  "password": "123456"
}
```

---

### Get Profile
**GET** `/auth/profile`

Requires JWT Cookie/Auth Middleware.

---

### Update Profile
**PATCH** `/user/update-profile`

```json
{
  "username": "updatedUser",
  "oldPassword": "123456",
  "newPassword": "newpass123"
}
```

---

## 💳 Transactions

### Create Transaction
**POST** `/transactions`

```json
{
  "type": "expense",
  "amount": 500,
  "category": "Food",
  "description": "Lunch",
  "date": "2026-02-17"
}
```

---

### Get Transactions
**GET** `/transactions`

Returns all transactions for logged-in user.

---

### Update Transaction
**PATCH** `/transactions/:id`

```json
{
  "amount": 700,
  "description": "Updated Lunch"
}
```

---

### Delete Transaction
**DELETE** `/transactions/:id`

---