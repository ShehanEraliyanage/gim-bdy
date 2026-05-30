import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import '../styles/PhotoCarousel3D.css'

const fallbackPhotoPaths = ['/images/download.png', '/images/4.png', '/images/5.png']

function createLabel(path) {
  const fileName = path.split('/').pop() || 'memory'
  return fileName.replace(/\.[^.]+$/, '').replace(/[-_]+/g, ' ')
}

function loadImage(path) {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.onload = () => resolve(path)
    image.onerror = reject
    image.src = path
  })
}

export default function PhotoCarousel3D({ onRestart }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [photos, setPhotos] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let active = true

    const loadPhotos = async () => {
      const importedPhotos = Object.entries(
        import.meta.glob('../assets/photos/*.{png,jpg,jpeg,webp,avif,gif}', {
          eager: true,
          import: 'default',
        })
      ).map(([path, src]) => ({
        src,
        label: createLabel(path),
      }))

      const candidates = importedPhotos.length > 0
        ? importedPhotos
        : fallbackPhotoPaths.map((src) => ({ src, label: createLabel(src) }))

      const validated = []

      for (const candidate of candidates) {
        try {
          await loadImage(candidate.src)
          validated.push(candidate)
        } catch {
          // Ignore broken files and continue to the next one.
        }
      }

      if (!active) {
        return
      }

      if (validated.length > 0) {
        setPhotos(validated)
      } else {
        setPhotos(
          Array.from({ length: 5 }, (_, index) => ({
            label: `Memory ${index + 1}`,
            text: index === 0 ? 'Happy Birthday Gimzy' : 'A beautiful moment to remember',
          }))
        )
      }

      setIsLoading(false)
    }

    loadPhotos()

    return () => {
      active = false
    }
  }, [])

  useEffect(() => {
    if (photos.length > 1) {
      const interval = window.setInterval(() => {
        setCurrentIndex((value) => (value + 1) % photos.length)
      }, 6500)

      return () => window.clearInterval(interval)
    }

    return undefined
  }, [photos.length])

  useEffect(() => {
    if (!isLoading && photos.length > 0) {
      confetti({
        particleCount: 120,
        spread: 80,
        startVelocity: 28,
        origin: { y: 0.72 },
        colors: ['#ffd166', '#ff5fa2', '#7dd3fc', '#c4b5fd'],
      })
    }
  }, [isLoading, photos.length])

  const currentPhoto = photos[currentIndex] || null

  const jumpToPhoto = (nextIndex) => {
    if (photos.length === 0) {
      return
    }

    const boundedIndex = (nextIndex + photos.length) % photos.length
    setCurrentIndex(boundedIndex)
  }

  const handleWheel = (event) => {
    if (event.deltaY > 0) {
      jumpToPhoto(currentIndex + 1)
    } else {
      jumpToPhoto(currentIndex - 1)
    }
  }

  const deck = useMemo(
    () =>
      photos.map((photo, index) => ({
        ...photo,
        isActive: index === currentIndex,
      })),
    [currentIndex, photos]
  )

  if (isLoading) {
    return <div className="gallery-loader">Loading memories...</div>
  }

  return (
    <motion.section
      className="gallery-shell"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.45 }}
      onWheel={handleWheel}
    >
      <div className="gallery-glow gallery-glow-left" />
      <div className="gallery-glow gallery-glow-right" />

      <motion.header className="gallery-header" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <p className="gallery-eyebrow">The surprise room</p>
        <h3>Every frame is a small birthday memory</h3>
        <p>
          Swipe, scroll, or tap through the moments. This is the part where the room turns into a memory wall.
        </p>
      </motion.header>

      <div className="gallery-stage">
        <button type="button" className="gallery-nav gallery-nav-left" onClick={() => jumpToPhoto(currentIndex - 1)}>
          <span>←</span>
        </button>

        <AnimatePresence mode="wait">
          <motion.article
            key={currentPhoto?.src || currentPhoto?.label || currentIndex}
            className="memory-card"
            initial={{ opacity: 0, scale: 0.94, y: 20, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: -18, rotate: 2 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            whileHover={{ scale: 1.01 }}
          >
            {currentPhoto?.src ? (
              <img className="memory-image" src={currentPhoto.src} alt={currentPhoto.label} />
            ) : (
              <div className="memory-text">
                <span>{currentPhoto?.text || 'Happy Birthday Gimzy'}</span>
              </div>
            )}

            <div className="memory-caption">
              <span>{currentPhoto?.label || `Memory ${currentIndex + 1}`}</span>
            </div>
          </motion.article>
        </AnimatePresence>

        <button type="button" className="gallery-nav gallery-nav-right" onClick={() => jumpToPhoto(currentIndex + 1)}>
          <span>→</span>
        </button>
      </div>

      <div className="gallery-strip">
        {deck.map((photo, index) => (
          <button
            type="button"
            key={`${photo.label}-${index}`}
            className={`strip-card ${photo.isActive ? 'is-active' : ''}`}
            onClick={() => jumpToPhoto(index)}
          >
            <span className="strip-index">{String(index + 1).padStart(2, '0')}</span>
            <span className="strip-label">{photo.label}</span>
          </button>
        ))}
      </div>

      <div className="gallery-footer">
        <div className="gallery-counter">
          {currentIndex + 1} / {photos.length}
        </div>

        <button type="button" className="gallery-restart" onClick={onRestart}>
          Replay the surprise
        </button>
      </div>
    </motion.section>
  )
}
