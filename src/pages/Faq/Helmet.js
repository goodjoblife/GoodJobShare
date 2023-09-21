import React from 'react';
import { IMG_HOST } from 'constants/helmetData';
import { CommonHelmet } from 'common/StaticHelmet';
import { generatePath } from '.';

export default () => (
  <CommonHelmet
    title="常見問答"
    path={generatePath()}
    image={`${IMG_HOST}/og/faq.jpg`}
  />
);
