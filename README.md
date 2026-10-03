# 🎓 Martyr Mohi El-Din Shaheen School - Learning Management Platform

> A modern Learning Management System for Martyr Mohi El-Din Shaheen Basic Education School, built with React, TypeScript, and Vite

**Location:** Mit Al-Rakha, Zefta, Gharbia Governorate, Egypt

[![Build Status](https://github.com/Mostafa-SAID7/Martyr-Mohi-School-Full/workflows/Build%20and%20Deploy/badge.svg)](https://github.com/Mostafa-SAID7/Martyr-Mohi-School-Full/actions)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## Overview

This project is a digital platform designed to introduce and provide services for **مدرسة الشهيد محي الدين نوح شاهين للتعليم الأساسي** (Martyr Mohi El-Din Nouh Shaheen Basic Education School).

### About the School

- **Full Name:** مدرسة الشهيد محي الدين نوح شاهين للتعليم الأساسي
- **Type:** Basic Education School
- **Location:** ميت الرخا، مركز زفتى، محافظة الغربية، مصر
- **Plus Code:** J6CG+9F2

## ✨ Quick Start

```bash
# Install frontend dependencies
cd frontend
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## 🚀 Deployment

### Build for Production

```bash
cd frontend
npm run build
```

### Deploy to Vercel

1. Connect repo to [Vercel](https://vercel.com)
2. Add environment variables:
   - `VITE_CLERK_PUBLISHABLE_KEY` - Your Clerk public key
   - `VITE_API_URL` - Backend API URL (e.g., https://api.your-domain.com)
3. Vercel will automatically detect the build configuration from `vercel.json`
4. Deploy

## ⚙️ Configuration

Create `.env` file in `frontend/`:

```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key
VITE_API_URL=http://localhost:3000
```

Copy from `.env.example`:

```bash
cp .env.example .env
```

## 📦 Tech Stack

- **Frontend:**
  - React 19 - UI framework
  - TypeScript - Type safety
  - Vite - Build tool
  - Tailwind CSS - Styling
  - Radix UI - Component library
  - Clerk - Authentication

- **Backend:**
  - Node.js + Express - Server
  - TypeScript - Type safety
  - Prisma - ORM
  - PostgreSQL - Database
  - Supabase - Backend infrastructure

## 📚 Scripts

### Frontend

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Build for production |
| `npm run serve` | Preview production build |
| `npm run typecheck` | Check TypeScript types |

### Backend

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server with live reload |
| `npm run build` | Compile TypeScript |
| `npm run start` | Start production server |
| `npm run typecheck` | Check TypeScript types |

## 📋 Data Integrity Notes

### Verified Information

The following information has been verified from official sources:

- School name and official Arabic designation
- Location (Mit Al-Rakha, Zefta, Gharbia)
- Basic education classification
- Geographic reference (Plus Code: J6CG+9F2)
- Historical existence as an educational institution

### Unverified / Not Published

The following information is not yet publicly available and should be updated when official sources provide this data:

- Current contact phone number
- Current email address
- Official website
- Current principal name
- Current student/teacher counts
- School identification code
- Specific establishment date
- Current building/facility details

### Demo Content

Some platform features contain demo/sample data for demonstration purposes only:

- Courses are sample curriculum structures
- Teacher profiles are placeholder examples
- Statistics are demo values

These should be replaced with real school data when official information becomes available.

## 🔒 Privacy & Data Protection

See [Privacy Policy](frontend/src/data/privacy.ts) for detailed information about data handling and protection.

## 🤝 Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md)

## 📄 License

MIT © 2026 Martyr Mohi El-Din Shaheen School
