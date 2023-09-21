import React from 'react';
import { CommonHelmet } from 'common/StaticHelmet';
import { generatePath } from '.';

export default () => (
  <CommonHelmet title="發文留言規則" path={generatePath()} />
);
