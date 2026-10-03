# Installation Guide

Complete installation instructions for the Martyr Mohi School platform.

## System Requirements

| Requirement | Minimum | Recommended |
|-------------|---------|-------------|
| Node.js | 18.x | 20.x LTS |
| npm | 9.x | 10.x |
| RAM | 2GB | 4GB |
| Disk Space | 500MB | 1GB |
| OS | Windows/Mac/Linux | Ubuntu 22.04 LTS |

## Step-by-Step Installation

### 1. Install Node.js

**Windows:**
- Download from https://nodejs.org/
- Run installer and follow prompts
- Restart your computer

**macOS (using Homebrew):**
```bash
brew install node@20
```

**Linux (Ubuntu/Debian):**
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

**Verify Installation:**
```bash
node --version  # Should show v18.x or higher
npm --version   # Should show 9.x or higher
```

### 2. Install Git

**Windows:**
- Download from https://git-scm.com/
- Use default installation options

**macOS:**
```bash
brew install git
```

**Linux:**
```bash
sudo apt-get install git
```

**Verify:**
```bash
git --version
```

### 3. Clone Repository

```bash
git clone https://github.com/Mostafa-SAID7/Martyr-Mohi-School-Full.git
cd Martyr-Mohi-School-Full
```

### 4. Install Frontend Dependencies

```bash
cd frontend
npm install
```

This installs all packages listed in `package.json`. Typical time: 2-5 minutes.

### 5. Install Backend Dependencies (Optional)

```bash
cd ../backend
npm install
```

### 6. Create Environment Files

**Frontend:**
```bash
cd ../frontend
cp .env.example .env
```

Edit `frontend/.env`:
```env
VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_key
VITE_API_URL=http://localhost:3000
```

Get your Clerk key:
1. Go to https://dashboard.clerk.com
2. Create app or use existing
3. Copy "Publishable Key"
4. Paste into .env

**Backend (Optional):**
```bash
cd ../backend
cp .env.example .env
```

Edit `backend/.env`:
```env
DATABASE_URL=postgresql://...
CLERK_SECRET_KEY=sk_test_your_key
NODE_ENV=development
PORT=3000
API_BASE_URL=http://localhost:3000
FRONTEND_URL=http://localhost:5173
```

### 7. Verify Installation

**Frontend:**
```bash
cd frontend
npm run typecheck
npm run build
```

Should complete without errors.

**Backend (Optional):**
```bash
cd ../backend
npm run typecheck
npm run build
```

## Starting Development

### Frontend Only

```bash
cd frontend
npm run dev
```

Opens at http://localhost:5173

### With Backend

**Terminal 1:**
```bash
cd backend
npm run dev
```

**Terminal 2:**
```bash
cd frontend
npm run dev
```

## Troubleshooting

### "npm: command not found"
- Node.js not installed correctly
- Restart terminal/computer
- Try reinstalling Node.js

### "Port 5173 already in use"
```bash
# Windows
netstat -ano | findstr :5173
taskkill /PID [PID] /F

# Mac/Linux
lsof -i :5173
kill -9 [PID]
```

### "Cannot find module..."
```bash
cd [frontend or backend]
rm -rf node_modules package-lock.json
npm install
```

### ".env file not found"
```bash
# Make sure you're in the right directory
cd frontend
cp .env.example .env
# Edit .env with your keys
```

### Clerk Key Errors
1. Verify .env file exists in `frontend/`
2. Check key starts with `pk_test_` (development) or `pk_live_` (production)
3. Restart dev server after changing .env
4. Clear browser cache

## Docker Installation (Alternative)

If you prefer Docker:

```bash
# Build image
docker build -t martyr-mohi-school .

# Run container
docker run -p 5173:5173 -p 3000:3000 martyr-mohi-school
```

## Platform-Specific Notes

### Windows

- Use PowerShell or Git Bash
- Avoid paths with spaces
- May need Visual Studio Build Tools for some npm packages

### macOS

- Install Xcode Command Line Tools: `xcode-select --install`
- Use Homebrew for package management
- Intel and Apple Silicon supported

### Linux

- Ubuntu 22.04 LTS recommended
- Use apt or your package manager
- May need build essentials: `sudo apt-get install build-essential`

## Next Steps

1. ✅ Installation complete
2. 👉 Start dev server with `npm run dev`
3. 📖 Read `docs/DEVELOPMENT.md` for workflow
4. 🚀 Deploy with `docs/DEPLOYMENT.md`

## Getting Help

- **Stuck?** → Check `QUICKSTART.md` for common issues
- **Questions?** → Read `docs/DEVELOPMENT.md`
- **Errors?** → See troubleshooting section above
- **Still stuck?** → Open GitHub issue

---

**Installation Time:** ~10-15 minutes for complete setup

**Questions?** Open an issue or check documentation.
