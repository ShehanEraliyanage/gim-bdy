import { useCallback, useEffect, useRef, useState } from 'react'
import { Howl } from 'howler'
import { AudioContext } from '../../context/AudioContext'

const FADE_MS = 800
const DEFAULT_VOLUME = 0.7

export function AudioProvider({ musicUrls, children }) {
  const howlsRef = useRef([])
  const currentIndexRef = useRef(0)
  const activeHowlRef = useRef(null)
  const startedRef = useRef(false)
  const pendingStartRef = useRef(false)
  const playTrackRef = useRef(null)
  const mutedRef = useRef(false)

  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(false)

  const playTrack = useCallback((index, { fadeIn = true } = {}) => {
    const howls = howlsRef.current
    if (!howls.length) return

    const nextIndex = index % howls.length
    const prev = activeHowlRef.current

    if (prev) {
      const prevHowl = prev
      prevHowl.fade(prevHowl.volume(), 0, FADE_MS)
      setTimeout(() => prevHowl.stop(), FADE_MS)
    }

    const howl = howls[nextIndex]
    currentIndexRef.current = nextIndex
    activeHowlRef.current = howl

    howl.volume(fadeIn ? 0 : mutedRef.current ? 0 : DEFAULT_VOLUME)
    howl.play()

    if (!mutedRef.current) {
      howl.fade(0, DEFAULT_VOLUME, FADE_MS)
    }

    setPlaying(true)

    howl.once('end', () => {
      if (activeHowlRef.current === howl) {
        playTrackRef.current?.(nextIndex + 1)
      }
    })
  }, [])

  useEffect(() => {
    playTrackRef.current = playTrack
  }, [playTrack])

  const beginPlayback = useCallback(() => {
    if (startedRef.current || !howlsRef.current.length) return false
    startedRef.current = true
    pendingStartRef.current = false
    playTrack(0)
    return true
  }, [playTrack])

  useEffect(() => {
    howlsRef.current.forEach((h) => h.unload())
    howlsRef.current = []
    currentIndexRef.current = 0
    activeHowlRef.current = null
    startedRef.current = false
    pendingStartRef.current = false

    if (!musicUrls?.length) return

    howlsRef.current = musicUrls.map(
      (src) =>
        new Howl({
          src: [src],
          html5: true,
          volume: 0,
          preload: true,
          onloaderror: (_id, err) => {
            console.warn('Failed to load music:', src, err)
          },
          onplayerror: (_id, err) => {
            console.warn('Failed to play music:', src, err)
          },
        }),
    )

    if (pendingStartRef.current) {
      beginPlayback()
    }

    return () => {
      howlsRef.current.forEach((h) => h.unload())
      howlsRef.current = []
    }
  }, [musicUrls, beginPlayback])

  const start = useCallback(() => {
    if (startedRef.current) return
    if (!howlsRef.current.length) {
      pendingStartRef.current = true
      return
    }
    beginPlayback()
  }, [beginPlayback])

  const toggle = useCallback(() => {
    const howl = activeHowlRef.current
    if (!howl) {
      start()
      return
    }

    if (howl.playing()) {
      howl.fade(howl.volume(), 0, FADE_MS)
      setTimeout(() => howl.pause(), FADE_MS)
      setPlaying(false)
    } else {
      howl.play()
      if (!mutedRef.current) howl.fade(howl.volume(), DEFAULT_VOLUME, FADE_MS)
      setPlaying(true)
    }
  }, [start])

  const toggleMute = useCallback(() => {
    mutedRef.current = !mutedRef.current
    setMuted(mutedRef.current)
    const howl = activeHowlRef.current
    if (howl) {
      howl.volume(mutedRef.current ? 0 : DEFAULT_VOLUME)
    }
  }, [])

  const skip = useCallback(() => {
    if (!howlsRef.current.length) return
    playTrack(currentIndexRef.current + 1)
  }, [playTrack])

  const value = {
    playing,
    muted,
    hasMusic: musicUrls.length > 0,
    start,
    toggle,
    toggleMute,
    skip,
  }

  return <AudioContext.Provider value={value}>{children}</AudioContext.Provider>
}
