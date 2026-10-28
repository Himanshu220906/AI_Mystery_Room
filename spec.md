# AI MYSTERY ROOM
## Product Requirements Document (PRD) + Technical Specification
**Document Type:** Single Source of Truth (SSOT) for AI-Assisted Development  
**Project Name:** AI Mystery Room  
**Version:** 1.0.0  
**Status:** Initial specification — authoritative for MVP development  
**Target Developer:** OpenAI Codex  
**Frontend:** React + Vite  
**Backend:** Node.js + Express.js  
**Database:** MongoDB + Mongoose  
**AI Provider:** Google Gemini API  
**Language:** JavaScript (ES Modules)  
**Primary Goal:** Build a complete, interactive, AI-powered mystery investigation website.

---

# 1. Project Overview

## 1.1 What Is AI Mystery Room?

AI Mystery Room is an interactive web application where users become investigators and solve fictional mysteries using AI-generated scenarios and evidence.

The user provides a short scenario, topic, study material, or description. The application uses Google Gemini to transform that input into a complete fictional investigation.

Each mystery contains:

- A fictional crime, incident, or unexplained event.
- A list of suspects with individual backgrounds and motives.
- AI-generated evidence, including chat messages, photographs, CCTV-style footage representations, witness statements, and forensic reports.
- Contradictions, clues, misleading evidence, and investigative connections.
- One predetermined culprit.
- A final accusation interface.
- A result screen explaining whether the user solved the mystery correctly.

**Core principle:** The user should feel like a detective investigating a case, not like someone answering a conventional quiz.

## 1.2 Product Vision

Create a realistic, immersive, replayable mystery-solving experience in which AI converts almost any suitable input into a logically consistent investigation.

The application should combine:

1. AI-powered storytelling.
2. Evidence-based reasoning.
3. Interactive investigation.
4. Mystery-solving gameplay.
5. Educational and study-oriented applications.
6. Dynamic case generation.

## 1.3 Example User Journey

A user enters:

> Create a mystery based on a college laboratory where an expensive research prototype disappears before a science exhibition.

The backend sends the request to Gemini. Gemini generates a fictional case containing:

- Four suspects: a student researcher, a laboratory assistant, a professor, and a security guard.
- A timeline of events.
- A motive for each suspect.
- Simulated WhatsApp conversations.
- A laboratory photograph.
- A fictional CCTV transcript or video-style evidence item.
- Access logs and witness statements.
- Several clues that can be cross-referenced.
- A culprit and a logically consistent explanation.

The user reviews the evidence, compares alibis, identifies contradictions, and accuses one suspect.

The server compares the selected suspect with the stored answer key and returns the outcome and explanation.

The answer key must remain hidden from the player until the case has ended.

---

# 2. Product Goals and Non-Goals

## 2.1 Goals

The MVP must:

- Allow users to create mysteries from text input.
- Generate structured cases using Gemini.
- Generate multiple fictional evidence types.
- Maintain consistency between suspects, evidence, timelines, and culprit.
- Provide an interactive investigation room.
- Allow the player to inspect evidence and submit an accusation.
- Explain the solution after the investigation.
- Save cases and investigation progress in MongoDB.
- Handle AI failures, invalid output, and rate limits gracefully.
- Protect API keys and secret case information.
- Work on desktop and mobile browsers.
- Be straightforward for Codex to develop, test, and extend.

## 2.2 Non-Goals for MVP

The initial version will not require:

- Multiplayer investigations.
- Real-time cooperative gameplay.
- User-generated public case marketplaces.
- Live police, CCTV, WhatsApp, or other external integrations.
- Real-world criminal investigations.
- Payment subscriptions.
- A native Android or iOS application.
- A custom-trained AI model.
- A fully generated, playable cinematic video for every case.
- Complex 3D environments.

These may be considered after the MVP is stable.

---

# 3. Target Users

### Primary users

- Students who enjoy puzzles and logical reasoning.
- Mystery and detective-story enthusiasts.
- Users interested in interactive AI experiences.
- Teachers and learners who want scenario-based learning activities.

### Secondary users

- Content creators producing mystery-solving challenges.
- Educators creating fictional case studies.
- Developers exploring AI-generated interactive applications.

### Core user needs

Users should be able to:

- Create a mystery without writing a detailed story.
- Understand the investigation quickly.
- Explore evidence at their own pace.
- Discover relationships between clues.
- Make an informed accusation.
- Learn why the culprit was responsible.

---

# 4. Functional Scope

## 4.1 MVP Feature Requirements

| ID | Feature | Priority |
|---|---|---|
| FR-001 | Landing page | Must |
| FR-002 | Scenario creation form | Must |
| FR-003 | Gemini-powered case generation | Must |
| FR-004 | Suspect profiles | Must |
| FR-005 | Evidence generation and storage | Must |
| FR-006 | Interactive investigation room | Must |
| FR-007 | Evidence viewer | Must |
| FR-008 | Accusation submission | Must |
| FR-009 | Server-side answer verification | Must |
| FR-010 | Solution and reasoning screen | Must |
| FR-011 | Case persistence in MongoDB | Must |
| FR-012 | Responsive UI | Must |
| FR-013 | Loading, error, and retry states | Must |
| FR-014 | Case difficulty selection | Should |
| FR-015 | Evidence search and filtering | Should |
| FR-016 | Progress tracking | Should |
| FR-017 | Investigation history | Should |
| FR-018 | AI-generated image assets | Should |
| FR-019 | Full AI-generated playable CCTV video | Later |
| FR-020 | Multiplayer mode | Later |

**MVP definition:** A user can enter a scenario, receive a coherent mystery, inspect its evidence, submit an accusation, and receive a verified explanation without requiring manual database changes or developer intervention.

