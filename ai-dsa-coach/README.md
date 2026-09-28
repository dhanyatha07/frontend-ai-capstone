# AI DSA Coach

An AI-powered DSA practice application that helps students improve their problem-solving approach through guided coaching, hints, and complexity analysis.

## Project Brief

AI DSA Coach is designed for students practicing Data Structures and Algorithms who want feedback on their approach before immediately seeing a complete solution. Users select a DSA problem, submit their approach or code, and receive structured AI coaching with progressive hints, an approach explanation, time and space complexity, and a suggested next step.

## Features

- Select from common DSA problems
- View problem descriptions and constraints
- Submit an approach or code attempt
- Receive AI-generated coaching
- Progressive hints:
  - Hint 1
  - Hint 2
  - Stronger Hint
  - Full Approach
- Time and space complexity explanation
- Suggested next step for learning
- Input validation
- User-friendly AI error handling
- Structured AI responses validated with Zod
- Responsive React frontend
- Production deployment with separate frontend and backend services

## Problems Included

- Two Sum
- Binary Search
- Valid Parentheses
- Maximum Subarray
- Merge Sort
- Reverse Linked List

## Tech Stack

### Frontend

- React
- Vite
- JavaScript
- CSS

### Backend

- Node.js
- Express
- Google Gemini API
- Zod
- CORS
- dotenv

### Testing

- Vitest
- React Testing Library
- jest-dom

### Deployment

- Render Static Site — frontend
- Render Web Service — backend

## Architecture

```text
User
  |
  v
React / Vite Frontend
  |
  | POST /api/analyze
  v
Express Backend
  |
  | Gemini API request
  v
Google Gemini
  |
  v
Structured AI Response
  |
  v
Zod Validation
  |
  v
React displays coaching
```

The frontend is deployed separately from the backend.

The frontend communicates with the Express backend through the `VITE_API_URL` environment variable.

The backend keeps the Gemini API key on the server and does not expose it to the frontend.

## AI Integration

The application uses Google's Gemini API to analyze a student's DSA attempt.

The student submits:

- Problem ID
- Problem
- Their approach or code

The backend builds a coaching prompt and sends it to Gemini.

The AI response is expected to contain:

- `feedback`
- `hint1`
- `hint2`
- `strongerHint`
- `approach`
- `timeComplexity`
- `spaceComplexity`
- `nextStep`
- `readyForApproach`

The response is validated using Zod before it is returned to the frontend.

This keeps the AI response structured and makes it easier for the frontend to reliably display each part of the coaching experience.

## Error Handling

The backend handles API failures and returns user-friendly errors instead of exposing raw API failures to the user.

Examples include:

- Invalid problem
- Gemini temporarily unavailable
- Gemini quota exhaustion
- Failed AI analysis

For temporary Gemini `503` errors, the backend retries the request with increasing delays.

When the Gemini quota is exhausted, the frontend displays:

> AI Coach daily quota has been reached. Please try again later.

This allows the application to fail safely rather than showing a raw server or API error.

## Local Setup

Clone the repository and move into the application directory:

```bash
cd ai-dsa-coach
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
VITE_API_URL=http://localhost:5000
GEMINI_API_KEY=your_gemini_api_key
```

Start the frontend:

```bash
npm run dev
```

Start the backend in another terminal:

```bash
node server/index.js
```

The frontend communicates with the backend through:

```text
http://localhost:5000
```

## Environment Variables

### Frontend

```env
VITE_API_URL
```

This points the React application to the deployed or local backend.

### Backend

```env
GEMINI_API_KEY
```

This is the Gemini API key used by the backend.

The Gemini API key should never be committed to GitHub.

## Testing

The project uses Vitest and React Testing Library.

The `AttemptInput` component currently has tests covering:

1. Empty submission validation
2. Successful submission of the student's approach and problem ID

Run tests with:

```bash
npm run test -- --run
```

Latest local test result:

```text
Test Files  1 passed
Tests       2 passed
```

## Linting and Build

Lint:

```bash
npm run lint
```

Production build:

```bash
npm run build
```

Both were successfully run before deployment.

## Performance & Accessibility

A Lighthouse audit was performed on the deployed application.

Latest recorded results:

| Category       | Score |
| -------------- | ----: |
| Performance    |   100 |
| Accessibility  |   100 |
| Best Practices |   100 |
| SEO            |    82 |

The accessibility audit reached 100.

The performance audit reached 100 after improvements.

The SEO score is lower because the application is primarily an interactive learning application and currently has limited SEO metadata.

## Deployment

The application uses two Render services.

### Frontend

Render Static Site

- Branch: `capstone-ai-dsa-coach`
- Root directory: `ai-dsa-coach`
- Build command:

```bash
npm install && npm run build
```

- Publish directory:

```text
dist
```

### Backend

Render Web Service

- Branch: `capstone-ai-dsa-coach`
- Start command:

```bash
node server/index.js
```

Backend URL:

https://frontend-ai-capstone.onrender.com

Frontend URL:

https://frontend-ai-capstone.onrender.com

## Deployment Checklist

- [x] Frontend builds successfully
- [x] Backend starts successfully
- [x] Frontend deployed
- [x] Backend deployed
- [x] Environment variables configured
- [x] Gemini API key kept on backend
- [x] Frontend communicates with backend
- [x] AI error states handled
- [x] Gemini temporary failures retried
- [x] Lighthouse performance audit completed
- [x] Lighthouse accessibility audit completed
- [x] Unit tests pass
- [x] Lint passes
- [x] Production build passes
- [x] Git repository updated

## Rollback Plan

The application is deployed directly from the Git repository.

If a production deployment introduces a problem, the previous working commit can be redeployed from Render.

The backend and frontend are deployed independently, so either service can be redeployed without changing the other service.

## Known Limitations

- AI responses depend on Gemini API availability and quota.
- The free Render backend instance can spin down after inactivity, which may cause a delay when it starts again.
- The application currently contains a limited set of DSA problems.
- SEO metadata can be improved.
- Test coverage currently focuses on the `AttemptInput` component rather than the complete application.
- The application currently depends on an external AI service for coaching responses.

## Future Improvements

- Add more DSA problems and topics
- Add persistent user progress
- Add authentication
- Add more component and integration tests
- Add a history of previous attempts
- Add difficulty and topic filters
- Add richer code formatting
- Improve SEO metadata
- Add automated end-to-end testing
- Add monitoring and analytics

## Reflection

The most challenging part of the project was connecting the frontend, backend, and AI service into a complete production flow rather than treating the AI integration as an isolated feature.

One important lesson was that a production application needs to handle failures from external services. Gemini availability and quota cannot be assumed, so the application needs retries and user-friendly error states.

Another important lesson was the difference between building a feature locally and actually shipping it. Deployment introduced additional concerns such as environment variables, production ports, separate frontend/backend services, and API availability.

If I built the project again, I would plan testing and deployment earlier instead of leaving production integration until the final stage.

## Repository

GitHub:

https://github.com/dhanyatha07/frontend-ai-cap
