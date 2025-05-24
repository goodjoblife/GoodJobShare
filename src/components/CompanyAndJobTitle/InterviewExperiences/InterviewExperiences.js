import React from 'react';
import PropTypes from 'prop-types';
import qs from 'qs';

import Pagination from 'common/Pagination';
import { Section } from 'common/base';
import NotFoundStatus from 'common/routing/NotFound';

import EmptyView from '../EmptyView';
import Experience from '../Experience';
import styles from '../styles.module.css';

import { useQuery } from 'hooks/routing';

const InterviewExperiences = ({
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
        <div key={d.id} className={styles.experience}>
          <Experience experience={d} pageType={pageType} tabType={tabType} />
        </div>
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
  data: PropTypes.arrayOf(PropTypes.object),
  page: PropTypes.number.isRequired,
  pageName: PropTypes.string.isRequired,
  pageSize: PropTypes.number.isRequired,
  pageType: PropTypes.string.isRequired,
  tabType: PropTypes.string.isRequired,
  totalCount: PropTypes.number.isRequired,
};

export default InterviewExperiences;
