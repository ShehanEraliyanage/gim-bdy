import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import GiftUnwrap from './GiftUnwrap'
import PhotoCarousel3D from './PhotoCarousel3D'
import { SoundManager } from '../utils/SoundManager'
import '../styles/GiftScene.css'

export default function GiftScene({ showPhotos, onUnwrapComplete, onRestart }) {
  const containerRef = useRef(null)
  const sceneRef = useRef(null)
  const cameraRef = useRef(null)
  const rendererRef = useRef(null)
  const giftUnwrapRef = useRef(null)
  const soundManagerRef = useRef(null)
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    if (!containerRef.current) return

    // Initialize Three.js scene
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x1a1a2e)
    sceneRef.current = scene

    // Setup camera
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    )
    camera.position.z = 5
    cameraRef.current = camera

    // Setup renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFShadowMap
    containerRef.current.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
    directionalLight.position.set(5, 5, 5)
    directionalLight.castShadow = true
    directionalLight.shadow.mapSize.width = 2048
    directionalLight.shadow.mapSize.height = 2048
    scene.add(directionalLight)

    // Initialize Sound Manager
    soundManagerRef.current = new SoundManager()

    // Initialize Gift Unwrap
    giftUnwrapRef.current = new GiftUnwrap(scene, camera, renderer, onUnwrapComplete)

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return
      const width = containerRef.current.clientWidth
      const height = containerRef.current.clientHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }

    window.addEventListener('resize', handleResize)

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)
      
      if (giftUnwrapRef.current) {
        giftUnwrapRef.current.update()
      }

      renderer.render(scene, camera)
    }

    animate()
    setIsInitialized(true)

    return () => {
      window.removeEventListener('resize', handleResize)
      if (containerRef.current && renderer.domElement.parentNode === containerRef.current) {
        containerRef.current.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [onUnwrapComplete])

  return (
    <div className="gift-scene-container">
      <div ref={containerRef} className="three-canvas-container" />
      
      {showPhotos && (
        <PhotoCarousel3D
          soundManager={soundManagerRef.current}
          onRestart={onRestart}
        />
      )}

      {!showPhotos && (
        <div className="gift-instructions">
          <p>Click on the gift to unwrap it!</p>
        </div>
      )}
    </div>
  )
}
