import React from 'react';
import PropTypes from 'prop-types';
import { People } from 'common/icons';
import IconHeadingBlock from 'common/IconHeadingBlock';

import FormGroup from '../../common/FormGroup';
import ExperienceInYear from '../../common/ExperienceInYear';
import Education from '../../common/Education';
import Salary from '../../common/Salary';

import WeekWorkTime from './WeekWorkTime';


class WorkInfo extends React.PureComponent {
  render() {
    const {
      handleState,
      experienceInYear,
      education,
      salaryType,
      salaryAmount,
      weekWorkTime,
    } = this.props;

    return (
      <IconHeadingBlock heading="分享更多資訊" Icon={People} marginTop>
        <FormGroup>
          <ExperienceInYear
            experienceInYear={experienceInYear}
            onChange={handleState('experienceInYear')}
          />
        </FormGroup>
        <FormGroup>
          <Education
            education={education}
            onChange={handleState('education')}
          />
        </FormGroup>
        <FormGroup>
          <Salary
            salaryType={salaryType}
            salaryAmount={salaryAmount}
            onSalaryType={handleState('salaryType')}
            onSalaryAmount={handleState('salaryAmount')}
          />
        </FormGroup>
        <FormGroup>
          <WeekWorkTime
            weekWorkTime={weekWorkTime}
            onChange={handleState('weekWorkTime')}
          />
        </FormGroup>
      </IconHeadingBlock>
    );
  }
}

WorkInfo.propTypes = {
  handleState: PropTypes.func,
  experienceInYear: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  education: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  salaryType: PropTypes.string,
  salaryAmount: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  weekWorkTime: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
};

export default WorkInfo;
