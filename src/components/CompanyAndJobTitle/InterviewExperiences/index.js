import PropTypes from 'prop-types';
import React, { Fragment, useState } from 'react';

import { Wrapper } from 'common/base';
import { useCreatePageLinkTo } from 'common/Pagination/Pagination';

import JobTitlePicker, { TABS } from '../JobTitlePicker';
import PageBoxRenderer from '../PageBoxRenderer';
import { usePageContext } from '../PageContextProvider';
import InterviewExperienceHelmet from './Helmet';
import InterviewExperiencesSection from './InterviewExperiences';
import Sorter from '../Sorter';
import styles from '../styles.module.css';

const InterviewExperiences = ({
  boxSelector,
  page,
  pageSize,
  topNJobTitles,
}) => {
  const [createPageLinkTo, handleSectionRef] = useCreatePageLinkTo();
  const { pageType, pageName, tabType } = usePageContext();
  // Prototype demo（依職稱篩選）：假資料，等 UI/UX 提案通過後才接真實 API。
  const [appliedJobTitles, setAppliedJobTitles] = useState([]);

  return (
    <Fragment>
      <Wrapper ref={handleSectionRef} size="m">
        <div className={styles.interactive}>
          <JobTitlePicker
            jobTitles={TABS.interview.jobTitles}
            appliedTitles={appliedJobTitles}
            onApply={setAppliedJobTitles}
            onRemoveOne={title =>
              setAppliedJobTitles(prev => prev.filter(t => t !== title))
            }
            onClearAll={() => setAppliedJobTitles([])}
          />
          <Sorter />
        </div>
      </Wrapper>
      <Wrapper size="m">
        <PageBoxRenderer
          pageType={pageType}
          pageName={pageName}
          tabType={tabType}
          boxSelector={boxSelector}
          render={({
            interviewExperiences,
            interviewExperiencesCount: totalCount,
          }) => {
            return (
              <Fragment>
                <InterviewExperienceHelmet
                  pageType={pageType}
                  pageName={pageName}
                  totalCount={totalCount}
                  page={page}
                  topNJobTitles={topNJobTitles}
                />
                <InterviewExperiencesSection
                  pageType={pageType}
                  pageName={pageName}
                  tabType={tabType}
                  data={interviewExperiences}
                  page={page}
                  pageSize={pageSize}
                  totalCount={totalCount}
                  createPageLinkTo={createPageLinkTo}
                />
              </Fragment>
            );
          }}
        />
      </Wrapper>
    </Fragment>
  );
};

InterviewExperiences.propTypes = {
  boxSelector: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  topNJobTitles: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
  ),
};

export default InterviewExperiences;
