# 🚀 Hướng dẫn Deploy CV Analyzer AI

## Option 1: Vercel + Railway (Khuyên dùng - Miễn phí)

### Frontend (Vercel)

1. **Push code lên GitHub**:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/your-username/cv-analyzer.git
git push -u origin main
```

2. **Deploy lên Vercel**:
- Truy cập: https://vercel.com/
- Click "New Project"
- Import GitHub repo
- Root Directory: `frontend`
- Framework: Next.js
- Deploy!

3. **Lấy URL**: `https://your-app.vercel.app`

### Backend (Railway)

1. **Truy cập**: https://railway.app/
2. **New Project** → Deploy from GitHub
3. **Add service** → Select backend folder
4. **Environment Variables**:
```
GOOGLE_API_KEY=your_key
OPENROUTER_API_KEY=your_key
ANTHROPIC_API_KEY=your_key
```
5. **Deploy!**
6. **Lấy URL**: `https://your-backend.railway.app`

7. **Update Frontend API URL**:
```typescript
// frontend/app/page.tsx và batch/page.tsx
// Đổi http://localhost:8000 thành Railway URL
const response = await fetch('https://your-backend.railway.app/analyze-cv', {
```

---

## Option 2: VPS (Ubuntu Server)

### Chuẩn bị VPS

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Cài Python
sudo apt install python3 python3-pip python3-venv -y

# Cài Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install nodejs -y

# Cài Nginx
sudo apt install nginx -y
```

### Deploy Backend

```bash
# Clone repo
git clone https://github.com/your-username/cv-analyzer.git
cd cv-analyzer/backend

# Tạo virtual environment
python3 -m venv venv
source venv/bin/activate

# Cài dependencies
pip install -r requirements.txt

# Tạo .env file
nano .env
# Paste API keys

# Chạy với Gunicorn
pip install gunicorn
gunicorn -w 4 -k uvicorn.workers.UvicornWorker main:app --bind 0.0.0.0:8000
```

### Deploy Frontend

```bash
cd ../frontend

# Cài dependencies
npm install

# Build
npm run build

# Chạy production
npm start
```

### Nginx Config

```bash
sudo nano /etc/nginx/sites-available/cv-analyzer
```

```nginx
# Backend
server {
    listen 80;
    server_name api.your-domain.com;

    location / {
        proxy_pass http://localhost:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}

# Frontend
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/cv-analyzer /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### PM2 (Keep apps running)

```bash
# Cài PM2
sudo npm install -g pm2

# Backend
cd backend
pm2 start "gunicorn -w 4 -k uvicorn.workers.UvicornWorker main:app --bind 0.0.0.0:8000" --name cv-backend

# Frontend
cd ../frontend
pm2 start npm --name cv-frontend -- start

# Save
pm2 save
pm2 startup
```

---

## Option 3: Docker (Recommended for production)

### Dockerfile - Backend

```dockerfile
# backend/Dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### Dockerfile - Frontend

```dockerfile
# frontend/Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

### Docker Compose

```yaml
# docker-compose.yml
version: '3.8'

services:
  backend:
    build: ./backend
    ports:
      - "8000:8000"
    environment:
      - GOOGLE_API_KEY=${GOOGLE_API_KEY}
      - OPENROUTER_API_KEY=${OPENROUTER_API_KEY}
      - ANTHROPIC_API_KEY=${ANTHROPIC_API_KEY}
    restart: unless-stopped

  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    depends_on:
      - backend
    restart: unless-stopped
```

**Chạy:**
```bash
docker-compose up -d
```

---

## 🔒 SSL Certificate (HTTPS)

```bash
# Cài Certbot
sudo apt install certbot python3-certbot-nginx -y

# Lấy SSL certificate
sudo certbot --nginx -d your-domain.com -d api.your-domain.com

# Auto-renew
sudo certbot renew --dry-run
```

---

## 📝 Checklist trước khi deploy

- [ ] Đã test kỹ trên local
- [ ] Đã có API keys (Gemini, OpenRouter, Claude)
- [ ] Đã update API URL trong frontend
- [ ] Đã setup CORS trong backend
- [ ] Đã có domain (nếu dùng VPS)
- [ ] Đã backup code lên GitHub
- [ ] Đã test trên mobile

---

## 🎯 Khuyến nghị

**Cho người mới:**
- Dùng **Vercel** (Frontend) + **Railway** (Backend)
- Miễn phí, dễ setup, auto-deploy khi push code

**Cho production:**
- Dùng **VPS** + **Docker** + **Nginx**
- Có control hoàn toàn, scale được

---

## 💡 Tips

1. **Environment Variables**: Không commit API keys lên GitHub!
2. **CORS**: Nhớ config CORS cho phép frontend domain
3. **Rate Limiting**: Thêm rate limit để tránh abuse
4. **Monitoring**: Dùng Sentry hoặc LogRocket
5. **Analytics**: Thêm Google Analytics

---

Bạn muốn deploy theo cách nào? Mình sẽ hướng dẫn chi tiết hơn! 🚀
