import React, { useEffect, useRef, useState } from 'react'
import '../styles/PhotoCarousel3D.css'

export default function PhotoCarousel3D({ soundManager, onRestart }) {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)
  const [photos, setPhotos] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isMuted, setIsMuted] = useState(false)
  const containerRef = useRef(null)

  useEffect(() => {
    // Load images from assets/photos folder
    // For now, we'll create placeholder images
    loadPlaceholderPhotos()
  }, [])

  useEffect(() => {
    if (soundManager && !isMuted) {
      soundManager.playMusic()
    }
  }, [soundManager, isMuted])

  const loadPlaceholderPhotos = () => {
    // Create placeholder images - user will replace these with actual photos
    const placeholders = [
      'Happy Birthday Gimzy! 🎉',
      'Making memories together 💝',
      'Celebrations and joy! ✨',
      'Wishing you the best! 🎊',
      'Let\'s celebrate! 🎈',
      'With love and cheers! 🥳'
    ]
    
    setPhotos(placeholders)
    setIsLoading(false)
  }

  const handleNextPhoto = () => {
    if (photos.length > 0) {
      setCurrentPhotoIndex((prev) => (prev + 1) % photos.length)
      if (soundManager) {
        soundManager.playTransitionSound()
      }
    }
  }

  const handlePrevPhoto = () => {
    if (photos.length > 0) {
      setCurrentPhotoIndex((prev) => (prev - 1 + photos.length) % photos.length)
      if (soundManager) {
        soundManager.playTransitionSound()
      }
    }
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
    if (soundManager) {
      if (!isMuted) {
        soundManager.pauseMusic()
      } else {
        soundManager.playMusic()
      }
    }
  }

  const handleRestart = () => {
    if (soundManager) {
      soundManager.stopMusic()
    }
    onRestart()
  }

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        handleNextPhoto()
      } else if (e.key === 'ArrowLeft') {
        handlePrevPhoto()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [photos.length])

  if (isLoading) {
    return <div className="photo-carousel loading">Loading photos...</div>
  }

  return (
    <div className="photo-carousel" ref={containerRef}>
      <div className="carousel-container">
        <div className="photos-display">
          {/* Main photo */}
          <div className="main-photo">
            {photos[currentPhotoIndex]}
          </div>

          {/* Thumbnail strip */}
          <div className="thumbnails">
            {photos.map((_, index) => (
              <div
                key={index}
                className={`thumbnail ${index === currentPhotoIndex ? 'active' : ''}`}
                onClick={() => {
                  setCurrentPhotoIndex(index)
                  if (soundManager) soundManager.playTransitionSound()
                }}
              >
                {index + 1}
              </div>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="controls">
          <button className="control-btn prev-btn" onClick={handlePrevPhoto} title="Previous (← arrow)">
            ←
          </button>
          
          <button className="control-btn mute-btn" onClick={toggleMute} title={isMuted ? 'Unmute' : 'Mute'}>
            {isMuted ? '🔇' : '🔊'}
          </button>

          <button className="control-btn next-btn" onClick={handleNextPhoto} title="Next (→ arrow)">
            →
          </button>

          <button className="control-btn restart-btn" onClick={handleRestart} title="Restart">
            ↻
          </button>
        </div>

        {/* Counter */}
        <div className="photo-counter">
          {currentPhotoIndex + 1} / {photos.length}
        </div>
      </div>

      {/* Floating animation background */}
      <div className="floating-elements">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="floating-element"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          >
            ✨
          </div>
        ))}
      </div>
    </div>
  )
}
