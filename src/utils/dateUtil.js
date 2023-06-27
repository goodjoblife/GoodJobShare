export const calcEndTime = (current, unit, amount) => {
  const allowedUnits = ['Day'];
  if (
    !current instanceof Date ||
    !allowedUnits.includes(unit) ||
    !Number.isInteger(amount)
  ) {
    return;
  }
  if (unit === 'Day') {
    return new Date(current.getTime() + amount * 24 * 60 * 60 * 1000);
  }
  return;
};
