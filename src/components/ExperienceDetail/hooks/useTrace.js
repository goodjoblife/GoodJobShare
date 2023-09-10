import { useEffect } from 'react';
import ReactPixel from 'react-facebook-pixel';
import PIXEL_CONTENT_CATEGORY from '../../../constants/pixelConstants';
<<<<<<< HEAD
import { useViewExperiences } from 'hooks/viewLog';
=======
import { viewExperiences as viewExperiencesAction } from 'actions/viewLog';

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
>>>>>>> upstream/dev

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
