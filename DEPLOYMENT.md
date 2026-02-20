# Quick Deployment Guide

## 🚀 Deploy Backend to Railway

### Step 1: Prepare Backend
1. Make sure your code is pushed to GitHub
2. Check that `backend/.gitignore` includes `.env`

### Step 2: Deploy on Railway
1. Go to [railway.app](https://railway.app) and sign in with GitHub
2. Click **"New Project"** → **"Deploy from GitHub repo"**
3. Select your repository
4. Railway will auto-detect Node.js - click **"Deploy Now"**

### Step 3: Set Environment Variables
In Railway dashboard, go to **Variables** tab and add:

```
PORT=3001
NODE_ENV=production

# Supabase
SUPABASE_URL=https://nxihrfrcxeawzyhuiatm.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
SUPABASE_JWKS_URL=https://nxihrfrcxeawzyhuiatm.supabase.co/auth/v1/jwks
SUPABASE_JWT_ISSUER=https://nxihrfrcxeawzyhuiatm.supabase.co/auth/v1

# Database
DATABASE_URL=postgresql://postgres:your-password@db.nxihrfrcxeawzyhuiatm.supabase.co:5432/postgres

# CORS - Add your Vercel domain here after frontend deployment
FRONTEND_URL=https://your-app.vercel.app

# Groq API (for AI chatbot)
GROQ_API_KEY=your-groq-api-key
GROQ_MODEL=gemma-7b-it

# Google OAuth (for "Continue with Google")
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-your-client-secret
GOOGLE_REDIRECT_URI=https://your-app.vercel.app/auth/callback

# Google Drive (for past papers - optional)
GOOGLE_REFRESH_TOKEN=your-refresh-token-if-you-have-it

# Ollama (optional - leave blank if not using)
OLLAMA_URL=
OLLAMA_MODEL=
```

### Step 4: Configure Build Settings
Railway auto-detects from package.json:
- **Build Command**: `npm run build`
- **Start Command**: `npm start`
- **Root Directory**: `backend`

If Railway didn't detect the backend folder, add in **Settings**:
- Root Directory: `backend`

### Step 5: Get Railway URL
After deployment, Railway will give you a URL like: `https://your-app.up.railway.app`
**Copy this URL** - you'll need it for frontend deployment!

---

## 🎨 Deploy Frontend to Vercel

### Step 1: Update Google OAuth Redirect URIs
1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Edit your OAuth 2.0 Client ID
3. Add to **Authorized redirect URIs**:
   - `https://nxihrfrcxeawzyhuiatm.supabase.co/auth/v1/callback`
   - `https://your-app.vercel.app/auth/callback` (use your actual Vercel domain)

### Step 2: Deploy on Vercel
1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **"New Project"** → Select your repository
3. Vercel auto-detects Next.js

### Step 3: Configure Project
- **Framework Preset**: Next.js (auto-detected)
- **Root Directory**: `frontend`
- **Build Command**: `npm run build` (default)
- **Output Directory**: `.next` (default)
- **Install Command**: `npm install` (default)

### Step 4: Set Environment Variables
In the **Environment Variables** section, add:

```
NEXT_PUBLIC_SUPABASE_URL=https://nxihrfrcxeawzyhuiatm.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im54aWhyZnJjeGVhd3p5aHVpYXRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkxODg0MjgsImV4cCI6MjA4NDc2NDQyOH0.Yw17HtO_0dmgLwqOMmPx-Q9FZAbTi1UgSVn7lQq65OA
NEXT_PUBLIC_API_URL=https://your-backend-url.up.railway.app
```

**Replace** `https://your-backend-url.up.railway.app` with your actual Railway URL!

### Step 5: Deploy
Click **"Deploy"** and wait ~2 minutes

### Step 6: Update Backend CORS
After getting your Vercel URL (e.g., `https://your-app.vercel.app`):
1. Go back to Railway dashboard
2. Update the `FRONTEND_URL` variable to your Vercel URL
3. Redeploy backend (Railway will auto-redeploy)

---

## ✅ Post-Deployment Checklist

### 1. Update Google OAuth
- [ ] Add Vercel URL to Google OAuth redirect URIs
- [ ] Update `GOOGLE_REDIRECT_URI` in Railway to use Vercel domain

### 2. Update Supabase
- [ ] Go to Supabase Dashboard → Authentication → URL Configuration
- [ ] Add your Vercel URL to **Site URL** and **Redirect URLs**

### 3. Test Everything
- [ ] Visit your Vercel URL
- [ ] Test signup with email/password
- [ ] Test "Continue with Google"
- [ ] Test logout
- [ ] Test past papers browsing
- [ ] Test student dashboard

---

## 🔧 Common Issues

### Issue: CORS errors
**Solution**: Make sure `FRONTEND_URL` in Railway matches your exact Vercel URL (no trailing slash)

### Issue: Google OAuth fails
**Solution**: Check redirect URIs in Google Cloud Console include your Vercel domain

### Issue: Past papers not loading
**Solution**: Check that `NEXT_PUBLIC_API_URL` in Vercel points to your Railway URL

### Issue: Build fails on Vercel
**Solution**: Make sure root directory is set to `frontend`

### Issue: Backend won't start on Railway
**Solution**: Check that root directory is set to `backend` and all required env vars are set

---

## 📝 Quick Commands

### To redeploy:
- **Frontend**: Push to GitHub → Vercel auto-deploys
- **Backend**: Push to GitHub → Railway auto-deploys

### To check logs:
- **Vercel**: Dashboard → Your Project → Deployments → Click deployment → Function Logs
- **Railway**: Dashboard → Your Project → Deployments → View Logs

---

## 🎉 Done!

Your app is now live:
- **Frontend**: https://your-app.vercel.app
- **Backend**: https://your-app.up.railway.app
- **Admin Panel**: https://your-app.vercel.app/admin/login

**Next Steps:**
1. Test all features in production
2. Set up custom domain (optional)
3. Monitor usage and costs