---

# 5. User Roles and Permissions

## 5.1 Guest User

For the MVP, users may investigate cases without creating an account.

A guest can:

- Create a case.
- View its suspects and evidence.
- Track progress during the investigation.
- Submit an accusation.
- View the solution after submission.

A guest should only be able to access a case using its valid, sufficiently unpredictable case identifier and an associated access token.

## 5.2 Registered User — Future Extension

A future authentication system may support:

- Persistent user accounts.
- Saved case libraries.
- Personal statistics.
- Bookmarked evidence.
- Achievements and leaderboards.

Authentication is not required for the first release.

## 5.3 Administrator — Future Extension

An administrative interface may later support case moderation, generation diagnostics, abuse monitoring, and usage statistics.

Do not build an admin dashboard unless explicitly requested in a later specification.

---

# 6. Core User Experience

## 6.1 Application Routes

| Route | Purpose |
|---|---|
| `/` | Landing page |
| `/create` | Create a mystery |
| `/case/:caseId` | Investigation room |
| `/case/:caseId/solution` | Solution screen |
| `/history` | Optional MVP investigation history |

The solution route must not reveal the answer until the corresponding case has been successfully completed or the user has explicitly abandoned it and chosen to reveal the solution, if that option is implemented.

## 6.2 Landing Page

The landing page must include:

- Application logo and name.
- Navigation bar.
- Hero heading and short description.
- Primary CTA: **Create a Mystery**.
- Secondary CTA: **How It Works**.
- A visual preview of a fictional investigation.
- A brief explanation of the investigation process.
- Feature cards for AI-generated cases, digital evidence, and detective reasoning.
- Footer with project information and privacy notice.

Suggested hero text:

**Every clue tells a story. Every suspect hides something. Can you solve the mystery?**

Supporting text:

Create your own fictional investigation with AI-generated suspects, evidence, hidden motives, and unexpected twists.

The design should convey suspense without making the interface difficult to use.

## 6.3 Mystery Creation Page

The creation form must support the following fields.

| Field | Type | Rules |
|---|---|---|
| Scenario | Textarea | Required; 20–3,000 characters |
| Case type | Select | Crime, theft, disappearance, sabotage, academic mystery, general mystery |
| Difficulty | Select | Easy, Medium, Hard |
| Suspect count | Select | 3–6 |
| Evidence intensity | Select | Balanced, Evidence-heavy |
| Optional extra instructions | Textarea | Maximum 1,000 characters |

Defaults:

- Case type: General mystery.
- Difficulty: Medium.
- Suspect count: 4.
- Evidence intensity: Balanced.

Validate input on both the frontend and backend.

The application must not send an AI request until the input passes backend validation.

Display a loading screen while the mystery is generated, using clear progress messaging. Do not claim that individual AI stages have completed unless those stages have actually completed.

Suggested loading messages:

- Constructing the case.
- Establishing the timeline.
- Preparing suspects and evidence.
- Checking investigative consistency.

These messages are interface messaging, not guarantees of separate backend processing stages.

## 6.4 Investigation Room

The investigation room is the primary application screen.

Recommended desktop layout:

- **Left sidebar:** Case information, suspect directory, evidence categories.
- **Main panel:** Selected evidence or investigation overview.
- **Right panel:** Investigation notes, clue connections, or case timeline.

On smaller screens, these panels must become a stacked or tabbed layout.

The investigation room must display:

- Case title and short description.
- Case status.
- Difficulty.
- Investigation progress.
- Suspect list.
- Evidence inventory.
- Evidence details.
- Timeline.
- Optional personal notes.
- Accusation CTA.

### Case status values

- `generating`
- `ready`
- `in_progress`
- `solved`
- `failed`
- `abandoned`

Use valid state transitions. For example, a case cannot move from `failed` directly to `solved` without successful recovery or regeneration.

## 6.5 Suspect Profiles

Every suspect must have:

- Stable suspect ID.
- Full name.
- Fictional age, where relevant.
- Role or occupation.
- Background.
- Relationship to the incident.
- Possible motive.
- Publicly known alibi.
- Initial suspicion summary.

Do not show the true culprit flag, secret motive, hidden alibi, or private investigative rationale before the solution is revealed.

Public suspect profiles may contain misleading but plausible statements. They must not disclose the secret answer through a direct field or UI condition.

## 6.6 Evidence Inventory

The application must support these evidence types.

| Evidence type | Example | MVP representation |
|---|---|---|
| Chat messages | Simulated WhatsApp conversation | Styled chat transcript |
| Images | Photograph of a suspicious object | AI-generated image or labeled placeholder |
| CCTV | Security camera observation | Timestamped transcript and camera still |
| Witness statement | Interview transcript | Document viewer |
| Access logs | Entry and exit records | Structured table |
| Documents | Notes, emails, reports | Document viewer |
| Forensics | Fictional fingerprints or trace analysis | Report card |
| Timeline | Events before and after the incident | Timeline component |

Evidence should be individually inspectable. Clicking an item opens a detailed viewer containing its title, type, timestamp, description, source, and contents.

### Evidence authenticity

Every generated item must be identified as fictional within the application, for example:

**SIMULATED EVIDENCE — AI-GENERATED FOR THIS CASE**

Do not impersonate actual police agencies, create real personal data, or present synthetic evidence as authentic records.

## 6.7 Evidence Interactions

Users must be able to:

- Open and close evidence details.
- Read full evidence content.
- Filter evidence by category.
- Search evidence by title or text.
- Review timestamps.
- Cross-reference suspects and timeline events.
- Mark evidence as reviewed.
- Add private investigation notes, if supported.
- Track the number of evidence items reviewed.

