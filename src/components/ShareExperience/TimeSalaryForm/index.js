import React from 'react';
import ReactGA from 'react-ga4';
import ReactPixel from 'react-facebook-pixel';
import { scroller } from 'react-scroll';
import qs from 'qs';
import { Heading } from 'common/base';
import { People } from 'common/icons';
import IconHeadingBlock from 'common/IconHeadingBlock';
import { EnterFormTracker, SubmitFormTracker } from 'utils/eventBasedTracking';
import BasicInfo from './BasicInfo';
import SalaryInfo from './SalaryInfo';
import TimeInfo from './TimeInfo';
import SubmitArea from '../../../containers/ShareExperience/SubmitAreaContainer';
import styles from './TimeSalaryForm.module.css';

import { basicFormCheck, salaryFormCheck, timeFormCheck } from './formCheck';

import {
  getBasicForm,
  getSalaryForm,
  getTimeForm,
  getTimeAndSalaryForm,
  portTimeSalaryFormToRequestFormat,
} from '../utils';

import salaryHint from '../../../utils/formUtils';

import StaticHelmet from 'common/StaticHelmet';
import {
  INVALID,
  TIME_SALARY_BASIC_ORDER,
  TIME_SALARY_EXT_ORDER,
} from '../../../constants/formElements';
import { GA_CATEGORY, GA_ACTION } from '../../../constants/gaConstants';
import PIXEL_CONTENT_CATEGORY from '../../../constants/pixelConstants';
import { LS_TIME_SALARY_FORM_KEY } from '../../../constants/localStorageKey';

import SuccessFeedback from '../common/SuccessFeedback';
import FailFeedback from '../common/FailFeedback';

const defaultForm = {
  company: '',
  companyId: '',
  isCurrentlyEmployed: 'yes',
  jobEndingTimeYear: new Date().getFullYear(),
  jobEndingTimeMonth: new Date().getMonth(),
  jobTitle: '',
  sector: '',
  employmentType: '',
  gender: '',
  salaryType: '',
  salaryAmount: '',
  experienceInYear: '',
  dayPromisedWorkTime: '',
  dayRealWorkTime: '',
  weekWorkTime: '',
  overtimeFrequency: null,
  hasOvertimeSalary: null,
  isOvertimeSalaryLegal: null,
  hasCompensatoryDayoff: null,
  email: '',
};

const getDefaultFormFromDraft = () => {
  try {
    return JSON.parse(localStorage.getItem(LS_TIME_SALARY_FORM_KEY));
  } catch (error) {
    return null;
  }
};

const getDefaultFormFromLocation = location => {
  const companyName = qs.parse(location.search, { ignoreQueryPrefix: true })
    .companyName;
  if (companyName) {
    return {
      ...defaultForm,
      company: companyName,
    };
  }
  return null;
};

