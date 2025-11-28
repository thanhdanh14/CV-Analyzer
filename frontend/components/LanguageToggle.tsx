'use client'

import { useEffect, useState } from 'react'

export type Language = 'vi' | 'ko'

interface LanguageToggleProps {
  language: Language
  onLanguageChange: (lang: Language) => void
}

export default function LanguageToggle({ language, onLanguageChange }: LanguageToggleProps) {
  return (
    <div className="fixed top-6 right-20 z-50 flex gap-2">
      <button
        onClick={() => onLanguageChange('vi')}
        className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
          language === 'vi'
            ? 'bg-blue-600 text-white shadow-lg scale-110'
            : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:scale-105'
        }`}
        title="Tiếng Việt"
      >
        🇻🇳 VI
      </button>
      <button
        onClick={() => onLanguageChange('ko')}
        className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
          language === 'ko'
            ? 'bg-blue-600 text-white shadow-lg scale-110'
            : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:scale-105'
        }`}
        title="한국어"
      >
        🇰🇷 KO
      </button>
    </div>
  )
}
