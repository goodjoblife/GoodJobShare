import React from 'react';
import PropTypes from 'prop-types';

import Pagination from 'common/Pagination';
import EmptyView from '../EmptyView';
import ExperienceEntry from './ExperienceEntry';

const pageSize = 10;

const InterviewExperiences = ({ pageType, pageName, tabType, data, page }) => {
  if (data.length === 0) {
    return <EmptyView pageName={pageName} tabType={tabType} />;
  }
  const visibleData = data.slice((page - 1) * pageSize, page * pageSize);
  return (
    <React.Fragment>
      {visibleData.map(d => (
        <ExperienceEntry key={d.id} pageType={pageType} data={d} />
      ))}
      <Pagination
        totalCount={data.length}
        unit={pageSize}
        currentPage={page}
        createPageLinkTo={page => `?p=${page}`}
      />
    </React.Fragment>
  );
};

InterviewExperiences.propTypes = {
  pageType: PropTypes.string.isRequired,
  pageName: PropTypes.string.isRequired,
  tabType: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.object),
  page: PropTypes.number.isRequired,
};

export default InterviewExperiences;
