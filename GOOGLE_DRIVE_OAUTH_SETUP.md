# Google Drive OAuth 2.0 Setup Guide

Since your organization blocks service account key creation, use OAuth 2.0 instead.

## Step 1: Create OAuth 2.0 Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project (or create a new one with a **personal Gmail account** if your org account still has restrictions)
3. Go to **APIs & Services** > **Credentials**
4. Click **Create Credentials** > **OAuth client ID**
5. If prompted, configure the OAuth consent screen:
   - Choose **External** user type
   - App name: `Propel Past Papers`
   - User support email: Your email
   - Developer contact: Your email
   - Click **Save and Continue**
   - Skip scopes (click **Save and Continue**)
   - Add yourself as a test user
   - Click **Save and Continue**

6. Back at Create OAuth client ID:
   - Application type: **Web application**
   - Name: `Propel Backend`
   - Authorized redirect URIs: `http://localhost:3001/oauth/callback`
   - Click **Create**

7. **Copy the Client ID and Client Secret** that appear

## Step 2: Enable Google Drive API

1. Go to **APIs & Services** > **Library**
2. Search for "Google Drive API"
3. Click **Enable**

## Step 3: Configure Environment Variables

Add these to your `backend/.env` file:

```env
# Google Drive OAuth Configuration
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret
GOOGLE_REDIRECT_URI=http://localhost:3001/oauth/callback
GOOGLE_DRIVE_FOLDER_ID=your-folder-id-from-drive-url
```

**How to get folder ID:**
1. Open your Google Drive folder
2. Look at the URL: `https://drive.google.com/drive/folders/1AbC2DeF3GhI4JkL5MnO6PqR7`
3. The folder ID is: `1AbC2DeF3GhI4JkL5MnO6PqR7`

## Step 4: Authorize Access (One-Time Setup)

Run the setup script:

```bash
cd backend
npm run setup:google
```

**What happens:**
1. The script will print an authorization URL
2. Copy and visit that URL in your browser
3. Sign in with the Google account that owns the Drive folder
4. Click **Allow** to grant access
5. Google will redirect you to a URL like: `http://localhost:3001/oauth/callback?code=4/0AY0e...`
6. Copy the **entire URL** and paste it back into the terminal
7. The script will display your **refresh token**

## Step 5: Add Refresh Token to .env

Copy the refresh token and add it to `backend/.env`:

```env
GOOGLE_REFRESH_TOKEN=1//0gAbCdEfGhIjKlMnOpQrStUvWxYz...
```

## Step 6: Make Your Drive Folder Accessible

Since you're using OAuth with your personal account:

1. The folder should already be accessible (you're authenticating with the account that owns it)
2. No need to share with service account email

## Step 7: Test the Integration

```bash
cd backend
npm run dev
```

Then visit: `http://localhost:3000/student/past-papers-drive`

## Troubleshooting

### Error: "Redirect URI mismatch"
- Make sure `GOOGLE_REDIRECT_URI` in .env matches exactly what you set in Google Cloud Console
- Both should be: `http://localhost:3001/oauth/callback`

### Error: "Access blocked: This app is not verified"
- Click **Advanced** → **Go to [App Name] (unsafe)**
- This warning appears because you haven't published your OAuth app (which is fine for personal use)

### Error: "Invalid grant"
- Your refresh token may have expired
- Run `npm run setup:google` again to get a new one

### No refresh token returned
- Make sure you set `access_type: 'offline'` in the code (already done)
- Try revoking access at https://myaccount.google.com/permissions and authorize again

## Security Notes

- **Never commit refresh tokens** - Add `.env` to `.gitignore`
- Refresh tokens don't expire unless:
  - User revokes access
  - 6 months of inactivity
  - User changes password
- Keep your Client Secret safe

## Benefits of OAuth vs Service Account

✅ No organization policy restrictions  
✅ Works with personal Google accounts  
✅ More familiar authorization flow  
✅ Can access any Drive folder you own  
✅ No need to share folders  

## File Naming Convention

For best results, name your files:
```
SubjectCode_Year_Session_Paper_Variant.pdf
```

Examples:
- `0580_2023_MJ_P1_12.pdf`
- `0625_2022_ON_P4_41.pdf`

This enables the organized view endpoint to parse and group files by subject/year/session.
