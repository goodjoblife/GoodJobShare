import React from 'react';

import { tabType as TAB_TYPE, generateTabURL } from 'constants/companyJobTitle';

import SnippetBlock from '../Overview/SnippetBlock';
import WorkingHourTable from './WorkingHourTable';
import SummaryBlock from '../Overview/SummaryBlock';
import PropTypes from 'prop-types';

const SummarySection = ({
  pageType,
  pageName,
  salaryWorkTimes,
  salaryWorkTimesCount,
  jobAverageSalaries,
  averageWeekWorkTime,
  overtimeFrequencyCount,
}) => {
  return (
    <SnippetBlock
      title="本站使用者分享之薪資、加班資訊"
      linkText={`查看 ${salaryWorkTimesCount} 筆完整的薪水、加班數據資料 >>`}
      linkTo={generateTabURL({
        pageType,
        pageName,
        tabType: TAB_TYPE.TIME_AND_SALARY,
      })}
      isEmpty={salaryWorkTimesCount === 0}
      pageType={pageType}
      pageName={pageName}
      tabType={TAB_TYPE.TIME_AND_SALARY}
    >
      <SummaryBlock
        jobAverageSalaries={jobAverageSalaries}
        averageWeekWorkTime={averageWeekWorkTime}
        overtimeFrequencyCount={overtimeFrequencyCount}
      />
      <WorkingHourTable data={salaryWorkTimes} pageType={pageType} />
    </SnippetBlock>
  );
};

SummarySection.propTypes = {
  averageWeekWorkTime: PropTypes.number.isRequired,
  jobAverageSalaries: PropTypes.array,
  overtimeFrequencyCount: PropTypes.object.isRequired,
  pageName: PropTypes.string.isRequired,
  pageType: PropTypes.string.isRequired,
  salaryWorkTimes: PropTypes.arrayOf(PropTypes.object).isRequired,
  salaryWorkTimesCount: PropTypes.number.isRequired,
};

export default SummarySection;
