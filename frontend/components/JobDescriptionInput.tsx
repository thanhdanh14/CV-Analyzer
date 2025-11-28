'use client'

import { useState } from 'react'

interface JobDescriptionInputProps {
  onJobDescriptionChange: (jd: string) => void
  jobDescription: string
}

export default function JobDescriptionInput({ onJobDescriptionChange, jobDescription }: JobDescriptionInputProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="max-w-2xl mx-auto mb-6 animate-fade-in">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-xl p-4 flex items-center justify-between hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">📋</span>
          <div className="text-left">
            <div className="font-bold">Job Description (Tùy chọn)</div>
            <div className="text-sm opacity-90">
              {jobDescription ? '✓ Đã nhập JD - Click để chỉnh sửa' : 'Click để nhập yêu cầu công việc'}
            </div>
          </div>
        </div>
        <svg
          className={`w-6 h-6 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isExpanded && (
        <div className="mt-4 bg-white dark:bg-gray-800 rounded-xl p-6 border-2 border-orange-200 dark:border-orange-700 shadow-xl animate-slide-down">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            📝 Nhập Job Description hoặc Yêu cầu công việc
          </label>
          <textarea
            value={jobDescription}
            onChange={(e) => onJobDescriptionChange(e.target.value)}
            placeholder="Ví dụ:&#10;&#10;Vị trí: Senior Backend Developer&#10;&#10;Yêu cầu:&#10;- 3+ năm kinh nghiệm Python/Django&#10;- Thành thạo PostgreSQL, Redis&#10;- Kinh nghiệm với AWS/Docker&#10;- Kỹ năng làm việc nhóm tốt&#10;- Tiếng Anh giao tiếp&#10;&#10;Ưu tiên:&#10;- Có kinh nghiệm lead team&#10;- Biết về microservices"
            rows={12}
            className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-gray-100 resize-none"
          />
          <div className="mt-3 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>AI sẽ so sánh CV với yêu cầu này và đưa ra điểm số + phân tích chi tiết</span>
          </div>
          {jobDescription && (
            <button
              onClick={() => onJobDescriptionChange('')}
              className="mt-3 px-4 py-2 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-lg hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
            >
              🗑️ Xóa JD
            </button>
          )}
        </div>
      )}
    </div>
  )
}
