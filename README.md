# Resume Optimizer Pro

AI-powered ATS resume optimizer. Single-command backend + cross-platform frontend (Web, iOS, Android).

## Stack

| Layer | Technology |
|-------|-----------|
| Backend | FastAPI (Python) + Uvicorn |
| Frontend | React Native + Expo |
| AI – Local | Ollama |
| AI – Cloud | Anthropic / OpenAI / Google |
| OCR | EasyOCR |
| Word generation | python-docx |

---

## Quick Start

### 1. Backend

```bash
cd backend
python -m venv venv

# Windows
venv\Scripts\activate
# macOS/Linux
source venv/bin/activate

pip install -r requirements.txt
cp .env.example .env   # add your API keys if using cloud mode

python run.py
# → http://localhost:8000
# → API docs: http://localhost:8000/api/docs
```

### 2. Frontend

```bash
cd frontend
npm install
npm run web      # browser
npm run android  # Android emulator / device
npm run ios      # iOS simulator (macOS only)
```

### 3. Ollama (local AI)

```bash
# Install: https://ollama.ai
ollama serve
ollama pull llama3   # or any model you prefer
```

---

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/health` | Health check |
| `GET` | `/api/models/ollama` | List Ollama models |
| `POST` | `/api/extract/job-description` | OCR text from image/PDF |
| `POST` | `/api/optimize/resume` | AI resume optimization |
| `POST` | `/api/generate/resume` | Generate ATS Word document |
| `GET` | `/api/download/{id}` | Download `.docx` file |

---

## Environment Variables (`backend/.env`)

```
ENVIRONMENT=development
PORT=8000
OLLAMA_ENDPOINT=http://localhost:11434
ANTHROPIC_API_KEY=sk-ant-...
OPENAI_API_KEY=sk-...
GOOGLE_API_KEY=...
UPLOAD_DIR=./uploads
FRONTEND_URLS=["http://localhost:19006","http://localhost:3000"]
```

---

## Docker (Backend)

```bash
cd backend
docker build -t resume-optimizer-api .
docker run -p 8000:8000 --env-file .env resume-optimizer-api
```

---

## Project Structure

```
resume-optimizer/
├── backend/          FastAPI app
│   ├── app/
│   │   ├── main.py
│   │   ├── config.py
│   │   ├── routes/   health, models, extract, optimize, generate, download
│   │   ├── services/ ollama, cloud_ai, ocr, document
│   │   ├── models/   Pydantic schemas
│   │   └── utils/
│   ├── run.py
│   └── Dockerfile
└── frontend/         React Native + Expo
    ├── App.tsx        Navigation stack
    └── src/
        ├── screens/   6 screens
        ├── components/ 8 components
        ├── contexts/  AppContext (global state)
        ├── services/  API client
        └── styles/    Theme tokens
```
