# AI Generation

The server calls Gemini synchronously using `GEMINI_API_KEY` and `GEMINI_MODEL`. The default model is `gemini-2.0-flash`. The request asks Gemini for JSON with the canonical suspect, timeline, evidence, clue, and solution structures. User scenario text is framed as data, and evidence source labels must identify fictional content.

The backend parses the JSON and applies a Zod schema, checks exact generated suspect count, unique IDs, culprit membership, and cross-reference integrity before saving. Any malformed output is rejected; it is never persisted as a valid case. A missing API key returns a configuration error. Provider repair/retry and AI image generation are not implemented in this first build. Server diagnostics log only error categories, names, provider status codes, and validation paths; they omit prompts, credentials, and raw provider responses.

Difficulty, evidence intensity, and scenario are sent as generation constraints. The initial validation checks structural consistency; manual quality review and difficulty-specific clue calibration remain hardening work.
