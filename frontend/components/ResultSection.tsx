'use client'

import SkillBadge from './SkillBadge'

interface ResultData {
  summary: string
  name: string
  email: string
  phone: string
  skills: string[]
  experience: string
  education: string
  strengths: string[]
  recommendations: string[]
  interview_questions: string[]
  salary_range: string
  career_path: string[]
  overall_score: number
  skills_score: number
  experience_score: number
  education_score: number
  soft_skills_score: number
  match_percentage: number
  matching_skills: string[]
  missing_skills: string[]
  red_flags: string[]
}

interface ResultSectionProps {
  data: ResultData
}

export default function ResultSection({ data }: ResultSectionProps) {
  const hasJobMatching = data.overall_score > 0 || data.match_percentage > 0
  
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 dark:text-green-400'
    if (score >= 60) return 'text-yellow-600 dark:text-yellow-400'
    return 'text-red-600 dark:text-red-400'
  }
  
  const getScoreBgColor = (score: number) => {
    if (score >= 80) return 'bg-green-500'
    if (score >= 60) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  return (
    <div className="max-w-6xl mx-auto animate-slide-up relative">
      {/* Scoring System - Show if JD provided */}
      {hasJobMatching && (
        <div className="mb-8 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-3xl p-8 border-2 border-purple-300 dark:border-purple-700 shadow-2xl">
          <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            📊 Điểm Đánh Giá & Job Matching
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Overall Score */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center shadow-lg">
              <div className="text-6xl font-bold mb-2 ${getScoreColor(data.overall_score)}">
                {data.overall_score}
              </div>
              <div className="text-gray-600 dark:text-gray-400 font-semibold">Điểm Tổng Thể</div>
              <div className="text-sm text-gray-500 dark:text-gray-500 mt-1">/100</div>
            </div>
            
            {/* Match Percentage */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center shadow-lg">
              <div className="text-6xl font-bold mb-2 ${getScoreColor(data.match_percentage)}">
                {data.match_percentage}%
              </div>
              <div className="text-gray-600 dark:text-gray-400 font-semibold">Phù Hợp với JD</div>
              <div className="text-sm text-gray-500 dark:text-gray-500 mt-1">Match Rate</div>
            </div>
          </div>
          
          {/* Score Breakdown */}
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { label: 'Kỹ năng (30%)', score: data.skills_score },
              { label: 'Kinh nghiệm (30%)', score: data.experience_score },
              { label: 'Học vấn (20%)', score: data.education_score },
              { label: 'Kỹ năng mềm (20%)', score: data.soft_skills_score }
            ].map((item, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-4">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item.label}</span>
                  <span className={`text-sm font-bold ${getScoreColor(item.score)}`}>{item.score}/100</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full transition-all duration-1000 ${getScoreBgColor(item.score)}`}
                    style={{ width: `${item.score}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Matching & Missing Skills */}
          {(data.matching_skills.length > 0 || data.missing_skills.length > 0) && (
            <div className="grid md:grid-cols-2 gap-4 mt-6">
              {data.matching_skills.length > 0 && (
                <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 border-2 border-green-300 dark:border-green-700">
                  <h4 className="font-bold text-green-700 dark:text-green-400 mb-2 flex items-center gap-2">
                    <span>✓</span> Skills Phù Hợp
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {data.matching_skills.map((skill, i) => (
                      <span key={i} className="px-3 py-1 bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {data.missing_skills.length > 0 && (
                <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-4 border-2 border-red-300 dark:border-red-700">
                  <h4 className="font-bold text-red-700 dark:text-red-400 mb-2 flex items-center gap-2">
                    <span>✗</span> Skills Thiếu
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {data.missing_skills.map((skill, i) => (
                      <span key={i} className="px-3 py-1 bg-red-200 dark:bg-red-800 text-red-800 dark:text-red-200 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
          
          {/* Red Flags */}
          {data.red_flags && data.red_flags.length > 0 && (
            <div className="mt-6 bg-red-50 dark:bg-red-900/20 rounded-xl p-4 border-2 border-red-300 dark:border-red-700">
              <h4 className="font-bold text-red-700 dark:text-red-400 mb-3 flex items-center gap-2">
                <span className="text-xl">⚠️</span> Red Flags
              </h4>
              <ul className="space-y-2">
                {data.red_flags.map((flag, i) => (
                  <li key={i} className="flex items-start gap-2 text-red-700 dark:text-red-300">
                    <span className="text-red-500 mt-1">•</span>
                    <span>{flag}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
      
      {/* Header Card */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-6 border border-gray-100 dark:border-gray-700 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
        <div className="flex items-start gap-6">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold flex-shrink-0 animate-pulse-slow shadow-lg">
            {data.name ? data.name.charAt(0).toUpperCase() : '?'}
          </div>
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">{data.name || 'Không xác định'}</h2>
            <div className="flex flex-wrap gap-4 text-gray-600 dark:text-gray-300">
              {data.email && (
                <div className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>{data.email}</span>
                </div>
              )}
              {data.phone && (
                <div className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>{data.phone}</span>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {data.summary && (
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-xl border border-blue-100 dark:border-blue-800 animate-fade-in">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{data.summary}</p>
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Skills */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
            <span className="text-2xl">💼</span>
            Kỹ năng
          </h3>
          <div className="flex flex-wrap gap-3">
            {data.skills && data.skills.length > 0 ? (
              data.skills.map((skill, index) => (
                <div key={index} style={{ animationDelay: `${index * 0.05}s` }} className="animate-fade-in">
                  <SkillBadge skill={skill} />
                </div>
              ))
            ) : (
              <p className="text-gray-500 dark:text-gray-400">Không có thông tin</p>
            )}
          </div>
        </div>

        {/* Education */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
            <span className="text-2xl">🎓</span>
            Học vấn
          </h3>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {data.education || 'Không có thông tin'}
          </p>
        </div>

        {/* Experience */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-700 md:col-span-2 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
            <span className="text-2xl">💡</span>
            Kinh nghiệm
          </h3>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
            {data.experience || 'Không có thông tin'}
          </p>
        </div>

        {/* Strengths */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
            <span className="text-2xl">⭐</span>
            Điểm mạnh
          </h3>
          <ul className="space-y-3">
            {data.strengths && data.strengths.length > 0 ? (
              data.strengths.map((strength, index) => (
                <li key={index} className="flex items-start gap-3 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <span className="text-green-500 dark:text-green-400 text-xl flex-shrink-0">✓</span>
                  <span className="text-gray-700 dark:text-gray-300">{strength}</span>
                </li>
              ))
            ) : (
              <p className="text-gray-500 dark:text-gray-400">Không có thông tin</p>
            )}
          </ul>
        </div>

        {/* Recommendations */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
            <span className="text-2xl">💬</span>
            Gợi ý cải thiện
          </h3>
          <ul className="space-y-3">
            {data.recommendations && data.recommendations.length > 0 ? (
              data.recommendations.map((rec, index) => (
                <li key={index} className="flex items-start gap-3 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <span className="text-blue-500 dark:text-blue-400 text-xl flex-shrink-0">→</span>
                  <span className="text-gray-700 dark:text-gray-300">{rec}</span>
                </li>
              ))
            ) : (
              <p className="text-gray-500 dark:text-gray-400">Không có thông tin</p>
            )}
          </ul>
        </div>
      </div>

      {/* AI Suggestions Section */}
      <div className="mt-8 space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            🤖 AI Suggestions
          </h2>
          <p className="text-gray-600 dark:text-gray-400">Phân tích chuyên sâu từ AI</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Interview Questions */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl shadow-xl p-6 border-2 border-purple-200 dark:border-purple-700 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
              <span className="text-2xl">❓</span>
              Câu hỏi phỏng vấn đề xuất
            </h3>
            <ul className="space-y-3">
              {data.interview_questions && data.interview_questions.length > 0 ? (
                data.interview_questions.map((question, index) => (
                  <li key={index} className="flex items-start gap-3 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                    <span className="text-purple-600 dark:text-purple-400 font-bold flex-shrink-0">Q{index + 1}.</span>
                    <span className="text-gray-700 dark:text-gray-300">{question}</span>
                  </li>
                ))
              ) : (
                <p className="text-gray-500 dark:text-gray-400">Không có thông tin</p>
              )}
            </ul>
          </div>

          {/* Salary & Career Path */}
          <div className="space-y-6">
            {/* Salary Range */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl shadow-xl p-6 border-2 border-green-200 dark:border-green-700 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
                <span className="text-2xl">💰</span>
                Mức lương đề xuất
              </h3>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border-2 border-green-300 dark:border-green-600">
                <p className="text-2xl font-bold text-green-600 dark:text-green-400 text-center">
                  {data.salary_range || 'Chưa có thông tin'}
                </p>
              </div>
            </div>

            {/* Career Path */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl shadow-xl p-6 border-2 border-blue-200 dark:border-blue-700 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
                <span className="text-2xl">🚀</span>
                Lộ trình phát triển
              </h3>
              <div className="space-y-3">
                {data.career_path && data.career_path.length > 0 ? (
                  data.career_path.map((step, index) => (
                    <div key={index} className="flex items-start gap-3 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                      <div className="w-8 h-8 bg-blue-500 dark:bg-blue-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                        {index + 1}
                      </div>
                      <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg p-3 border border-blue-200 dark:border-blue-700">
                        <p className="text-gray-700 dark:text-gray-300">{step}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 dark:text-gray-400">Không có thông tin</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
