# Client Finder

AI-powered B2B lead discovery platform that helps freelancers, agencies, and sales teams identify businesses with weak digital presence.

Hello EveryOne

---

# 🚀 Tech Stack

## Frontend

* Next.js 16
* React 19
* TypeScript
* Tailwind CSS
* Radix UI
* Lucide React

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* Groq SDK
* Overpass API
* Docker
* Rate Limiting
* CORS

---

# 🏗 System Architecture

```text
                ┌────────────────────┐
                │       Users        │
                │ Freelancers /      │
                │ Agencies / Sales   │
                └─────────┬──────────┘
                          │
                          ▼
                ┌────────────────────┐
                │  Next.js Frontend  │
                │ Dashboard + Search │
                └─────────┬──────────┘
                          │ REST API
                          ▼
                ┌────────────────────┐
                │ Express Backend    │
                │ API Layer          │
                └─────────┬──────────┘
                          │
        ┌─────────────────┼─────────────────┐
        ▼                 ▼                 ▼
┌──────────────┐ ┌────────────────┐ ┌────────────────┐
│ Search Engine│ │ Gap Analysis   │ │ AI Pitch Layer │
│ Overpass API │ │ Score Engine   │ │ Groq SDK       │
└──────┬───────┘ └────────┬───────┘ └────────┬───────┘
       │                  │                  │
       ▼                  ▼                  ▼
┌──────────────────────────────────────────────────┐
│                  MongoDB Database                │
└──────────────────────────────────────────────────┘

            Infrastructure & Security Layer

      ┌────────────────┐     ┌────────────────┐
      │ Rate Limiting  │     │ Docker Support │
      └────────────────┘     └────────────────┘
```

---

# ⚡ How The System Works

```text
User Searches Businesses
          ↓
Frontend Sends API Request
          ↓
Backend Builds Overpass Query
          ↓
OpenStreetMap Business Data Retrieved
          ↓
Gap Detection Engine Runs
          ↓
Opportunity Score Calculated
          ↓
AI Pitch Generation Triggered
          ↓
Structured Lead Insights Returned
```

---

# 🧠 Gap Detection Logic

The platform analyzes missing business information such as:

* Website
* Email
* Phone number
* Business metadata

These gaps are converted into opportunity scores for outreach prioritization.

```text
No Website  → +40
No Phone    → +30
No Email    → +30
```

---

# 🤖 AI Pitch Generation Flow

```text
Business Data
      ↓
Gap Detection
      ↓
Structured Prompt Creation
      ↓
Groq AI API
      ↓
JSON Response Parsing
      ↓
Pitch Angle + Priority + Score
```

The AI engine generates contextual outreach angles based on the detected digital weaknesses of each business.

---

# ✨ Core Features

* Business search by city and category
* OpenStreetMap business discovery
* Missing digital presence detection
* AI-generated outreach pitch
* Opportunity scoring system
* Responsive dashboard UI
* MongoDB persistence
* Search history storage
* Clipboard copy support
* Dockerized deployment
* API rate limiting

---

# 🧠 Backend Architecture

Client Finder follows a modular backend structure:

```text
routes → controllers → services → external APIs → database
```

This improves maintainability and separates business logic from API routing.

---

# ⚡ Request Lifecycle

```text
Client Request
      ↓
Express Route
      ↓
Controller Layer
      ↓
Business Logic
      ↓
Overpass API / Groq API
      ↓
MongoDB Storage
      ↓
JSON Response
```

---

# 📁 Project Structure

```text
client_finder/
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── overpass/
│   └── connections/
│
├── frontend/
│   ├── app/
│   ├── components/
│   └── dashboard/
│
└── README.md
```

---

# 📡 Important API Routes

| Method | Route        | Purpose               |
| ------ | ------------ | --------------------- |
| GET    | /api/search  | Search businesses     |
| POST   | /api/analyze | Analyze business gaps |
| GET    | /api/history | Search history        |
| POST   | /api/pitch   | Generate AI pitch     |

---

# ⚙️ Environment Variables

## Backend

```env
MONGO_URI=your_mongodb_connection_string
GROQ_API_KEY=your_groq_api_key
PORT=5000
```

## Frontend

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

---

# 🐳 Docker Support

The application supports Dockerized deployment.

```bash
docker build -t client-finder .
docker run -p 5000:5000 client-finder
```

This improves deployment consistency and environment portability.

---

# 🧪 Running Locally

## Backend

```bash
cd backend
npm install
node index.js
```

Backend runs on:

```text
http://localhost:5000
```

## Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```text
http://localhost:3000
```

---

# 📚 What I Learned

Building Client Finder helped me understand:

* Full-stack architecture
* API integration workflows
* OpenStreetMap & Overpass queries
* AI-assisted automation
* Structured prompt engineering
* JSON parsing from LLM outputs
* MongoDB persistence
* Dockerized deployment
* Rate limiting concepts
* Dashboard state management
* Backend request lifecycle design

---

# 🔮 Future Improvements

* Authentication system
* Saved leads dashboard
* CSV export support
* Analytics dashboard
* Pagination for large searches
* Redis caching
* Maps integration
* User-specific workspaces
* Queue-based AI processing

---

# 📌 About The Project

Client Finder is a self-built lead intelligence platform focused on combining real-world business discovery, AI-assisted outreach generation, and backend system design into one workflow.

The project was built to explore how APIs, AI systems, database persistence, and modern dashboard architecture work together in real applications.
