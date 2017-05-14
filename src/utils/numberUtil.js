export const formatWithCommas = n => (
  n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
);

export default formatWithCommas;
