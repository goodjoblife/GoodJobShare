import { useEffect, useMemo } from 'react';
import useExperimentParameters from 'hooks/useExperimentParameters';
import { activateOptimize } from 'utils/gtm';

export default () => {
  useEffect(() => {
    activateOptimize('testInterviewFormType');
  }, []);
  const experimentParameters = useExperimentParameters(['interviewFormType']);

  const link = useMemo(() => {
    if (experimentParameters.interviewFormType === '20200530-B-typeform') {
      return { state: { share: 'interview' } };
    } else {
      return '/share/interview/step1';
    }
  }, [experimentParameters]);

  return link;
};
