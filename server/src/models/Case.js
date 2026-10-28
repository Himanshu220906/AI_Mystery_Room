import mongoose from 'mongoose';

const caseSchema = new mongoose.Schema({
  caseId: { type: String, required: true, unique: true, index: true },
  title: { type: String, required: true }, scenario: { type: String, required: true },
  caseType: { type: String, required: true }, difficulty: { type: String, required: true },
  status: { type: String, enum: ['ready', 'in_progress', 'solved', 'failed', 'abandoned'], default: 'ready' },
  suspects: { type: [mongoose.Schema.Types.Mixed], required: true },
  timeline: { type: [mongoose.Schema.Types.Mixed], required: true },
  evidence: { type: [mongoose.Schema.Types.Mixed], required: true }, clues: { type: [mongoose.Schema.Types.Mixed], required: true },
  solution: { type: mongoose.Schema.Types.Mixed, required: true, select: false },
}, { timestamps: true, minimize: false });

export default mongoose.model('Case', caseSchema);
