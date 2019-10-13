import React from 'react';

export default React.createContext({
  canViewLaborRightsSingle: true,
  canViewExperienceDetail: true,
  canViewTimeAndSalary: true,
  setCanView: () => {},
});
