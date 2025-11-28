# 🚀 Hướng dẫn Deploy MIỄN PHÍ

## Frontend: Vercel (Free)

### Bước 1: Push code lên GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/cv-analyzer.git
git push -u origin main
```

### Bước 2: Deploy lên Vercel

1. Truy cập: https://vercel.com/
2. Đăng nhập bằng GitHub
3. Click **"New Project"**
4. Import repo `cv-analyzer`
5. **Root Directory**: `frontend`
6. **Framework Preset**: Next.js
7. Click **"Deploy"**
8. Đợi 2-3 phút → Done!

**URL của bạn**: `https://your-app.vercel.app`

---

## Backend: Render (Free)

### Bước 1: Tạo tài khoản Render

1. Truy cập: https://render.com/
2. Đăng ký bằng GitHub

### Bước 2: Deploy Backend

1. Click **"New +"** → **"Web Service"**
2. Connect GitHub repo `cv-analyzer`
3. **Name**: `cv-analyzer-backend`
4. **Root Directory**: `backend`
5. **Environment**: `Python 3`
6. **Build Command**: 
```bash
pip install -r requirements.txt
```
7. **Start Command**:
```bash
uvicorn main:app --host 0.0.0.0 --port $PORT
```

### Bước 3: Thêm Environment Variables

Click **"Environment"** → Add:
```
GOOGLE_API_KEY = your_gemini_key_here
OPENROUTER_API_KEY = your_openrouter_key_here
ANTHROPIC_API_KEY = your_claude_key_here
```

### Bước 4: Deploy

Click **"Create Web Service"** → Đợi 5-10 phút

**URL của bạn**: `https://cv-analyzer-backend.onrender.com`

---

## Bước 3: Kết nối Frontend với Backend

### Update API URL trong Frontend

Tạo file `frontend/.env.local`:
```
NEXT_PUBLIC_API_URL=https://cv-analyzer-backend.onrender.com
```

Update code:

**frontend/app/page.tsx**:
```typescript
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

const response = await fetch(`${API_URL}/analyze-cv?model=${selectedModel}`, {
```

**frontend/app/batch/page.tsx**:
```typescript
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

const response = await fetch(`${API_URL}/batch-analyze?model=${selectedModel}`, {
```

Push changes:
```bash
git add .
git commit -m "Update API URL"
git push
```

Vercel sẽ tự động deploy lại!

---

## ⚠️ Lưu ý quan trọng

### Render Free Tier:
- App sẽ **sleep sau 15 phút** không dùng
- Lần đầu truy cập sau khi sleep mất ~30 giây để wake up
- Giải pháp: Dùng **UptimeRobot** để ping mỗi 14 phút

### Setup UptimeRobot (Giữ backend luôn active):

1. Truy cập: https://uptimerobot.com/
2. Đăng ký miễn phí
3. Add New Monitor:
   - **Monitor Type**: HTTP(s)
   - **URL**: `https://cv-analyzer-backend.onrender.com/`
   - **Monitoring Interval**: 5 minutes
4. Save → Backend sẽ không bao giờ sleep!

---

## 🎉 Hoàn thành!

Bạn đã có:
- ✅ Frontend: `https://your-app.vercel.app`
- ✅ Backend: `https://cv-analyzer-backend.onrender.com`
- ✅ Hoàn toàn MIỄN PHÍ
- ✅ Auto-deploy khi push code
- ✅ Free SSL/HTTPS
- ✅ Global CDN

---

## 🔧 Troubleshooting

### Backend không chạy?
- Kiểm tra logs trong Render Dashboard
- Đảm bảo đã thêm đủ Environment Variables
- Kiểm tra `requirements.txt` có đầy đủ

### Frontend không connect được backend?
- Kiểm tra CORS trong `backend/main.py`:
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Hoặc chỉ định domain Vercel
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### API key không work?
- Kiểm tra Environment Variables trong Render
- Restart service sau khi thêm env vars

---

## 📊 Monitoring

### Xem logs:
- **Vercel**: Dashboard → Project → Deployments → Logs
- **Render**: Dashboard → Service → Logs

### Performance:
- Vercel Analytics (free)
- Render Metrics (free)

---

## 🚀 Next Steps

1. **Custom Domain**: 
   - Vercel: Settings → Domains → Add
   - Render: Settings → Custom Domain

2. **Analytics**: Thêm Google Analytics

3. **Error Tracking**: Thêm Sentry

4. **Database**: Nếu cần lưu data, dùng:
   - Supabase (free PostgreSQL)
   - MongoDB Atlas (free)

---

**Tổng chi phí: $0/tháng** 🎉

Chúc bạn deploy thành công! 🚀
