import React from 'react';
import Summary from './Aspects/Summary';
import WorkExperiencesAspect from './Aspects';

type RatingDistribution = {
  rating: number;
  count: number;
};

type WorkExperiencesGenderProps = {
  pageType: string;
  pageName: string;
  tabType: string;
  boxSelector: (data: any) => any;
  page: number;
  pageSize: number;
};

const WorkExperiencesGender: React.FC<WorkExperiencesGenderProps> = ({
  pageType,
  pageName,
  tabType,
  boxSelector,
  page,
  pageSize,
}) => {
  // Gender-relevant display data could be fetched here or above,
  // but as the original code used a mock, we keep the mock here
  const genderSummaryData = {
    averageRating: 3.5,
    ratingDistribution: [
      { rating: 5, count: 10 },
      { rating: 4, count: 20 },
      { rating: 3, count: 30 },
      { rating: 2, count: 20 },
      { rating: 1, count: 10 },
    ],
    ratingCount: 100,
    summary:
      '整體來說，OOO 股份有限公司的性別友善度相當高，生理假相對好請，不容易受到主管刁難。薪資分紅的部分，也是業界上非常好的。然而，不同部門加班情況不一，部分部門在旺季時每天平均需要加班2~3 小時。',
  };

  return (
    <WorkExperiencesAspect
      title="性別友善度"
      summarySection={
        <Summary
          averageRating={genderSummaryData.averageRating}
          ratingDistribution={genderSummaryData.ratingDistribution}
          ratingCount={genderSummaryData.ratingCount}
          summary={genderSummaryData.summary}
        />
      }
      pageType={pageType}
      pageName={pageName}
      tabType={tabType}
      boxSelector={boxSelector}
      page={page}
      pageSize={pageSize}
    />
  );
};

export default WorkExperiencesGender;
