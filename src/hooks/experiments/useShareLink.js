export default companyName => {
  if (companyName) {
    return { state: { share: 'interview', companyName } };
  } else {
    return { state: { share: 'interview' } };
  }
};
