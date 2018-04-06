import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import ReactGA from 'react-ga';
import ReactPixel from 'react-facebook-pixel';
import { scroller } from 'react-scroll';
import { Heading } from 'common/base';
import { People } from 'common/icons';
import IconHeadingBlock from 'common/IconHeadingBlock';
import TextInput from 'common/form/TextInput';
import BasicInfo from '../TimeSalaryForm/BasicInfo';
import SalaryInfo from '../TimeSalaryForm/SalaryInfo';
import TimeInfo from '../TimeSalaryForm/TimeInfo';
import InputTitle from '../common/InputTitle';
import SubmitArea from '../../../containers/ShareExperience/SubmitAreaContainer';

import { postWorkings } from '../../../apis/timeAndSalaryApi';

import timeAndSalaryFormStyles from '../TimeSalaryForm/TimeSalaryForm.module.css';

import {
  basicFormCheck,
  salaryFormCheck,
  timeFormCheck,
} from '../TimeSalaryForm/formCheck';

import {
  getBasicForm,
  getSalaryForm,
  getTimeForm,
  getTimeAndSalaryForm,
  portTimeSalaryFormToRequestFormat,
} from '../utils';

import { HELMET_DATA } from '../../../constants/helmetData';
import {
  INVALID,
  TIME_SALARY_BASIC_ORDER,
  TIME_SALARY_EXT_ORDER,
} from '../../../constants/formElements';
import { GA_CATEGORY, GA_ACTION } from '../../../constants/gaConstants';
import PIXEL_CONTENT_CATEGORY from '../../../constants/pixelConstants';
import {
  LS_TIME_SALARY_FORM_KEY,
} from '../../../constants/localStorageKey';

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

class CampaignTimeAndSalaryForm extends React.PureComponent {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.object.isRequired,
    }),
  }
  constructor(props) {
    super(props);

    this.handleState = this.handleState.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      ...defaultForm,
      submitted: false,
    };
    this.basicElValidationStatus = {};
    this.extElValidationStatus = {};
    this.localStorageKey = `${LS_TIME_SALARY_FORM_KEY}:${props.match.params.campaign_name}`;
  }

  componentDidMount() {
    let defaultFromDraft;

    try {
      defaultFromDraft = JSON.parse(localStorage.getItem(this.localStorageKey));
    } catch (error) {
      defaultFromDraft = null;
    }
    const defaultState = defaultFromDraft || defaultForm;

    this.setState({ // eslint-disable-line react/no-did-mount-set-state
      ...defaultState,
    });

    ReactPixel.track('InitiateCheckout', {
      content_category: PIXEL_CONTENT_CATEGORY.VISIT_TIME_AND_SALARY_FORM,
    });
  }

  onSubmit() {
    const valid = basicFormCheck(getBasicForm(this.state));
    const valid2 = salaryFormCheck(getSalaryForm(this.state));
    const valid3 = timeFormCheck(getTimeForm(this.state));

    if (valid && (valid2 || valid3)) {
      const p = postWorkings(
        portTimeSalaryFormToRequestFormat(getTimeAndSalaryForm(this.state))
      );

      p.then(() => {
        ReactGA.event({
          category: GA_CATEGORY.SHARE_TIME_SALARY,
          action: GA_ACTION.UPLOAD_SUCCESS,
        });
        ReactPixel.track('Purchase', {
          value: 1,
          currency: 'TWD',
          content_category: PIXEL_CONTENT_CATEGORY.UPLOAD_TIME_AND_SALARY,
        });
      }).catch(() => {
        ReactGA.event({
          category: GA_CATEGORY.SHARE_TIME_SALARY,
          action: GA_ACTION.UPLOAD_FAIL,
        });
      });
      localStorage.removeItem(this.localStorageKey);

      return p;
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
    return null;
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
  }

  changeBasicElValidationStatus = (elementId, status) => {
    this.basicElValidationStatus[elementId] = status;
  }

  changeExtElValidationStatus = (elementId, status) => {
    this.extElValidationStatus[elementId] = status;
  }

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
      localStorage.setItem(this.localStorageKey, JSON.stringify(state));
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
      email,
    } = this.state;

    return (
      <div>
        <Helmet {...HELMET_DATA.SHARE_TIME_SALARY} />
        <Heading size="l" marginBottomS center>
          薪資工時分享
        </Heading>
        {
          submitted ?
            <div
              style={{
                marginTop: '20px',
              }}
              className={timeAndSalaryFormStyles.warning__wording}
            >
              oops! 請檢查底下紅框內的內容是否正確
            </div> : null
        }

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
          <h5 className={timeAndSalaryFormStyles.pleaseSelectOne}>
            以下薪資 / 工時擇一必填
          </h5>

          <SalaryInfo
            handleState={this.handleState}
            salaryType={salaryType}
            salaryAmount={salaryAmount}
            experienceInYear={experienceInYear}
            submitted={submitted}
            changeValidationStatus={this.changeExtElValidationStatus}
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

          <InputTitle text="電子郵件 - 有消息時將通知您" />
          <TextInput
            value={email} placeholder="example@email.com"
            onChange={e => this.handleState('email')(e.target.value)}
          />
        </IconHeadingBlock>

        <SubmitArea onSubmit={this.onSubmit} type="workings" />
      </div>
    );
  }
}

export default CampaignTimeAndSalaryForm;
