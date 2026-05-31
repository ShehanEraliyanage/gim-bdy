import Typewriter from 'typewriter-effect'

export default function TypewriterText({
  strings = [],
  delay = 60,
  pause = 1200,
  onComplete,
  className = '',
}) {
  return (
    <div className={className} aria-live="polite">
      <Typewriter
        onInit={(typewriter) => {
          strings.forEach((text, i) => {
            typewriter.typeString(text)
            if (i < strings.length - 1) {
              typewriter.pauseFor(pause).deleteAll()
            }
          })
          typewriter.callFunction(() => onComplete?.()).start()
        }}
        options={{
          delay,
          cursor: '|',
          cursorClassName: 'typewriter-cursor',
          wrapperClassName: 'typewriter-wrapper',
        }}
      />
    </div>
  )
}
