# API Contract

Base path: `/api/v1`. Requests and responses use JSON. Errors follow `{ "success": false, "error": { "code": "...", "message": "..." } }`.

## Routes

| Method | Route | Access | Purpose |
|---|---|---|---|
| GET | `/health` | Public | Availability status |
| POST | `/cases` | Public, rate limited | Validate input, generate and persist a case; return public case plus one-time investigation credential |
| GET | `/cases/:caseId` | Public | Retrieve public case without solution |
| GET | `/investigations/:investigationId` | Investigation token | Retrieve reviewed IDs and submission state |
| PATCH | `/investigations/:investigationId/progress` | Investigation token | Add/remove reviewed evidence ID after ownership check |
| POST | `/investigations/:investigationId/accusation` | Investigation token | Record one suspect accusation and reveal solution |
| GET | `/investigations/:investigationId/solution` | Investigation token, completed only | Retrieve solution |

Investigation routes require `x-investigation-token`. The raw token is returned only by case creation; only its SHA-256 hash is stored. Case creation body fields: `scenario` (20–3,000 chars), `caseType`, `difficulty`, `suspectCount` (3–6), `evidenceIntensity`, and optional `extraInstructions` (maximum 1,000 chars).

Case generation is synchronous. The backend validates IDs and cross-references before MongoDB persistence. Provider failures return `AI_PROVIDER_UNAVAILABLE` (503); malformed or inconsistent model output returns `CASE_GENERATION_FAILED` (502). Async route failures are forwarded to the Express error handler so they do not terminate the server. Rate limits are configured in `server/src/app.js`.
