import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import CompanyAndJobTitleWrapper from '../CompanyAndJobTitleWrapper';
import PageBoxRenderer from '../PageBoxRenderer';
import InterviewExperiencesSection from './InterviewExperiences';
import InterviewExperienceHelmet from './Helmet';
import Searchbar from '../Searchbar';
import Sorter from '../Sorter';
import styles from '../styles.module.css';
import { Wrapper } from 'common/base';
import { useCreatePageLinkTo } from 'common/Pagination/Pagination';
import AspectScoreCard, { useAspectsData } from '../Overview/AspectScoreCard';
import { Aspects } from 'constants/companyJobTitle';
import useCompanyName from 'pages/Company/useCompanyName';

const InterviewExperiences = ({
  pageType,
  pageName,
  tabType,
  boxSelector,
  page,
  pageSize,
  topNJobTitles,
}) => {
  const [createPageLinkTo, handleSectionRef] = useCreatePageLinkTo();
  const companyName = useCompanyName();
  const aspectModels = useAspectsData(companyName, Aspects);

  return (
    <CompanyAndJobTitleWrapper
      pageType={pageType}
      pageName={pageName}
      tabType={tabType}
    >
      {aspectModels.length > 0 && (
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
      )}
      <Wrapper ref={handleSectionRef} size="m">
        <div className={styles.interactive}>
          <Searchbar pageType={pageType} tabType={tabType} />
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
    </CompanyAndJobTitleWrapper>
  );
};

InterviewExperiences.propTypes = {
  boxSelector: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  pageName: PropTypes.string.isRequired,
  pageSize: PropTypes.number.isRequired,
  pageType: PropTypes.string.isRequired,
  tabType: PropTypes.string.isRequired,
  topNJobTitles: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
  ),
};

export default InterviewExperiences;
