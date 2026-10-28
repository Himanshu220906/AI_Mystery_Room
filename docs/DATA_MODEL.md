# Data Model

## Case

MongoDB collection `cases`; `solution` uses Mongoose `select: false`.

| Field | Visibility | Description |
|---|---|---|
| caseId | Public | Unpredictable UUID used by public case route |
| title, scenario, caseType, difficulty, status | Public | Case metadata |
| suspects, timeline, evidence, clues | Public | Validated case content; evidence is explicitly fictional |
| solution | Secret | Culprit, motive, reconstruction, reasoning, alternatives |
| timestamps | Internal | Mongoose creation/update dates |

## Investigation

MongoDB collection `investigations`.

| Field | Visibility | Description |
|---|---|---|
| investigationId | Public identifier | UUID used to identify the investigation |
| caseId | Internal | Associated case |
| accessTokenHash | Secret | SHA-256 of the one-time returned random credential |
| reviewedEvidenceIds | Token protected | Evidence the guest reviewed |
| accusation | Token protected | Selected suspect, explanation, outcome, submission date |

Public serialization removes the solution, Mongo internal ID, and version key. Solution reads explicitly opt in with `select('+solution')` after authorization and completion checks.
