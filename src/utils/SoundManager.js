import { Howl } from 'howler'

export class SoundManager {
  constructor() {
    // Create Howl instances for different sounds
    // Note: URLs will be placeholders - user can replace with actual audio files
    
    this.music = new Howl({
      src: ['/sounds/birthday-music.mp3'],
      loop: true,
      volume: 0.5,
      preload: false,
      onloaderror: () => {
        console.log('Background music not found - continuing without music')
      }
    })

    this.transitionSound = new Howl({
      src: ['/sounds/transition.mp3'],
      volume: 0.3,
      preload: false,
      onloaderror: () => {
        console.log('Transition sound not found')
      }
    })

    this.unwrapSound = new Howl({
      src: ['/sounds/unwrap.mp3'],
      volume: 0.4,
      preload: false,
      onloaderror: () => {
        console.log('Unwrap sound not found')
      }
    })
  }

  playMusic() {
    try {
      if (this.music.playing()) {
        return
      }
      this.music.play()
    } catch (e) {
      console.log('Could not play music:', e)
    }
  }

  pauseMusic() {
    try {
      this.music.pause()
    } catch (e) {
      console.log('Could not pause music:', e)
    }
  }

  stopMusic() {
    try {
      this.music.stop()
    } catch (e) {
      console.log('Could not stop music:', e)
    }
  }

  playTransitionSound() {
    try {
      this.transitionSound.play()
    } catch (e) {
      console.log('Could not play transition sound:', e)
    }
  }

  playUnwrapSound() {
    try {
      this.unwrapSound.play()
    } catch (e) {
      console.log('Could not play unwrap sound:', e)
    }
  }

  setMusicVolume(volume) {
    this.music.volume(Math.max(0, Math.min(1, volume)))
  }

  setEffectVolume(volume) {
    const vol = Math.max(0, Math.min(1, volume))
    this.transitionSound.volume(vol)
    this.unwrapSound.volume(vol)
  }

  dispose() {
    try {
      this.music.unload()
      this.transitionSound.unload()
      this.unwrapSound.unload()
    } catch (e) {
      console.log('Could not dispose sounds:', e)
    }
  }
}