Evidence review progress is separate from the final correctness score.

## 6.8 Accusation Interface

The accusation screen must:

1. Display all eligible suspects.
2. Let the user select exactly one suspect.
3. Allow an optional explanation for the accusation.
4. Require explicit confirmation before final submission.
5. Send the suspect ID and optional explanation to the backend.
6. Prevent duplicate or conflicting final submissions.
7. Reveal the result only after the backend verifies the accusation.

The final submission should be treated as irreversible for the MVP.

If the user attempts to submit a second accusation, return the existing result rather than reevaluating the case.

## 6.9 Solution Screen

After a valid accusation, display:

- Correct or incorrect result.
- Actual culprit.
- Culprit's motive.
- Reconstruction of the incident.
- Critical clues.
- Contradictions in the suspects' statements.
- Explanation of why alternative suspects were not responsible.
- Final timeline.
- Optional score and achievement summary.
- CTA to create another mystery.

The explanation must be based on the same case facts and answer key that were used to generate the mystery.

The solution must not be generated independently in a way that introduces a different culprit or contradictory facts.

---

# 7. AI Mystery Generation Architecture

## 7.1 Gemini's Responsibilities

Gemini will be responsible for generating the fictional investigation's structured narrative.

It should produce:

1. Case metadata.
2. Incident description.
3. Suspects.
4. Motives and alibis.
5. Incident timeline.
6. Evidence inventory.
7. Clue relationships.
8. Contradictions.
9. Culprit and secret solution.
10. Explanation and deduction chain.

Gemini output must be treated as untrusted external data.

The backend must validate every generated case before making it available to the frontend.

## 7.2 Recommended Generation Pipeline

Use a structured pipeline with validation.

**Stage 1 — Input validation**

Validate the user's scenario, requested difficulty, suspect count, and case type.

**Stage 2 — Case generation**

Ask Gemini to generate the complete mystery as a structured JSON object.

**Stage 3 — Schema validation**

Validate the generated object using a schema library such as Zod.

**Stage 4 — Narrative consistency validation**

Check deterministic rules, including:

- The culprit ID references an existing suspect.
- All evidence IDs are unique.
- Timeline references are valid.
- Evidence references existing suspects where applicable.
- Every major clue is internally consistent.
- The culprit can be identified from the available evidence.
- The solution explanation agrees with the case facts.

**Stage 5 — Optional repair**

If validation fails, make at most one bounded repair attempt. The repair request should include validation errors and ask Gemini to return corrected JSON without changing unrelated case facts unnecessarily.

**Stage 6 — Persistence**

Save the validated case to MongoDB.

**Stage 7 — Player response**

Return the public case representation without secret fields.

If the case cannot be validated after the permitted repair attempt, mark generation as failed and provide a retry option.

Do not expose raw prompts, model diagnostics, internal stack traces, or the secret answer key.

## 7.3 Structured Output Requirements

Use Gemini's supported structured-output or JSON-response capabilities when available for the selected model.

The backend must still parse and validate the response.

Never rely on prompt instructions alone to guarantee valid JSON.

Use a pinned, supported Gemini model identifier configured through environment variables rather than scattering model names throughout the codebase.

Keep the model integration behind a service interface so the model can be changed without rewriting routes or frontend components.

## 7.4 Difficulty Definitions

**Easy**

- 3 suspects by default.
- Direct clues.
- A relatively clear timeline.
- Few misleading details.
- One obvious but evidence-supported deduction.

**Medium**

- 4 suspects by default.
- Multiple overlapping motives.
- At least two pieces of evidence must be cross-referenced.
- Some misleading evidence.
- At least one meaningful contradiction.

**Hard**

- 5–6 suspects.
- Interconnected evidence.
- Several plausible alternative theories.
- More subtle timeline inconsistencies.
- The solution requires combining multiple independent clues.

Difficulty must influence actual reasoning complexity, not just the case description.

Do not guarantee a fixed number of clues if doing so would force the model to generate redundant or contradictory evidence.

---

# 8. Canonical Case Data Contract

The following is the canonical internal case structure. Codex must implement a typed or schema-validated equivalent.

```json
{
  "caseId": "generated-case-id",
  "title": "The Missing Prototype",
  "scenario": "A research prototype disappeared before an exhibition.",
  "caseType": "academic_mystery",
  "difficulty": "medium",
  "status": "ready",
  "suspects": [
    {
      "id": "suspect_01",
      "name": "Aarav Mehta",
      "role": "Student Researcher",
      "background": "Worked on the prototype.",
      "publicMotive": "Wanted recognition for the project.",
      "publicAlibi": "Claims to have left the laboratory at 6 PM."
    }
  ],
  "timeline": [
    {
      "id": "event_01",
      "timestamp": "2026-10-28T17:30:00Z",
      "description": "The prototype was last confirmed in the laboratory.",
      "relatedSuspectIds": ["suspect_01"],
      "evidenceIds": ["evidence_01"]
    }
  ],
  "evidence": [
    {
      "id": "evidence_01",
      "type": "chat",
      "title": "Laboratory Group Chat",
      "description": "A conversation between laboratory members.",
      "sourceLabel": "Simulated messaging transcript",
      "timestamp": "2026-10-28T17:40:00Z",
      "content": {
        "messages": [
          {
            "sender": "Aarav",
            "text": "I have already left the laboratory.",
            "timestamp": "2026-10-28T17:40:00Z"
          }
        ]
      },
      "relatedSuspectIds": ["suspect_01"],
      "relatedEventIds": ["event_01"],
      "reviewable": true
    }
  ],
  "clues": [
    {
      "id": "clue_01",
      "description": "The stated departure time conflicts with another record.",
      "evidenceIds": ["evidence_01"],
      "relatedSuspectIds": ["suspect_01"],
      "importance": "high"
    }
  ],
  "solution": {
    "culpritSuspectId": "suspect_01",
    "motive": "Secret explanation of the culprit's motive.",
    "incidentReconstruction": "Secret reconstruction of the incident.",
    "reasoning": [
      {
        "step": 1,
        "explanation": "A key evidence item contradicts the suspect's statement.",
        "evidenceIds": ["evidence_01"]
      }
    ],
    "alternativeSuspectExplanations": [
      {
        "suspectId": "suspect_02",
        "explanation": "Evidence rules out this suspect."
      }
    ]
  }
}
```

