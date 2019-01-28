import React from 'react';
import PropTypes from 'prop-types';
import { Heading, P } from 'common/base';

import styles from './Heading.module.css';

const formatType = type => {
  switch (type) {
    case 'work':
      return '工作心得';
    case 'interview':
      return '面試經驗';
    case 'intern':
      return '實習心得';
    default:
      return '工作心得';
  }
};

const formatComapny = company => {
  if (company) {
    return typeof company.name === 'string'
      ? company.name
      : company.name.join(' / ');
  }
  return null;
};

const ExperienceHeading = ({ experience }) => (
  <div className={styles.heading}>
    <P Tag="h2" size="l" className={styles.badge}>
      {experience && formatType(experience.type)}
    </P>
    <Heading size="l" className={styles.title}>
      {experience && formatComapny(experience.company)}
    </Heading>
  </div>
);

ExperienceHeading.propTypes = {
  experience: PropTypes.object,
};

export default ExperienceHeading;
