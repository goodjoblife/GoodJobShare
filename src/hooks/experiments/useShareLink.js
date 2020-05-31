import { useEffect, useMemo } from 'react';
import useExperimentParameters from 'hooks/useExperimentParameters';
import { activateOptimize } from 'utils/gtm';

export default companyName => {
  useEffect(() => {
    activateOptimize('testInterviewFormType');
  }, []);
  const experimentParameters = useExperimentParameters(['interviewFormType']);

  const link = useMemo(() => {
    if (experimentParameters.interviewFormType === '20200530-B-typeform') {
      if (companyName) {
        return { state: { share: 'interview', companyName } };
      } else {
        return { state: { share: 'interview' } };
      }
    } else {
      if (companyName) {
        return `/share/interview?companyName=${companyName}`;
      } else {
        return '/share/interview/step1';
      }
    }
  }, [companyName, experimentParameters.interviewFormType]);

  return link;
};