**Important:** This is a structural example, not a complete mystery. Production generation must populate every required field and satisfy the validation rules.

The case may include additional fields, but all additions must be documented and must not weaken existing security guarantees.

---

# 9. AI Consistency and Quality Rules

A mystery is not acceptable merely because Gemini returns valid JSON.

Each generated case must satisfy these requirements.

## 9.1 Single Culprit

Each case must have exactly one predetermined culprit.

The culprit must reference a valid suspect.

The solution cannot change based on the player's selected accusation.

## 9.2 Evidence-Supported Deduction

The case must contain sufficient evidence to support the intended solution.

The culprit must be distinguishable from the alternatives using the evidence provided.

A confession or an unexplained statement that simply names the culprit is insufficient as the sole basis for the solution.

## 9.3 Timeline Consistency

The timeline must not contain impossible event ordering unless the contradiction is an intentional clue.

Time zones and timestamp formats must be consistent.

Where exact times are unavailable, use explicitly approximate timestamps or relative ordering rather than pretending to have precise information.

## 9.4 Misleading Evidence

Red herrings are permitted, but their misleading nature must be explainable after the solution.

A suspect should not be considered guilty solely because the model assigned them a suspicious motive.

## 9.5 Evidence Integrity

The application must preserve the generated case facts after validation.

Opening an evidence item must not trigger a new generation of its underlying facts.

The solution screen must use the stored solution, not a fresh AI guess.

## 9.6 Quality Gate

Before publication, verify:

- Required fields exist.
- All references resolve.
- No duplicate identifiers exist.
- The culprit is valid.
- The reasoning references actual evidence.
- The solution does not contradict established facts.
- All evidence types have a supported rendering strategy.
- The case meets the requested difficulty.
- No internal secret fields are included in the public response.

If a case fails quality checks, repair it or fail generation cleanly.

---

# 10. Gemini Integration

## 10.1 Integration Requirements

Use Google's supported Gemini SDK for Node.js, selected and installed during implementation.

All Gemini requests must originate from the backend.

The API key must never be included in React source code, browser storage, network responses, or public environment variables.

Suggested environment variables:

```env
PORT=5000
NODE_ENV=development

MONGODB_URI=mongodb://127.0.0.1:27017/ai_mystery_room

GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=your-supported-model-id

CLIENT_ORIGIN=http://localhost:5173
```

Use a `.env.example` containing placeholders only. Never commit `.env`.

## 10.2 AI Service Responsibilities

Create a dedicated Gemini service that handles:

- Model configuration.
- Structured prompts.
- Generation requests.
- Output parsing.
- Timeouts.
- Bounded retries.
- Token or usage controls where supported.
- Error classification.
- Logging without secrets.

Do not call Gemini directly from Express route handlers or React components.

## 10.3 Failure Handling

Handle at least these situations:

- Invalid API key.
- Quota exceeded.
- Rate limiting.
- Network timeout.
- Model unavailable.
- Invalid JSON.
- Schema validation failure.
- Safety refusal.
- Empty response.

Return stable, user-friendly error codes.

Do not automatically retry every failure. Retry only transient failures and keep retries bounded.

## 10.4 Image Generation

Images are separate assets, not merely JSON descriptions.

The MVP must remain fully playable without an external image-generation service.

For image evidence:

1. Generate a structured visual description using Gemini.
2. If a compatible image-generation provider is configured, generate the image separately.
3. Validate and store the asset.
4. Associate its URL or storage key with the evidence item.
5. Otherwise, render a polished illustrative placeholder or evidence card.

Do not assume that every Gemini text model generates images or videos.

Keep image generation behind a separate provider interface so another compatible provider can be integrated later.

## 10.5 CCTV Video

For MVP, represent CCTV evidence through:

- Camera metadata.
- Simulated timestamps.
- A transcript of observed events.
- A camera-still image or placeholder.
- A clear evidence description.

Actual generated video is a future feature.

If a video provider is added later, store the resulting video asset separately and link it to the evidence item. Do not create fake playback controls for video files that do not exist.

---

# 11. Technical Architecture

## 11.1 Architecture Overview

```text
React + Vite Frontend
        |
        | HTTPS / JSON API
        v
Express.js REST API
        |
        +-----------------------+
        |                       |
        v                       v
Gemini Service             MongoDB
        |                       |
        v                       v
Case Generation          Cases and Progress
        |
        v
Validation and Quality Gate
        |
        v
Public Case DTO + Secret Answer Key
        |
        v
Investigation UI
        |
        v
Accusation API
        |
        v
Server-Side Verification
```

## 11.2 Frontend Responsibilities

The frontend must:

- Render pages and reusable components.
- Validate form inputs for usability.
- Call the backend API.
- Show loading and error states.
- Display suspects and evidence.
- Track evidence review state.
- Collect the user's accusation.
- Render the returned solution.

The frontend must not:

- Call Gemini directly.
- Store the answer key.
- Decide whether an accusation is correct.
- Generate authoritative case data.
- Expose MongoDB credentials.
- Treat hidden HTML or client state as a security boundary.

