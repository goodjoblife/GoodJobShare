import React from 'react';
import PropTypes from 'prop-types';
import { People } from 'common/icons';
import IconHeadingBlock from 'common/IconHeadingBlock';

import ExperienceInYear from '../../common/ExperienceInYear';
import Education from '../../common/Education';
import Salary from '../../common/Salary';


class InterviewInfo extends React.PureComponent {
  render() {
    const {
      handleState,
      experienceInYear,
      education,
      salaryType,
      salaryAmount,
    } = this.props;

    return (
      <IconHeadingBlock heading="分享更多資訊" marginTop Icon={People}>
        <div
          style={{
            marginBottom: '52px',
          }}
        >
          <ExperienceInYear
            experienceInYear={experienceInYear}
            onChange={handleState('experienceInYear')}
          />
        </div>
        <div
          style={{
            marginBottom: '64px',
          }}
        >
          <Education
            education={education}
            onChange={handleState('education')}
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
      </IconHeadingBlock>
    );
  }
}

InterviewInfo.propTypes = {
  handleState: PropTypes.func,
  experienceInYear: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  education: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  salaryType: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  salaryAmount: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

export default InterviewInfo;
