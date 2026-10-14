import { LocationDescriptor } from 'history';
import React from 'react';

import { InterviewExperience } from 'apis/experience';
import { Section, Wrapper } from 'common/base';
import Pagination from 'common/Pagination';
import NotFoundStatus from 'common/routing/NotFound';
import { PageType, TabType } from 'constants/companyJobTitle';

import EmptyView from '../EmptyView';
import Experience from '../Experience';
import styles from '../styles.module.css';

type Props = {
  pageType: PageType;
  pageName: string;
  tabType: TabType;
  data: InterviewExperience[];
  page: number;
  pageSize: number;
  totalCount: number;
  createPageLinkTo: (p: number) => LocationDescriptor;
};

const InterviewExperiencesSection: React.FC<Props> = ({
  pageType,
  pageName,
  tabType,
  data,
  page,
  pageSize,
  totalCount,
  createPageLinkTo,
}) => {
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

export default InterviewExperiencesSection;
