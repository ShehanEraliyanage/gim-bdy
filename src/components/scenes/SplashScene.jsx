import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import AuroraBackground from '../three/AuroraBackground'
import ParticleField from '../ui/ParticleField'

export default function SplashScene({ onComplete }) {
  useEffect(() => {
    const timer = setTimeout(() => onComplete?.(), 3000)
    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <motion.section
      className="scene"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8 }}
      aria-label="Loading surprise"
    >
      <div className="scene__bg">
        <Canvas camera={{ position: [0, 0, 3], fov: 60 }} style={{ width: '100%', height: '100%' }}>
          <Suspense fallback={null}>
            <AuroraBackground />
          </Suspense>
        </Canvas>
        <ParticleField variant="stars" density={180} />
      </div>

      <motion.div
        className="splash-orb"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1.2, 1], opacity: 1 }}
        transition={{ duration: 1.5, ease: [0.34, 1.56, 0.64, 1] }}
        aria-hidden="true"
      />

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
        style={{
          marginTop: '2rem',
          color: 'var(--color-muted)',
          fontSize: '0.95rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
        }}
      >
        Something special awaits...
      </motion.p>
    </motion.section>
  )
}
