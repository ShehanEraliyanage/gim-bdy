import { useEffect, useRef } from 'react'
import { Float, RoundedBox, Sparkles, Text } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import gsap from 'gsap'

function GiftRibbon() {
  return (
    <group>
      <mesh position={[0, 1.18, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.38, 0.12, 16, 48]} />
        <meshStandardMaterial color="#ffd166" roughness={0.26} metalness={0.5} />
      </mesh>
      <mesh position={[0, 1.18, 0]} rotation={[0, 0, Math.PI / 2]}>
        <boxGeometry args={[0.18, 0.92, 0.18]} />
        <meshStandardMaterial color="#ffd166" roughness={0.28} metalness={0.42} />
      </mesh>
      <mesh position={[0, 1.18, 0]}>
        <boxGeometry args={[0.92, 0.18, 0.18]} />
        <meshStandardMaterial color="#ffd166" roughness={0.28} metalness={0.42} />
      </mesh>
    </group>
  )
}

export default function GiftUnwrap({ opened, onRequestOpen, onRevealComplete }) {
  const rootRef = useRef()
  const lidRef = useRef()
  const bodyRef = useRef()
  const ribbonRef = useRef()
  const shimmerRef = useRef()
  const completedRef = useRef(false)

  useEffect(() => {
    if (!opened || completedRef.current) {
      return undefined
    }

    const timeline = gsap.timeline({
      defaults: { ease: 'power3.inOut' },
      onComplete: () => {
        completedRef.current = true
        onRevealComplete?.()
      },
    })

    timeline.to(bodyRef.current.material, { opacity: 0.72, duration: 0.35 }, 0)
    timeline.to(lidRef.current.position, { y: 2.05, z: 0.7, duration: 0.95 }, 0)
    timeline.to(lidRef.current.rotation, { x: -1.25, y: 0.45, duration: 0.95 }, 0)
    timeline.to(ribbonRef.current.scale, { x: 0.04, y: 0.04, z: 0.04, duration: 0.7 }, 0.08)
    timeline.to(rootRef.current.position, { y: 0.18, duration: 0.65 }, 0.12)
    timeline.to(shimmerRef.current.material, { opacity: 1, duration: 0.55 }, 0.22)
    timeline.to(shimmerRef.current.scale, { x: 2.35, y: 2.35, z: 2.35, duration: 0.9 }, 0.14)

    return () => timeline.kill()
  }, [opened, onRevealComplete])

  useFrame((state, delta) => {
    if (!rootRef.current) {
      return
    }

    const elapsed = state.clock.elapsedTime
    rootRef.current.rotation.y += delta * (opened ? 0.12 : 0.22)
    rootRef.current.rotation.x = Math.sin(elapsed * 0.55) * 0.06
    rootRef.current.position.y = opened ? 0.18 + Math.sin(elapsed * 1.6) * 0.05 : Math.sin(elapsed * 1.8) * 0.12

    if (lidRef.current && opened) {
      lidRef.current.rotation.z = Math.sin(elapsed * 1.8) * 0.03
    }

    if (shimmerRef.current) {
      shimmerRef.current.material.opacity = 0.08 + Math.sin(elapsed * 3.4) * 0.04
    }
  })

  return (
    <Float speed={1.2} rotationIntensity={0.38} floatIntensity={0.9}>
      <group
        ref={rootRef}
        position={[0, -0.1, 0]}
        onClick={(event) => {
          event.stopPropagation()
          if (!opened) {
            onRequestOpen?.()
          }
        }}
      >
        <mesh ref={shimmerRef} position={[0, 0, 0]}>
          <icosahedronGeometry args={[2.38, 0]} />
          <meshStandardMaterial
            color="#ff7ad9"
            emissive="#ff2d8d"
            emissiveIntensity={1.2}
            transparent
            opacity={0.08}
            roughness={0.15}
            metalness={0.1}
          />
        </mesh>

        <RoundedBox ref={bodyRef} args={[2.45, 2.45, 2.45]} radius={0.18} smoothness={6}>
          <meshStandardMaterial color="#ff4fa1" roughness={0.42} metalness={0.18} transparent opacity={1} />
        </RoundedBox>

        <group ref={lidRef} position={[0, 1.32, 0]}>
          <RoundedBox args={[2.6, 0.48, 2.6]} radius={0.16} smoothness={6}>
            <meshStandardMaterial color="#ff74b8" roughness={0.35} metalness={0.15} />
          </RoundedBox>
        </group>

        <group ref={ribbonRef}>
          <GiftRibbon />
        </group>

        <Text position={[0, 2.45, 0]} fontSize={0.28} color="#fff7cc" anchorX="center" anchorY="middle">
          Tap the gift
        </Text>

        <Sparkles count={24} size={2.2} scale={[4, 4, 4]} speed={0.2} color="#ffe06b" />
      </group>
    </Float>
  )
}
