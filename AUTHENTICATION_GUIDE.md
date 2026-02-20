# Authentication System Guide

## Overview
This application now uses **Supabase Authentication** with proper email verification and Google OAuth support.

## Features Implemented ✅

### 1. **Email/Password Authentication**
- Proper signup flow with email verification
- Password validation (8+ chars, uppercase, lowercase, number, special character)
- Email confirmation required before login
- Automatic profile creation in `profiles` table

### 2. **Google OAuth**
- One-click sign in with Google
- Automatic profile creation for new users
- Seamless integration with existing accounts

### 3. **Session Management**
- Automatic session refresh
- Secure session storage
- Role-based routing (student/teacher/admin)
- Onboarding flow for new users

### 4. **Security**
- No more manual SQL commands needed!
- Email verification enforced
- Secure password requirements
- Service role key only used server-side

## Setup Instructions

### 1. Configure Supabase Email Settings

Go to your Supabase Dashboard:
1. Navigate to **Authentication** → **Email Templates**
2. Ensure "Confirm signup" template is enabled
3. Set the redirect URL to: `http://localhost:3000/auth/callback`

For production, update to your production URL.

### 2. Enable Google OAuth

#### In Google Cloud Console:
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable **Google+ API**
4. Go to **Credentials** → **Create Credentials** → **OAuth 2.0 Client ID**
5. Configure the OAuth consent screen
6. Set **Authorized JavaScript origins**:
   - `http://localhost:3000`
   - `https://nxihrfrcxeawzyhuiatm.supabase.co`
7. Set **Authorized redirect URIs**:
   - `https://nxihrfrcxeawzyhuiatm.supabase.co/auth/v1/callback`
8. Copy your **Client ID** and **Client Secret**

#### In Supabase Dashboard:
1. Go to **Authentication** → **Providers**
2. Enable **Google**
3. Paste your **Client ID** and **Client Secret**
4. Save changes

### 3. Environment Variables

#### Backend (already configured):
```env
SUPABASE_URL=https://nxihrfrcxeawzyhuiatm.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
FRONTEND_URL=http://localhost:3000
```

#### Frontend (already configured):
```env
NEXT_PUBLIC_SUPABASE_URL=https://nxihrfrcxeawzyhuiatm.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## User Flow

### New User Signup (Email/Password)
1. User fills signup form
2. Backend creates user with `supabase.auth.signUp()`
3. Supabase sends confirmation email
4. User clicks confirmation link in email
5. User is redirected to `/auth/callback`
6. User can now login

### New User Signup (Google)
1. User clicks "Continue with Google"
2. Google OAuth popup appears
3. User authorizes the app
4. Redirected to `/auth/callback`
5. Profile created automatically
6. Redirected to dashboard or onboarding

### Login (Email/Password)
1. User enters email and password
2. Backend validates credentials
3. If email not confirmed → error message
4. If confirmed → session created
5. User redirected based on role

### Login (Google)
1. User clicks "Continue with Google"
2. Google OAuth popup appears
3. User authorizes
4. Session created
5. Redirected based on role

## Database Schema

### Profiles Table
```sql
CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  full_name text NOT NULL,
  role text NOT NULL DEFAULT 'student',
  level text DEFAULT 'O Level',
  selected_subjects text[],
  region_school text,
  onboarding_complete boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
```

### Trigger for Auto-Profile Creation
The backend now handles profile creation, but you can also add a database trigger:

```sql
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    'student'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

## Removed Files

The following dummy authentication files have been replaced:
- ❌ `/frontend/src/pages/api/login.ts` (use Supabase client instead)
- ❌ `/frontend/src/pages/api/signup.ts` (use Supabase client instead)

## Testing

### Test Email/Password Flow:
1. Start backend: `cd backend && npm run dev`
2. Start frontend: `cd frontend && npm run dev`
3. Go to `http://localhost:3000/signup`
4. Fill the form and submit
5. Check your email for confirmation link
6. Click the link (should redirect to login)
7. Login with your credentials

### Test Google OAuth:
1. Click "Continue with Google" on login/signup page
2. Authorize the app
3. Should redirect to dashboard

## Common Issues & Solutions

### Issue: "Email not confirmed" error
**Solution**: User must click the confirmation link sent to their email. Check spam folder.

### Issue: Google OAuth not working
**Solution**: 
1. Verify Google OAuth credentials in Supabase Dashboard
2. Check redirect URIs match exactly
3. Ensure Google+ API is enabled

### Issue: Profile not created
**Solution**: Check backend logs. The profile creation happens after signup. You can also add the database trigger mentioned above.

### Issue: Session not persisting
**Solution**: The new Supabase client handles this automatically. Clear browser cache and try again.

## Admin Access

For admin users, manually update the role in the database:
```sql
UPDATE profiles SET role = 'admin' WHERE email = 'admin@example.com';
```

## Development vs Production

### Development:
- Redirect URL: `http://localhost:3000/auth/callback`
- All emails work (check inbox/spam)

### Production:
- Update `FRONTEND_URL` in backend `.env`
- Update `NEXT_PUBLIC_API_URL` in frontend `.env.local`
- Update Supabase email redirect URL
- Update Google OAuth redirect URIs

## Security Best Practices

✅ Service role key only on backend (never exposed to frontend)
✅ Anon key safe for frontend (limited permissions)
✅ Email verification required
✅ Strong password requirements
✅ Automatic session refresh
✅ Secure cookie-based sessions

---

**Need Help?** Check Supabase documentation: https://supabase.com/docs/guides/auth
