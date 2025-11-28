# 🚀 CV Analyzer AI

Ứng dụng phân tích CV thông minh sử dụng AI (Gemini, Claude, GPT-4, Llama) để đánh giá ứng viên, so sánh với Job Description và đưa ra gợi ý chuyên sâu.

## ✨ Tính năng chính

### 🎯 Single CV Analysis
- **Upload & Phân tích**: PDF, DOCX, TXT
- **7 AI Models**: Gemini 2.0/2.5, Claude Sonnet, GPT-4, Llama
- **Job Matching**: Nhập JD, AI chấm điểm 0-100
- **Scoring System**: 
  - Skills (30%)
  - Experience (30%)
  - Education (20%)
  - Soft Skills (20%)
- **Skills Analysis**: Phù hợp/Thiếu so với JD
- **Red Flags Detection**: Gap, job hopping, overselling
- **AI Suggestions**:
  - 5-7 câu hỏi phỏng vấn
  - Đề xuất mức lương
  - Lộ trình phát triển nghề nghiệp

### 📊 Batch Analysis
- Upload nhiều CV cùng lúc (tối đa 10)
- So sánh candidates
- Ranking table
- Export Excel với styling

### 🌍 Đa ngôn ngữ
- 🇻🇳 Tiếng Việt
- 🇰🇷 한국어 (Tiếng Hàn)

### 🎨 UI/UX
- Dark mode
- Particles animation
- Success animation (Bò & Mèo 🐮😺)
- Responsive design
- Smooth transitions

### ⚡ Performance
- Cache system (phân tích nhanh cho CV cũ)
- Async processing
- Optimized API calls

---

## 🛠️ Tech Stack

### Backend
- **Framework**: FastAPI (Python)
- **AI APIs**: 
  - Google Gemini (Free)
  - Anthropic Claude
  - OpenRouter (GPT-4, Llama)
- **File Processing**: PyPDF2, python-docx
- **Export**: openpyxl (Excel)

### Frontend
- **Framework**: Next.js 14 (React)
- **Styling**: TailwindCSS
- **Language**: TypeScript
- **Features**: 
  - react-dropzone (drag & drop)
  - Internationalization (i18n)

---

## 📦 Cài đặt

### Backend

1. **Cài đặt Python dependencies**:
```bash
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
pip install -r requirements.txt
```

2. **Tạo file `.env`**:
```bash
# Google Gemini API Key (Bắt buộc - Miễn phí)
GOOGLE_API_KEY=your_gemini_key_here

# OpenRouter API Key (Tùy chọn - Miễn phí với credits)
OPENROUTER_API_KEY=your_openrouter_key_here

# Anthropic Claude API Key (Tùy chọn - Có phí)
ANTHROPIC_API_KEY=your_claude_key_here
```

3. **Chạy server**:
```bash
python main.py
```

Backend chạy tại: `http://localhost:8000`

### Frontend

1. **Cài đặt dependencies**:
```bash
cd frontend
npm install
```

2. **Chạy development server**:
```bash
npm run dev
```

Frontend chạy tại: `http://localhost:3000`

---

## 🔑 Lấy API Keys

### Google Gemini (Khuyên dùng - Miễn phí)
1. Truy cập: https://makersuite.google.com/app/apikey
2. Đăng nhập Google
3. Click "Create API Key"
4. Copy key

**Ưu điểm**: Hoàn toàn miễn phí, 60 requests/phút

### OpenRouter (Miễn phí với credits)
1. Truy cập: https://openrouter.ai/
2. Đăng ký/Đăng nhập
3. Vào "Keys" → "Create Key"
4. Copy key

**Ưu điểm**: Truy cập GPT-4, Claude, Llama miễn phí với credits

### Anthropic Claude (Có phí)
1. Truy cập: https://console.anthropic.com/
2. Đăng ký/Đăng nhập
3. Vào "API Keys" → "Create Key"
4. Copy key

**Lưu ý**: Cần nạp tiền ($5-10) để sử dụng

