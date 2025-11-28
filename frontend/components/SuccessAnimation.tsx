'use client'

import { useEffect, useState } from 'react'

interface SuccessAnimationProps {
  onClose: () => void
}

export default function SuccessAnimation({ onClose }: SuccessAnimationProps) {
  const [show, setShow] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false)
      setTimeout(onClose, 300)
    }, 3000)

    return () => clearTimeout(timer)
  }, [onClose])

  if (!show) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-gray-800 rounded-3xl p-12 shadow-2xl text-center animate-bounce-in max-w-md">
        <div className="text-8xl mb-4 animate-wiggle">
          🐮
        </div>
        <div className="text-6xl mb-4 animate-wiggle" style={{ animationDelay: '0.2s' }}>
          😺
        </div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-2">
          Phân tích thành công!
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Bò và Mèo đã hoàn thành công việc! 🎉
        </p>
        <div className="mt-6 flex justify-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  )
}
