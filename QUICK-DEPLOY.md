# ⚡ SUPER QUICK DEPLOYMENT STEPS

## Prerequisites (2 minutes)
1. ✅ Push all code to GitHub
2. ✅ Have accounts on:
   - vercel.com (sign in with GitHub)
   - railway.app (sign in with GitHub)

---

## 🚂 BACKEND - Railway (5 minutes)

### Deploy
1. Go to **railway.app** → Click **"New Project"**
2. Select **"Deploy from GitHub repo"** → Choose your repo
3. Click **"Add variables"** → Copy ALL from below:

```bash
PORT=3001
NODE_ENV=production
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
SUPABASE_JWKS_URL=https://your-project.supabase.co/auth/v1/.well-known/jwks.json
SUPABASE_JWT_ISSUER=https://your-project.supabase.co/auth/v1
DATABASE_URL=postgresql://postgres.your-project:[YOUR-PASSWORD]@aws-0-region.pooler.supabase.com:6543/postgres
FRONTEND_URL=https://your-app.vercel.app
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-your-client-secret-here
GOOGLE_REDIRECT_URI=https://your-app.vercel.app/auth/callback
GOOGLE_DRIVE_FOLDER_ID=your-drive-folder-id
GOOGLE_REFRESH_TOKEN=your-refresh-token-here
GROQ_API_KEY=gsk_your-groq-api-key-here
GROQ_MODEL=llama-3.3-70b-versatile
```

4. **IMPORTANT**: In Settings → Set **Root Directory** to `backend`
5. Click **"Deploy"** → Wait 2-3 minutes
6. **COPY YOUR RAILWAY URL** (looks like `https://web-app-production-xxxx.up.railway.app`)

---

## 🎨 FRONTEND - Vercel (3 minutes)

### Deploy
1. Go to **vercel.com** → Click **"Add New"** → **"Project"**
2. Import your GitHub repo
3. **Framework Preset**: Next.js (auto-detected)
4. **Root Directory**: Change to `frontend` ⚠️ IMPORTANT!
5. Add **Environment Variables**:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key-here
NEXT_PUBLIC_API_URL=https://your-railway-url-here.up.railway.app
```

**Replace** `NEXT_PUBLIC_API_URL` with your Railway URL from step above!

6. Click **"Deploy"** → Wait 2-3 minutes
7. **COPY YOUR VERCEL URL** (looks like `https://your-app.vercel.app`)

---

## 🔗 CONNECT THEM (2 minutes)

### Update Railway
1. Go back to **Railway** → Your project → **Variables**
2. Edit `FRONTEND_URL` → Change to your **Vercel URL**
3. Edit `GOOGLE_REDIRECT_URI` → Change to `https://your-vercel-url.vercel.app/auth/callback`
4. Railway will auto-redeploy

### Update Google OAuth
1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Click your OAuth 2.0 Client ID
3. Under **Authorized redirect URIs**, add:
   - `https://your-vercel-url.vercel.app/auth/callback`
   - `https://nxihrfrcxeawzyhuiatm.supabase.co/auth/v1/callback`
4. Click **Save**

### Update Supabase
1. Go to [Supabase Dashboard](https://supabase.com/dashboard/project/nxihrfrcxeawzyhuiatm)
2. **Authentication** → **URL Configuration**
3. Set **Site URL** to your Vercel URL
4. Add to **Redirect URLs**: `https://your-vercel-url.vercel.app/**`
5. Click **Save**

---

## ✅ TEST IT! (1 minute)

Visit your Vercel URL and test:
- ✅ Signup with email
- ✅ Login  
- ✅ Continue with Google
- ✅ Browse past papers
- ✅ Dashboard loads
- ✅ Logout works

---

## 🎉 DONE!

**Your app is LIVE:**
- 🌐 **Website**: https://your-app.vercel.app
- 🔌 **API**: https://your-railway-url.up.railway.app
- 👨‍💼 **Admin**: https://your-app.vercel.app/admin/login

**Total time: ~12 minutes**

---

## 🚨 If something breaks:

### Build fails on Vercel?
→ Make sure Root Directory = `frontend`

### Build fails on Railway?
→ Make sure Root Directory = `backend`

### CORS errors?
→ Double-check `FRONTEND_URL` in Railway matches Vercel URL exactly

### Google login doesn't work?
→ Check redirect URIs in Google Cloud Console

### Need logs?
- Vercel: Dashboard → Deployments → Click deployment → View Logs
- Railway: Dashboard → Deployments → View Logs
