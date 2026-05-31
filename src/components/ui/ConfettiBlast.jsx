import confetti from 'canvas-confetti'

export function fireConfettiBurst(options = {}) {
  const defaults = {
    particleCount: 150,
    spread: 100,
    startVelocity: 45,
    origin: { y: 0.6 },
    colors: ['#FFD700', '#FF6B9D', '#8B5CF6', '#22D3EE', '#FFA502'],
  }

  confetti({ ...defaults, ...options })
}

export function fireConfettiSides() {
  const count = 120
  const defaults = {
    origin: { y: 0.7 },
    colors: ['#FFD700', '#FF6B9D', '#8B5CF6', '#22D3EE'],
  }

  confetti({
    ...defaults,
    particleCount: count,
    angle: 60,
    spread: 55,
    origin: { x: 0, y: 0.65 },
  })

  confetti({
    ...defaults,
    particleCount: count,
    angle: 120,
    spread: 55,
    origin: { x: 1, y: 0.65 },
  })
}

export function fireConfettiRain(duration = 3000) {
  const end = Date.now() + duration

  const frame = () => {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0 },
      colors: ['#FFD700', '#FF6B9D', '#8B5CF6'],
    })
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0 },
      colors: ['#FFD700', '#FF6B9D', '#8B5CF6'],
    })

    if (Date.now() < end) {
      requestAnimationFrame(frame)
    }
  }

  frame()
}
