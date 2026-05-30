# 🎉 Deployment Guide - GitHub Pages

Your birthday app is ready to deploy! Follow these steps to make it live.

## Step 1: Enable GitHub Pages

1. Go to your repository: https://github.com/ShehanEraliyanage/gim-bdy
2. Click **Settings** (top right)
3. Scroll down to **Pages** section (left sidebar)
4. Under "Build and deployment":
   - **Source**: Select **GitHub Actions**
   - This will automatically deploy when you push to `main`
5. Save the settings

## Step 2: Check Deployment Status

1. Go to your repository
2. Click **Actions** tab
3. You should see a workflow running: **"Deploy to GitHub Pages"**
4. Wait for it to complete (green checkmark ✓)
5. It will take 1-3 minutes

## Step 3: Access Your Live App

Once deployment completes, your app will be available at:

**`https://ShehanEraliyanage.github.io/gim-bdy/`**

This is the link you can share with Gimzy!

## Step 4: Customize Before Deploying

Before the app goes live, you can make these changes:

### Add Birthday Photos

1. Convert your HEIC photos to JPG or PNG:
   - Use online converter: https://convertio.co/ or Photoshop
   - Or use macOS: Right-click image → Quick Actions → Convert Image

2. Replace files in `public/images/`:
   - Delete old photos (4.HEIC, 5.HEIC, download.png)
   - Add new photos with names like: `photo1.jpg`, `photo2.jpg`, etc.

3. Commit and push:
```bash
git add public/images/
git commit -m "Add birthday photos"
git push origin main
```

### Add Birthday Music (Optional)

1. Download royalty-free music:
   - https://pixabay.com/music/
   - https://freepik.com/search?query=happy+birthday+music&type=music
   - Search for "Happy Birthday" instrumental

2. Convert to MP3 if needed (use online converter)

3. Rename files and add to `public/sounds/`:
   - `birthday-music.mp3` (background music - 2-3 min recommended)
   - `transition.mp3` (photo transition - short 0.5-1 sec beep/chime)
   - `unwrap.mp3` (gift unwrap - short 0.5-2 sec sound)

4. Commit and push:
```bash
git add public/sounds/
git commit -m "Add birthday music and sound effects"
git push origin main
```

### Customize the Message

Edit `src/components/BirthdayScreen.jsx`:

Change line 14 from:
```jsx
<h2 className="birthday-name">Gimzy</h2>
```

To:
```jsx
<h2 className="birthday-name">Your Name Here</h2>
```

Then commit and push:
```bash
git commit -am "Customize birthday message"
git push origin main
```

## Step 5: Share with Gimzy! 🎁

1. Send her the link: `https://ShehanEraliyanage.github.io/gim-bdy/`
2. She can open it on:
   - Desktop/Laptop (Chrome, Safari, Firefox, Edge)
   - Mobile/Tablet (iOS Safari, Chrome Mobile, etc.)
3. Works best in modern browsers!

## Troubleshooting Deployment

### App not deploying?
1. Check the **Actions** tab - look for red ✗
2. Click the failed workflow to see error details
3. Common issues:
   - Node modules not installed → Run `npm install` locally
   - Build errors → Run `npm run build` locally to see errors
   - Fix the error and push again

### Photos not showing on live site?
1. Make sure photos are in `public/images/` (not `src/assets/`)
2. Use JPG or PNG format (not HEIC)
3. Check file names - no spaces or special characters
4. File sizes should be under 2MB each
5. Clear browser cache: Ctrl+Shift+Del (or Cmd+Shift+Del on Mac)

### Music not playing?
1. Make sure MP3 files are in `public/sounds/`
2. Browser might require user interaction before playing audio (this is normal)
3. Check browser console for errors: F12 → Console tab

### Want to update after deployment?
1. Make changes to the code/photos/music
2. Commit: `git commit -am "Update..."`
3. Push: `git push origin main`
4. GitHub Actions will automatically rebuild and deploy
5. Your live site updates in 1-3 minutes!

## Live Site URL

**Share this link with Gimzy:**

### https://ShehanEraliyanage.github.io/gim-bdy/

---

**Notes:**
- The domain is **Free** (GitHub Pages)
- Automatically updates when you push to `main`
- Uses SSL/HTTPS (secure connection) ✓
- Can be offline too (PWA compatible)

**Questions?** Check the main README.md for more info!

**Enjoy the birthday celebration! 🎊🎉💝**
