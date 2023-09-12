import { useEffect } from 'react';
import ReactPixel from 'react-facebook-pixel';
<<<<<<< HEAD
import PIXEL_CONTENT_CATEGORY from '../../../constants/pixelConstants';
=======
import PIXEL_CONTENT_CATEGORY from 'constants/pixelConstants';
>>>>>>> upstream/dev
import { useViewExperiences } from 'hooks/viewLog';

const useTrace = experienceId => {
  // Send view to backend
  const viewExperiences = useViewExperiences();
  useEffect(() => {
    const contentIds = [experienceId];
    const referrer = window.location.href;
    viewExperiences({ contentIds, referrer });
  }, [experienceId, viewExperiences]);

  // send Facebook Pixel 'ViewContent' event
  useEffect(() => {
    ReactPixel.track('ViewContent', {
      content_ids: [experienceId],
      content_category: PIXEL_CONTENT_CATEGORY.VIEW_EXPERIENCE,
    });
  }, [experienceId]);
};

export default useTrace;
