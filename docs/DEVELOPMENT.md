# Development Guide

## Project Setup

### Prerequisites
- Node.js 18+
- npm or yarn
- Git

### Installation

```bash
# Clone repository
git clone https://github.com/Mostafa-SAID7/Martyr-Mohi-School-Full.git
cd Martyr-Mohi-School-Full

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies (if developing backend)
cd ../backend
npm install

# Return to root
cd ..
```

### Environment Setup

#### Frontend (.env)

```bash
cd frontend
cp .env.example .env
```

Edit `frontend/.env`:
```
VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_clerk_key
VITE_API_URL=http://localhost:3000
```

Get Clerk key from: https://dashboard.clerk.com

#### Backend (Optional)

```bash
cd backend
cp .env.example .env
```

Edit `backend/.env`:
```
DATABASE_URL=your_supabase_connection_string
CLERK_SECRET_KEY=sk_test_your_secret_key
NODE_ENV=development
PORT=3000
API_BASE_URL=http://localhost:3000
FRONTEND_URL=http://localhost:5173
```

## Running Development Server

### Frontend Only

```bash
cd frontend
npm run dev
```

Opens at http://localhost:5173

### Full Stack (with Backend)

**Terminal 1: Backend**
```bash
cd backend
npm run dev
```

Runs at http://localhost:3000

**Terminal 2: Frontend**
```bash
cd frontend
npm run dev
```

Runs at http://localhost:5173

## Development Workflow

### 1. Feature Branch

```bash
# Create feature branch
git checkout -b feature/your-feature-name

# Make changes in your editor
# Save files
```

### 2. Testing Locally

```bash
# Frontend type checking
cd frontend
npm run typecheck

# Backend type checking
cd ../backend
npm run typecheck

# Build test
npm run build
```

### 3. Code Review (Self)

- Verify changes are logically grouped
- Check for console errors
- Test in different browsers
- Test on mobile

### 4. Commit

```bash
# Stage changes
git add .

# Commit with descriptive message
git commit -m "feat: add student dashboard"
```

### 5. Push & PR

```bash
# Push to remote
git push origin feature/your-feature-name

# Create PR on GitHub
# Add description of changes
# Link related issues
```

## File Organization

### When Adding Features

Follow structure:
```
frontend/src/
├── pages/NewFeature.tsx          # Main page
├── components/NewFeature/        # Feature components
│   ├── Header.tsx
│   └── Content.tsx
├── data/newFeature.ts            # Static data (if needed)
└── hooks/useNewFeature.ts        # Custom hooks (if needed)
```

### When Adding Data

- School identity → `frontend/src/config/school.ts`
- Static content → `frontend/src/data/`
- Constants → `frontend/src/constants/`
- Translations → `frontend/src/locales/`

### When Updating Styles

Use Tailwind classes:
```tsx
<div className="container py-12 mx-auto">
  <h1 className="text-3xl font-bold text-foreground">
    Title
  </h1>
</div>
```

## Database Development

### Viewing Database

```bash
cd backend
npm run prisma:studio
```

Opens at http://localhost:5555

### Creating Migrations

```bash
cd backend
npm run prisma:migrate dev --name add_new_table
```

### Resetting Database

⚠️ **WARNING: Destructive - Development only**

```bash
cd backend
npm run prisma:migrate reset
```

## API Development

### Testing Endpoints

Use curl or Postman:

```bash
# Health check
curl http://localhost:3000/health

# API docs
curl http://localhost:3000/docs

# Get courses
curl http://localhost:3000/api/courses

# Authenticated request (replace TOKEN)
curl -H "Authorization: Bearer TOKEN" \
  http://localhost:3000/api/auth/me
```

### Adding New Routes

1. Create route file in `backend/src/routes/`
2. Define endpoints with proper validation
3. Import in `backend/src/index.ts`
4. Test with curl/Postman

## Troubleshooting

### Port Already in Use

```bash
# Find process using port
lsof -i :3000        # Frontend
lsof -i :5173        # Backend

# Kill process
kill -9 <PID>
```

### Node Modules Issues

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Environment Variable Not Found

