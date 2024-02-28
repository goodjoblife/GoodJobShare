import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import Pagination from 'common/Pagination';
import { Section } from 'common/base';

import EmptyView from '../EmptyView';
import ExperienceEntry from './ExperienceEntry';

import useSearchbar from '../useSearchbar';

const pageSize = 10;

const InterviewExperiences = ({
  pageType,
  pageName,
  tabType,
  data,
  page,
  canView,
}) => {
  const { Searchbar, matchesFilter } = useSearchbar({
    pageType,
    tabType,
  });

  data = useMemo(() => data.filter(matchesFilter), [data, matchesFilter]);

  if (data.length === 0) {
    return <EmptyView pageName={pageName} tabType={tabType} />;
  }
  const visibleData = data.slice((page - 1) * pageSize, page * pageSize);
  return (
    <Section Tag="main" paddingBottom>
      <Searchbar />
      {visibleData.map(d => (
        <ExperienceEntry
          key={d.id}
          pageType={pageType}
          data={d}
          canView={canView}
        />
      ))}
      <Pagination
        totalCount={data.length}
        unit={pageSize}
        currentPage={page}
        createPageLinkTo={page => `?p=${page}`}
      />
    </Section>
  );
};

InterviewExperiences.propTypes = {
  pageType: PropTypes.string.isRequired,
  pageName: PropTypes.string.isRequired,
  tabType: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.object),
  page: PropTypes.number.isRequired,
  canView: PropTypes.bool.isRequired,
};

export default InterviewExperiences;
