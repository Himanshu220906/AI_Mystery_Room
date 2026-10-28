import { Router } from 'express';
import { randomBytes, randomUUID, createHash, timingSafeEqual } from 'node:crypto';
import { z } from 'zod';
import Case from '../models/Case.js';
import Investigation from '../models/Investigation.js';
import { generateCase } from '../services/gemini.service.js';
import { validateGeneratedCase } from '../services/caseValidator.service.js';
import { toPublicCase } from '../services/caseSerializer.service.js';
import { asyncHandler } from '../middleware/asyncHandler.js';

const router = Router();
const createSchema = z.object({ scenario: z.string().trim().min(20).max(3000), caseType: z.enum(['crime','theft','disappearance','sabotage','academic_mystery','general_mystery']).default('general_mystery'), difficulty: z.enum(['easy','medium','hard']).default('medium'), suspectCount: z.coerce.number().int().min(3).max(6).default(4), evidenceIntensity: z.enum(['balanced','evidence_heavy']).default('balanced'), extraInstructions: z.string().max(1000).optional() });
const hash = (token) => createHash('sha256').update(token).digest('hex');
async function authorize(req, res, next) {
  const raw = req.get('x-investigation-token') || '';
  const investigation = await Investigation.findOne({ investigationId: req.params.investigationId });
  if (!investigation) return res.status(404).json({ success: false, error: { code: 'INVESTIGATION_NOT_FOUND', message: 'Investigation not found.' } });
  const left = Buffer.from(hash(raw)); const right = Buffer.from(investigation.accessTokenHash);
  if (left.length !== right.length || !timingSafeEqual(left, right)) return res.status(401).json({ success: false, error: { code: 'INVALID_ACCESS_TOKEN', message: 'A valid investigation token is required.' } });
  req.investigation = investigation; next();
}

