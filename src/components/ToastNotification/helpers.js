export const getOffsetY = eleHeight => marginY => index => {
  return index * (eleHeight + marginY);
};

export const statusMap = {
  ACTIVE: 'ACTIVE',
  SUNSET: 'SUNSET',
  INACTIVE: 'INACTIVE',
};
