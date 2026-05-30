import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import '../styles/BirthdayScreen.css'

const floatingStars = Array.from({ length: 18 }, (_, index) => ({
  id: index,
  left: `${8 + ((index * 37) % 84)}%`,
  top: `${10 + ((index * 19) % 70)}%`,
  delay: `${(index * 0.17) % 2.5}s`,
  scale: 0.7 + (index % 4) * 0.12,
}))

function burstConfetti() {
  const colors = ['#ffd166', '#ff5fa2', '#7dd3fc', '#c4b5fd', '#fb7185']

  confetti({
    particleCount: 90,
    spread: 70,
    startVelocity: 28,
    origin: { y: 0.58 },
    colors,
  })

  window.setTimeout(() => {
    confetti({
      particleCount: 40,
      angle: 60,
      spread: 55,
      origin: { x: 0.12, y: 0.68 },
      colors,
    })
    confetti({
      particleCount: 40,
      angle: 120,
      spread: 55,
      origin: { x: 0.88, y: 0.68 },
      colors,
    })
  }, 180)
}

export default function BirthdayScreen({ onOpenClick }) {
  const [introReady, setIntroReady] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => setIntroReady(true), 60)
    return () => window.clearTimeout(timer)
  }, [])

  const starNodes = useMemo(
    () =>
      floatingStars.map((star) => (
        <span
          key={star.id}
          className="floating-star"
          style={{
            left: star.left,
            top: star.top,
            animationDelay: star.delay,
            '--scale': star.scale,
          }}
        />
      )),
    []
  )

  const handleOpen = () => {
    burstConfetti()
    onOpenClick?.()
  }

  return (
    <motion.section
      className="birthday-shell"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.02 }}
      transition={{ duration: 0.5 }}
    >
      <div className="birthday-orb birthday-orb-left" />
      <div className="birthday-orb birthday-orb-right" />
      <div className="birthday-grid" />

      <motion.div
        className={`birthday-card ${introReady ? 'is-ready' : ''}`}
        initial={{ y: 28, opacity: 0, scale: 0.94 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 80, damping: 14 }}
      >
        <p className="birthday-eyebrow">A surprise made for one person only</p>
        <motion.h1
          className="birthday-title"
          initial={{ y: 18, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.12, duration: 0.7 }}
        >
          Happy Birthday
        </motion.h1>
        <motion.h2
          className="birthday-name"
          initial={{ y: 22, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          Gimzy
        </motion.h2>
        <motion.p
          className="birthday-copy"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Open the box, step into the reveal, and walk through a room full of love,
          motion, and memories.
        </motion.p>

        <motion.button
          type="button"
          className="open-button"
          onClick={handleOpen}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
        >
          <span>Touch to Open</span>
          <span aria-hidden="true">🎁</span>
        </motion.button>
      </motion.div>

      <div className="star-layer" aria-hidden="true">
        {starNodes}
      </div>
    </motion.section>
  )
}
