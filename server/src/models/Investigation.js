import mongoose from 'mongoose';

const investigationSchema = new mongoose.Schema({
  investigationId: { type: String, required: true, unique: true, index: true },
  caseId: { type: String, required: true, index: true },
  accessTokenHash: { type: String, required: true },
  reviewedEvidenceIds: { type: [String], default: [] },
  accusation: { suspectId: String, explanation: String, isCorrect: Boolean, submittedAt: Date },
}, { timestamps: true });

export default mongoose.model('Investigation', investigationSchema);
