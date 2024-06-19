import React from 'react';
import PropTypes from 'prop-types';
import { Heading, P } from 'common/base';
import cn from 'classnames';

import styles from './Heading.module.css';
import {
  originalCompanyNameSelector,
  jobTitleSelector,
} from '../experienceSelector';

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

const ExperienceHeading = ({ experience, className }) => (
  <div className={cn(styles.heading, className)}>
    <P Tag="h2" size="l" className={styles.badge}>
      {experience && formatType(experience.type)}
    </P>
    <Heading size="l">
      {experience &&
        `${originalCompanyNameSelector(experience)} ${jobTitleSelector(
          experience,
        )}`}
    </Heading>
  </div>
);

ExperienceHeading.propTypes = {
  className: PropTypes.string,
  experience: PropTypes.object,
};

export default ExperienceHeading;
