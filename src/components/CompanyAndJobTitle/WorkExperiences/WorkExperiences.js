import React from 'react';
import PropTypes from 'prop-types';
import qs from 'qs';
import ExperienceEntry from './ExperienceEntry';
import EmptyView from '../EmptyView';

import { Section } from 'common/base';
import Pagination from 'common/Pagination';
import Searchbar from '../Searchbar';
import { useQuery } from 'hooks/routing';

const WorkExperiences = ({
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
        <Searchbar pageType={pageType} tabType={tabType} />
        <EmptyView pageName={pageName} tabType={tabType} />
      </Section>
    );
  }
  return (
    <Section Tag="main" paddingBottom>
      <Searchbar pageType={pageType} tabType={tabType} />
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

WorkExperiences.propTypes = {
  canView: PropTypes.bool.isRequired,
  data: PropTypes.arrayOf(PropTypes.object),
  page: PropTypes.number.isRequired,
  pageName: PropTypes.string.isRequired,
  pageSize: PropTypes.number.isRequired,
  pageType: PropTypes.string.isRequired,
  tabType: PropTypes.string.isRequired,
  totalCount: PropTypes.number.isRequired,
};

export default WorkExperiences;
