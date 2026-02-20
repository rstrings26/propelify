# 📋 Pre-Deployment Checklist

## ✅ Before You Deploy - Complete This First!

### 1. GitHub Repository
- [ ] All code is committed to GitHub
- [ ] `.env` files are NOT committed (they're in `.gitignore`)
- [ ] Both `frontend` and `backend` folders are in the repo
- [ ] Latest changes are pushed

### 2. Get Your Supabase Database Password
You'll need this for Railway's `DATABASE_URL`:

1. Go to Supabase Dashboard → Settings → Database
2. Under "Connection string", click "Connection pooling"
3. Copy the password from the connection string
4. It looks like: `postgresql://postgres.xxx:[THIS-IS-YOUR-PASSWORD]@...`

**Write it down here:**
```
DATABASE_URL password: _______________________________
```

### 3. Accounts Ready
- [ ] GitHub account exists
- [ ] Logged into [vercel.com](https://vercel.com) with GitHub
- [ ] Logged into [railway.app](https://railway.app) with GitHub

### 4. Required Services
- [ ] Supabase project is running
- [ ] Google OAuth credentials are configured
- [ ] Groq API key is working (test at console.groq.com)

### 5. Optional: Set Up Custom Domain (Can do after)
- [ ] Domain registered (if you want a custom domain)
- [ ] DNS provider access ready

---

## 📝 Collect These Values (You'll Need Them)

### From Supabase:
```
SUPABASE_URL: https://your-project.supabase.co
SUPABASE_ANON_KEY: your-supabase-anon-key-here
SUPABASE_SERVICE_ROLE_KEY: your-supabase-service-role-key-here
DATABASE_URL: postgresql://postgres.your-project:[YOUR-PASSWORD]@region.pooler.supabase.com:6543/postgres
```

### From Google Cloud:
```
GOOGLE_CLIENT_ID: your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET: GOCSPX-your-client-secret-here
GOOGLE_DRIVE_FOLDER_ID: your-drive-folder-id
GOOGLE_REFRESH_TOKEN: your-refresh-token-here
```

### From Groq:
```
GROQ_API_KEY: gsk_your-groq-api-key-here
GROQ_MODEL: llama-3.3-70b-versatile
```

---

## 🎯 Deployment Order

**Follow this order:**
1. ✅ Complete this checklist
2. 🚂 Deploy Backend to Railway (get Railway URL)
3. 🎨 Deploy Frontend to Vercel (use Railway URL)
4. 🔗 Update Railway with Vercel URL
5. ⚙️ Update Google OAuth & Supabase
6. ✅ Test everything

---

## ⏱️ Estimated Time
- **Reading guides**: 5 min
- **Backend deployment**: 5-7 min
- **Frontend deployment**: 3-5 min
- **Connecting & testing**: 3-5 min
- **Total**: ~15-20 minutes

---

## 📚 Next Steps

**Once checklist is complete, go to:**
→ [`QUICK-DEPLOY.md`](./QUICK-DEPLOY.md) for step-by-step deployment

**For detailed explanations:**
→ [`DEPLOYMENT.md`](./DEPLOYMENT.md) for comprehensive guide

---

## 🆘 Need Help?

Common issues and solutions are in `DEPLOYMENT.md` under "Common Issues" section.

**Ready?** Open `QUICK-DEPLOY.md` and start deploying! 🚀
