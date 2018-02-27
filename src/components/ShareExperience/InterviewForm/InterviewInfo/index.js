import React from 'react';
import PropTypes from 'prop-types';
import { People } from 'common/icons';
import subscribeValidation from 'common/subscribeValidation';
import IconHeadingBlock from 'common/IconHeadingBlock';

import {
  companyQuery as companyQueryValidator,
  jobTitle as jobTitleValidator,
  region as regionValidator,
  interviewTimeYear as interviewTimeYearValidator,
  interviewTimeMonth as interviewTimeMonthValidator,
  interviewResult as interviewResultValidator,
  overallRating as overallRatingValidator,
} from '../formCheck';

import CompanyQuery from '../../common/CompanyQuery';
import Region from '../../common/Region';
import JobTitle from '../../common/JobTitle';
import InterviewTime from './InterviewTime';
import InterviewResult from './InterviewResult';
import OverallRating from './OverallRating';

import { COMPANY, REGION, JOB_TITLE, INTERVIEW_TIME, INTERVIEW_RESULT, OVERALL_RATING } from '../../../../constants/formElements';

const CompanyQueryWithValidation = subscribeValidation(
  CompanyQuery,
  props => props.validator(props.companyQuery),
  COMPANY,
);

const RegionWithValidation = subscribeValidation(
  Region,
  props => props.validator(props.region),
  REGION,
);

const JobTitleWithValidation = subscribeValidation(
  JobTitle,
  props => props.validator(props.jobTitle),
  JOB_TITLE,
);

const InterviewTimeWithValidation = subscribeValidation(
  InterviewTime,
  props => props.interviewTimeYearValidator(props.interviewTimeYear) && props.interviewTimeMonthValidator(props.interviewTimeMonth),
  INTERVIEW_TIME,
);

const InterviewResultWithValidation = subscribeValidation(
  InterviewResult,
  props => props.validator(props.interviewResult),
  INTERVIEW_RESULT,
);

const OverallRatingWithValidation = subscribeValidation(
  OverallRating,
  props => props.validator(props.overallRating),
  OVERALL_RATING,
);

class InterviewInfo extends React.PureComponent {
  render() {
    const {
      handleState,
      companyQuery,
      region,
      jobTitle,
      interviewTimeYear,
      interviewTimeMonth,
      interviewResult,
      overallRating,
      submitted,
      changeValidationStatus,
    } = this.props;

    return (
      <IconHeadingBlock heading="面試資訊" Icon={People} requiredText>
        <div
          style={{
            marginBottom: '35px',
          }}
        >
          <CompanyQueryWithValidation
            companyQuery={companyQuery}
            onChange={v => {
              handleState('companyQuery')(v);
              handleState('title')(`${v} 面試經驗分享`);
            }}
            onCompanyId={handleState('companyId')}
            validator={companyQueryValidator}
            submitted={submitted}
            changeValidationStatus={changeValidationStatus}
          />
        </div>
        <div
          style={{
            marginBottom: '41px',
          }}
        >
          <RegionWithValidation
            region={region}
            inputTitle={'面試地區'}
            onChange={handleState('region')}
            validator={regionValidator}
            submitted={submitted}
            changeValidationStatus={changeValidationStatus}
          />
        </div>
        <div
          style={{
            marginBottom: '41px',
          }}
        >
          <JobTitleWithValidation
            inputTitle="應徵職稱"
            jobTitle={jobTitle}
            onChange={handleState('jobTitle')}
            validator={jobTitleValidator}
            submitted={submitted}
            changeValidationStatus={changeValidationStatus}
          />
        </div>
        <div
          style={{
            marginBottom: '64px',
          }}
        >
          <InterviewTimeWithValidation
            interviewTimeYear={interviewTimeYear}
            interviewTimeMonth={interviewTimeMonth}
            onInterviewTimeYear={handleState('interviewTimeYear')}
            onInterviewTimeMonth={handleState('interviewTimeMonth')}
            interviewTimeYearValidator={interviewTimeYearValidator}
            interviewTimeMonthValidator={interviewTimeMonthValidator}
            submitted={submitted}
            changeValidationStatus={changeValidationStatus}
          />
        </div>
        <div
          style={{
            marginBottom: '53px',
          }}
        >
          <InterviewResultWithValidation
            interviewResult={interviewResult}
            onChange={handleState('interviewResult')}
            validator={interviewResultValidator}
            submitted={submitted}
            changeValidationStatus={changeValidationStatus}
          />
        </div>
        <div>
          <OverallRatingWithValidation
            overallRating={overallRating}
            onChange={handleState('overallRating')}
            validator={overallRatingValidator}
            submitted={submitted}
            changeValidationStatus={changeValidationStatus}
          />
        </div>
      </IconHeadingBlock>
    );
  }
}

InterviewInfo.propTypes = {
  companyQuery: PropTypes.string,
  region: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  jobTitle: PropTypes.string,
  handleState: PropTypes.func,
  interviewTimeYear: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  interviewTimeMonth: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  interviewResult: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  overallRating: PropTypes.number,
  submitted: PropTypes.bool,
  changeValidationStatus: PropTypes.func,
};

export default InterviewInfo;
