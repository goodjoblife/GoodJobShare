import { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import ReactPixel from 'react-facebook-pixel';
import PIXEL_CONTENT_CATEGORY from '../../../constants/pixelConstants';
import { viewExperiences as viewExperiencesAction } from '../../../actions/viewLog';

const useView = experienceId => {
  const dispatch = useDispatch();
  const viewExperiences = useCallback(
    ({ contentIds, referrer }) => {
      dispatch(viewExperiencesAction({ contentIds, referrer }));
    },
    [dispatch],
  );

  useEffect(() => {
    const contentIds = [experienceId];
    const referrer = window.location.href;
    console.log({ contentIds, referrer });
    viewExperiences({ contentIds, referrer });
  }, [experienceId, viewExperiences]);
};

const useTrace = experienceId => {
  // Send view to backend
  useView(experienceId);

  // send Facebook Pixel 'ViewContent' event
  useEffect(() => {
    ReactPixel.track('ViewContent', {
      content_ids: [experienceId],
      content_category: PIXEL_CONTENT_CATEGORY.VIEW_EXPERIENCE,
    });
  }, [experienceId]);
};

export default useTrace;
