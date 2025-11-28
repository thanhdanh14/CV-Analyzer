# CV Analyzer Backend

Backend API để phân tích CV sử dụng AI (OpenAI GPT).

## Cài đặt

1. Tạo virtual environment:
```bash
python -m venv venv
venv\Scripts\activate  # Windows
```

2. Cài đặt dependencies:
```bash
pip install -r requirements.txt
```

3. Tạo file `.env` và thêm API key:
```
OPENAI_API_KEY=sk-your-key-here
```

## Lấy Google Gemini API Key (MIỄN PHÍ)

1. Truy cập: https://makersuite.google.com/app/apikey
2. Đăng nhập bằng tài khoản Google
3. Click "Create API Key"
4. Chọn project hoặc tạo project mới
5. Copy API key và paste vào file `.env`

**Ưu điểm Gemini:**
- Hoàn toàn MIỄN PHÍ
- Quota cao: 60 requests/phút
- Không cần nạp tiền

## Chạy server

```bash
python main.py
```

hoặc

```bash
uvicorn main:app --reload
```

API sẽ chạy tại: http://localhost:8000

## API Documentation

Sau khi chạy server, truy cập:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Endpoints

### POST /analyze-cv
Upload CV file (PDF, DOCX, TXT) và nhận phân tích từ AI.

**Response:**
```json
{
  "summary": "Tóm tắt về ứng viên",
  "name": "Nguyễn Văn A",
  "email": "email@example.com",
  "phone": "0123456789",
  "skills": ["Python", "FastAPI", "React"],
  "experience": "3 năm kinh nghiệm...",
  "education": "Đại học Bách Khoa",
  "strengths": ["Kỹ năng lập trình tốt", "..."],
  "recommendations": ["Nên học thêm...", "..."]
}
```
