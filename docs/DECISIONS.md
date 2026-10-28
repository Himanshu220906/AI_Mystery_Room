# Decisions

| Decision | Reason |
|---|---|
| Keep root `spec.md` as the only full requirements document | It is the only supplied specification; `docs/SPEC.md` links to it to avoid competing copies. |
| Use synchronous Gemini generation | Matches the specification's permitted first-release option and keeps the initial workflow simple. |
| Persist one case document and one investigation document | Keeps secret solution selection isolated and makes public case serialization explicit. |
| Return/store the access token only in the browser session | Enables guest investigations without accounts; losing the session credential means the investigation cannot be submitted. |
| Use CSS and inline evidence renderers instead of a component library | Keeps initial dependencies small and provides responsive case-file styling. |
| No fabricated case fallback without Gemini | Avoids representing a mock response as a successful AI-generated production case. |
