import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

import { Wrapper } from 'common/base';
import { useCreatePageLinkTo } from 'common/Pagination/Pagination';
import { Aspects, PageType } from 'constants/companyJobTitle';

import CompanyAndJobTitleWrapper from '../CompanyAndJobTitleWrapper';
import PageBoxRenderer from '../PageBoxRenderer';
import Helmet from './Helmet';
import WorkExperiencesSection from './WorkExperiences';
import AspectScoreCard, { useAspectsData } from '../Overview/AspectScoreCard';
import SearchBar from '../SearchBar';
import Sorter from '../Sorter';
import styles from '../styles.module.css';

// 面向評分只有公司才有，抽成獨立元件讓 useAspectsData 只在公司頁執行
const AspectScoreCards = ({ companyName }) => {
  const aspectModels = useAspectsData(companyName, Aspects);
  if (aspectModels.length === 0) return null;

  return (
    <Wrapper size="l">
      <div className={styles.scoreCards}>
        {aspectModels.map(aspectModel => (
          <AspectScoreCard
            key={aspectModel.aspect}
            companyName={companyName}
            aspect={aspectModel.aspect}
          />
        ))}
      </div>
    </Wrapper>
  );
};

AspectScoreCards.propTypes = {
  companyName: PropTypes.string.isRequired,
};

const WorkExperiences = ({
  pageType,
  pageName,
  tabType,
  boxSelector,
  page,
  pageSize,
}) => {
  const [createPageLinkTo, handleSectionRef] = useCreatePageLinkTo();

  return (
    <CompanyAndJobTitleWrapper
      pageType={pageType}
      pageName={pageName}
      tabType={tabType}
    >
      {pageType === PageType.COMPANY && (
        <AspectScoreCards companyName={pageName} />
      )}
      <Wrapper ref={handleSectionRef} size="m">
        <div className={styles.interactive}>
          <SearchBar pageType={pageType} tabType={tabType} />
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
    </CompanyAndJobTitleWrapper>
  );
};

WorkExperiences.propTypes = {
  boxSelector: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  pageName: PropTypes.string.isRequired,
  pageSize: PropTypes.number.isRequired,
  pageType: PropTypes.string.isRequired,
  tabType: PropTypes.string.isRequired,
};

export default WorkExperiences;