## 11.3 Backend Responsibilities

The backend must:

- Validate requests.
- Enforce rate limits.
- Call Gemini.
- Validate generated content.
- Persist case data.
- Issue and verify guest access credentials.
- Return safe public case representations.
- Track investigation progress.
- Evaluate accusations.
- Return the stored solution only when authorized.
- Centralize error handling and logging.

## 11.4 Database Responsibilities

MongoDB stores:

- Case metadata.
- Suspects.
- Timeline.
- Evidence.
- Clues.
- Secret solution.
- Case-generation status.
- Investigation progress.
- Final accusation and result.
- Optional generation diagnostics.

Never store the Gemini API key in a case document.

---

# 12. Repository Structure

Use the following structure as the initial repository contract.

```text
ai-mystery-room/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   ├── layout/
│   │   │   ├── mystery/
│   │   │   ├── evidence/
│   │   │   └── suspects/
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   ├── CreateCasePage.jsx
│   │   │   ├── InvestigationPage.jsx
│   │   │   └── SolutionPage.jsx
│   │   ├── hooks/
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── context/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env.example
│   └── package.json
│
├── server/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   │   ├── gemini.service.js
│   │   │   ├── caseGenerator.service.js
│   │   │   ├── caseValidator.service.js
│   │   │   ├── caseSerializer.service.js
│   │   │   └── imageProvider.service.js
│   │   ├── validators/
│   │   ├── utils/
│   │   ├── app.js
│   │   └── server.js
│   ├── tests/
│   ├── .env.example
│   └── package.json
│
├── docs/
│   ├── SPEC.md
│   ├── API.md
│   ├── DATA_MODEL.md
│   ├── AI_GENERATION.md
│   └── DECISIONS.md
│
├── .gitignore
├── package.json
└── README.md
```

This structure is the default. Codex may adjust it when necessary, but it must document material deviations in `docs/DECISIONS.md`.

Use JavaScript ES modules throughout the project. Do not mix CommonJS and ES modules without a documented reason.

---

# 13. Database Schema

## 13.1 Case Model

Create a `Case` Mongoose model.

Required fields:

- `title`
- `scenario`
- `caseType`
- `difficulty`
- `status`
- `suspects`
- `timeline`
- `evidence`
- `clues`
- `solution`
- `generationMetadata`
- `createdAt`
- `updatedAt`
- `expiresAt`, if case expiration is implemented.

The solution must be stored separately from the public case representation. It may be embedded in the case document as a private subdocument, provided serializers and access controls prevent accidental disclosure.

Recommended database-level validation includes enums, required fields, and identifier uniqueness where practical.

## 13.2 Investigation Model

Create a separate `Investigation` model to represent a player's attempt.

Required fields:

- `caseId`
- `accessTokenHash`
- `reviewedEvidenceIds`
- `notes`, if supported
- `status`
- `selectedSuspectId`
- `accusationExplanation`
- `isCorrect`
- `startedAt`
- `submittedAt`
- `createdAt`
- `updatedAt`

Use an explicit unique investigation identifier.

If anonymous investigations are supported, generate a cryptographically secure access token and return it only at creation. Store only a hash of that token on the server.

The token must be required for subsequent investigation-specific operations.

Do not expose the raw access token in logs.

## 13.3 Data Isolation

A public case response may include the suspects, evidence, timeline, and clues, but must exclude:

- Culprit ID.
- Secret motive.
- Secret alibis.
- Hidden solution reasoning.
- Internal generation prompts.
- Internal validation diagnostics.
- Private provider responses.

The serializer must use an explicit allowlist rather than removing a few known secret fields from a copied database object.

## 13.4 Indexes

Add indexes for:

- Case ID.
- Case status and creation time.
- Investigation ID.
- Investigation case reference.
- Investigation expiration, where appropriate.

Review index usefulness against actual query patterns.

---

# 14. REST API Contract

Use the base path `/api/v1`.

All requests and responses must use JSON except asset delivery.

## 14.1 Create a Case

`POST /api/v1/cases`

Request:

```json
{
  "scenario": "A research prototype disappears from a college laboratory.",
  "caseType": "academic_mystery",
  "difficulty": "medium",
  "suspectCount": 4,
  "evidenceIntensity": "balanced"
}
```

Success: `201 Created`

Response:

```json
{
  "success": true,
  "data": {
    "caseId": "case-id",
    "title": "The Missing Prototype",
    "status": "ready",
    "suspects": [],
    "timeline": [],
    "evidence": [],
    "clues": []
  },
  "investigation": {
    "investigationId": "investigation-id",
    "accessToken": "one-time-returned-secret"
  }
}
```

The example is illustrative. Actual responses must contain the validated public case and omit all secret fields.

If synchronous generation is used, return the completed case. If asynchronous generation is implemented later, document its polling contract separately.

## 14.2 Retrieve a Case

`GET /api/v1/cases/:caseId`

Returns the public case representation.

It must not return the answer key, regardless of the requester's access to the case.

## 14.3 Retrieve Investigation Progress

`GET /api/v1/investigations/:investigationId`

Requires the investigation access credential.

Returns:

- Investigation status.
- Reviewed evidence IDs.
- Final submission status.
- Result availability.

Never return the secret solution before the investigation is completed.

## 14.4 Mark Evidence as Reviewed

`PATCH /api/v1/investigations/:investigationId/progress`

Request:

```json
{
  "evidenceId": "evidence_01",
  "reviewed": true
}
```

The backend must verify that the evidence belongs to the associated case.

## 14.5 Submit an Accusation

`POST /api/v1/investigations/:investigationId/accusation`

Request:

```json
{
  "suspectId": "suspect_02",
  "explanation": "The access record conflicts with the suspect's statement."
}
```

