# Deployment Guide

## Frontend Deployment (Vercel)

### Prerequisites
- Vercel account
- GitHub repository connected
- Clerk API keys configured

### Environment Variables

Create in Vercel dashboard:
```
VITE_CLERK_PUBLISHABLE_KEY=pk_live_your_clerk_key
VITE_API_URL=https://your-backend-domain.com/api
```

### Deployment Steps

1. **Connect Repository**
   - Go to [Vercel](https://vercel.com)
   - Click "Import Project"
   - Select GitHub repository
   - Click "Import"

2. **Configure Build**
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

3. **Add Environment Variables**
   - In "Environment Variables" section
   - Add `VITE_CLERK_PUBLISHABLE_KEY`
   - Add `VITE_API_URL`

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete (~3 minutes)
   - Vercel provides live URL

### Automatic Deployments

- Main branch: Deployed automatically
- Pull requests: Preview deployments created
- Rollbacks: Available from Vercel dashboard

### Testing Deployment

```bash
npm run build    # Test build locally
npm run preview  # Preview production build
```

## Backend Deployment (Optional)

### Host Options

1. **Railway**
   - Simple deployment
   - PostgreSQL database
   - Good for MVP

2. **Render**
   - Free tier available
   - PostgreSQL support
   - Easy scaling

3. **Self-hosted**
   - Digital Ocean
   - AWS
   - More control

### Environment Variables

Required for backend:
```
DATABASE_URL=postgresql://user:pass@host/db
CLERK_SECRET_KEY=sk_test_your_secret_key
NODE_ENV=production
PORT=3000
API_BASE_URL=https://your-backend-domain.com
FRONTEND_URL=https://your-frontend-domain.com
```

### Deployment Steps (Railway Example)

1. Create Railway account
2. Connect GitHub repository
3. Railway auto-detects Node.js project
4. Configure environment variables
5. Deploy automatically
6. Get production backend URL

## Database (Supabase)

### Already Configured ✅

- PostgreSQL managed by Supabase
- Automatically backed up
- Connection string in DATABASE_URL

### No Additional Setup Needed

Supabase handles:
- Database hosting
- Automatic backups
- Scaling
- Security

## Domain Configuration

### Frontend Domain

1. Purchase domain (Namecheap, GoDaddy)
2. In Vercel settings → Domains
3. Add custom domain
4. Update DNS records per Vercel instructions
5. SSL certificate auto-configured

### Backend Domain (Optional)

If deploying backend:
1. Purchase domain
2. Point to backend hosting (Railway, Render, etc.)
3. SSL configured automatically

### DNS Configuration

For both frontend and backend:
```
CNAME: your-domain.com → vercel-domain.vercel.app
```

(Specific instructions vary by host)

## Production Checklist

### Frontend
- [ ] Environment variables set in Vercel
- [ ] VITE_API_URL points to backend
- [ ] Clerk keys are production keys (pk_live_)
- [ ] Domain configured
- [ ] SSL working (https://)
- [ ] API calls working in production

### Backend (if deployed separately)
- [ ] Environment variables configured
- [ ] DATABASE_URL correct
- [ ] CLERK_SECRET_KEY set
- [ ] NODE_ENV=production
- [ ] Health check endpoint working
- [ ] Database migrations ran
- [ ] CORS configured for frontend domain

### General
- [ ] No sensitive data in code
- [ ] .env file not committed
- [ ] Error logging enabled
- [ ] Monitoring configured

## Monitoring

### Vercel Analytics

- Built-in to Vercel
- Real-time performance metrics
- Error tracking
- Function logs

### Manual Monitoring

Check health endpoint:
```bash
curl https://your-backend-domain.com/health
```

Should return:
```json
{"status": "ok"}
```

## Rollback Procedure

### Frontend (Vercel)

1. Go to Vercel dashboard
2. Select deployment
3. Previous deployments listed
4. Click deployment to revert
5. Confirms: "Rollback to [date]"

### Backend

Depends on host:
- Railway: Similar UI for rollback
- Render: View deployment history, redeploy previous

## Scaling

### Frontend

Vercel automatically scales:
- No configuration needed
- Increased concurrency as needed
- Auto-caching optimized

### Backend

If performance needed:
- Railway/Render: Upgrade plan
- Self-hosted: Add load balancer or horizontal scaling

### Database

Supabase auto-scales:
- No manual intervention needed
- Connection pooling automatic

## Troubleshooting

### 502 Bad Gateway

- Backend might be down
- Check backend health endpoint
- Verify environment variables

### API Not Responding

- Check VITE_API_URL in Vercel
- Ensure backend domain correct
- Verify CORS configured

### Database Connection Error

- Check DATABASE_URL
- Verify Supabase project active
- Check connection limits

### Clerk Authentication Not Working

- Verify VITE_CLERK_PUBLISHABLE_KEY
- Check Clerk production configuration
- Ensure allowed origins include frontend domain

## Security

### Secrets Management

- Never commit .env files
- Use Vercel's environment variables UI
- Rotate Clerk keys periodically
- Use production keys in production

### HTTPS

- Vercel: Auto-configured SSL
- Custom domains: SSL configured automatically
- No HTTP traffic to production

### CORS

Configured in backend for:
- Your frontend domain
- Localhost (development only)
- No wildcards in production

## Performance Optimization

### Frontend

- Already optimized:
  - Vite tree-shaking
  - Image optimization via CDN
  - Code splitting
  - Gzip compression

### API

- Consider:
  - Response caching headers
  - Database query optimization
  - Request batching

## Continuous Deployment

### GitHub Integration

- Push to main → Vercel deploys
- Pull requests → Preview deployments
- No manual deployment step needed

### Build Notifications

- Slack integration available
- Email notifications from Vercel
- GitHub status checks

## Post-Deployment

### After First Deployment

1. Test all major user flows
2. Verify API connectivity
3. Check error logs
4. Monitor performance
5. Share with stakeholders

### Maintenance

- Weekly: Check error logs
- Monthly: Review performance metrics
- Quarterly: Security audit
- Yearly: Plan upgrades

## Support

### Vercel Support
- Documentation: https://vercel.com/docs
- Help: https://vercel.com/support

### Supabase Support
- Documentation: https://supabase.com/docs
- Support: https://supabase.com/support

### Clerk Support
- Documentation: https://clerk.com/docs
- Support: https://clerk.com/support
