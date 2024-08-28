import React from 'react';
import PropTypes from 'prop-types';
import qs from 'qs';

import Pagination from 'common/Pagination';
import { Section } from 'common/base';
import NotFoundStatus from 'common/routing/NotFound';

import EmptyView from '../EmptyView';
import ExperienceEntry from './ExperienceEntry';

import { useQuery } from 'hooks/routing';

const InterviewExperiences = ({
  pageType,
  pageName,
  tabType,
  data,
  page,
  pageSize,
  totalCount,
  canView,
}) => {
  const queryParams = useQuery();

  if (data.length === 0) {
    return (
      <Section Tag="main" paddingBottom>
        <NotFoundStatus>
          <EmptyView pageName={pageName} tabType={tabType} />
        </NotFoundStatus>
      </Section>
    );
  }
  return (
    <Section Tag="main" paddingBottom>
      {data.map(d => (
        <ExperienceEntry
          key={d.id}
          pageType={pageType}
          data={d}
          canView={canView}
        />
      ))}
      <Pagination
        totalCount={totalCount}
        unit={pageSize}
        currentPage={page}
        createPageLinkTo={p =>
          qs.stringify({ ...queryParams, p }, { addQueryPrefix: true })
        }
      />
    </Section>
  );
};

InterviewExperiences.propTypes = {
  canView: PropTypes.bool.isRequired,
  data: PropTypes.arrayOf(PropTypes.object),
  page: PropTypes.number.isRequired,
  pageName: PropTypes.string.isRequired,
  pageSize: PropTypes.number.isRequired,
  pageType: PropTypes.string.isRequired,
  tabType: PropTypes.string.isRequired,
  totalCount: PropTypes.number.isRequired,
};

export default InterviewExperiences;