- Verify `.env` file exists
- Check variable name spelling
- Restart dev server after `.env` changes

### Database Connection Error

- Verify DATABASE_URL in `.env`
- Check Supabase project is active
- Ensure VPN/firewall allows connection

### Clerk Authentication Not Working

- Verify VITE_CLERK_PUBLISHABLE_KEY
- Check Clerk dashboard configuration
- Ensure localhost:5173 in allowed origins

## Code Style

### TypeScript

Use strict mode:
```bash
# In tsconfig.json
"strict": true
```

### Naming Conventions

- Components: PascalCase (`Button.tsx`)
- Utilities: camelCase (`useAuth.ts`)
- Constants: UPPER_SNAKE_CASE (`USER_ROLES`)
- Files: PascalCase for React, camelCase for utils

### Comments

```typescript
// Use meaningful comments
// Explain WHY, not WHAT

// ✅ Good
// Check if user is admin before showing controls
if (user.role === 'admin') {

// ❌ Bad
// If admin
if (user.role === 'admin') {
```

## Git Commit Messages

Format: `type: description`

Types:
- `feat:` - New feature
- `fix:` - Bug fix
- `refactor:` - Code restructuring
- `docs:` - Documentation
- `style:` - Formatting (no logic change)
- `test:` - Tests
- `chore:` - Build/dependencies

Examples:
```
feat: add student dashboard
fix: resolve course loading issue
docs: update deployment guide
refactor: simplify auth context
```

## Testing

### Run Tests

```bash
# Frontend
cd frontend
npm run test       # Run tests once
npm run test:watch # Watch mode

# Backend
cd backend
npm run test       # Jest
npm run test:watch # Watch mode
```

### Writing Tests

Create `__tests__` directory or `.test.ts` files:

```typescript
describe('CourseService', () => {
  it('should fetch courses', async () => {
    // Test logic
  });
});
```

## Performance Optimization

### Frontend

- Use React.memo for expensive components
- Implement code splitting with React.lazy
- Profile with DevTools
- Monitor bundle size

### Backend

- Use database indexes for queries
- Cache frequently accessed data
- Batch API requests
- Monitor query performance

## Debugging

### Frontend

```typescript
// Console logging
console.log('value:', value);
console.table(array);

// Browser DevTools
// F12 → Elements, Console, Network, Application
```

### Backend

```typescript
// Structured logging
console.log({
  action: 'fetch_courses',
  userId: user.id,
  timestamp: new Date(),
});
```

## Documentation

### When Adding Features

1. Add code comments
2. Update relevant .md file in `docs/`
3. Add to CONTRIBUTING.md if affects workflow
4. Update README.md if significant

### Code Comments

```typescript
/**
 * Fetches courses for the authenticated user
 * @param token - Clerk authentication token
 * @returns Array of courses
 */
export async function fetchUserCourses(token: string) {
  // Implementation
}
```

## Resources

### External Documentation
- React: https://react.dev
- TypeScript: https://www.typescriptlang.org/docs
- Tailwind: https://tailwindcss.com/docs
- Prisma: https://www.prisma.io/docs
- Clerk: https://clerk.com/docs

### Project Documentation
- Architecture: `docs/ARCHITECTURE.md`
- Data Integrity: `docs/DATA_INTEGRITY.md`
- Deployment: `docs/DEPLOYMENT.md`

## Quick Commands Reference

```bash
# Development
npm run dev          # Start dev server
npm run typecheck    # Type checking
npm run build        # Production build
npm run preview      # Preview build

# Database (Backend)
npm run prisma:studio      # View/edit database
npm run prisma:migrate     # Create migration
npm run prisma:generate    # Generate Prisma client

# Code Quality
npm run lint         # Linting
npm run format       # Code formatting
npm run test         # Tests

# Git
git status           # Check status
git add .            # Stage changes
git commit -m "msg"  # Commit
git push             # Push to remote
git pull             # Pull from remote
```

## Getting Help

1. Check existing documentation in `docs/`
2. Read error messages carefully
3. Check GitHub issues for similar problems
4. Ask in project discussions
5. Reach out to maintainers

Happy developing! 🚀
