import { useState } from 'react'
import './App.css'
import BirthdayScreen from './components/BirthdayScreen'
import GiftScene from './components/GiftScene'

function App() {
  const [isGiftOpened, setIsGiftOpened] = useState(false)
  const [showPhotos, setShowPhotos] = useState(false)

  const handleOpenPresent = () => {
    setIsGiftOpened(true)
  }

  const handleUnwrapComplete = () => {
    setShowPhotos(true)
  }

  const handleRestart = () => {
    setIsGiftOpened(false)
    setShowPhotos(false)
  }

  return (
    <div className="app">
      {!isGiftOpened ? (
        <BirthdayScreen onOpenClick={handleOpenPresent} />
      ) : (
        <GiftScene
          showPhotos={showPhotos}
          onUnwrapComplete={handleUnwrapComplete}
          onRestart={handleRestart}
        />
      )}
    </div>
  )
}

export default App
