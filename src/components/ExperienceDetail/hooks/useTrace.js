import { useEffect } from 'react';
import { useViewExperiences } from 'hooks/viewLog';

const useTrace = experienceId => {
  // Send view to backend
  const viewExperiences = useViewExperiences();
  useEffect(() => {
    const contentIds = [experienceId];
    const referrer = window.location.href;
    viewExperiences({ contentIds, referrer });
  }, [experienceId, viewExperiences]);
};

export default useTrace;
