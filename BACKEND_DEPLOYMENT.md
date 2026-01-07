# Backend Deployment Guide

Your `backend/server.js` is a Node.js server that saves admin changes to source files. GitHub Pages cannot run Node.js, so you need to deploy it separately.

## Option 1: Deploy to Render (FREE - Recommended)

1. **Create account** at https://render.com (sign up with GitHub)

2. **Create a new Web Service:**
   - Click "New" → "Web Service"
   - Connect your GitHub repo
   - Select your portfolio repository
   
3. **Configure:**
   - Name: `portfolio-backend`
   - Runtime: `Node`
   - Build Command: `cd backend && npm install`
   - Start Command: `cd backend && npm start`
   - Branch: `main` (or your default branch)
   - Region: Choose closest to you

4. **Environment Variables:**
   - No additional vars needed (the backend reads from file system)

5. **Deploy:**
   - Click "Create Web Service"
   - Wait for deployment (5-10 minutes)
   - Copy your URL (e.g., `https://portfolio-backend.onrender.com`)

6. **Update your portfolio:**
   - In your portfolio `.env.production` file, add:
   ```
   REACT_APP_API_URL=https://portfolio-backend.onrender.com/api
   ```
   - Push to GitHub
   - GitHub Pages will rebuild automatically

## Option 2: Deploy to Railway

1. Go to https://railway.app
2. Click "Deploy Now"
3. Connect your GitHub repo
4. Add `backend/server.js` as service
5. Set environment variables if needed
6. Get your production URL
7. Update `.env.production`

## Option 3: Deploy to Vercel

1. Go to https://vercel.com
2. Import your GitHub repo
3. Configure build settings
4. Deploy

## Testing Locally

Before deploying, test the backend locally:

```bash
cd backend
npm install
npm start
```

Should see:
```
✅ Backend running on http://localhost:5000
📁 Saving data to: c:\Vijay\Project\portfolio\src\data
```

## After Deployment

1. Your admin panel will automatically use the backend when:
   - Testing locally: `http://localhost:5000/api`
   - On GitHub Pages: `https://your-deployed-url/api`

2. When you save settings in admin:
   - Settings save to both localStorage AND your backend
   - Backend saves changes to source files
   - Next time you rebuild, source files have the updates

3. GitHub Pages will still work with localStorage as fallback if backend is unavailable

## Troubleshooting

**Backend not saving files?**
- Check your deployment service logs
- Ensure environment variables are set correctly
- Verify the backend is running

**Still not working on GitHub Pages?**
- Check browser console (F12) for errors
- Verify API_URL is correct in `.env.production`
- Test in incognito mode to bypass cache

**Free tier limitations?**
- Render free tier may sleep after 15 min of inactivity
- First request will be slow (5-10 seconds)
- For production, consider paid tier
