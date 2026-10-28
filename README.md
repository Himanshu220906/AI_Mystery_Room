# AI Mystery Room

AI Mystery Room turns a short fictional scenario into an evidence-led mystery. Players inspect the case file, review suspects and clues, then make one final accusation. The server keeps the solution private until the accusation is submitted.

## Stack

- React, Vite, React Router
- Node.js, Express, Mongoose
- MongoDB
- Google Gemini API
- JavaScript ES modules

## Requirements

- Node.js 20 or newer
- npm
- A MongoDB instance (local or hosted)
- A Google Gemini API key

## Run locally

1. Copy `server/.env.example` to `server/.env` and set `MONGODB_URI` and `GEMINI_API_KEY`.
2. Copy `client/.env.example` to `client/.env` if the API is not at `http://localhost:4000/api/v1`.
3. From the repository root, run `npm install`, `npm --prefix client install`, and `npm --prefix server install`.
4. Run `npm run dev`.
5. Open `http://localhost:5173`. The API health endpoint is `http://localhost:4000/api/v1/health`.

The browser keeps the investigation credential in session storage. It is returned only when a case is created and is required for progress updates and the final accusation. Keep the original browser session open for the full investigation.

## Environment

See `server/.env.example` and `client/.env.example`. Gemini calls happen only on the server. The application intentionally returns a setup error when the Gemini key is missing; it does not substitute fake generated cases.

## API and data notes

- API base path: `/api/v1`
- `GET /health` is a lightweight availability check.
- Case responses are serialized without the secret solution.
- Investigation requests require `x-investigation-token`.
- A solution is available only after the accusation is recorded.
- See `docs/API.md`, `docs/DATA_MODEL.md`, and `docs/AI_GENERATION.md`.

## Current scope

The first project build includes scenario creation, Gemini case generation and validation, MongoDB persistence, suspect/evidence/timeline exploration, review progress, one accusation, and a solution screen. AI-generated image files and persistent guest case recovery are not included; image evidence is rendered as its fictional evidence record. Production deployment and automated test suites are follow-on hardening work.
