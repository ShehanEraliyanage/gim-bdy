import { useMemo } from 'react'
import { motion } from 'framer-motion'

const BALLOON_COLORS = ['#FF6B9D', '#FFD700', '#8B5CF6', '#22D3EE', '#FF4757', '#FFA502']

function seededRandom(seed) {
  const value = Math.sin(seed * 12.9898) * 43758.5453
  return value - Math.floor(value)
}

function Balloon({ color, left, delay, duration, size = 48 }) {
  return (
    <motion.div
      aria-hidden="true"
      initial={{ y: '110vh', opacity: 0, x: 0 }}
      animate={{
        y: '-20vh',
        opacity: [0, 1, 1, 0],
        x: [0, 20, -15, 10],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      style={{
        position: 'absolute',
        left: `${left}%`,
        bottom: 0,
        width: size,
        height: size * 1.25,
        pointerEvents: 'none',
        zIndex: 1,
      }}
    >
      <svg viewBox="0 0 48 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="24" cy="24" rx="20" ry="24" fill={color} opacity="0.9" />
        <ellipse cx="18" cy="18" rx="6" ry="8" fill="white" opacity="0.25" />
        <path d="M24 48 Q22 54 24 58" stroke={color} strokeWidth="1.5" fill="none" />
      </svg>
    </motion.div>
  )
}

function Heart({ left, delay, duration }) {
  return (
    <motion.div
      aria-hidden="true"
      initial={{ y: '100vh', opacity: 0, scale: 0.5 }}
      animate={{
        y: '-10vh',
        opacity: [0, 0.8, 0.8, 0],
        scale: [0.5, 1, 1, 0.8],
        rotate: [0, 15, -10, 5],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      style={{
        position: 'absolute',
        left: `${left}%`,
        bottom: 0,
        fontSize: '1.5rem',
        pointerEvents: 'none',
        zIndex: 1,
      }}
    >
      ❤️
    </motion.div>
  )
}

export default function FloatingBalloons({ variant = 'balloons', count = 8 }) {
  const items = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: 5 + (i * 90) / count + seededRandom(i + 1) * 8,
        delay: i * 0.8 + seededRandom(i + 2) * 2,
        duration: 8 + seededRandom(i + 3) * 4,
        color: BALLOON_COLORS[i % BALLOON_COLORS.length],
        size: 36 + seededRandom(i + 4) * 24,
      })),
    [count],
  )

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      {items.map((item) =>
        variant === 'hearts' ? (
          <Heart key={item.id} left={item.left} delay={item.delay} duration={item.duration} />
        ) : (
          <Balloon
            key={item.id}
            color={item.color}
            left={item.left}
            delay={item.delay}
            duration={item.duration}
            size={item.size}
          />
        ),
      )}
    </div>
  )
}
