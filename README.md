# Propel Education Platform

Monorepo for a production-ready education platform with:

- Next.js 14 frontend (`frontend`)
- Express + TypeScript backend (`backend`)
- Supabase auth/profile data
- Google OAuth login
- Past papers + Drive browsing
- RAG chatbot via Groq

## Repository Structure

```text
.
├─ frontend/                 # Next.js app
├─ backend/                  # Express API
├─ package.json              # root convenience scripts
└─ vercel.json               # Vercel build/install commands
```

## Local Development

### 1) Install dependencies

```bash
npm install
cd frontend && npm install
cd ../backend && npm install
```

### 2) Configure environment variables

#### Frontend (`frontend/.env.local`)

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_API_URL=http://localhost:3001
```

#### Backend (`backend/.env`)

```env
PORT=3001
NODE_ENV=development

SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
SUPABASE_JWKS_URL=https://your-project.supabase.co/auth/v1/jwks
SUPABASE_JWT_ISSUER=https://your-project.supabase.co/auth/v1

DATABASE_URL=postgresql://postgres:password@db.your-project.supabase.co:5432/postgres

FRONTEND_URL=http://localhost:3000

GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_REDIRECT_URI=http://localhost:3001/auth/google/callback
GOOGLE_REFRESH_TOKEN=your-google-refresh-token

GROQ_API_KEY=your-groq-api-key
GROQ_MODEL=gemma-7b-it

OLLAMA_URL=http://localhost:11434
OLLAMA_MODEL=bge-m3
```

### 3) Run apps

From repo root:

```bash
npm run backend:dev
npm run frontend:dev
```

Or run both together:

```bash
npm run dev
```

## Build Commands

### Frontend

```bash
cd frontend
npm run build
```

### Backend

```bash
cd backend
npm run build
```

## Deployment

### Backend (Railway)

- Root directory: `backend`
- Install command: `npm install`
- Build command: `npm run build`
- Start command: `npm start`
- Set backend env vars from the section above (production values)
- Set `FRONTEND_URL` to your Vercel URL

### Frontend (Vercel)

- Root directory: `frontend`
- Install command: `npm install`
- Build command: `npm run build`
- Set frontend env vars:
	- `NEXT_PUBLIC_SUPABASE_URL`
	- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
	- `NEXT_PUBLIC_API_URL` (Railway backend URL)

## Useful Scripts

### Root

- `npm run dev` — run frontend + backend together
- `npm run frontend:dev`
- `npm run backend:dev`
- `npm run frontend:build`
- `npm run backend:build`

### Frontend (`frontend/package.json`)

- `npm run dev`
- `npm run build`
- `npm start`
- `npm run lint`
- `npm run type-check`

### Backend (`backend/package.json`)

- `npm run dev`
- `npm run build`
- `npm start`
- `npm run type-check`
- `npm run setup:google`
- `npm run make-public`

## Notes

- Keep `NEXT_PUBLIC_API_URL` as your deployed backend URL in production (not localhost).
- If using Google OAuth, ensure redirect URIs are configured in Google Cloud and Supabase.
- Frontend production build currently passes cleanly.