The backend must:

1. Authenticate the investigation token.
2. Verify the case and investigation exist.
3. Verify that the investigation is eligible for submission.
4. Validate the suspect ID.
5. Compare the selected suspect ID with the stored culprit ID.
6. Persist the accusation and result atomically where possible.
7. Return the outcome and solution.

If the case has already been submitted, return the existing result and do not overwrite the original accusation.

## 14.6 Retrieve Solution

`GET /api/v1/investigations/:investigationId/solution`

Requires a valid investigation credential and a completed investigation.

The server must not allow this endpoint to expose the solution for an unfinished case.

## 14.7 Health Check

`GET /api/v1/health`

Returns service status and a basic availability indicator.

Do not expose credentials, database connection strings, or sensitive infrastructure details.

## 14.8 Standard Error Response

Use a consistent structure.

```json
{
  "success": false,
  "error": {
    "code": "CASE_GENERATION_FAILED",
    "message": "The mystery could not be generated. Please try again."
  }
}
```

Suggested error codes:

- `VALIDATION_ERROR`
- `CASE_NOT_FOUND`
- `INVESTIGATION_NOT_FOUND`
- `INVALID_ACCESS_TOKEN`
- `INVALID_SUSPECT`
- `CASE_GENERATION_FAILED`
- `AI_PROVIDER_UNAVAILABLE`
- `RATE_LIMIT_EXCEEDED`
- `INVESTIGATION_ALREADY_SUBMITTED`
- `SOLUTION_NOT_AVAILABLE`
- `INTERNAL_SERVER_ERROR`

Use appropriate HTTP status codes and avoid exposing internal error details.

---

# 15. UI Design System

## 15.1 Design Direction

Use a modern detective-investigation aesthetic.

The visual direction should combine:

- Dark charcoal backgrounds.
- Muted navy panels.
- Warm off-white text.
- Restrained amber highlights.
- Subtle red accents for warnings.
- Thin borders and restrained shadows.
- Evidence-card layouts.
- Monospaced typography for timestamps and case IDs.

Avoid excessive neon effects, cluttered dashboards, and distracting animations.

## 15.2 Typography

Use a clean sans-serif font for body content and headings.

A monospaced font may be used for:

- Timestamps.
- Evidence identifiers.
- Access logs.
- Technical case metadata.

Typography must remain readable on small screens.

## 15.3 Components

Create reusable components for:

- `Navbar`
- `Footer`
- `Button`
- `Input`
- `Select`
- `Textarea`
- `Modal`
- `LoadingState`
- `ErrorState`
- `CaseHeader`
- `SuspectCard`
- `SuspectProfile`
- `EvidenceCard`
- `EvidenceViewer`
- `ChatTranscript`
- `DocumentViewer`
- `CCTVViewer`
- `Timeline`
- `InvestigationProgress`
- `AccusationModal`
- `SolutionSummary`

Use consistent spacing, color tokens, border radii, and responsive breakpoints.

## 15.4 Accessibility

The interface must support:

- Keyboard navigation.
- Visible focus indicators.
- Semantic HTML.
- Accessible form labels.
- Modal focus management.
- Adequate contrast.
- Alternative text for meaningful images.
- Reduced-motion preferences.

Do not communicate status solely through color.

---

# 16. Security and Privacy Requirements

Security is mandatory, even for a portfolio project.

## 16.1 Secrets

- Keep Gemini API credentials on the backend.
- Keep MongoDB credentials in environment variables.
- Never commit secrets.
- Never log access tokens or API keys.
- Provide safe `.env.example` files.

## 16.2 Input and Output Validation

- Validate all incoming API data.
- Limit request body sizes.
- Validate Gemini-generated data.
- Sanitize or safely render user-supplied text.
- Never render AI-generated HTML as trusted markup.
- Prevent cross-site scripting through unsafe rendering.
- Do not construct MongoDB queries directly from unvalidated user objects.

## 16.3 Rate Limiting and Abuse Prevention

Apply rate limits to:

- Case generation.
- Investigation creation.
- Accusation submissions.
- Other endpoints that may be abused.

Use stricter limits for expensive AI generation.

The MVP should include configurable generation limits and scenario length limits.

For production deployments, consider IP-based limits, abuse monitoring, and distributed rate limiting where necessary.

## 16.4 Case Access

Use unpredictable identifiers and authenticated investigation access tokens.

An unguessable case ID alone must not authorize access to secret solutions.

The API must validate the access token for every investigation-specific operation.

## 16.5 Prompt Injection

Treat the user's scenario as data, not as trusted system instructions.

Gemini prompts must clearly distinguish application instructions from user-provided scenario content.

User input must not be allowed to override the case schema, disable safety requirements, reveal backend secrets, or redefine server-side evaluation rules.

## 16.6 Fictional Content

All people, conversations, documents, and events are fictional.

The interface should visibly label synthetic evidence.

Avoid generating real personal information, actual private communications, or evidence intended to impersonate authentic legal or law-enforcement records.

---

# 17. Performance and Reliability

The MVP must:

- Render the landing page without requiring a Gemini request.
- Avoid unnecessary repeated case-generation calls.
- Persist validated cases before returning success.
- Handle concurrent requests safely.
- Use bounded AI timeouts and retries.
- Prevent duplicate final submissions.
- Display a usable error state when the AI provider is unavailable.
- Avoid blocking the entire UI while nonessential components load.
- Keep evidence navigation responsive after a case has loaded.

Case generation may take several seconds or longer depending on model availability and response complexity.

Do not hardcode a promise of a specific generation time.

For production, consider asynchronous jobs, a job queue, and separate asset storage if generation latency or volume requires them.

---

# 18. Testing Strategy

