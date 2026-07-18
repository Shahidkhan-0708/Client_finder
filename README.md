# Client Finder

Client Finder is a full-stack B2B lead discovery website that helps freelancers, agencies, and sales teams find local businesses with missing digital information such as websites, phone numbers, or emails. The app searches real-world business data, calculates a digital gap score, and generates an AI-powered pitch angle that can be used for outreach.

## What This Website Does

- Searches businesses by city and business type.
- Fetches real business data from OpenStreetMap through the Overpass API.
- Detects missing digital presence fields like website, phone, and email.
- Gives every business a gap score so high-opportunity leads are easier to identify.
- Uses Groq AI to generate a personalized sales pitch based on the missing information.
- Stores search history in MongoDB using Mongoose.
- Displays results in a clean Next.js dashboard with cards, stats, filters, and loading/error states.

## Tech Stack

### Frontend

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Lucide React icons
- Radix UI based components

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- Groq SDK
- Overpass API
- CORS
- dotenv

## Project Structure

```text
client_finder/
|-- backend/
|   |-- connections/
|   |   `-- m.js
|   |-- controllers/
|   |   |-- analyze.js
|   |   `-- s.js
|   |-- models/
|   |   |-- analyze.js
|   |   `-- s.js
|   |-- overpass/
|   |   `-- api.js
|   |-- routes/
|   |   |-- analyze.js
|   |   `-- search.js
|   |-- index.js
|   `-- package.json
|
|-- frontend/
|   |-- app/
|   |   |-- layout.tsx
|   |   `-- page.tsx
|   |-- components/
|   |   |-- business-card.tsx
|   |   |-- dashboard-sidebar.tsx
|   |   |-- gap-score-badge.tsx
|   |   |-- search-header.tsx
|   |   `-- stats-bar.tsx
|   `-- package.json
|
`-- README.md
```

## How The App Works

1. The user enters a city and selects a business type from the frontend dashboard.
2. The frontend sends a request to the backend search API.
3. The backend builds an Overpass query and fetches matching businesses from OpenStreetMap.
4. The backend returns business names, phone numbers, websites, emails, and coordinates when available.
5. The frontend maps the data into business cards and calculates a gap score.
6. When the user clicks `Generate Pitch`, the frontend sends that business data to the AI analysis API.
7. The backend checks which fields are missing, sends that context to Groq, and returns a pitch angle, priority, gaps, and score.

## API Endpoints

### Search Businesses

```http
GET /api/search?city=Delhi&type=restaurant
```

This endpoint searches businesses from OpenStreetMap using the Overpass API.

Example response:

```json
{
  "businesses": [
    {
      "name": "Example Restaurant",
      "phone": "9876543210",
      "website": null,
      "email": null,
      "lat": 28.6139,
      "lon": 77.209
    }
  ]
}
```

### Analyze Business Gaps

```http
POST /api/analyze
```

Request body:

```json
{
  "name": "Example Restaurant",
  "phone": "9876543210",
  "website": null,
  "email": null
}
```

Example response:

```json
{
  "gaps": ["No website", "No email address"],
  "pitch_angle": "Offer them a simple website and lead capture form to improve customer trust and inquiries.",
  "priority": "high",
  "score": 85
}
```

## Harder Concepts Explained

### 1. Full-Stack Architecture

This project is split into two applications:

- The frontend is responsible for user interaction, forms, dashboard layout, loading states, and displaying results.
- The backend is responsible for data fetching, database work, AI analysis, and secure API communication.

This separation keeps the UI fast and clean while keeping sensitive logic, API keys, and database access on the server side.

### 2. Overpass API and OpenStreetMap Data

The Overpass API is a query engine for OpenStreetMap. Instead of using a normal database query, the backend creates a special Overpass query:

```js
[out:json];
area[name="city"]->.a;
node(area.a)["amenity"="businessType"];
out body;
```

In simple words:

- Find the area with the given city name.
- Search inside that area.
- Find map nodes where the `amenity` matches the selected business type.
- Return the available business details.

This is useful because the app can search real location-based business data without manually maintaining a business database.

### 3. Digital Gap Detection

The app checks whether important business fields are missing:

- No website
- No phone number
- No email address
- Missing business name

These missing fields are treated as sales opportunities. For example, a restaurant without a website can be a good lead for a web developer, SEO agency, or digital marketing freelancer.

### 4. Gap Score Logic

The frontend calculates a basic gap score:

```ts
if (!business.website) score += 40;
if (!business.phone) score += 30;
if (!business.email) score += 30;
```

