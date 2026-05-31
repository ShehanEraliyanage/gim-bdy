import { useState, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import AuroraBackground from '../three/AuroraBackground'
import GiftBox from '../three/GiftBox'
import ParticleExplosion from '../three/ParticleExplosion'
import { fireConfettiBurst, fireConfettiSides } from '../ui/ConfettiBlast'

function SceneContent({ onUnwrapStart, onUnwrapComplete }) {
  const [exploding, setExploding] = useState(false)

  const handleUnwrapStart = () => {
    onUnwrapStart?.()
    setExploding(true)
    fireConfettiBurst({ particleCount: 200, spread: 120, startVelocity: 55 })
    fireConfettiSides()
  }

  const handleUnwrapComplete = () => {
    setTimeout(() => onUnwrapComplete?.(), 1200)
  }

  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[4, 6, 3]} intensity={1.2} color="#ffffff" />
      <pointLight position={[-3, 2, 2]} intensity={1.5} color="#FFD700" />
      <pointLight position={[3, -1, 1]} intensity={0.8} color="#8B5CF6" />

      <AuroraBackground />

      <group position={[0, -0.2, 0]}>
        <GiftBox
          onUnwrapStart={handleUnwrapStart}
          onUnwrapComplete={handleUnwrapComplete}
          interactive={!exploding}
        />
        <ParticleExplosion active={exploding} />
      </group>

      <EffectComposer>
        <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} intensity={1.2} />
        <Vignette eskil={false} offset={0.1} darkness={0.7} />
      </EffectComposer>
    </>
  )
}

export default function GiftScene({ onComplete }) {
  const [flash, setFlash] = useState(false)

  const handleUnwrapStart = () => {
    setTimeout(() => setFlash(true), 1800)
  }

  const handleUnwrapComplete = () => {
    setTimeout(() => onComplete?.(), 600)
  }

  return (
    <motion.section
      className="scene"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      aria-label="Gift unwrap"
    >
      <Canvas
        className="gift-scene-canvas"
        camera={{ position: [0, 1.2, 4], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <SceneContent
            onUnwrapStart={handleUnwrapStart}
            onUnwrapComplete={handleUnwrapComplete}
          />
        </Suspense>
      </Canvas>

      {!flash && (
        <p className="gift-scene-hint">Tap the gift to unwrap ✨</p>
      )}

      <AnimatePresence>
        {flash && (
          <motion.div
            className="white-flash"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.8, times: [0, 0.3, 1] }}
          />
        )}
      </AnimatePresence>
    </motion.section>
  )
}
