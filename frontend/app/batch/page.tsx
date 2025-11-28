'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import ThemeToggle from '@/components/ThemeToggle'
import CatBackground from '@/components/CatBackground'
import ModelSelector from '@/components/ModelSelector'
import JobDescriptionInput from '@/components/JobDescriptionInput'

export default function BatchAnalysis() {
  const router = useRouter()
  const [files, setFiles] = useState<File[]>([])
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<any[]>([])
  const [selectedModel, setSelectedModel] = useState('gemini-2.0-flash')
  const [jobDescription, setJobDescription] = useState('')

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileList = Array.from(e.target.files).slice(0, 10)
      setFiles(fileList)
    }
  }

  const handleBatchAnalyze = async () => {
    if (files.length === 0) {
      alert('Vui lòng chọn ít nhất 1 CV')
      return
    }

    setLoading(true)
    setResults([])

    try {
      const formData = new FormData()
      files.forEach(file => formData.append('files', file))
      formData.append('job_description', jobDescription)

      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
      const response = await fetch(`${API_URL}/batch-analyze?model=${selectedModel}`, {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) throw new Error('Batch analysis failed')

      const data = await response.json()
      setResults(data.results)
    } catch (error) {
      console.error('Error:', error)
      alert('Có lỗi xảy ra khi phân tích!')
    } finally {
      setLoading(false)
    }
  }

  const handleExportExcel = async () => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
      const response = await fetch(`${API_URL}/export-excel`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ results }),
      })

      if (!response.ok) throw new Error('Export failed')

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'cv_analysis_results.xlsx'
      a.click()
    } catch (error) {
      console.error('Error:', error)
      alert('Có lỗi khi export Excel!')
    }
  }

  const sortedResults = [...results].sort((a, b) => {
    const scoreA = a.analysis?.overall_score || 0
    const scoreB = b.analysis?.overall_score || 0
    return scoreB - scoreA
  })

  return (
    <main className="min-h-screen bg-[#9FD7F9] transition-colors duration-500">
      <CatBackground />
      <ThemeToggle />

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="text-center mb-8">
          <button
            onClick={() => router.push('/')}
            className="mb-4 px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            ← Quay lại Single Analysis
          </button>
          
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            📊 Batch CV Analysis
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Upload nhiều CV cùng lúc, so sánh và export Excel
          </p>
        </div>

        <ModelSelector selectedModel={selectedModel} onModelChange={setSelectedModel} />
        <JobDescriptionInput jobDescription={jobDescription} onJobDescriptionChange={setJobDescription} />

        <div className="max-w-4xl mx-auto mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border-2 border-gray-200 dark:border-gray-700">
            <label className="block text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
              📁 Chọn nhiều CV (Tối đa 10 files)
            </label>
            
            <input
              type="file"
              multiple
              accept=".pdf,.docx,.txt"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500 dark:text-gray-400
                file:mr-4 file:py-3 file:px-6
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100 dark:file:bg-blue-900 dark:file:text-blue-300
                cursor-pointer"
            />

            {files.length > 0 && (
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Đã chọn {files.length} file(s):
                </p>
                <ul className="space-y-1">
                  {files.map((file, i) => (
                    <li key={i} className="text-sm text-gray-600 dark:text-gray-400">
                      📄 {file.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <button
              onClick={handleBatchAnalyze}
              disabled={loading || files.length === 0}
              className="mt-6 w-full py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? '⏳ Đang phân tích...' : '🚀 Phân tích tất cả CV'}
            </button>
          </div>
        </div>

        {results.length > 0 && (
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                Kết quả ({results.length} CVs)
              </h2>
              <button
                onClick={handleExportExcel}
                className="px-6 py-3 bg-green-600 text-white font-semibold rounded-xl shadow-lg hover:bg-green-700 hover:scale-105 transition-all duration-300"
              >
                📥 Export Excel
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-xl">
                <thead className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                  <tr>
                    <th className="px-4 py-3 text-left">#</th>
                    <th className="px-4 py-3 text-left">Tên</th>
                    <th className="px-4 py-3 text-center">Điểm</th>
                    <th className="px-4 py-3 text-center">Match %</th>
                    <th className="px-4 py-3 text-left">Skills</th>
                    <th className="px-4 py-3 text-left">Red Flags</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedResults.map((result, index) => {
                    const analysis = result.analysis || {}
                    const score = analysis.overall_score || 0
                    const scoreColor = score >= 80 ? 'text-green-600' : score >= 60 ? 'text-yellow-600' : 'text-red-600'
                    
                    return (
                      <tr key={index} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="px-4 py-3 font-bold">{index + 1}</td>
                        <td className="px-4 py-3">
                          <div className="font-semibold text-gray-800 dark:text-gray-100">{analysis.name || 'N/A'}</div>
                          <div className="text-sm text-gray-500">{result.filename}</div>
                        </td>
                        <td className={`px-4 py-3 text-center font-bold text-2xl ${scoreColor}`}>
                          {score}
                        </td>
                        <td className={`px-4 py-3 text-center font-bold ${scoreColor}`}>
                          {analysis.match_percentage || 0}%
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex flex-wrap gap-1">
                            {(analysis.skills || []).slice(0, 3).map((skill: string, i: number) => (
                              <span key={i} className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded text-xs">
                                {skill}
                              </span>
                            ))}
                            {(analysis.skills || []).length > 3 && (
                              <span className="px-2 py-1 text-gray-500 text-xs">+{(analysis.skills || []).length - 3}</span>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          {(analysis.red_flags || []).length > 0 ? (
                            <span className="text-red-600 dark:text-red-400 text-sm">
                              ⚠️ {(analysis.red_flags || []).length} flag(s)
                            </span>
                          ) : (
                            <span className="text-green-600 dark:text-green-400 text-sm">✓ Clean</span>
                          )}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
