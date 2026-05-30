import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { Environment, PerspectiveCamera, Sparkles } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import GiftUnwrap from './GiftUnwrap'
import PhotoCarousel3D from './PhotoCarousel3D'
import '../styles/GiftScene.css'

export default function GiftScene({ showPhotos, onUnwrapComplete, onRestart }) {
  const [giftOpened, setGiftOpened] = useState(false)

  const handleRequestOpen = () => {
    setGiftOpened(true)
  }

  const handleRevealComplete = () => {
    onUnwrapComplete?.()
  }

  return (
    <motion.section
      className="gift-scene"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45 }}
    >
      <Canvas dpr={[1, 1.75]} shadows>
        <PerspectiveCamera makeDefault position={[0, 0.2, 7]} fov={40} />
        <color attach="background" args={['#090b18']} />
        <fog attach="fog" args={['#090b18', 6, 15]} />

        <ambientLight intensity={0.9} />
        <directionalLight position={[4, 8, 5]} intensity={2.2} castShadow />
        <pointLight position={[-4, -1, 3]} intensity={1.6} color="#ff88d1" />
        <spotLight position={[0, 7, 6]} angle={0.4} intensity={18} penumbra={1} color="#ffd166" />

        <Sparkles count={120} scale={[12, 8, 12]} size={2.5} speed={0.35} color="#ffe37d" />

        <GiftUnwrap
          opened={giftOpened}
          onRequestOpen={handleRequestOpen}
          onRevealComplete={handleRevealComplete}
        />

        <Environment preset="night" />

        <EffectComposer>
          <Bloom intensity={1.45} luminanceThreshold={0.15} luminanceSmoothing={0.25} />
          <Vignette eskil={false} offset={0.18} darkness={0.95} />
        </EffectComposer>
      </Canvas>

      <AnimatePresence>
        {!giftOpened && (
          <motion.div
            className="gift-hud"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
          >
            <p>Tap the gift to unlock the surprise</p>
            <button type="button" className="gift-action" onClick={handleRequestOpen}>
              Open the gift
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {giftOpened && !showPhotos && (
          <motion.div
            className="gift-toast"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            The room is opening...
          </motion.div>
        )}
      </AnimatePresence>

      <button type="button" className="restart-button" onClick={onRestart}>
        Restart
      </button>

      <AnimatePresence>{showPhotos ? <PhotoCarousel3D key="gallery" onRestart={onRestart} /> : null}</AnimatePresence>
    </motion.section>
  )
}
