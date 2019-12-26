import { useEffect } from 'react';
import ReactPixel from 'react-facebook-pixel';
import { PIXEL_ID } from '../config';

export default () => {
  // initialize facebook pixel
  useEffect(() => {
    ReactPixel.init(PIXEL_ID);
    ReactPixel.pageView();
  }, []);
};
