# ☕ Coffee Shop

A full-stack e-commerce web application for coffee lovers, combining a beautiful UI with powerful admin tools for managing products, orders, and blog content.

---

## 🚀 Motivation

Coffee isn't just a drink—it's a daily ritual and an art. This project aims to recreate the modern coffee shop experience online, allowing users to shop their favorite brews while admins manage content and share stories or updates via a built-in blog system.

It also serves as a full-stack portfolio project to demonstrate practical skills using Node.js, MongoDB, Next.js, Docker, and more.

---

## 🛠️ Technologies Used

### Frontend
- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- Markdown rendering for blog posts
- Custom CSS animations and seasonal themes

### Backend
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)

### Testing
- [ ] Jest (Unit testing for backend/frontend — planned / integrated)
- [ ] Playwright (End-to-end testing — planned)

### DevOps / Infrastructure
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

---

## ✨ Features

### 🛍️ User Side
- [x] 👤 JWT-based user authentication
- [x] 📦 Browse and filter coffee products
- [ ] 🛒 Shopping cart and checkout
- [ ] 🔍 Search with instant results
- [ ] 📰 Blog article viewer
- [x] 🌞 Seasonal UI theme 

### 🛠️ Admin Side
- [x] 📊 Admin dashboard
- [x] 🧾 Manage products, categories, and orders
- [x] ✍️ Create/edit/delete blog posts
- [x] 📁 Image upload and content management

---

## ⚠️ Challenges Faced

- Building a CMS-like blog system inside the admin panel
- Designing a MongoDB schema that supports both products and blog posts
- Enforcing role-based access for content creation
- Safely rendering Markdown in React with security in mind

---

## 📬 Contact

Feel free to reach out!

- Email: [mariathanhsen@gmail.com](mailto:mariathanhsen@gmail.com)  
- Portfolio: [sendoan.com](https://sendoan.com)

---

## 🧑‍💻 Local Development Setup

Follow these steps to run the project locally using Docker and seed it with default data:

### 🔧 Prerequisites

- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

### 📦 Steps

```bash
# 1. Clone the repo
git clone https://github.com/SenDTT/coffee-shop.git 
cd coffee-shop

# 2. Set up environment variables
cd backend && cp .env.example .env
cd ../frontend && cp .env.example .env
cd ..

# 3. Start all services
docker compose up -d

# 4. Seed the database (create settings and default admin)
docker-compose exec backend npm run seed:app

🧪 Default Admin Account
Email: admin@gmail.com  
Password: Admin1234

🌐 Visit the App
http://localhost:3000/
# Swagger API: http://localhost:5002/api-docs/
