import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const PARTICLE_COUNT = 3000
const COLORS = ['#FFD700', '#FF6B9D', '#8B5CF6', '#22D3EE', '#FF4757', '#FFA502']

export default function ParticleExplosion({ active }) {
  const meshRef = useRef()
  const velocities = useRef(null)
  const lifetimes = useRef(null)
  const initialized = useRef(false)
  const dummy = useRef(new THREE.Object3D())

  useEffect(() => {
    if (!active || !meshRef.current) return

    initialized.current = true
    velocities.current = new Float32Array(PARTICLE_COUNT * 3)
    lifetimes.current = new Float32Array(PARTICLE_COUNT)

    const mesh = meshRef.current
    const color = new THREE.Color()

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const speed = 2 + Math.random() * 6

      velocities.current[i * 3] = Math.sin(phi) * Math.cos(theta) * speed
      velocities.current[i * 3 + 1] = Math.sin(phi) * Math.sin(theta) * speed + 2
      velocities.current[i * 3 + 2] = Math.cos(phi) * speed

      lifetimes.current[i] = 0.8 + Math.random() * 1.5

      dummy.current.position.set(0, 0.5, 0)
      dummy.current.scale.setScalar(0.5)
      dummy.current.updateMatrix()
      mesh.setMatrixAt(i, dummy.current.matrix)

      color.set(COLORS[i % COLORS.length])
      mesh.setColorAt(i, color)
    }

    mesh.instanceMatrix.needsUpdate = true
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true
  }, [active])

  useFrame((_, delta) => {
    if (!active || !initialized.current || !meshRef.current || !velocities.current) return

    const mesh = meshRef.current

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      lifetimes.current[i] -= delta
      const i3 = i * 3

      if (lifetimes.current[i] > 0) {
        dummy.current.position.x += velocities.current[i3] * delta
        dummy.current.position.y += velocities.current[i3 + 1] * delta
        dummy.current.position.z += velocities.current[i3 + 2] * delta

        velocities.current[i3 + 1] -= 5 * delta

        const scale = Math.max(0.02, lifetimes.current[i] * 0.35)
        dummy.current.scale.setScalar(scale)
      } else {
        dummy.current.scale.setScalar(0)
      }

      dummy.current.updateMatrix()
      mesh.setMatrixAt(i, dummy.current.matrix)
    }

    mesh.instanceMatrix.needsUpdate = true
  })

  if (!active) return null

  return (
    <instancedMesh ref={meshRef} args={[null, null, PARTICLE_COUNT]} frustumCulled={false}>
      <sphereGeometry args={[0.05, 8, 8]} />
      <meshBasicMaterial vertexColors toneMapped={false} />
    </instancedMesh>
  )
}
