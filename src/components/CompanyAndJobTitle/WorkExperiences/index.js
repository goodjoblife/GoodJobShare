import PropTypes from 'prop-types';
import React, { Fragment, useState } from 'react';

import { Wrapper } from 'common/base';
import { useCreatePageLinkTo } from 'common/Pagination/Pagination';
import { Aspects, PageType } from 'constants/companyJobTitle';

import JobTitlePicker, { TABS } from '../JobTitlePicker';
import PageBoxRenderer from '../PageBoxRenderer';
import { useCompanyName, usePageContext } from '../PageContextProvider';
import Helmet from './Helmet';
import WorkExperiencesSection from './WorkExperiences';
import AspectScoreCard, { useAspectsData } from '../AspectScoreCard';
import Sorter from '../Sorter';
import styles from '../styles.module.css';

// 面向評分只有公司才有，抽成獨立元件讓 useAspectsData 與 useCompanyName
// 只在公司頁執行
const AspectScoreCards = () => {
  const companyName = useCompanyName();
  const aspectModels = useAspectsData(companyName, Aspects);
  if (aspectModels.length === 0) return null;

  return (
    <Wrapper size="l">
      <div className={styles.scoreCards}>
        {aspectModels.map(aspectModel => (
          <AspectScoreCard
            key={aspectModel.aspect}
            aspect={aspectModel.aspect}
          />
        ))}
      </div>
    </Wrapper>
  );
};

const WorkExperiences = ({ boxSelector, page, pageSize }) => {
  const [createPageLinkTo, handleSectionRef] = useCreatePageLinkTo();
  const { pageType, pageName, tabType } = usePageContext();
  // Prototype demo（依職稱篩選）：假資料，等 UI/UX 提案通過後才接真實 API。
  const [appliedJobTitles, setAppliedJobTitles] = useState([]);

  return (
    <Fragment>
      {pageType === PageType.COMPANY && <AspectScoreCards />}
      <Wrapper ref={handleSectionRef} size="m">
        <div className={styles.interactive}>
          <JobTitlePicker
            jobTitles={TABS.work.jobTitles}
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
          render={({ workExperiences, workExperiencesCount: totalCount }) => {
            return (
              <Fragment>
                <Helmet
                  pageType={pageType}
                  pageName={pageName}
                  totalCount={totalCount}
                  page={page}
                />
                <WorkExperiencesSection
                  pageType={pageType}
                  pageName={pageName}
                  tabType={tabType}
                  data={workExperiences}
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

WorkExperiences.propTypes = {
  boxSelector: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
};

export default WorkExperiences;
