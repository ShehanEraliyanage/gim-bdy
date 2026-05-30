import React, { useEffect, useState } from 'react'
import '../styles/BirthdayScreen.css'

export default function BirthdayScreen({ onOpenClick }) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="birthday-container">
      <div className={`birthday-content ${isVisible ? 'fade-in' : ''}`}>
        <h1 className="birthday-title">Happy Birthday</h1>
        <h2 className="birthday-name">Gimzy</h2>
        
        <div className="stars">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="star"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`
              }}
            >
              ★
            </div>
          ))}
        </div>

        <button className="open-button" onClick={onOpenClick}>
          <span className="button-text">Touch to Open</span>
          <span className="button-icon">🎁</span>
        </button>

        <div className="confetti-container">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="confetti"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 1}s`,
                backgroundColor: ['#ff6b6b', '#4ecdc4', '#ffd93d', '#ff006e', '#8338ec'][
                  Math.floor(Math.random() * 5)
                ]
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
