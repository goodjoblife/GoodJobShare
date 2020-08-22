import React from 'react';
import PropTypes from 'prop-types';
import { Heading, P } from 'common/base';
import cn from 'classnames';

import styles from './Heading.module.css';
import {
  companyNameSelector,
  jobTitleSelector,
  formatTypeSelector,
} from '../experienceSelector';

const ExperienceHeading = ({ experience, className }) => (
  <div className={cn(styles.heading, className)}>
    <P Tag="h2" size="l" className={styles.badge}>
      {experience && formatTypeSelector(experience)}
    </P>
    <Heading size="l">
      {experience &&
        `${companyNameSelector(experience)} ${jobTitleSelector(experience)}`}
    </Heading>
  </div>
);

ExperienceHeading.propTypes = {
  experience: PropTypes.object,
  className: PropTypes.string,
};

export default ExperienceHeading;
