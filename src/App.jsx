import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import BirthdayScreen from './components/BirthdayScreen'
import GiftScene from './components/GiftScene'
import './App.css'

function App() {
  const [stage, setStage] = useState('intro')
  const [showPhotos, setShowPhotos] = useState(false)

  const handleOpenPresent = () => {
    setStage('reveal')
  }

  const handleUnwrapComplete = () => {
    setShowPhotos(true)
    setStage('gallery')
  }

  const handleRestart = () => {
    setStage('intro')
    setShowPhotos(false)
  }

  return (
    <main className="app-shell">
      <AnimatePresence mode="wait">
        {stage === 'intro' ? (
          <BirthdayScreen key="intro" onOpenClick={handleOpenPresent} />
        ) : (
          <GiftScene
            key="scene"
            showPhotos={showPhotos}
            onUnwrapComplete={handleUnwrapComplete}
            onRestart={handleRestart}
          />
        )}
      </AnimatePresence>
    </main>
  )
}

export default App
