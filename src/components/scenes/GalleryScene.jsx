import { useCallback } from 'react'
import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCoverflow, Navigation, Pagination, Keyboard } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import { useImageUrls } from '../../hooks/useAssets'
import ParticleField from '../ui/ParticleField'
import FloatingBalloons from '../ui/FloatingBalloons'

export default function GalleryScene({ onStartOver }) {
  const images = useImageUrls()

  const handleStartOver = useCallback(() => {
    onStartOver?.()
  }, [onStartOver])

  return (
    <motion.section
      className="scene gallery-scene"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      aria-label="Photo memories gallery"
    >
      <div className="scene__bg">
        <ParticleField variant="confetti" density={80} />
        <FloatingBalloons variant="hearts" count={6} />
      </div>

      <div className="scene__content">
        <motion.header
          className="gallery-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <h2>Our Memories</h2>
          <p>Every moment with you is a treasure</p>
        </motion.header>

        {images.length > 0 ? (
          <motion.div
            className="swiper-container"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
          >
            <Swiper
              effect="coverflow"
              grabCursor
              centeredSlides
              slidesPerView="auto"
              coverflowEffect={{
                rotate: 40,
                stretch: 0,
                depth: 120,
                modifier: 1,
                slideShadows: true,
              }}
              pagination={{ clickable: true }}
              navigation
              keyboard={{ enabled: true }}
              modules={[EffectCoverflow, Navigation, Pagination, Keyboard]}
              className="gallery-swiper"
            >
              {images.map((src, index) => (
                <SwiperSlide key={`${src}-${index}`} className="swiper-slide-photo">
                  <img src={src} alt="" loading="lazy" />
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        ) : (
          <div className="gallery-empty glass-card">
            <p>No photos yet — add PNG files to</p>
            <code>public/images/</code>
          </div>
        )}

        <motion.div
          className="gallery-controls"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <button type="button" className="cta-button cta-button--secondary" onClick={handleStartOver}>
            Start Over
          </button>
        </motion.div>
      </div>
    </motion.section>
  )
}
