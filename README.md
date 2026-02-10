# Education Platform - Phase 0: Foundation

A production-quality educational platform with role-based access control, authentication, and a complete design system.

## Features

- ✅ Next.js 14 with App Router & TypeScript
- ✅ Role-based routing (Student/Teacher/Admin)
- ✅ Complete authentication system
- ✅ Public marketing pages
- ✅ Protected app areas
- ✅ Design system with reusable components
- ✅ Onboarding flow
- ✅ Access control middleware

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