---

## 📖 Hướng dẫn sử dụng

### Single Analysis

1. **Chọn ngôn ngữ**: 🇻🇳 VI hoặc 🇰🇷 KO
2. **Chọn AI Model**: Gemini, Claude, GPT-4, Llama
3. **(Tùy chọn) Nhập Job Description**: Click vào "Job Description" và paste yêu cầu công việc
4. **Upload CV**: Kéo thả hoặc click để chọn file
5. **Xem kết quả**: 
   - Điểm số & matching (nếu có JD)
   - Thông tin cơ bản
   - AI Suggestions
6. **Phân tích CV mới**: Click nút "Phân tích CV mới"

### Batch Analysis

1. Vào trang chủ → Click "📊 Batch Analysis"
2. Chọn AI Model
3. (Tùy chọn) Nhập Job Description
4. Upload nhiều CV (tối đa 10)
5. Click "🚀 Phân tích tất cả CV"
6. Xem bảng kết quả (tự động sort theo điểm)
7. Click "📥 Export Excel" để tải về

---

## 🎯 Use Cases

### Cho HR/Recruiter
- Sàng lọc CV nhanh chóng
- So sánh nhiều ứng viên
- Chuẩn bị câu hỏi phỏng vấn
- Đánh giá khách quan với AI

### Cho Job Seeker
- Kiểm tra CV trước khi nộp
- Nhận feedback từ AI
- Cải thiện CV theo gợi ý
- Biết mức lương phù hợp

### Cho Team Lead
- Đánh giá team members
- Lập kế hoạch đào tạo
- Career path planning

---

## 📊 API Endpoints

### Single Analysis
```
POST /analyze-cv
- file: UploadFile (PDF/DOCX/TXT)
- model: string (AI model ID)
- job_description: string (optional)
```

### Batch Analysis
```
POST /batch-analyze
- files: list[UploadFile]
- model: string
- job_description: string (optional)
```

### Export Excel
```
POST /export-excel
- results: JSON (batch analysis results)
```

### Models List
```
GET /models
```

### Cache Management
```
GET /cache/stats
DELETE /cache/clear
```

---

## 🎨 Customization

### Thêm ngôn ngữ mới
Edit `frontend/lib/translations.ts`:
```typescript
export type Language = 'vi' | 'ko' | 'en'  // Thêm 'en'

export const translations = {
  vi: { ... },
  ko: { ... },
  en: {  // Thêm translations
    title: 'CV Analyzer AI',
    ...
  }
}
```

### Thêm AI Model mới
Edit `backend/main.py` → `get_available_models()`:
```python
{
  "id": "new-model-id",
  "name": "Model Name",
  "provider": "Provider",
  "description": "Description",
  "icon": "🤖"
}
```

---

## 🐛 Troubleshooting

### Backend không chạy
- Kiểm tra Python version (3.10+)
- Kiểm tra `.env` file có đúng format
- Kiểm tra API keys hợp lệ

### Frontend không kết nối được backend
- Kiểm tra backend đang chạy tại port 8000
- Kiểm tra CORS settings
- Clear browser cache

### AI trả về lỗi
- Kiểm tra API key còn credits
- Thử model khác
- Kiểm tra file CV không bị corrupt

---

## 📝 License

MIT License - Free to use for personal and commercial projects

---

## 👨‍💻 Developer

Made with ❤️ by [Your Name]

**Contact**: 
- Email: your.email@example.com
- GitHub: github.com/yourusername

---

## 🙏 Credits

- **AI Models**: Google Gemini, Anthropic Claude, OpenAI, Meta Llama
- **Icons**: Emoji
- **Animations**: Tailwind CSS, Custom CSS

---

## 🚀 Roadmap

- [ ] Export PDF Report
- [ ] Email integration
- [ ] User authentication
- [ ] Save history
- [ ] Team workspace
- [ ] API rate limiting
- [ ] More languages (English, Japanese, Chinese)

---

**Enjoy using CV Analyzer AI! 🎉**
