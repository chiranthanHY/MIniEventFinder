# Deployment Plan for Event Management Platform

## Steps to Complete

- [x] Fix frontend API base URL to use environment variable
- [ ] Deploy backend on Render (fix root directory issue)
- [ ] Update frontend with Render backend URL
- [ ] Deploy frontend on Vercel

## Details

1. **Fix frontend API base URL**: Update `frontend/src/lib/api.ts` to use `process.env.NEXT_PUBLIC_API_BASE_URL` instead of undefined `API_BASE_URL`.

2. **Deploy backend on Render**:
   - Sign up/login to Render (https://render.com)
   - Create a new Web Service
   - Connect your GitHub repository
   - Set Root Directory: `backend`
   - Set build command: `npm run build`
   - Set start command: `npm start`
   - No environment variables needed (uses in-memory storage)
   - Deploy and get the service URL (e.g., https://your-backend.onrender.com)

3. **Update frontend with Render backend URL**:
   - Set NEXT_PUBLIC_API_BASE_URL to the Render URL in Vercel environment variables
   - Or update the code if deploying manually

4. **Deploy frontend on Vercel**:
   - Sign up/login to Vercel (https://vercel.com)
   - Import your GitHub repository
   - Set NEXT_PUBLIC_API_BASE_URL environment variable to the Render backend URL
   - Deploy
