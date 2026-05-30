# 🎁 Gimzy's Birthday Surprise App

A beautiful, interactive 3D birthday gift app built with **Vite**, **React**, and **Three.js**. This app creates an immersive experience with an animated gift unwrapping and a 3D photo carousel!

## 🎉 Features

- ✨ **Animated Splash Screen** - Beautiful "Happy Birthday Gimzy" welcome screen
- 🎁 **3D Gift Box** - Interactive gift box with paper unwrapping animation
- 📸 **3D Photo Carousel** - Display birthday photos in an animated carousel
- 🎵 **Sound Effects** - Background music and sound effects (optional)
- 📱 **Mobile Responsive** - Works great on all devices
- 🌟 **Smooth Animations** - Powered by Three.js for gorgeous 3D effects

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone this repository:
```bash
git clone https://github.com/ShehanEraliyanage/gim-bdy.git
cd gim-bdy
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and go to `http://localhost:5173`

## 📁 Project Structure

```
gim-bdy/
├── src/
│   ├── components/
│   │   ├── BirthdayScreen.jsx      # Welcome screen
│   │   ├── GiftScene.jsx           # Main 3D scene orchestrator
│   │   ├── GiftUnwrap.jsx          # 3D gift box & unwrap logic
│   │   └── PhotoCarousel3D.jsx     # Photo display carousel
│   ├── styles/
│   │   ├── BirthdayScreen.css
│   │   ├── GiftScene.css
│   │   └── PhotoCarousel3D.css
│   ├── utils/
│   │   └── SoundManager.js         # Audio playback manager
│   ├── App.jsx
│   └── main.jsx
├── public/
│   ├── sounds/                     # Add birthday music here
│   ├── images/                     # Add birthday photos here
│   └── index.html
├── vite.config.js
└── package.json
```

## 🎨 Customization

### Add Birthday Photos

1. Prepare your photos (recommended: 1080x1080px PNG or JPG)
2. Place them in the `public/images/` folder
3. They'll automatically appear in the carousel!

Supported formats: JPG, PNG, WebP

### Add Background Music & Sound Effects

1. Find royalty-free audio at:
   - [Pixabay Music](https://pixabay.com/music/)
   - [Freepik Audio](https://freepik.com/)
   - [YouTube Audio Library](https://www.youtube.com/audiolibrary)

2. Convert to MP3 format if needed

3. Place files in `public/sounds/`:
   - `birthday-music.mp3` - Background music
   - `transition.mp3` - Photo transition sound
   - `unwrap.mp3` - Gift unwrap sound

### Customize Colors & Text

Edit the following files:

- **BirthdayScreen.jsx** - Change "Happy Birthday Gimzy" text
- **BirthdayScreen.css** - Modify colors and animations
- **GiftUnwrap.jsx** - Change gift box color (search for `0xff1744`)
- **PhotoCarousel3D.css** - Customize button colors and styles

## 🎯 How It Works

1. **Splash Screen** → Shows "Happy Birthday Gimzy" message
2. **Click "Touch to Open"** → Transitions to 3D scene
3. **Click on Gift** → Unwrapping animation plays
4. **Gift Opens** → Photo carousel appears with background music
5. **Navigate Photos** → Use arrow buttons or keyboard arrows
6. **Mute/Unmute** → Control background music
7. **Restart** → Return to splash screen

## 📦 Build & Deploy to GitHub Pages

### Build for production:

```bash
npm run build
```

### Deploy to GitHub Pages:

1. Push your code to GitHub:
```bash
git add .
git commit -m "Add birthday app"
git push origin main
```

2. Go to repository Settings → Pages → enable GitHub Pages

3. Your app will be live at: `https://ShehanEraliyanage.github.io/gim-bdy/`

## 🎮 Keyboard Shortcuts

- **→ Arrow Right** - Next photo
- **← Arrow Left** - Previous photo
- **Spacebar** - Next photo
- **Click on gift** - Start unwrapping
- **Click mute icon** - Toggle sound
- **Click restart** - Return to splash screen

## 🛠️ Tech Stack

- **Vite** - Ultra-fast build tool
- **React 18** - UI framework
- **Three.js** - 3D graphics
- **Howler.js** - Audio management
- **CSS3** - Modern animations

## 💡 Next Steps

1. Add birthday photos to `public/images/`
2. Add audio files to `public/sounds/` (optional)
3. Customize colors in BirthdayScreen.jsx and GiftUnwrap.jsx
4. Test on multiple devices
5. Deploy to GitHub Pages
6. Share the link with Gimzy!

---

**Made with ❤️ for Gimzy's Birthday** 🎉
