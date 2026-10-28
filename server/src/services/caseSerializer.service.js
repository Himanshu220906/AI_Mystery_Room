export function toPublicCase(record) {
  const item = record.toObject ? record.toObject() : record;
  const { solution, __v, _id, ...safe } = item;
  return safe;
}
