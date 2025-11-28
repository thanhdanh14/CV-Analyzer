'use client'

import { useCallback, useState, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'

interface UploadSectionProps {
  onUpload: (file: File) => void
  loading: boolean
  resetTrigger?: number
}

export default function UploadSection({ onUpload, loading, resetTrigger }: UploadSectionProps) {
  const [fileName, setFileName] = useState<string>('')

  // Clear filename when reset is triggered
  useEffect(() => {
    if (resetTrigger !== undefined) {
      setFileName('')
    }
  }, [resetTrigger])

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0]
      setFileName(file.name)
      onUpload(file)
    }
  }, [onUpload])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/plain': ['.txt'],
    },
    maxFiles: 1,
  })

  return (
    <div className="max-w-2xl mx-auto mb-12 animate-slide-up">
      <div
        {...getRootProps()}
        className={`
          border-3 border-dashed rounded-2xl p-12 text-center cursor-pointer
          transition-all duration-300 ease-in-out
          backdrop-blur-sm
          ${isDragActive 
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 scale-105 shadow-2xl' 
            : 'border-gray-300 dark:border-gray-600 bg-white/80 dark:bg-gray-800/80 hover:border-blue-400 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:shadow-xl'
          }
          ${loading ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        <input {...getInputProps()} disabled={loading} />
        
        <div className="flex flex-col items-center">
          {loading ? (
            <>
              <div className="relative mb-4">
                <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin absolute top-0 left-0" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
              </div>
              <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">Đang phân tích CV...</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">AI đang xử lý, vui lòng đợi 🤖</p>
              <div className="flex gap-2 mt-4">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </>
          ) : (
            <>
              <svg
                className={`w-16 h-16 text-blue-500 dark:text-blue-400 mb-4 transition-transform ${isDragActive ? 'scale-110 animate-wiggle' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              <p className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
                {isDragActive ? '🎯 Thả file vào đây' : '📤 Kéo thả CV hoặc click để chọn'}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Hỗ trợ: PDF, DOCX, TXT (Tối đa 10MB)
              </p>
              {fileName && (
                <div className="mt-4 px-4 py-2 bg-blue-100 dark:bg-blue-900 rounded-full text-blue-700 dark:text-blue-300 font-medium animate-pulse-slow">
                  📄 {fileName}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
