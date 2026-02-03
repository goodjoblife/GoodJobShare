import React, { useCallback, useState } from 'react';
import { useLocation } from 'react-router';
import PropTypes from 'prop-types';
import qs from 'qs';
import EmptyView from '../EmptyView';

import { Section, Wrapper } from 'common/base';
import Pagination from 'common/Pagination';
import NotFoundStatus from 'common/routing/NotFound';
import { useQuery } from 'hooks/routing';
import Experience from '../Experience';
import styles from '../styles.module.css';

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
  const location = useLocation();
  const [sectionY, setSectionY] = useState(null);

  const handleSectionRef = useCallback(el => {
    if (el) {
      const rect = el.getBoundingClientRect();
      const sectionY = rect.top + window.scrollY;
      setSectionY(sectionY);
    }
  }, []);

  const createLinkTo = useCallback(
    page => {
      const search = qs.stringify(
        { ...queryParams, p: page },
        { addQueryPrefix: true },
      );
      if (sectionY) {
        return {
          pathname: location.pathname,
          search,
          state: { y: sectionY },
        };
      }
      return search;
    },
    [queryParams, sectionY, location.pathname],
  );

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
          createPageLinkTo={createLinkTo}
        />
      </Wrapper>
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
