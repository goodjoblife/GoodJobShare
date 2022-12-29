export const renderCountdown = (time, duration) => {
  const delta = time - duration;

  if (delta < 0) {
    return 0;
  }

  return Math.ceil(delta / 1000);
};
