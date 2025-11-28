export type Language = 'vi' | 'ko'

export const translations = {
  vi: {
    // Header
    title: 'CV Analyzer AI',
    subtitle: '🚀 Upload CV của bạn và nhận phân tích chi tiết từ AI trong vài giây',
    
    // Features
    features: {
      fast: '⚡ Nhanh chóng',
      accurate: '🎯 Chính xác',
      free: '🆓 Miễn phí',
    },
    
    // Navigation
    batchAnalysis: '📊 Batch Analysis - Phân tích nhiều CV',
    backToSingle: '← Quay lại Single Analysis',
    
    // Model Selection
    selectModel: '🤖 Chọn AI Model',
    
    // Job Description
    jobDescription: 'Job Description (Tùy chọn)',
    jobDescriptionSub: 'Click để nhập yêu cầu công việc',
    jobDescriptionEntered: '✓ Đã nhập JD - Click để chỉnh sửa',
    jobDescriptionLabel: '📝 Nhập Job Description hoặc Yêu cầu công việc',
    jobDescriptionPlaceholder: 'Ví dụ:\n\nVị trí: Senior Backend Developer\n\nYêu cầu:\n- 3+ năm kinh nghiệm Python/Django\n- Thành thạo PostgreSQL, Redis\n- Kinh nghiệm với AWS/Docker\n- Kỹ năng làm việc nhóm tốt\n- Tiếng Anh giao tiếp\n\nƯu tiên:\n- Có kinh nghiệm lead team\n- Biết về microservices',
    jobDescriptionInfo: 'AI sẽ so sánh CV với yêu cầu này và đưa ra điểm số + phân tích chi tiết',
    deleteJD: '🗑️ Xóa JD',
    
    // Upload
    uploadCV: '📤 Kéo thả CV hoặc click để chọn',
    dropHere: '🎯 Thả file vào đây',
    supportedFormats: 'Hỗ trợ: PDF, DOCX, TXT (Tối đa 10MB)',
    analyzing: 'Đang phân tích CV...',
    pleaseWait: 'Vui lòng đợi trong giây lát',
    aiProcessing: 'AI đang xử lý, vui lòng đợi 🤖',
    
    // Actions
    analyzeNewCV: 'Phân tích CV mới',
    analyzeAll: '🚀 Phân tích tất cả CV',
    exportExcel: '📥 Export Excel',
    
    // Scoring
    scoringTitle: '📊 Điểm Đánh Giá & Job Matching',
    overallScore: 'Điểm Tổng Thể',
    matchWithJD: 'Phù Hợp với JD',
    matchRate: 'Match Rate',
    
    // Score Breakdown
    skillsScore: 'Kỹ năng (30%)',
    experienceScore: 'Kinh nghiệm (30%)',
    educationScore: 'Học vấn (20%)',
    softSkillsScore: 'Kỹ năng mềm (20%)',
    
    // Skills Matching
    matchingSkills: 'Skills Phù Hợp',
    missingSkills: 'Skills Thiếu',
    redFlags: 'Red Flags',
    
    // Profile Sections
    skills: 'Kỹ năng',
    experience: 'Kinh nghiệm',
    education: 'Học vấn',
    strengths: 'Điểm mạnh',
    recommendations: 'Gợi ý cải thiện',
    noInfo: 'Không có thông tin',
    
    // AI Suggestions
    aiSuggestions: '🤖 AI Suggestions',
    aiSuggestionsDesc: 'Phân tích chuyên sâu từ AI',
    interviewQuestions: 'Câu hỏi phỏng vấn đề xuất',
    salaryRecommendation: 'Mức lương đề xuất',
    careerPath: 'Lộ trình phát triển',
    
    // Batch Analysis
    batchTitle: '📊 Batch CV Analysis',
    batchSubtitle: 'Upload nhiều CV cùng lúc, so sánh và export Excel',
    selectMultipleFiles: '📁 Chọn nhiều CV (Tối đa 10 files)',
    filesSelected: 'Đã chọn {count} file(s):',
    results: 'Kết quả ({count} CVs)',
    
    // Table Headers
    rank: '#',
    name: 'Tên',
    score: 'Điểm',
    match: 'Match %',
    skillsLabel: 'Skills',
    redFlagsLabel: 'Red Flags',
    clean: '✓ Clean',
    flags: '⚠️ {count} flag(s)',
    
    // Messages
    successMessage: 'Phân tích thành công!',
    successSubMessage: 'Bò và Mèo đã hoàn thành công việc! 🎉',
    errorMessage: 'Có lỗi xảy ra khi phân tích CV. Vui lòng thử lại!',
    selectAtLeastOne: 'Vui lòng chọn ít nhất 1 CV',
    batchError: 'Có lỗi xảy ra khi phân tích!',
    exportError: 'Có lỗi khi export Excel!',
  },
  ko: {
    // Header
    title: 'CV Analyzer AI',
    subtitle: '🚀 이력서를 업로드하고 몇 초 안에 AI의 상세한 분석을 받으세요',
    
    // Features
    features: {
      fast: '⚡ 빠름',
      accurate: '🎯 정확함',
      free: '🆓 무료',
    },
    
    // Navigation
    batchAnalysis: '📊 일괄 분석 - 여러 이력서 분석',
    backToSingle: '← 단일 분석으로 돌아가기',
    
    // Model Selection
    selectModel: '🤖 AI 모델 선택',
    
    // Job Description
    jobDescription: '직무 설명 (선택사항)',
    jobDescriptionSub: '클릭하여 직무 요구사항 입력',
    jobDescriptionEntered: '✓ JD 입력됨 - 클릭하여 수정',
    jobDescriptionLabel: '📝 직무 설명 또는 요구사항 입력',
    jobDescriptionPlaceholder: '예시:\n\n직위: 시니어 백엔드 개발자\n\n요구사항:\n- Python/Django 3년 이상 경험\n- PostgreSQL, Redis 능숙\n- AWS/Docker 경험\n- 팀워크 능력\n- 영어 의사소통\n\n우대사항:\n- 팀 리드 경험\n- 마이크로서비스 지식',
    jobDescriptionInfo: 'AI가 이력서를 이 요구사항과 비교하여 점수 + 상세 분석을 제공합니다',
    deleteJD: '🗑️ JD 삭제',
    
    // Upload
    uploadCV: '📤 이력서를 드래그하거나 클릭하여 선택',
    dropHere: '🎯 여기에 파일 놓기',
    supportedFormats: '지원: PDF, DOCX, TXT (최대 10MB)',
    analyzing: '이력서 분석 중...',
    pleaseWait: '잠시만 기다려주세요',
    aiProcessing: 'AI가 처리 중입니다, 잠시만 기다려주세요 🤖',
    
    // Actions
    analyzeNewCV: '새 이력서 분석',
    analyzeAll: '🚀 모든 이력서 분석',
    exportExcel: '📥 Excel 내보내기',
    
    // Scoring
    scoringTitle: '📊 평가 점수 & 직무 매칭',
    overallScore: '종합 점수',
    matchWithJD: 'JD 적합도',
    matchRate: '매칭률',
    
    // Score Breakdown
    skillsScore: '기술 (30%)',
    experienceScore: '경력 (30%)',
    educationScore: '학력 (20%)',
    softSkillsScore: '소프트 스킬 (20%)',
    
    // Skills Matching
    matchingSkills: '일치하는 기술',
    missingSkills: '부족한 기술',
    redFlags: '주의사항',
    
    // Profile Sections
    skills: '기술',
    experience: '경력',
    education: '학력',
    strengths: '강점',
    recommendations: '개선 제안',
    noInfo: '정보 없음',
    
    // AI Suggestions
    aiSuggestions: '🤖 AI 제안',
    aiSuggestionsDesc: 'AI의 심층 분석',
    interviewQuestions: '추천 면접 질문',
    salaryRecommendation: '추천 급여',
    careerPath: '경력 개발 경로',
    
    // Batch Analysis
    batchTitle: '📊 일괄 이력서 분석',
    batchSubtitle: '여러 이력서를 동시에 업로드하고 비교 및 Excel로 내보내기',
    selectMultipleFiles: '📁 여러 이력서 선택 (최대 10개)',
    filesSelected: '{count}개 파일 선택됨:',
    results: '결과 ({count}개 이력서)',
    
    // Table Headers
    rank: '#',
    name: '이름',
    score: '점수',
    match: '매칭 %',
    skillsLabel: '기술',
    redFlagsLabel: '주의사항',
    clean: '✓ 문제없음',
    flags: '⚠️ {count}개 주의사항',
    
    // Messages
    successMessage: '분석 완료!',
    successSubMessage: '소와 고양이가 작업을 완료했습니다! 🎉',
    errorMessage: '이력서 분석 중 오류가 발생했습니다. 다시 시도해주세요!',
    selectAtLeastOne: '최소 1개의 이력서를 선택해주세요',
    batchError: '분석 중 오류가 발생했습니다!',
    exportError: 'Excel 내보내기 중 오류가 발생했습니다!',
  },
}

export function getTranslation(lang: Language, key: string, params?: Record<string, any>): string {
  const keys = key.split('.')
  let value: any = translations[lang]
  
  for (const k of keys) {
    value = value?.[k]
  }
  
  if (typeof value === 'string' && params) {
    return value.replace(/\{(\w+)\}/g, (_, key) => params[key] || '')
  }
  
  return value || key
}