The score helps rank leads:

- `70+` means a high digital gap.
- `40-69` means a medium gap.
- Below `40` means a smaller gap.

This makes the dashboard more useful because users can quickly focus on businesses with the biggest opportunity.

### 5. AI Pitch Generation With Groq

The backend uses Groq's chat completion API to generate a sales pitch. Before calling the AI model, the backend creates a structured prompt containing:

- Business name
- Phone number
- Website status
- Email status
- Detected digital gaps

The prompt asks the model to return only JSON. This makes the AI response easier for the frontend to read and display.

### 6. JSON Parsing From AI Output

AI models sometimes return markdown formatting like:

` ```json { ... } ``` `

The backend removes those markdown wrappers before parsing:

```js
const cleaned = rawText.replace(/```json|```/g, "").trim();
const parsed = JSON.parse(cleaned);
```

This is important because the frontend expects structured JSON, not plain text.

### 7. MongoDB and Mongoose

MongoDB stores search data, and Mongoose provides schemas for the documents.

The search schema stores:

- City
- Business type
- Created/updated timestamps

This makes it possible to later build features like search history, analytics, saved leads, or user-specific dashboards.

### 8. CORS

The backend enables CORS for local frontend URLs:

```js
origin: ["http://localhost:3001", "http://localhost:3000"]
```

Because the frontend and backend run on different ports during development, browsers block requests unless the backend explicitly allows them. CORS solves that communication problem.

### 9. Client Components in Next.js

The main dashboard uses `"use client"` because it depends on browser-side features:

- React state
- Form input handling
- Fetching after user actions
- Clipboard copy
- Loading and error states

Server components are useful for static rendering and server-side data loading, but this dashboard needs client-side interactivity.

### 10. Reusable Backend API Utilities

The backend includes reusable helper files for common Express patterns:

- `asyncHandler` wraps async controllers and forwards errors to Express automatically.
- `AppError` creates consistent operational errors with status codes.
- `errorHandler` sends one standard error response format.
- `validate` checks request data before it reaches the controller.
- `sendSuccess` returns consistent API success responses.
- `logger` records method, URL, status code, and response time.
- `requireAuth` is an authentication middleware skeleton for future protected routes.

This is a good use of code generation because these files are repetitive, easy to standardize, and needed in almost every serious backend project. Once generated, controllers stay cleaner and future routes can reuse the same patterns.

## Setup Instructions

### 1. Clone The Repository

```bash
git clone <your-repository-url>
cd client_finder
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

### 3. Create Backend Environment File

Create `backend/.env`:

```env
MONGO_URI=your_mongodb_connection_string
GROQ_API_KEY=your_groq_api_key
```

### 4. Start Backend Server

```bash
node index.js
```

The backend runs on:

```text
http://localhost:5000
```

### 5. Install Frontend Dependencies

Open a new terminal:

```bash
cd frontend
npm install
```

### 6. Create Frontend Environment File

Create `frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### 7. Start Frontend Server

```bash
npm run dev
```

The frontend usually runs on:

```text
http://localhost:3000
```

## Important Environment Variables

| Variable | Used In | Purpose |
| --- | --- | --- |
| `MONGO_URI` | Backend | MongoDB connection string |
| `GROQ_API_KEY` | Backend | API key for AI pitch generation |
| `NEXT_PUBLIC_API_URL` | Frontend | Backend API base URL |

## Features

- Business search by city and category
- Real-world business data from OpenStreetMap
- Lead cards with contact information
- Missing field detection
- Digital gap score badge
- Dashboard statistics
- AI-generated pitch angle
- Copy pitch to clipboard
- Responsive dashboard layout
- Collapsible sidebar
- Loading, empty, and error states

## Future Improvements

- Save selected leads to MongoDB.
- Add authentication for users.
- Add lead export as CSV.
- Store generated pitches.
- Add pagination for large search results.
- Improve Overpass queries to support more business tags.
- Add maps using latitude and longitude.
- Add analytics for most searched cities and categories.

## Known Notes

- The app currently focuses on businesses tagged with `amenity` in OpenStreetMap. Some business categories may need different OSM tags for better results.
- The backend uses `MONGO_URI` in the database connection file. Keep the environment variable name consistent when deploying.
- Groq output is parsed as JSON, so the prompt asks the model to avoid markdown and extra text.

## Author

Built as a full-stack project to practice API integration, AI-assisted lead analysis, MongoDB persistence, and modern dashboard UI development.
