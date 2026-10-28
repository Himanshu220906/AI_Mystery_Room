import { z } from 'zod';

const id = z.string().min(1);
const suspectSchema = z.object({ id, name: z.string().min(1), role: z.string().min(1), background: z.string().min(1), publicMotive: z.string().min(1), publicAlibi: z.string().min(1), initialSuspicion: z.string().min(1).optional(), age: z.number().int().positive().optional() });
const timestamp = z.string().min(1);
const caseSchema = z.object({
  title: z.string().min(1),
  suspects: z.array(suspectSchema).min(3).max(6),
  timeline: z.array(z.object({ id, timestamp, description: z.string().min(1), relatedSuspectIds: z.array(id), evidenceIds: z.array(id) })).min(3),
  evidence: z.array(z.object({ id, type: z.enum(['chat','image','cctv','witness_statement','access_log','document','forensic_report']), title: z.string().min(1), description: z.string().min(1), sourceLabel: z.string().min(1), timestamp, content: z.record(z.unknown()), relatedSuspectIds: z.array(id), relatedEventIds: z.array(id), reviewable: z.boolean() })).min(4),
  clues: z.array(z.object({ id, description: z.string().min(1), evidenceIds: z.array(id).min(1), relatedSuspectIds: z.array(id), importance: z.enum(['low','medium','high']) })).min(3),
  solution: z.object({ culpritSuspectId: id, motive: z.string().min(1), incidentReconstruction: z.string().min(1), reasoning: z.array(z.object({ step: z.number().int().positive(), explanation: z.string().min(1), evidenceIds: z.array(id).min(1) })).min(2), alternativeSuspectExplanations: z.array(z.object({ suspectId: id, explanation: z.string().min(1) })) }),
});

export function validateGeneratedCase(value, expectedSuspectCount) {
  const parsed = caseSchema.parse(value);
  if (expectedSuspectCount && parsed.suspects.length !== expectedSuspectCount) {
    const error = new Error('Generated suspect count did not match the request.');
    error.code = 'INVALID_AI_OUTPUT';
    throw error;
  }
  const suspects = new Set(parsed.suspects.map((item) => item.id));
  const evidence = new Set(parsed.evidence.map((item) => item.id));
  const events = new Set(parsed.timeline.map((item) => item.id));
  if (suspects.size !== parsed.suspects.length || evidence.size !== parsed.evidence.length || events.size !== parsed.timeline.length) throw Object.assign(new Error('AI output contains duplicate IDs.'), { code: 'INVALID_AI_OUTPUT' });
  if (!suspects.has(parsed.solution.culpritSuspectId)) throw Object.assign(new Error('Culprit does not reference a suspect.'), { code: 'INVALID_AI_OUTPUT' });
  for (const item of parsed.timeline) {
    if (item.relatedSuspectIds.some((value) => !suspects.has(value)) || item.evidenceIds.some((value) => !evidence.has(value))) throw Object.assign(new Error('Timeline contains a dangling reference.'), { code: 'INVALID_AI_OUTPUT' });
  }
  for (const item of parsed.evidence) {
    if (item.relatedSuspectIds.some((value) => !suspects.has(value)) || item.relatedEventIds.some((value) => !events.has(value))) throw Object.assign(new Error('Evidence contains a dangling reference.'), { code: 'INVALID_AI_OUTPUT' });
  }
  for (const item of parsed.clues) {
    if (item.relatedSuspectIds.some((value) => !suspects.has(value)) || item.evidenceIds.some((value) => !evidence.has(value))) throw Object.assign(new Error('Clue contains a dangling reference.'), { code: 'INVALID_AI_OUTPUT' });
  }
  if (parsed.solution.reasoning.some((item) => item.evidenceIds.some((value) => !evidence.has(value)))) throw Object.assign(new Error('Solution contains a dangling evidence reference.'), { code: 'INVALID_AI_OUTPUT' });
  return parsed;
}
