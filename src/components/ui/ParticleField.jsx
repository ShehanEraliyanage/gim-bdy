import { useCallback, useMemo } from 'react'
import Particles from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'

export default function ParticleField({ variant = 'stars', density = 200 }) {
  const init = useCallback(async (engine) => {
    await loadSlim(engine)
  }, [])

  const options = useMemo(() => {
    if (variant === 'confetti') {
      return {
        fullScreen: { enable: false },
        fpsLimit: 60,
        particles: {
          number: { value: density },
          color: { value: ['#FFD700', '#FF6B9D', '#8B5CF6', '#22D3EE', '#FFA502'] },
          shape: { type: ['circle', 'square'] },
          opacity: { value: { min: 0.3, max: 0.8 } },
          size: { value: { min: 2, max: 6 } },
          move: {
            enable: true,
            direction: 'bottom',
            speed: { min: 1, max: 3 },
            outModes: { default: 'out' },
          },
          rotate: {
            value: { min: 0, max: 360 },
            animation: { enable: true, speed: 20 },
          },
        },
        detectRetina: true,
      }
    }

    return {
      fullScreen: { enable: false },
      fpsLimit: 60,
      background: { color: 'transparent' },
      particles: {
        number: { value: density },
        color: { value: '#ffffff' },
        shape: { type: 'circle' },
        opacity: {
          value: { min: 0.2, max: 0.8 },
          animation: { enable: true, speed: 1, sync: false },
        },
        size: { value: { min: 1, max: 3 } },
        move: {
          enable: true,
          speed: { min: 0.2, max: 0.8 },
          direction: 'none',
          random: true,
          outModes: { default: 'out' },
        },
      },
      detectRetina: true,
    }
  }, [variant, density])

  return (
    <Particles
      id={`particles-${variant}`}
      init={init}
      options={options}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
      }}
    />
  )
}