Use a test framework compatible with the chosen stack, such as Vitest for frontend tests and Jest or Vitest with Supertest for backend tests.

Use mocked Gemini responses for deterministic automated tests. Do not require paid AI calls for every test run.

## 18.1 Unit Tests

Test:

- Input validation.
- Case schema validation.
- Culprit reference validation.
- Evidence reference validation.
- Public case serialization.
- Secret-field exclusion.
- Accusation evaluation.
- Error normalization.
- Investigation token verification.

## 18.2 API Integration Tests

Test:

1. Valid case creation.
2. Invalid scenario submission.
3. Gemini provider failure.
4. Invalid Gemini JSON.
5. Case retrieval.
6. Unauthorized investigation access.
7. Valid evidence review.
8. Invalid evidence reference.
9. Correct accusation.
10. Incorrect accusation.
11. Duplicate accusation.
12. Premature solution access.
13. Database failure handling.
14. Rate limiting.

## 18.3 Frontend Tests

Test:

- Creation form validation.
- Loading and error states.
- Suspect selection.
- Evidence viewer opening and closing.
- Evidence filtering.
- Progress display.
- Accusation confirmation.
- Correct and incorrect solution screens.
- Responsive navigation.

## 18.4 End-to-End Test

A complete browser test must verify:

1. Open the landing page.
2. Create a mystery.
3. Wait for successful generation.
4. Open suspect profiles.
5. Review evidence.
6. Submit an accusation.
7. Verify the returned result.
8. Confirm the solution is consistent with the stored case.

Use a deterministic mocked AI response for the main automated end-to-end test.

## 18.5 Security Acceptance Tests

Explicitly verify that:

- The public case API does not expose the culprit.
- The frontend bundle does not contain the Gemini key.
- The solution endpoint rejects unauthorized access.
- A second accusation cannot overwrite the first.
- Malformed AI output cannot be persisted as a valid case.
- Invalid suspect IDs cannot be submitted.
- User-controlled text cannot execute as HTML or JavaScript.

---

# 19. Development Milestones

Codex must implement the application in small, verifiable milestones.

## Phase 1 — Project Foundation

- Create the repository structure.
- Configure React and Vite.
- Configure Express.
- Configure MongoDB and Mongoose.
- Add environment validation.
- Add health endpoint.
- Configure linting and testing.
- Verify frontend and backend startup.

**Exit criterion:** The frontend loads, the backend starts, and MongoDB connectivity is verified.

## Phase 2 — UI Foundation

- Build the landing page.
- Build the creation form.
- Build reusable layout components.
- Implement responsive design.
- Add loading, empty, and error states.
- Use mock case data temporarily.

**Exit criterion:** The complete basic navigation works without requiring a live Gemini key.

## Phase 3 — Gemini Integration

- Integrate the supported Gemini SDK.
- Implement prompts.
- Generate structured cases.
- Validate JSON and schema.
- Add bounded repair behavior.
- Persist valid cases.
- Add failure handling.

**Exit criterion:** A valid scenario generates a complete, persisted, validated case.

## Phase 4 — Investigation Room

- Implement public case retrieval.
- Render suspects.
- Render evidence categories.
- Implement evidence viewers.
- Render the timeline.
- Implement review progress.
- Add optional notes.

**Exit criterion:** Users can explore a persisted case and its evidence.

## Phase 5 — Accusation and Solution

- Implement investigation access tokens.
- Implement accusation submission.
- Add server-side verification.
- Implement duplicate-submission protection.
- Build the solution screen.
- Verify secret-field isolation.

**Exit criterion:** Correct and incorrect accusations return consistent results, and the answer key remains protected before completion.

## Phase 6 — Hardening

- Add automated tests.
- Add rate limits.
- Verify input and output validation.
- Test error scenarios.
- Test mobile responsiveness.
- Review API security.
- Update documentation.

**Exit criterion:** All required MVP tests pass and critical security checks succeed.

## Phase 7 — Deployment

- Configure production environment variables.
- Deploy the frontend and backend.
- Configure production MongoDB.
- Configure CORS and HTTPS.
- Verify the live application.
- Document deployment and troubleshooting.

**Exit criterion:** A user can complete an entire investigation on the deployed website.

---

# 20. Definition of Done

The MVP is complete only when all required conditions are satisfied.

### Product

- [ ] A user can create a mystery from a scenario.
- [ ] Gemini generates structured case data.
- [ ] Each case has one predetermined culprit.
- [ ] Suspects, clues, evidence, and timeline are available.
- [ ] Evidence types render correctly or use clearly labeled fallbacks.
- [ ] The investigation room is responsive.
- [ ] The user can submit one accusation.
- [ ] The backend evaluates the accusation.
- [ ] The solution explains the case consistently.

### Backend

- [ ] REST API endpoints are implemented.
- [ ] MongoDB persistence works.
- [ ] AI output validation works.
- [ ] Case serialization protects the answer key.
- [ ] Investigation access tokens are verified.
- [ ] Duplicate accusations are handled safely.
- [ ] Rate limits and error handling are implemented.

### Frontend

- [ ] All primary routes work.
- [ ] Loading and error states are implemented.
- [ ] Evidence viewers are functional.
- [ ] The accusation flow is functional.
- [ ] The solution screen is functional.
- [ ] Keyboard accessibility and responsive behavior are checked.

### Quality

- [ ] Unit tests pass.
- [ ] API integration tests pass.
- [ ] Main end-to-end test passes.
- [ ] Security acceptance tests pass.
- [ ] `.env` is excluded from Git.
- [ ] README contains setup instructions.
- [ ] API and schema documentation are current.
- [ ] No critical feature is represented by a nonfunctional placeholder.

---

# 21. Codex Operating Instructions

