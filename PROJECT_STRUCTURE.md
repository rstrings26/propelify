# Project Structure

## Current Landing Page Setup

### Root Level
```
web app/
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
├── backend/
└── frontend/
```

### Backend Structure
```
backend/
├── .env
├── .env.example
├── package.json
├── package-lock.json
├── README.md
├── tsconfig.json
└── src/
    ├── index.ts              # Server entry point
    └── lib/
        ├── env.ts            # Environment configuration
        ├── logger.ts         # Logging utility
        └── utils.ts          # Helper functions
```

### Frontend Structure
```
frontend/
├── .env.local
├── .env.local.example
├── .eslintrc.json
├── next-env.d.ts
├── next.config.js
├── package.json
├── package-lock.json
├── postcss.config.js
├── README.md
├── tailwind.config.ts
├── tsconfig.json
├── tsconfig.tsbuildinfo
├── public/                   # Static assets
└── src/
    ├── app/
    │   ├── globals.css       # Global styles
    │   ├── layout.tsx        # Root layout
    │   └── page.tsx          # Landing page
    ├── components/
    │   ├── layout/
    │   │   └── Navbar.tsx    # Navigation component (needs auth fix)
    │   └── ui/
    │       ├── Button.tsx
    │       ├── Card.tsx
    │       ├── Input.tsx
    │       ├── Progress.tsx
    │       └── Textarea.tsx
    ├── lib/
    │   └── utils.ts          # Utility functions
    └── styles/
        └── globals.css       # Additional global styles
```

## Issues Found

### 1. Auth Provider Missing
- **File**: `frontend/src/components/layout/Navbar.tsx` (Line 8)
- **Issue**: Imports `useAuth` from deleted `@/lib/auth/AuthProvider`
- **File**: `frontend/src/app/layout.tsx` (Line 5)
- **Issue**: Imports `AuthProvider` from deleted `@/lib/auth/AuthProvider`

### 2. Navigation Links Point to Deleted Routes
- **File**: `frontend/src/components/layout/Navbar.tsx`
- **Issue**: Links to `/login`, `/signup`, `/pricing`, `/about`, `/contact`, `/app/dashboard`, `/admin`, `/teacher/dashboard`

### 3. Page Layout Duplicates Navbar
- **File**: `frontend/src/app/page.tsx`
- **Issue**: Has its own inline navbar instead of using Navbar component

## Required Fixes

1. Remove auth dependencies from layout and Navbar
2. Simplify Navbar for landing page only
3. Update navigation links to valid routes
4. Remove unused components if needed
