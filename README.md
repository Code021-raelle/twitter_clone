# 🐦 Twitter Clone — Full-Stack Social Media Platform

A full-stack Twitter/X-style social media application built with **FastAPI**, **React**, and **Docker**, featuring real-time notifications, authentication, social interactions, and a modern responsive UI.

This project demonstrates production-level backend architecture, real-time communication, and modern frontend engineering practices.

---

## 🚀 Live Features

### 👤 Authentication & Users

* User registration & login (JWT authentication)
* Secure password hashing
* Edit profile (bio + avatar upload)
* User profile pages
* Follow / Unfollow system

### 📝 Tweets

* Create tweets
* User timelines
* Tweet detail pages
* Like & Retweet interactions
* Optimistic UI updates

### 🔔 Notifications

* Like notifications
* Retweet notifications
* Follow notifications
* Unread notification badge
* Clickable notifications
* ✅ **Real-time notifications via WebSockets**

### 🎨 UI/UX

* Twitter-style 3-column layout
* Dark mode support
* Responsive design
* Interactive components

### ⚙️ Infrastructure

* FastAPI backend
* React + Tailwind frontend
* Docker containerization
* Nginx reverse proxy
* WebSocket support
* REST API architecture

---

## 🏗️ Tech Stack

### Backend

* **Python**
* **FastAPI**
* SQLAlchemy ORM
* JWT Authentication (`python-jose`)
* WebSockets (real-time events)
* SQLite (dev) / PostgreSQL ready
* Pytest (API testing)

### Frontend

* **React (Vite)**
* TailwindCSS
* Axios API client
* React Router

### DevOps

* Docker & Docker Compose
* Nginx reverse proxy
* VPS deployment (Ubuntu)

---

## 📁 Project Structure

```
twitter-clone/
│
├── x_clone/
│   ├── app/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── utils/
│   │   ├── websockets/
│   │   └── main.py
│   ├── tests/
│   └── Dockerfile
│
├── frontend/
│   ├── src/
│   └── Dockerfile
│
├── nginx/
│   └── nginx.conf
│
└── docker-compose.yml
```

---

## ⚡ Getting Started (Local Development)

### 1️⃣ Clone Repository

```bash
git clone https://github.com/Code021-raelle/twitter_clone.git
cd twitter_clone
```

---

### 2️⃣ Backend Setup

```bash
cd x_clone

python -m venv venv
source venv/bin/activate

pip install -r requirements.txt
uvicorn app.main:app --reload
```

Backend runs at:

```
http://127.0.0.1:8000
```

---

### 3️⃣ Frontend Setup

```bash
cd frontend

npm install
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

## 🧪 Running Tests

```bash
cd x_clone
pytest
```

Tests include:

* Authentication
* Tweet creation
* Protected routes

---

## 🐳 Docker Deployment

Build and run everything:

```bash
docker-compose up -d --build
```

Services:

* Frontend
* FastAPI backend
* Nginx reverse proxy

Open:

```
http://YOUR_SERVER_IP
```

---

## 🔌 API Overview

### Authentication

```
POST /auth/register
POST /auth/login
```

### Tweets

```
GET    /tweets
POST   /tweets
GET    /tweets/{id}
```

### Users

```
GET /users/{id}
PUT /users/me
```

### Social Actions

```
POST   /likes/{tweet_id}
POST   /retweets/{tweet_id}
POST   /follows/{user_id}
```

### Notifications

```
GET  /notifications
GET  /notifications/unread-count
POST /notifications/read
```

### WebSocket

```
/ws/notifications
```

---

## 🔒 Security Features

* JWT authentication
* Protected API routes
* User ownership validation
* Secure file uploads
* WebSocket token verification

---

## 🧠 Architecture Highlights

* Modular FastAPI routing
* Dependency injection
* Real-time event delivery via WebSockets
* Optimistic UI updates
* Component-based frontend design
* Dockerized production environment

---

## 🚧 Future Improvements

* PostgreSQL production database
* Redis event queue
* Infinite scrolling feeds
* Search functionality
* Push notifications
* CI/CD pipeline (GitHub Actions)

---

## 👨‍💻 Author

**Gabriel Akinshola**

Software Engineer — Backend & Full-Stack Development

* GitHub: [https://github.com/Code021-raelle](https://github.com/Code021-raelle)
* LinkedIn: *(https://www.linkedin.com/in/gabriel-akinshola)*

---

## ⭐ Why This Project Exists

This project was built to demonstrate:

* Real-world backend architecture
* Real-time systems design
* Production deployment practices
* Full-stack engineering capability

---

## 📄 License

MIT License — feel free to use and learn from this project.