These rules govern all AI-assisted development work on this project.

## 21.1 Single Source of Truth

`docs/SPEC.md` is the authoritative specification for product behavior.

`docs/API.md` defines the API contract.

`docs/DATA_MODEL.md` defines the persisted data structures and field visibility.

`docs/AI_GENERATION.md` defines the Gemini prompts, generation pipeline, and quality rules.

`docs/DECISIONS.md` records approved architectural decisions and deviations.

When these documents conflict, prioritize the product requirements in `SPEC.md`, but do not silently implement an inconsistent API or schema. Resolve the conflict and update all affected documents.

The repository must not contain competing specifications that independently redefine product behavior.

## 21.2 Before Writing Code

Codex must:

1. Inspect the existing repository.
2. Read the current specification.
3. Identify existing implementations and constraints.
4. Determine the smallest coherent implementation step.
5. State the files to be created or modified.
6. Implement the feature.
7. Run relevant tests and validation.
8. Report the results accurately.

Do not recreate a working project from scratch merely because the existing structure differs slightly from the suggested structure.

## 21.3 Implementation Rules

- Follow the specified MERN architecture.
- Use JavaScript ES modules.
- Use reusable components and service boundaries.
- Keep API routes thin.
- Keep AI generation out of React components.
- Keep business logic out of presentation components.
- Validate data at system boundaries.
- Preserve backwards compatibility when practical.
- Never hardcode API secrets.
- Never fake successful API responses in production code.
- Never expose the answer key through the client.
- Avoid unnecessary dependencies.
- Avoid implementing future features before MVP requirements are met.
- Use deterministic fixtures for automated tests.

## 21.4 Scope Control

Do not add authentication, payments, multiplayer, a leaderboard, or actual video generation unless these features are explicitly approved.

If an implementation detail is unspecified, choose the simplest secure approach consistent with the specification and document any decision that materially affects architecture or product behavior.

If a required feature depends on an unavailable external service, implement the documented fallback rather than claiming the integration works.

## 21.5 Documentation Maintenance

Every significant feature must update relevant documentation.

Changes to API responses must update `API.md`.

Changes to persisted fields must update `DATA_MODEL.md`.

Changes to AI prompts or quality validation must update `AI_GENERATION.md`.

Architectural deviations must be recorded in `DECISIONS.md`.

Update `SPEC.md` whenever an approved change modifies product requirements.

## 21.6 Completion Reports

After each milestone, Codex must report:

- What was implemented.
- Files created or modified.
- Commands executed.
- Tests executed and their actual outcomes.
- Known limitations.
- Any configuration still required.
- The next recommended milestone.

Do not claim a test, deployment, API integration, or manual verification succeeded unless the corresponding check was actually performed.

---

# 22. Initial Decisions and Explicit Assumptions

The following decisions are established for version 1.0.

| Topic | Decision |
|---|---|
| Application type | Responsive web application |
| Architecture | MERN stack |
| Frontend | React + Vite |
| Backend | Node.js + Express |
| Database | MongoDB + Mongoose |
| AI provider | Google Gemini |
| Primary language | JavaScript ES modules |
| Authentication | Guest access for MVP |
| Case generation | Structured AI output plus backend validation |
| Culprit selection | Exactly one final accusation |
| Answer verification | Backend only |
| Image evidence | Optional generated image with fallback |
| CCTV evidence | Transcript and camera-still representation for MVP |
| Real video generation | Future extension |
| Payments | Out of scope |
| Multiplayer | Out of scope |
| Deployment | Production-ready configuration; hosting provider chosen separately |
| Testing | Unit, integration, frontend, and end-to-end tests |

## Open implementation choices

Codex should select reasonable defaults for minor implementation details and document them. These decisions do not block the initial build.

- Exact Gemini model identifier supported by the account and SDK.
- Exact UI component library, if any.
- Exact hosting provider.
- Exact production asset-storage provider.
- Whether generation is synchronous in the first release.
- Whether investigation notes are persisted in the MVP.
- Whether case expiration is enabled.

Do not introduce an external paid service without documenting its purpose and configuration requirements.

---

# 23. Final Product Acceptance Scenario

The following scenario is the canonical end-to-end acceptance test.

**Input:** A user requests a fictional mystery involving a missing research prototype at a college.

**Expected behavior:**

1. The frontend validates the scenario and submits it to the backend.
2. The backend validates the request and invokes Gemini.
3. Gemini returns structured mystery data.
4. The backend validates the data and confirms that all references are consistent.
5. The backend persists the case and its secret solution.
6. The frontend receives only the public case representation and the initial investigation credential.
7. The user examines the suspects, evidence, and timeline.
8. The user selects a suspect and submits an accusation.
9. The backend validates the request and compares the selected suspect ID with the stored culprit ID.
10. The backend records the result and prevents subsequent submissions from overwriting it.
11. The solution screen reveals the culprit and explains the decisive evidence.
12. Automated tests confirm that the solution was not exposed before the final accusation.

**Pass condition:** The entire workflow succeeds without exposing the answer key, contradicting the stored case facts, or requiring manual intervention.

---

# 24. Final Instruction to Codex

Build AI Mystery Room as a complete, maintainable, secure, and responsive MERN application using this specification as the product's single source of truth.

Prioritize a functional end-to-end MVP over superficial visual completeness. Implement the application in the defined milestones, verify each milestone, preserve the separation between public evidence and secret solution data, and keep the documentation synchronized with the code.

The final application must deliver the complete mystery-solving experience: scenario input, AI-generated case, fictional evidence, interactive investigation, accusation, and a consistent solution.

**The central product principle is simple: AI creates the mystery, the backend preserves its truth, and the player discovers it through evidence.**
