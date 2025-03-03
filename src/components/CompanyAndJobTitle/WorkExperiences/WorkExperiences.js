import React from 'react';
import PropTypes from 'prop-types';
import qs from 'qs';
import EmptyView from '../EmptyView';

import { Section } from 'common/base';
import Pagination from 'common/Pagination';
import NotFoundStatus from 'common/routing/NotFound';
import { useQuery } from 'hooks/routing';
import Experience from '../Experience';

const WorkExperiences = ({
  pageType,
  pageName,
  tabType,
  data,
  page,
  pageSize,
  totalCount,
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
        <Experience key={d.id} experience={d} />
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
  data: PropTypes.arrayOf(PropTypes.object),
  page: PropTypes.number.isRequired,
  pageName: PropTypes.string.isRequired,
  pageSize: PropTypes.number.isRequired,
  pageType: PropTypes.string.isRequired,
  tabType: PropTypes.string.isRequired,
  totalCount: PropTypes.number.isRequired,
};

export default WorkExperiences;
