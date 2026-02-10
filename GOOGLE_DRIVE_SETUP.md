# Google Drive Integration Setup Guide

This guide explains how to set up Google Drive integration to display past papers and thresholds directly in your student portal.

## Prerequisites

- A Google account with access to Google Drive
- Past papers and thresholds uploaded to a Google Drive folder
- Access to Google Cloud Console

## Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Name it something like "Propel Past Papers"

## Step 2: Enable Google Drive API

1. In the Google Cloud Console, go to **APIs & Services** > **Library**
2. Search for "Google Drive API"
3. Click on it and press **Enable**

## Step 3: Create a Service Account

1. Go to **APIs & Services** > **Credentials**
2. Click **Create Credentials** > **Service Account**
3. Fill in the details:
   - Service account name: `propel-drive-service`
   - Description: "Service account for accessing past papers"
4. Click **Create and Continue**
5. Grant the service account the **Viewer** role
6. Click **Done**

## Step 4: Generate Service Account Key

1. Click on the service account you just created
2. Go to the **Keys** tab
3. Click **Add Key** > **Create New Key**
4. Choose **JSON** format
5. Click **Create** - a JSON file will download

## Step 5: Share Google Drive Folder with Service Account

1. Open the JSON key file you downloaded
2. Find the `client_email` field (looks like `xxx@xxx.iam.gserviceaccount.com`)
3. Copy this email address
4. Go to your Google Drive
5. Right-click on the folder containing your past papers
6. Click **Share**
7. Paste the service account email
8. Give it **Viewer** access
9. Click **Send**

## Step 6: Get Your Folder ID

1. Open the folder in Google Drive
2. Look at the URL - it will look like:
   ```
   https://drive.google.com/drive/folders/1AbC2DeF3GhI4JkL5MnO6PqR7StU8VwX9Yz
   ```
3. The folder ID is the long string at the end: `1AbC2DeF3GhI4JkL5MnO6PqR7StU8VwX9Yz`

## Step 7: Configure Environment Variables

Add these variables to your `backend/.env` file:

```env
# Google Drive Configuration
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@project-id.iam.gserviceaccount.com
GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour\nPrivate\nKey\nHere\n-----END PRIVATE KEY-----\n"
GOOGLE_DRIVE_FOLDER_ID=1AbC2DeF3GhI4JkL5MnO6PqR7StU8VwX9Yz
```

**Important Notes:**
- Get the `GOOGLE_SERVICE_ACCOUNT_EMAIL` from your downloaded JSON key file
- Get the `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY` from the `private_key` field in the JSON
- The private key must be in quotes and keep the `\n` characters as-is
- Replace `GOOGLE_DRIVE_FOLDER_ID` with your actual folder ID

## Step 8: Organize Your Files (Recommended)

For best results, name your files using this format:
```
SubjectCode_Year_Session_Paper_Variant.pdf
```

Examples:
- `0580_2023_MJ_P1_12.pdf` (Mathematics May/June 2023 Paper 1 Variant 12)
- `0625_2022_ON_P4_41.pdf` (Physics Oct/Nov 2022 Paper 4 Variant 41)
- `Physics_2023_MJ_MS_P1_12.pdf` (Physics Mark Scheme)

Session codes:
- `MJ` = May/June
- `ON` = Oct/Nov
- `FM` = Feb/March

File types:
- `QP` = Question Paper
- `MS` = Mark Scheme
- `GT` = Grade Thresholds

## Step 9: Test the Integration

1. Start your backend server:
   ```bash
   cd backend
   npm run dev
   ```

2. Test the API endpoint:
   ```bash
   curl http://localhost:3001/papers/drive/list
   ```

3. You should see a JSON response with your files

## Step 10: Access in Frontend

Navigate to: `http://localhost:3000/student/past-papers-drive`

Students can now:
- Browse all papers
- Search by subject, year, or session
- View PDFs directly in the browser
- Download papers for offline study

## Troubleshooting

### Error: "Google Drive folder ID not configured"
- Make sure you added `GOOGLE_DRIVE_FOLDER_ID` to your `.env` file
- Restart your backend server after adding environment variables

### Error: "Permission denied"
- Ensure you shared the folder with the service account email
- Check that the service account has "Viewer" access

### Error: "Invalid credentials"
- Verify your private key is correctly formatted in the `.env` file
- Make sure all `\n` characters are preserved
- The private key should be wrapped in quotes

### Files not showing up
- Check that files are in the correct folder
- Ensure files are not in the trash
- Verify the folder ID is correct

## Security Best Practices

1. **Never commit `.env` file** - Add it to `.gitignore`
2. **Limit service account permissions** - Only grant "Viewer" access
3. **Use specific folders** - Don't share your entire Drive
4. **Rotate keys regularly** - Create new service account keys periodically
5. **Monitor usage** - Check Google Cloud Console for unusual activity

## Making Files Public (Optional)

If you want students to access files without backend:

1. Right-click file in Google Drive
2. Click "Share"
3. Click "Change to anyone with the link"
4. Set to "Viewer"
5. Copy the link

Then you can use the file ID directly in your frontend.

## Folder Structure Recommendation

Organize your Drive folder like this:
```
Past Papers/
├── Mathematics/
│   ├── 2023/
│   │   ├── MayJune/
│   │   └── OctNov/
│   ├── 2022/
│   └── ...
├── Physics/
├── Chemistry/
└── ...
```

This makes it easier to manage and search for files.

## API Endpoints

Once set up, these endpoints are available:

- `GET /papers/drive/list` - List all papers
- `GET /papers/drive/search?q=term` - Search papers
- `GET /papers/drive/:fileId` - Get specific file metadata
- `GET /papers/organized` - Get papers organized by subject/year

## Need Help?

Check the logs for detailed error messages:
```bash
# Backend logs
cd backend
npm run dev
```

Look for errors related to "Google Drive" or "googleapis"
