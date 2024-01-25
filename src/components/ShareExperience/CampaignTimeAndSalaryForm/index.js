import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import ReactGA from 'react-ga4';
import ReactPixel from 'react-facebook-pixel';
import { scroller } from 'react-scroll';
import StaticHelmet from 'common/StaticHelmet';
import { Heading } from 'common/base';
import People from 'common/icons/People';
import Loader from 'common/Loader';
import NotFound from 'common/NotFound';
import IconHeadingBlock from 'common/IconHeadingBlock';
import TextInput from 'common/form/TextInput';
import TextArea from 'common/form/TextArea';
import fetchingStatus from 'constants/status';
import BasicInfo from '../TimeSalaryForm/BasicInfo';
import SalaryInfo from '../TimeSalaryForm/SalaryInfo';
import TimeInfo from '../TimeSalaryForm/TimeInfo';
import InputTitle from '../common/InputTitle';
import SubmitArea from '../../../containers/ShareExperience/SubmitAreaContainer';
import MarkdownParser from '../../LaborRightsSingle/MarkdownParser';
import { queryCampaignInfoList } from 'actions/campaignInfo';

import timeAndSalaryFormStyles from '../TimeSalaryForm/TimeSalaryForm.module.css';
import styles from '../CampaignTimeAndSalaryForm/CampaignTimeAndSalaryForm.module.css';

import {
  basicFormCheck,
  salaryFormCheck,
  timeFormCheck,
} from '../TimeSalaryForm/formCheck';
import { campaignExtendedFormCheck } from './formCheck';

import {
  getBasicForm,
  getSalaryForm,
  getTimeForm,
  getCampaignTimeAndSalaryForm,
  getCampaignExtendedForm,
  getExtraForm,
  portTimeSalaryFormToRequestFormat,
} from '../utils';

import salaryHint from '../../../utils/formUtils';

import { SITE_NAME } from '../../../constants/helmetData';
import { formatTitle, formatCanonicalPath } from '../../../utils/helmetHelper';

import {
  INVALID,
  TIME_SALARY_BASIC_ORDER,
  TIME_SALARY_EXT_ORDER,
} from '../../../constants/formElements';
import { GA_CATEGORY, GA_ACTION } from '../../../constants/gaConstants';
import PIXEL_CONTENT_CATEGORY from '../../../constants/pixelConstants';

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
  jobContent: '',
  email: '',
};

class CampaignTimeAndSalaryForm extends React.PureComponent {
  static fetchData({ store: { dispatch } }) {
    return dispatch(queryCampaignInfoList());
  }

