import { motion } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Suspense } from 'react'
import AuroraBackground from '../three/AuroraBackground'
import GiftBox from '../three/GiftBox'
import ParticleField from '../ui/ParticleField'
import FloatingBalloons from '../ui/FloatingBalloons'
import TypewriterText from '../ui/TypewriterText'

export default function BirthdayScene({ onOpenGift }) {
  return (
    <motion.section
      className="scene"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.7 }}
      aria-label="Birthday greeting"
    >
      <div className="scene__bg">
        <Canvas camera={{ position: [0, 1, 4], fov: 50 }} style={{ width: '100%', height: '100%' }}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 5, 5]} intensity={0.8} />
          <Suspense fallback={null}>
            <AuroraBackground />
          </Suspense>
        </Canvas>
        <ParticleField variant="stars" density={120} />
        <FloatingBalloons count={10} />
      </div>

      <div className="scene__content">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <h1 className="scene__title">
            <TypewriterText
              strings={['Happy Birthday 🎂', 'A surprise just for you ✨']}
              delay={70}
              pause={1500}
            />
          </h1>
        </motion.div>

        <motion.p
          className="scene__subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 0.8 }}
        >
          You mean the world. Tap below to unwrap your gift.
        </motion.p>

        <motion.div
          className="gift-preview-canvas"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5, type: 'spring', stiffness: 120 }}
        >
          <Canvas camera={{ position: [0, 0.5, 3.5], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[3, 5, 2]} intensity={1} />
            <pointLight position={[-2, 2, 2]} intensity={0.5} color="#FFD700" />
            <Suspense fallback={null}>
              <GiftBox interactive={false} />
            </Suspense>
            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1.5} />
          </Canvas>
        </motion.div>

        <motion.button
          className="cta-button"
          onClick={onOpenGift}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
        >
          Open Your Surprise
        </motion.button>
      </div>
    </motion.section>
  )
}
