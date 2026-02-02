# Firebase Hosting Setup Guide

A step-by-step guide for deploying a Vite/React app to Firebase Hosting.

---

## Step 1: Create Firebase Project (Browser)

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"**
3. Enter project name (e.g., `portfolio`)
4. Disable Google Analytics (not needed for hosting)
5. Click **"Create project"**
6. Wait for project to be created, then click **"Continue"**

**Note your Project ID** (found in Project Settings):
- Example: `portfolio-a772e`

---

## Step 2: Install Firebase CLI

If not already installed:

```bash
npm install -g firebase-tools
```

Verify installation:

```bash
firebase --version
```

---

## Step 3: Login to Firebase

```bash
firebase login
```

- Browser will open for Google authentication
- Select your Google account
- Allow Firebase CLI access

---

## Step 4: Initialize Firebase in Project

Navigate to your project folder and run:

```bash
firebase init
```

### Prompts and Answers:

| Prompt | Answer |
|--------|--------|
| Which features? | Select **Hosting** (spacebar to select, enter to continue) |
| Use an existing project? | **Use an existing project** |
| Select project | Choose your project (e.g., `portfolio-a772e`) |
| Public directory? | Type **`dist`** |
| Configure as single-page app? | **Yes** |
| Set up automatic builds with GitHub? | **No** |
| Overwrite dist/index.html? | **No** (if asked) |

This creates:
- `firebase.json` - hosting configuration
- `.firebaserc` - project association

---

## Step 5: Build Your App

```bash
npm run build
```

This creates the `dist` folder with production files.

---

## Step 6: Deploy

```bash
firebase deploy
```

**Output will show your live URL:**
```
Hosting URL: https://your-project-id.web.app
```

---

## Future Deployments

After initial setup, deploying updates is just:

```bash
npm run build
firebase deploy
```

---

## Useful Commands

| Command | Description |
|---------|-------------|
| `firebase deploy` | Deploy to production |
| `firebase deploy --only hosting` | Deploy only hosting (faster) |
| `firebase hosting:channel:deploy preview` | Deploy to preview channel |
| `firebase open hosting:site` | Open live site in browser |
| `firebase serve` | Test locally before deploying |

---

## Project Files Reference

### firebase.json
```json
{
  "hosting": {
    "public": "dist",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

### .firebaserc
```json
{
  "projects": {
    "default": "your-project-id"
  }
}
```

---

## Troubleshooting

### "Firebase project not found"
- Run `firebase login` again
- Check project ID in `.firebaserc`

### "dist folder not found"
- Run `npm run build` first

### Changes not showing after deploy
- Clear browser cache (Ctrl+Shift+R)
- Wait 1-2 minutes for CDN propagation

---

## Custom Domain (Optional)

1. Go to Firebase Console → Hosting
2. Click **"Add custom domain"**
3. Enter your domain
4. Add DNS records as instructed
5. Wait for SSL certificate (can take up to 24h)