  static propTypes = {
    campaignEntries: PropTypes.object.isRequired,
    campaignEntriesStatus: PropTypes.string.isRequired,
    queryCampaignInfoListIfNeeded: PropTypes.func.isRequired,
    createSalaryWorkTime: PropTypes.func.isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        campaign_name: PropTypes.string,
      }),
    }).isRequired,
  };
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
    if (this.props.campaignEntriesStatus === fetchingStatus.FETCHED) {
      this.setCampaignInfoFromEntries(this.props.campaignEntries);
    } else {
      this.props.queryCampaignInfoListIfNeeded();
    }

    ReactPixel.track('InitiateCheckout', {
      content_category: PIXEL_CONTENT_CATEGORY.VISIT_TIME_AND_SALARY_FORM,
    });
  }

  componentDidUpdate(prevProps) {
    const prevStatus = prevProps.campaignEntriesStatus;
    const status = this.props.campaignEntriesStatus;
    if (prevStatus !== status && status === fetchingStatus.FETCHED) {
      this.setCampaignInfoFromEntries(this.props.campaignEntries);
    }
  }

  onSubmit() {
    const valid = basicFormCheck(getBasicForm(this.state));
    const valid2 = salaryFormCheck(getSalaryForm(this.state));
    const valid3 = timeFormCheck(getTimeForm(this.state));

    const campaignName = this.props.match.params.campaign_name;
    const { extraFields, defaultContent } = this.props.campaignEntries
      .get(campaignName)
      .toJS();
    const valid4 = campaignExtendedFormCheck(extraFields)(
      getCampaignExtendedForm(extraFields)(this.state),
    );

    if (valid && (valid2 || valid3) && valid4) {
      const p = this.props.createSalaryWorkTime({
        body: portTimeSalaryFormToRequestFormat(
          getCampaignTimeAndSalaryForm(extraFields, defaultContent)(this.state),
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

          return () => (
            <SuccessFeedback
              info="感謝你分享薪資、工時資訊，讓台灣的職場變得更透明！"
              buttonText="查看最新工時、薪資"
              buttonClick={() => {
                window.location.replace(
                  `/time-and-salary/campaigns/${campaignName}/latest`,
                );
              }}
            />
          );
        },
        error => {
          ReactGA.event({
            category: GA_CATEGORY.SHARE_TIME_SALARY,
            action: GA_ACTION.UPLOAD_FAIL,
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

  setCampaignInfoFromEntries(campaignEntries) {
    const {
      match: {
        params: { campaign_name: campaignName },
      },
    } = this.props;
    const campaignInfo = campaignEntries[campaignName];
    if (campaignInfo) {
      this.setState({ campaignName });
      this.setCampaignInfo(campaignInfo);
    }
  }

  setCampaignInfo(campaignInfo) {
    const { defaultJobTitle, defaultContent, extraFields } = campaignInfo;

    const defaultExtraForm = getExtraForm(extraFields)();

    this.setState({
      ...this.state,
      jobTitle: defaultJobTitle,
      jobContent: defaultContent,
      ...defaultExtraForm,
    });
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
      // handle salary hint
      if (['salaryType', 'salaryAmount'].indexOf(key) >= 0) {
        this.handleSalaryHint(key, value);
      }
    };
  }

  renderHelmet = () => {
    if (this.props.campaignEntriesStatus === fetchingStatus.FETCHED) {
      const campaignName = this.props.match.params.campaign_name;
      const campaignInfo = this.props.campaignEntries[campaignName];
      const { formTitle, metaDescription, ogImgUrl } = campaignInfo;
      return (
        <Helmet>
          <title itemProp="name" lang="zh-TW">
            {formTitle}
          </title>
          <meta name="description" content={metaDescription} />
          <meta
            property="og:title"
            content={formatTitle(formTitle, SITE_NAME)}
          />
          <meta property="og:description" content={metaDescription} />
          <meta property="og:image" content={ogImgUrl} />
          <meta
            property="og:url"
            content={formatCanonicalPath(
              `/share/time-and-salary/campaign/${campaignName}`,
            )}
          />
          <link
            rel="canonical"
            href={formatCanonicalPath(
              `/share/time-and-salary/campaign/${campaignName}`,
            )}
          />
        </Helmet>
      );
    }
    return <StaticHelmet.ShareSalaryWorkTime />;
  };

  render() {
    const {
      campaignEntriesStatus,
      campaignEntries,
      match: {
        params: { campaign_name: campaignName },
      },
    } = this.props;

    if (campaignEntriesStatus !== fetchingStatus.FETCHED) {
      return <Loader />;
    }

    const campaignInfo = campaignEntries[campaignName];
    if (!campaignInfo) {
      return <NotFound />;
    }

    const {
      formTitle,
      formIntroduction,
      formEnding,
      extraFields,
    } = campaignInfo;

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
      jobContent,
      email,
      ...extra
    } = this.state;

    return (
      <div>
        {this.renderHelmet()}
        <Heading size="l" marginBottomS center>
          {formTitle}
        </Heading>
        <div className={styles.infoBlock}>
          <MarkdownParser content={formIntroduction} />
        </div>
        {submitted ? (
          <div
            style={{
              marginTop: '20px',
            }}
            className={timeAndSalaryFormStyles.warning__wording}
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

          <div className={timeAndSalaryFormStyles.formSection}>
            <InputTitle text="職場甘苦談" />
            <TextArea
              value={jobContent}
              onChange={e => this.handleState('jobContent')(e.target.value)}
            />
          </div>

          {extraFields.map(({ key, title }) => (
            <div key={key} className={timeAndSalaryFormStyles.formSection}>
              <InputTitle text={title} />
              <TextInput
                value={extra[key]}
                onChange={e => this.handleState(key)(e.target.value)}
              />
            </div>
          ))}
        </IconHeadingBlock>

        <SubmitArea onSubmit={this.onSubmit} />
        <div className={styles.infoBlock}>
          <MarkdownParser content={formEnding} />
        </div>
      </div>
    );
  }
}

export default CampaignTimeAndSalaryForm;
