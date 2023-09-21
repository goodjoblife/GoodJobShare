import React from 'react';
import PropTypes from 'prop-types';
import subscribeValidation from 'common/subscribeValidation';
import Block from 'common/Block';

import {
  companyQuery as companyQueryValidator,
  jobTitle as jobTitleValidator,
  region as regionValidator,
} from '../formCheck';

import CompanyQuery from '../../common/CompanyQuery';
import Region from '../../common/Region';
import JobTitle from '../../common/JobTitle';

import shareStyles from '../../common/share.module.css';

import { COMPANY, REGION, JOB_TITLE } from 'constants/formElements';

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

class InterviewInfo extends React.PureComponent {
  render() {
    const {
      handleState,
      companyQuery,
      region,
      jobTitle,
      submitted,
      changeValidationStatus,
    } = this.props;

    return (
      <Block heading="你是去哪間公司面試哪個職務呢？" requiredText>
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
        <div>
          <JobTitleWithValidation
            className={shareStyles.single__select__input}
            inputTitle="應徵職稱"
            jobTitle={jobTitle}
            onChange={handleState('jobTitle')}
            validator={jobTitleValidator}
            submitted={submitted}
            changeValidationStatus={changeValidationStatus}
          />
        </div>
      </Block>
    );
  }
}

InterviewInfo.propTypes = {
  companyQuery: PropTypes.string.isRequired,
  region: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  jobTitle: PropTypes.string.isRequired,
  handleState: PropTypes.func.isRequired,
  submitted: PropTypes.bool.isRequired,
  changeValidationStatus: PropTypes.func.isRequired,
};

export default InterviewInfo;
