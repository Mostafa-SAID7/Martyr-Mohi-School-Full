# Quick Start Guide

Get the Martyr Mohi School platform running in minutes.

## 5-Minute Setup

### Prerequisites
- Node.js 18+
- npm or yarn
- Git

### 1. Clone Repository
```bash
git clone https://github.com/Mostafa-SAID7/Martyr-Mohi-School-Full.git
cd Martyr-Mohi-School-Full
```

### 2. Install Dependencies
```bash
cd frontend
npm install
```

### 3. Setup Environment
```bash
cp .env.example .env
```

Edit `frontend/.env`:
```env
VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
VITE_API_URL=http://localhost:3000
```

Get your Clerk key: https://dashboard.clerk.com

### 4. Start Development Server
```bash
npm run dev
```

Open http://localhost:5173 in your browser. ✅ Done!

---

## Next Steps

### Learn More
- **Architecture:** `docs/ARCHITECTURE.md`
- **Development:** `docs/DEVELOPMENT.md`
- **Data Rules:** `docs/DATA_INTEGRITY.md`

### Deploy to Production
- **Vercel (Frontend):** `docs/DEPLOYMENT.md`
- **Backend (Optional):** See deployment docs

### Contribute
- **How to Contribute:** `CONTRIBUTING.md`
- **Code of Conduct:** `CODE_OF_CONDUCT.md`

---

## Common Issues

### Port Already in Use
```bash
# Kill process on port 5173
# Windows: taskkill /PID [PID] /F
# Mac/Linux: lsof -i :5173 | grep LISTEN | awk '{print $2}' | xargs kill -9
```

### Clerk Key Not Working
1. Check `.env` file exists in `frontend/`
2. Verify key starts with `pk_test_`
3. Restart dev server after changing `.env`

### npm install Fails
```bash
rm -rf node_modules package-lock.json
npm install
```

---

## What's Included

✅ React 19 + TypeScript UI  
✅ Bilingual (Arabic/English)  
✅ Clerk authentication  
✅ Tailwind CSS styling  
✅ Production-ready code  

---

## Getting Help

1. **Check Docs:** Browse `docs/` folder
2. **Search Issues:** https://github.com/Mostafa-SAID7/Martyr-Mohi-School-Full/issues
3. **Read Code:** Examples in `frontend/src/`

---

**Ready to dive deeper?** → Read `docs/DEVELOPMENT.md`

Happy coding! 🚀
