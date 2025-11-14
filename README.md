# HVAC Estimate Generator
A full-stack MERN application for HVAC technicians to create HVAC service estimates with automated PDF generation.

<img width="905" height="649" alt="image" src="https://github.com/user-attachments/assets/27dd3bd8-bcac-48af-9e68-4d68ff088a5e" />


---

## 📋 Overview

The **HVAC Estimate Generator** is a complete end-to-end solution that allows HVAC technicians or businesses to:

- Create customer estimates
- Select service type, unit type, and pricing
- Automatically calculate totals
- Generate a downloadable PDF estimate
- Store and retrieve estimates via a MongoDB database

Built with the **MERN stack** (MongoDB, Express.js, React, Node.js), the project is fully responsive and production ready.

---

## 🚀 Features

### 🔧 Frontend (React)
- User friendly estimate creation form
- Real time validation
- Required field indicators
- Warranty toggle
- PDF preview in a new tab
- Clean modern UI with consistent styling

### 📁 Backend (Node + Express)
- Create estimates
- Update estimates
- Retrieve a single estimate or all estimates
- Auto-generate PDF via server utilities
- Error safe model validation

### 🛢 Database (MongoDB + Mongoose)
- Fully typed Estimate model
- Defaults (like date & numeric fields)
- Custom validation (phone numbers, etc.)
- Flexible schema for future additions

---

## 🧱 Tech Stack

| Layer          | Technology                                      |
|----------------|-------------------------------------------------|
| Frontend       | React, JavaScript, CSS                          |
| Backend        | Node.js, Express.js                             |
| Database       | MongoDB + Mongoose                              |
| PDF Generation | PDFKit                                          |

---

## 📁 Project Structure

```
hvac-estimate-project/
│
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/
│   │   └── styles/
│   └── package.json
│
├── server/                 # Backend
│   ├── models/
│   │   └── Estimate.js
│   ├── routes/
│   │   └── estimateRoutes.js
│   ├── utils/
│   │   ├── generateEstimatePDF.js
│   │   └── helperFunctions.js
│   └── server.js
│
├── package.json            # Root dependency definitions
└── README.md
```

---

## ⚙️ Installation

### 1️⃣ Clone the repo
```sh
git clone https://github.com/yourname/hvac-estimate-project.git
cd hvac-estimate-project
```

### 2️⃣ Install dependencies
```sh
npm run install
```

---

## 🗄️ Setup MongoDB

### Option A — Local MongoDB
Install MongoDB Community Server and ensure `mongod` is running.

### Option B — MongoDB Atlas (recommended)
Create a free cluster and add your connection string to:

```
server/.env
```

Example:

```env
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/hvac
PORT=5000
```

---

## ▶️ Running the Project

```sh
npm run test
```

The app will be available at:

```
http://localhost:3000
```

---

## 🧪 Routes Summary

### Create new estimate
```
POST /api/estimates
```

### Get all estimates
```
GET /api/estimates
```

### Get one estimate
```
GET /api/estimates/:id
```

### Update estimate
```
PUT /api/estimates/:id
```

---

## 🧾 PDF Generation

The backend generates PDFs using:

```
server/utils/generateEstimatePDF.js
```

PDFs include:

- Customer details
- Address
- Service type & price
- Unit type
- Warranty
- Total cost
- Date

---

## 🌐 Deploying (Future)

### Frontend Deployment
- Vercel
- Netlify

### Backend Deployment
- Render
- Railway

### Database
- MongoDB Atlas

---

## 🧩 Future Improvements
- User authentication / admin portal
- Customer search & filtering
- Email delivery of PDFs
- Dashboard with saved estimates
- Database expansion to include customers
- Add customer account totals and invoice generation
- Maintenance reminders

---

## 📜 License
None — do not distripute without permission.
