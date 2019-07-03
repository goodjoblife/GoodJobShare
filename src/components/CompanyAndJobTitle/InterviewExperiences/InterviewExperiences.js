import React from 'react';
import PropTypes from 'prop-types';
import Loader from 'common/Loader';
import { isUnfetched, isFetching, isError } from '../../../constants/status';
import ExperienceEntry from './ExperienceEntry';
import EmptyView from '../EmptyView';

const InterviewExperiences = ({
  pageType,
  pageName,
  tabType,
  status,
  data,
}) => {
  if (isUnfetched(status)) {
    return null;
  }
  if (isFetching(status)) {
    return <Loader size="s" />;
  }
  if (isError(status)) {
    return null;
  }
  if (data.length === 0) {
    return <EmptyView pageName={pageName} tabType={tabType} />;
  }
  return data.map(d => (
    <ExperienceEntry key={d._id} pageType={pageType} data={d} />
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
