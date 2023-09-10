import { useEffect } from 'react';
import ReactPixel from 'react-facebook-pixel';
import PIXEL_CONTENT_CATEGORY from 'constants/pixelConstants';

const useTracking = entryId => {
  /*
   * send Facebook Pixel 'ViewContent' event
   */
  useEffect(() => {
    ReactPixel.track('ViewContent', {
      content_ids: [entryId],
      content_category: PIXEL_CONTENT_CATEGORY.VIEW_LABOR_RIGHT,
    });
  }, [entryId]);
};

export default useTracking;