router.get('/health', (_req, res) => res.json({ success: true, data: { status: 'ok' } }));
router.post('/cases', asyncHandler(async (req, res) => {
  const input = createSchema.parse(req.body);
  try {
    const generated = validateGeneratedCase(await generateCase(input), input.suspectCount);
    const caseId = randomUUID(); const investigationId = randomUUID(); const accessToken = randomBytes(32).toString('base64url');
    const record = await Case.create({ ...generated, caseId, scenario: input.scenario, caseType: input.caseType, difficulty: input.difficulty, status: 'ready' });
    await Investigation.create({ investigationId, caseId, accessTokenHash: hash(accessToken) });
    res.status(201).json({ success: true, data: toPublicCase(record), investigation: { investigationId, accessToken } });
  } catch (error) {
    const isOutputValidation = error.name === 'ZodError' || error.code === 'INVALID_AI_OUTPUT';
    console.error('[case-generation] failed', {
      code: error.code || (isOutputValidation ? 'INVALID_AI_OUTPUT' : 'GENERATION_ERROR'),
      name: error.name,
      providerStatus: error.code === 'AI_PROVIDER_UNAVAILABLE' ? error.status : undefined,
      validationPaths: error.name === 'ZodError' ? error.issues.map((issue) => issue.path.join('.')) : undefined,
    });
    if (isOutputValidation) return res.status(502).json({ success: false, error: { code: 'CASE_GENERATION_FAILED', message: 'The generated case did not pass validation. Please try again.' } });
    if (error.code === 'AI_PROVIDER_UNAVAILABLE') return res.status(503).json({ success: false, error: { code: error.code, message: 'The AI provider is unavailable. Please check the server configuration and try again.' } });
    return res.status(502).json({ success: false, error: { code: 'CASE_GENERATION_FAILED', message: 'The mystery could not be generated. Please try again.' } });
  }
}));
router.get('/cases/:caseId', asyncHandler(async (req, res) => {
  const record = await Case.findOne({ caseId: req.params.caseId });
  if (!record) return res.status(404).json({ success: false, error: { code: 'CASE_NOT_FOUND', message: 'Case not found.' } });
  res.json({ success: true, data: toPublicCase(record) });
}));
router.get('/investigations/:investigationId', asyncHandler(authorize), asyncHandler(async (req, res) => {
  const item = req.investigation;
  res.json({ success: true, data: { investigationId: item.investigationId, caseId: item.caseId, reviewedEvidenceIds: item.reviewedEvidenceIds, submitted: Boolean(item.accusation?.submittedAt), resultAvailable: Boolean(item.accusation?.submittedAt) } });
}));
router.patch('/investigations/:investigationId/progress', asyncHandler(authorize), asyncHandler(async (req, res) => {
  const body = z.object({ evidenceId: z.string().min(1), reviewed: z.boolean() }).parse(req.body);
  const record = await Case.findOne({ caseId: req.investigation.caseId });
  if (!record || !record.evidence.some((item) => item.id === body.evidenceId && item.reviewable)) return res.status(400).json({ success: false, error: { code: 'VALIDATION_ERROR', message: 'Evidence does not belong to this case.' } });
  const ids = new Set(req.investigation.reviewedEvidenceIds);
  body.reviewed ? ids.add(body.evidenceId) : ids.delete(body.evidenceId);
  req.investigation.reviewedEvidenceIds = [...ids]; await req.investigation.save();
  res.json({ success: true, data: { reviewedEvidenceIds: req.investigation.reviewedEvidenceIds } });
}));
router.post('/investigations/:investigationId/accusation', asyncHandler(authorize), asyncHandler(async (req, res) => {
  const body = z.object({ suspectId: z.string().min(1), explanation: z.string().max(2000).optional() }).parse(req.body);
  const investigation = req.investigation;
  if (investigation.accusation?.submittedAt) return res.json({ success: true, data: { correct: investigation.accusation.isCorrect, submitted: true }, solution: await getSolution(investigation) });
  const record = await Case.findOne({ caseId: investigation.caseId }).select('+solution');
  if (!record) return res.status(404).json({ success: false, error: { code: 'CASE_NOT_FOUND', message: 'Case not found.' } });
  if (!record.suspects.some((suspect) => suspect.id === body.suspectId)) return res.status(400).json({ success: false, error: { code: 'INVALID_SUSPECT', message: 'Select a suspect from this case.' } });
  const correct = record.solution.culpritSuspectId === body.suspectId;
  const saved = await Investigation.findOneAndUpdate(
    { _id: investigation._id, 'accusation.submittedAt': { $exists: false } },
    { $set: { accusation: { suspectId: body.suspectId, explanation: body.explanation || '', isCorrect: correct, submittedAt: new Date() } } },
    { new: true },
  );
  if (!saved) {
    const existing = await Investigation.findById(investigation._id);
    return res.json({ success: true, data: { correct: existing.accusation.isCorrect, submitted: true }, solution: await getSolution(existing) });
  }
  record.status = 'solved'; await record.save();
  res.json({ success: true, data: { correct, submitted: true }, solution: solutionPayload(record, correct) });
}));
async function getSolution(investigation) {
  const record = await Case.findOne({ caseId: investigation.caseId }).select('+solution');
  return solutionPayload(record, investigation.accusation?.isCorrect);
}
function solutionPayload(record, correct) {
  return { correct: Boolean(correct), culpritSuspectId: record.solution.culpritSuspectId, motive: record.solution.motive, incidentReconstruction: record.solution.incidentReconstruction, reasoning: record.solution.reasoning, alternativeSuspectExplanations: record.solution.alternativeSuspectExplanations };
}
router.get('/investigations/:investigationId/solution', asyncHandler(authorize), asyncHandler(async (req, res) => {
  if (!req.investigation.accusation?.submittedAt) return res.status(403).json({ success: false, error: { code: 'SOLUTION_NOT_AVAILABLE', message: 'Submit an accusation before viewing the solution.' } });
  res.json({ success: true, data: await getSolution(req.investigation) });
}));
export default router;
