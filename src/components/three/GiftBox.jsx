import { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import gsap from 'gsap'

const COLORS = ['#FFD700', '#FF6B9D', '#8B5CF6', '#22D3EE', '#FF4757', '#FFA502']

export default function GiftBox({ onUnwrapStart, onUnwrapComplete, interactive = true }) {
  const groupRef = useRef()
  const lidRef = useRef()
  const ribbonVRef = useRef()
  const ribbonHRef = useRef()
  const bowRef = useRef()
  const unwrappingRef = useRef(false)

  useFrame((_, delta) => {
    if (groupRef.current && !unwrappingRef.current) {
      groupRef.current.rotation.y += delta * 0.4
      groupRef.current.position.y = Math.sin(Date.now() * 0.001) * 0.08
    }
  })

  const handleClick = () => {
    if (!interactive || unwrappingRef.current) return
    unwrappingRef.current = true
    onUnwrapStart?.()

    const tl = gsap.timeline({
      onComplete: () => {
        setTimeout(() => onUnwrapComplete?.(), 400)
      },
    })

    tl.to([ribbonVRef.current.scale, ribbonHRef.current.scale, bowRef.current.scale], {
      x: 0,
      y: 0,
      z: 0,
      duration: 0.5,
      ease: 'power2.in',
    })
      .to(
        lidRef.current.position,
        {
          y: 2.5,
          duration: 1.2,
          ease: 'elastic.out(1, 0.4)',
        },
        '-=0.2',
      )
      .to(
        lidRef.current.rotation,
        {
          x: -Math.PI * 0.5,
          z: 0.3,
          duration: 1.2,
          ease: 'elastic.out(1, 0.4)',
        },
        '<',
      )
      .to(
        groupRef.current.scale,
        {
          x: 1.15,
          y: 1.15,
          z: 1.15,
          duration: 0.4,
          ease: 'power2.out',
        },
        '-=0.8',
      )
  }

  const boxMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#8B5CF6',
        metalness: 0.3,
        roughness: 0.4,
        emissive: '#4c1d95',
        emissiveIntensity: 0.3,
      }),
    [],
  )

  const lidMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#FF6B9D',
        metalness: 0.4,
        roughness: 0.35,
        emissive: '#be185d',
        emissiveIntensity: 0.25,
      }),
    [],
  )

  const ribbonMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#FFD700',
        metalness: 0.6,
        roughness: 0.2,
        emissive: '#FFD700',
        emissiveIntensity: 0.2,
      }),
    [],
  )

  useEffect(() => {
    return () => {
      boxMaterial.dispose()
      lidMaterial.dispose()
      ribbonMaterial.dispose()
    }
  }, [boxMaterial, lidMaterial, ribbonMaterial])

  return (
    <group ref={groupRef} onClick={handleClick}>
      <mesh material={boxMaterial} castShadow receiveShadow>
        <boxGeometry args={[1.4, 1.2, 1.4]} />
      </mesh>

      <group ref={lidRef} position={[0, 0.65, 0]}>
        <mesh material={lidMaterial} castShadow>
          <boxGeometry args={[1.5, 0.25, 1.5]} />
        </mesh>
      </group>

      <mesh ref={ribbonVRef} material={ribbonMaterial} position={[0, 0, 0]}>
        <boxGeometry args={[0.15, 1.45, 1.45]} />
      </mesh>

      <mesh ref={ribbonHRef} material={ribbonMaterial} position={[0, 0, 0]}>
        <boxGeometry args={[1.45, 1.45, 0.15]} />
      </mesh>

      <group ref={bowRef} position={[0, 0.78, 0]}>
        <mesh material={ribbonMaterial} position={[-0.2, 0, 0]} rotation={[0, 0, 0.4]}>
          <torusGeometry args={[0.15, 0.05, 8, 16, Math.PI]} />
        </mesh>
        <mesh material={ribbonMaterial} position={[0.2, 0, 0]} rotation={[0, 0, -0.4]}>
          <torusGeometry args={[0.15, 0.05, 8, 16, Math.PI]} />
        </mesh>
        <mesh material={ribbonMaterial}>
          <sphereGeometry args={[0.1, 16, 16]} />
        </mesh>
      </group>

      <pointLight position={[0, 1, 1]} intensity={2} color={COLORS[0]} distance={4} />
    </group>
  )
}