class TimeSalaryForm extends React.PureComponent {
  constructor(props) {
    super(props);

    this.handleState = this.handleState.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      ...defaultForm,
      submitted: false,
      // for handling salary hint
      salaryHint: null,
      showSalaryWarning: false,
    };
    this.basicElValidationStatus = {};
    this.extElValidationStatus = {};
  }

  componentDidMount() {
    const defaultState =
      getDefaultFormFromLocation(this.props.location) ||
      getDefaultFormFromDraft() ||
      defaultForm;

    this.setState({
      // eslint-disable-line react/no-did-mount-set-state
      ...defaultState,
    });

    ReactPixel.track('InitiateCheckout', {
      content_category: PIXEL_CONTENT_CATEGORY.VISIT_TIME_AND_SALARY_FORM,
    });

    // Send EnterForm event to Amplitude
    EnterFormTracker.sendEvent({
      type: EnterFormTracker.types.salary,
    });
  }

  onSubmit() {
    const valid = basicFormCheck(getBasicForm(this.state));
    const valid2 = salaryFormCheck(getSalaryForm(this.state));
    const valid3 = timeFormCheck(getTimeForm(this.state));

    if (valid && (valid2 || valid3)) {
      localStorage.removeItem(LS_TIME_SALARY_FORM_KEY);

      const p = this.props.createSalaryWorkTime({
        body: portTimeSalaryFormToRequestFormat(
          getTimeAndSalaryForm(this.state),
        ),
      });

      return p.then(
        response => {
          ReactGA.event({
            category: GA_CATEGORY.SHARE_TIME_SALARY,
            action: GA_ACTION.UPLOAD_SUCCESS,
          });
          ReactPixel.track('Purchase', {
            value: 1,
            currency: 'TWD',
            content_category: PIXEL_CONTENT_CATEGORY.UPLOAD_TIME_AND_SALARY,
          });
          // send SubmitForm event to Amplitude
          SubmitFormTracker.sendEvent({
            type: SubmitFormTracker.types.salary,
            result: SubmitFormTracker.results.success,
          });

          return () => (
            <SuccessFeedback
              info="感謝你分享薪資、工時資訊，讓台灣的職場變得更透明！"
              buttonText="查看最新工時、薪資"
              buttonClick={() => {
                window.location.replace('/salary-work-times/latest');
              }}
            />
          );
        },
        error => {
          ReactGA.event({
            category: GA_CATEGORY.SHARE_TIME_SALARY,
            action: GA_ACTION.UPLOAD_FAIL,
          });
          // send SubmitForm event to Amplitude
          SubmitFormTracker.sendEvent({
            type: SubmitFormTracker.types.salary,
            result: SubmitFormTracker.results.error,
          });

          return ({ buttonClick }) => (
            <FailFeedback info={error.message} buttonClick={buttonClick} />
          );
        },
      );
    }
    this.handleState('submitted')(true);
    const topInvalidElement = this.getTopInvalidElement();
    if (topInvalidElement !== null) {
      scroller.scrollTo(topInvalidElement, {
        duration: 1000,
        delay: 100,
        offset: -100,
        smooth: true,
      });
    }
    return Promise.reject();
  }

  getTopInvalidElement = () => {
    const basic = TIME_SALARY_BASIC_ORDER;
    const ext = TIME_SALARY_EXT_ORDER;
    for (let i = 0, el; i <= basic.length; i += 1) {
      el = basic[i];
      if (
        this.basicElValidationStatus[el] &&
        this.basicElValidationStatus[el] === INVALID
      ) {
        return el;
      }
    }
    for (let i = 0, el; i <= ext.length; i += 1) {
      el = ext[i];
      if (
        this.extElValidationStatus[el] &&
        this.extElValidationStatus[el] === INVALID
      ) {
        return el;
      }
    }
    return null;
  };

  changeBasicElValidationStatus = (elementId, status) => {
    this.basicElValidationStatus[elementId] = status;
  };

  changeExtElValidationStatus = (elementId, status) => {
    this.extElValidationStatus[elementId] = status;
  };

  handleSalaryHint = (key, value) => {
    let salaryAmount;
    let salaryType;
    if (key === 'salaryType') {
      salaryAmount = this.state.salaryAmount;
      salaryType = value;
    } else if (key === 'salaryAmount') {
      salaryAmount = value;
      salaryType = this.state.salaryType;
    }
    const { showWarning, hint } = salaryHint(salaryType, salaryAmount);
    this.setState({
      showSalaryWarning: showWarning,
      salaryHint: hint,
    });
  };

  handleState(key) {
    return value => {
      const updateState = {
        [key]: value,
      };
      this.setState(updateState);
      const state = {
        ...this.state,
        ...updateState,
      };
      localStorage.setItem(LS_TIME_SALARY_FORM_KEY, JSON.stringify(state));

      // handle salary hint
      if (['salaryType', 'salaryAmount'].indexOf(key) >= 0) {
        this.handleSalaryHint(key, value);
      }
    };
  }

  render() {
    const {
      submitted,
      company,
      isCurrentlyEmployed,
      jobEndingTimeYear,
      jobEndingTimeMonth,
      jobTitle,
      sector,
      employmentType,
      gender,
      salaryType,
      salaryAmount,
      experienceInYear,
      dayPromisedWorkTime,
      dayRealWorkTime,
      weekWorkTime,
      overtimeFrequency,
      hasOvertimeSalary,
      isOvertimeSalaryLegal,
      hasCompensatoryDayoff,
    } = this.state;

    return (
      <div>
        <StaticHelmet.ShareSalaryWorkTime />
        <Heading size="l" marginBottomS center>
          薪資工時分享
        </Heading>
        {submitted ? (
          <div
            style={{
              marginTop: '20px',
            }}
            className={styles.warning__wording}
          >
            oops! 請檢查底下紅框內的內容是否正確
          </div>
        ) : null}

        <IconHeadingBlock heading="薪資工時資訊" Icon={People} requiredText>
          <BasicInfo
            handleState={this.handleState}
            company={company}
            isCurrentlyEmployed={isCurrentlyEmployed}
            jobEndingTimeYear={jobEndingTimeYear}
            jobEndingTimeMonth={jobEndingTimeMonth}
            jobTitle={jobTitle}
            sector={sector}
            employmentType={employmentType}
            gender={gender}
            submitted={submitted}
            changeValidationStatus={this.changeBasicElValidationStatus}
          />

          <br />
          <h5 className={styles.pleaseSelectOne}>以下薪資 / 工時擇一必填</h5>

          <SalaryInfo
            handleState={this.handleState}
            salaryType={salaryType}
            salaryAmount={salaryAmount}
            experienceInYear={experienceInYear}
            submitted={submitted}
            changeValidationStatus={this.changeExtElValidationStatus}
            showWarning={this.state.showSalaryWarning}
            hint={this.state.salaryHint}
          />

          <TimeInfo
            handleState={this.handleState}
            dayPromisedWorkTime={dayPromisedWorkTime}
            dayRealWorkTime={dayRealWorkTime}
            weekWorkTime={weekWorkTime}
            overtimeFrequency={overtimeFrequency}
            hasOvertimeSalary={hasOvertimeSalary}
            isOvertimeSalaryLegal={isOvertimeSalaryLegal}
            hasCompensatoryDayoff={hasCompensatoryDayoff}
          />
        </IconHeadingBlock>

        <SubmitArea onSubmit={this.onSubmit} />
      </div>
    );
  }
}

export default TimeSalaryForm;
