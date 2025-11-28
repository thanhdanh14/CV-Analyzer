'use client'

import { useEffect, useState } from 'react'

export default function CatBackground() {
  const [whales, setWhales] = useState<Array<{
    id: number
    x: number
    y: number
    size: number
    rotation: number
    speed: number
  }>>([])

  useEffect(() => {
    const newWhales = Array.from({ length: 5 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 40 + 60,
      rotation: Math.random() * 360,
      speed: Math.random() * 30 + 20,
    }))
    setWhales(newWhales)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-30" style={{ zIndex: 0 }}>
      {whales.map((whale) => (
        <div
          key={whale.id}
          className="absolute"
          style={{
            left: `${whale.x}%`,
            top: `${whale.y}%`,
            width: `${whale.size}px`,
            height: `${whale.size}px`,
            animation: `float ${whale.speed}s ease-in-out infinite`,
            animationDelay: `${whale.id * 2}s`,
          }}
        >
          <svg viewBox="0 0 100 100" style={{ transform: `rotate(${whale.rotation}deg)` }}>
            {/* Cá heo hồng dễ thương */}
            <g>
              {/* Thân */}
              <ellipse cx="50" cy="50" rx="35" ry="25" fill="#FFB6D9" />
              {/* Đầu */}
              <circle cx="25" cy="48" r="18" fill="#FFC9E3" />
              {/* Mắt */}
              <circle cx="22" cy="46" r="2" fill="#FF69B4" />
              {/* Đuôi */}
              <ellipse cx="80" cy="42" rx="10" ry="15" fill="#FFB6D9" transform="rotate(20 80 42)" />
              <ellipse cx="80" cy="58" rx="10" ry="15" fill="#FFB6D9" transform="rotate(-20 80 58)" />
              {/* Phun nước hồng */}
              <line x1="20" y1="35" x2="18" y2="25" stroke="#FFB6D9" strokeWidth="1.5" />
              <line x1="24" y1="34" x2="24" y2="23" stroke="#FFB6D9" strokeWidth="1.5" />
              <circle cx="18" cy="23" r="1.5" fill="#FFB6D9" />
              <circle cx="24" cy="21" r="1.5" fill="#FFB6D9" />
            </g>
          </svg>
        </div>
      ))}
      
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          50% {
            transform: translateY(-15px) translateX(10px);
          }
        }
      `}</style>
    </div>
  )
}
