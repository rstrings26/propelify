# Education Platform - Production-Ready

A complete educational platform with authentication, role-based access, Google OAuth, AI chatbot, and past papers library.

## 🚀 Quick Deploy

**Ready to deploy?** Follow these guides in order:

1. **[PRE-DEPLOYMENT-CHECKLIST.md](./PRE-DEPLOYMENT-CHECKLIST.md)** - Complete this first! (5 min)
2. **[QUICK-DEPLOY.md](./QUICK-DEPLOY.md)** - Step-by-step deployment (15 min)
3. **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Detailed guide with troubleshooting

**Total deployment time: ~20 minutes**

---

## Features

- ✅ Next.js 14 with App Router & TypeScript
- ✅ Supabase Authentication (Email + Google OAuth)
- ✅ Role-based routing (Student/Teacher/Admin)
- ✅ AI Chatbot powered by Groq
- ✅ Past Papers Library with Google Drive integration
- ✅ Modern UI with Framer Motion animations
- ✅ Session management & auto-login
- ✅ Onboarding flow for new users
- ✅ Public landing page

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Create environment file:
```bash
cp .env.example .env
```

3. Run development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (public)/          # Public marketing pages
│   │   ├── (auth)/            # Authentication pages
│   │   ├── app/               # Student area (protected)
│   │   ├── teacher/           # Teacher portal (role-gated)
│   │   └── admin/             # Admin portal (role-gated)
│   ├── components/            # React components
│   │   ├── ui/               # Design system
│   │   ├── layouts/          # Layout components
│   │   ├── auth/             # Auth components
│   │   └── common/           # Shared components
│   ├── lib/                  # Utilities & helpers
│   ├── hooks/                # Custom React hooks
│   ├── types/                # TypeScript types
│   └── middleware.ts         # Route protection
└── public/                   # Static assets
```

## Roles & Access

- **Student**: Access to `/app/*` routes
- **Teacher**: Access to `/teacher/*` routes
- **Admin**: Access to `/admin/*` routes (full access)

## Technology Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- React 18
- Lucide Icons

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking
