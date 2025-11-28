'use client'

import { useState } from 'react'
import UploadSection from '@/components/UploadSection'
import ResultSection from '@/components/ResultSection'
import ThemeToggle from '@/components/ThemeToggle'
import ParticlesBackground from '@/components/ParticlesBackground'
import ModelSelector from '@/components/ModelSelector'
import JobDescriptionInput from '@/components/JobDescriptionInput'
import SuccessAnimation from '@/components/SuccessAnimation'
import LanguageToggle, { Language } from '@/components/LanguageToggle'
import { getTranslation } from '@/lib/translations'
import CatBackground from '@/components/CatBackground'

export default function Home() {
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [selectedModel, setSelectedModel] = useState('gemini-2.0-flash')
  const [resetTrigger, setResetTrigger] = useState(0)
  const [jobDescription, setJobDescription] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)
  const [language, setLanguage] = useState<Language>('vi')

  const handleUpload = async (file: File) => {
    setLoading(true)
    setResult(null)

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('job_description', jobDescription)

      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
      const response = await fetch(`${API_URL}/analyze-cv?model=${selectedModel}`, {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Upload failed')
      }

      const data = await response.json()
      setResult(data)
      setShowSuccess(true)
    } catch (error) {
      console.error('Error:', error)
      const errorMsg = language === 'vi' 
        ? 'Có lỗi xảy ra khi phân tích CV. Vui lòng thử lại!'
        : '이력서 분석 중 오류가 발생했습니다. 다시 시도해주세요!'
      alert(errorMsg)
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setResult(null)
    setResetTrigger(prev => prev + 1)
  }

  const t = (key: string) => getTranslation(language, key)

  return (
    <main className="min-h-screen bg-[#9FD7F9] transition-colors duration-500">
      <CatBackground />
      <ThemeToggle />
      <LanguageToggle language={language} onLanguageChange={setLanguage} />
      {showSuccess && <SuccessAnimation onClose={() => setShowSuccess(false)} />}
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="text-center mb-12 animate-slide-down">
          <div className="inline-block animate-float mb-4">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl animate-glow">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
          
          <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4 animate-fade-in">
            {t('title')}
          </h1>
          <p className="text-gray-800 text-lg max-w-2xl mx-auto font-medium">
            {t('subtitle')}
          </p>
          
          <div className="flex justify-center gap-4 mt-6 flex-wrap">
            <div className="px-4 py-2 bg-blue-100 dark:bg-blue-900 rounded-full text-blue-700 dark:text-blue-300 text-sm font-medium animate-pulse-slow">
              {t('features.fast')}
            </div>
            <div className="px-4 py-2 bg-purple-100 dark:bg-purple-900 rounded-full text-purple-700 dark:text-purple-300 text-sm font-medium animate-pulse-slow" style={{ animationDelay: '0.5s' }}>
              {t('features.accurate')}
            </div>
            <div className="px-4 py-2 bg-pink-100 dark:bg-pink-900 rounded-full text-pink-700 dark:text-pink-300 text-sm font-medium animate-pulse-slow" style={{ animationDelay: '1s' }}>
              {t('features.free')}
            </div>
          </div>
          
          <div className="mt-6">
            <a
              href="/batch"
              className="inline-block px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              {t('batchAnalysis')}
            </a>
          </div>
        </div>

        <ModelSelector 
          selectedModel={selectedModel} 
          onModelChange={setSelectedModel} 
        />

        <JobDescriptionInput 
          jobDescription={jobDescription}
          onJobDescriptionChange={setJobDescription}
        />

        <UploadSection onUpload={handleUpload} loading={loading} resetTrigger={resetTrigger} />

        {result && (
          <>
            <div className="max-w-6xl mx-auto mb-6 flex justify-end">
              <button
                onClick={handleReset}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Phân tích CV mới
              </button>
            </div>
            <ResultSection data={result} />
          </>
        )}
      </div>
    </main>
  )
}
