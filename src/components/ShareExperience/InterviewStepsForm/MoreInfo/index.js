import React from 'react';
import PropTypes from 'prop-types';
import subscribeValidation from 'common/subscribeValidation';
import Block from 'common/Block';

import {
  interviewTimeYear as interviewTimeYearValidator,
  interviewTimeMonth as interviewTimeMonthValidator,
  interviewResult as interviewResultValidator,
  overallRating as overallRatingValidator,
} from '../formCheck';

import ExperienceInYear from '../../common/ExperienceInYear';
import InterviewTime from './InterviewTime';
import InterviewResult from './InterviewResult';
import Salary from '../../common/Salary';
import OverallRating from './OverallRating';

import {
  INTERVIEW_TIME,
  INTERVIEW_RESULT,
  OVERALL_RATING,
} from 'constants/formElements';

const InterviewTimeWithValidation = subscribeValidation(
  InterviewTime,
  props =>
    props.interviewTimeYearValidator(props.interviewTimeYear) &&
    props.interviewTimeMonthValidator(props.interviewTimeMonth),
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
      jobTitle,
      experienceInYear,
      interviewTimeYear,
      interviewTimeMonth,
      interviewResult,
      salaryType,
      salaryAmount,
      overallRating,
      submitted,
      changeValidationStatus,
    } = this.props;

    return (
      <Block requiredText>
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
            marginBottom: '52px',
          }}
        >
          <ExperienceInYear
            jobTitle={jobTitle}
            experienceInYear={experienceInYear}
            onChange={handleState('experienceInYear')}
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
        <div
          style={{
            marginBottom: '57px',
          }}
        >
          <Salary
            salaryType={salaryType}
            salaryAmount={salaryAmount}
            onSalaryType={handleState('salaryType')}
            onSalaryAmount={handleState('salaryAmount')}
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
      </Block>
    );
  }
}

InterviewInfo.propTypes = {
  jobTitle: PropTypes.string,
  handleState: PropTypes.func,
  experienceInYear: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  interviewTimeYear: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  interviewTimeMonth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  interviewResult: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  salaryType: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  salaryAmount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  overallRating: PropTypes.number,
  submitted: PropTypes.bool,
  changeValidationStatus: PropTypes.func,
};

export default InterviewInfo;
