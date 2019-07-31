import React from 'react';
import PropTypes from 'prop-types';

import ExperienceEntry from './ExperienceEntry';

const InterviewExperiences = ({
  pageType,
  pageName,
  tabType,
  status,
  data,
}) => {
  return data.map(d => (
    <ExperienceEntry key={d.id} pageType={pageType} data={d} />
  ));
};

InterviewExperiences.propTypes = {
  pageType: PropTypes.string.isRequired,
  pageName: PropTypes.string.isRequired,
  tabType: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.object),
  status: PropTypes.string.isRequired,
};

export default InterviewExperiences;
