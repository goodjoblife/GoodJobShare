import React from 'react';
import PropTypes from 'prop-types';

import Pagination from 'common/Pagination';
import { Section, Wrapper } from 'common/base';
import NotFoundStatus from 'common/routing/NotFound';
import { useCreatePageLinkTo } from 'common/Pagination/Pagination';

import EmptyView from '../EmptyView';
import Experience from '../Experience';
import styles from '../styles.module.css';

const InterviewExperiences = ({
  pageType,
  pageName,
  tabType,
  data,
  page,
  pageSize,
  totalCount,
}) => {
  const [createPageLinkTo, handleSectionRef] = useCreatePageLinkTo();

  if (data.length === 0) {
    return (
      <Section ref={handleSectionRef} Tag="main" paddingBottom>
        <NotFoundStatus>
          <EmptyView pageName={pageName} tabType={tabType} />
        </NotFoundStatus>
      </Section>
    );
  }
  return (
    <Section ref={handleSectionRef} Tag="main" paddingBottom>
      {data.map(d => (
        <div key={d.id} className={styles.experience}>
          <Experience
            experience={d}
            pageType={pageType}
            tabType={tabType}
            subTitleTag={'h3'}
          />
        </div>
      ))}
      <Wrapper size="m">
        <Pagination
          totalCount={totalCount}
          unit={pageSize}
          currentPage={page}
          createPageLinkTo={createPageLinkTo}
        />
      </Wrapper>
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
