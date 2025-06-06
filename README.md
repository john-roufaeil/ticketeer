# 🎟️ Ticketeer - Full Stack Event Booking System

## 📋 Project Overview

Ticketeer is a full-stack web application that allows users to:
- Browse and view events.
- Book event tickets with instant confirmation.

It also provides an **Admin Panel** for event managers to:
- Create, Read, Update, and Delete (CRUD) events.

---

## ✅ Features

- 🔐 User Registration & Login
- 🏷️ Role-Based Access (User & Admin)
- 🗓️ Event Listings and Details
- 🎟️ One-Click Event Booking with Confirmation Page
- 🧑‍💼 Admin Panel for Event Management (CRUD)
- 🌓 Light & Dark Mode Support
- 🌐 Multi-Language Support (English & Arabic)
- 🛡️ JWT-Protected API Routes
- 🚫 Admin-Only Access to Event Management Endpoints

---

## 🛠️ Tech Stack

- **Next.js 15 App Router (Frontend & API)**
- **MongoDB + Mongoose**
- **Tailwind CSS**
- **Radix UI Components**
- **JWT Authentication**
- **i18n Language Support**

---

## 🚀 Live Demo

[Visit Live Site](https://ticketeer-eta.vercel.app/)

---

## 🖥️ Local Development Setup

### 1. Clone the Repository

```bash
git clone git@github.com:john-roufaeil/ticketeer.git
cd ticketeer
```

### 2. Install Dependencies

``` bash
npm install
```

### 3. Configure Environment Variables

Create a ```.env``` file in the project root:

``` bash
MONGODB_URI=your-mongodb-connection-uri
JWT_SECRET=your-secret-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 4. Run the Development Server

``` bash
npm run dev
```

Open http://localhost:3000 in your browser.

## Admin Credentials
Email: ```admin@ticketeer.com```
Password: ```secret```
