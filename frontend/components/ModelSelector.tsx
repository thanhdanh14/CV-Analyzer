'use client'

import { useEffect, useState } from 'react'

interface Model {
  id: string
  name: string
  provider: string
  description: string
  icon: string
}

interface ModelSelectorProps {
  selectedModel: string
  onModelChange: (modelId: string) => void
}

export default function ModelSelector({ selectedModel, onModelChange }: ModelSelectorProps) {
  const [models, setModels] = useState<Model[]>([])
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
    fetch(`${API_URL}/models`)
      .then(res => res.json())
      .then(data => setModels(data.models || []))
      .catch(err => console.error('Error loading models:', err))
  }, [])

  const currentModel = models.find((m: Model) => m.id === selectedModel)

  return (
    <div className="max-w-2xl mx-auto mb-6 animate-fade-in">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        🤖 Chọn AI Model
      </label>
      
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-xl p-4 flex items-center justify-between hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-300 shadow-md hover:shadow-lg"
        >
          <div className="flex items-center gap-3">
            <span className="text-3xl">{currentModel?.icon || '⚡'}</span>
            <div className="text-left">
              <div className="font-semibold text-gray-800 dark:text-gray-100">
                {currentModel?.name || 'Chọn model'}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {currentModel?.description || 'Chọn AI model để phân tích CV'}
              </div>
            </div>
          </div>
          <svg
            className={`w-5 h-5 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isOpen && (
          <div className="absolute z-20 w-full mt-2 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl shadow-2xl overflow-hidden animate-slide-down">
            {models.map((model) => (
              <button
                key={model.id}
                onClick={() => {
                  onModelChange(model.id)
                  setIsOpen(false)
                }}
                className={`
                  w-full p-4 flex items-center gap-3 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors
                  ${selectedModel === model.id ? 'bg-blue-100 dark:bg-blue-900/50' : ''}
                `}
              >
                <span className="text-3xl">{model.icon}</span>
                <div className="flex-1 text-left">
                  <div className="font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2">
                    {model.name}
                    {selectedModel === model.id && (
                      <span className="text-blue-500">✓</span>
                    )}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {model.description}
                  </div>
                  <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                    Provider: {model.provider}
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
