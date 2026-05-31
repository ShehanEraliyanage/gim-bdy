import { useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { AudioProvider } from './components/ui/AudioEngine'
import { useMusicUrls } from './hooks/useAssets'
import { useAudio } from './context/AudioContext'
import SplashScene from './components/scenes/SplashScene'
import BirthdayScene from './components/scenes/BirthdayScene'
import GiftScene from './components/scenes/GiftScene'
import GalleryScene from './components/scenes/GalleryScene'

const STAGES = {
  SPLASH: 'splash',
  BIRTHDAY: 'birthday',
  GIFT: 'gift',
  GALLERY: 'gallery',
}

function AudioToggle() {
  const { muted, toggleMute, start, playing, hasMusic } = useAudio()

  if (!hasMusic) return null

  const handleClick = () => {
    if (!playing) {
      start()
      return
    }
    toggleMute()
  }

  const label = !playing ? 'Play music' : muted ? 'Unmute music' : 'Mute music'
  const icon = playing && !muted ? '🔊' : '🔇'

  return (
    <motion.button
      type="button"
      className="audio-toggle"
      onClick={handleClick}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1 }}
      aria-label={label}
      aria-pressed={playing && !muted}
    >
      {icon}
    </motion.button>
  )
}

function AppContent() {
  const [stage, setStage] = useState(STAGES.SPLASH)

  const goToBirthday = useCallback(() => setStage(STAGES.BIRTHDAY), [])
  const goToGift = useCallback(() => setStage(STAGES.GIFT), [])
  const goToGallery = useCallback(() => setStage(STAGES.GALLERY), [])
  const startOver = useCallback(() => setStage(STAGES.SPLASH), [])

  return (
    <>
      <AudioToggle />

      <AnimatePresence mode="wait">
        {stage === STAGES.SPLASH && (
          <SplashScene key="splash" onComplete={goToBirthday} />
        )}
        {stage === STAGES.BIRTHDAY && (
          <BirthdayScene key="birthday" onOpenGift={goToGift} />
        )}
        {stage === STAGES.GIFT && (
          <GiftScene key="gift" onComplete={goToGallery} />
        )}
        {stage === STAGES.GALLERY && (
          <GalleryScene key="gallery" onStartOver={startOver} />
        )}
      </AnimatePresence>
    </>
  )
}

export default function App() {
  const musicUrls = useMusicUrls()

  return (
    <AudioProvider musicUrls={musicUrls}>
      <AppContent />
    </AudioProvider>
  )
}
