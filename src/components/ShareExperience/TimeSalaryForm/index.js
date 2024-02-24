import React, { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { useDispatch } from 'react-redux';
import ReactGA from 'react-ga4';
import ReactPixel from 'react-facebook-pixel';
import { scroller } from 'react-scroll';
import qs from 'qs';
import { Heading } from 'common/base';
import People from 'common/icons/People';
import IconHeadingBlock from 'common/IconHeadingBlock';
import BasicInfo from './BasicInfo';
import SalaryInfo from './SalaryInfo';
import TimeInfo from './TimeInfo';
import SubmitArea from '../../../containers/ShareExperience/SubmitAreaContainer';
import styles from './TimeSalaryForm.module.css';
import useValidationStatus from './useValidationStatus';

import { basicFormCheck, salaryFormCheck, timeFormCheck } from './formCheck';

import {
  getBasicForm,
  getSalaryForm,
  getTimeForm,
  getTimeAndSalaryForm,
  portTimeSalaryFormToRequestFormat,
} from '../utils';

import getSalaryHint from '../../../utils/formUtils';

import StaticHelmet from 'common/StaticHelmet';
import { GA_CATEGORY, GA_ACTION } from 'constants/gaConstants';
import PIXEL_CONTENT_CATEGORY from 'constants/pixelConstants';
import { LS_TIME_SALARY_FORM_KEY } from 'constants/localStorageKey';

import SuccessFeedback from '../common/SuccessFeedback';
import FailFeedback from '../common/FailFeedback';

import { createSalaryWorkTime } from 'actions/timeAndSalary';
import { sendEvent } from 'utils/hotjarUtil';
import { getUserPseudoId } from 'utils/GAUtils';

import { GA_MEASUREMENT_ID } from '../../../config';

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

const TimeSalaryForm = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [form, setForm] = useState({ ...defaultForm });
  const [submissionCount, setSubmissionCount] = useState(0);
  const submitted = submissionCount > 0;
  const [salaryHint, setSalaryHint] = useState(null);
  const [showSalaryWarning, setShowSalaryWarning] = useState(false);

  useEffect(() => {
    const defaultState =
      getDefaultFormFromLocation(location) ||
      getDefaultFormFromDraft() ||
      defaultForm;

    setForm({
      ...defaultState,
    });

    ReactPixel.track('InitiateCheckout', {
      content_category: PIXEL_CONTENT_CATEGORY.VISIT_TIME_AND_SALARY_FORM,
    });

    // send hotjar event for recording
    sendEvent('enter_salary_form');

    // send to GA for tracking conversion rate
    ReactGA.event({
      category: GA_CATEGORY.SHARE_TIME_SALARY_ONE_PAGE,
      action: GA_ACTION.START_WRITING,
    });
  }, [location]);

  const {
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
  } = form;

  const validationStatus = useValidationStatus(
    {
      company,
      jobTitle,
      employmentType,
      salaryType,
      salaryAmount,
      experienceInYear,
      dayPromisedWorkTime,
      dayRealWorkTime,
      weekWorkTime,
      overtimeFrequency,
    },
    { submitted },
  );

  const getTopInvalidElement = useCallback(() => {
    const order = [
      'company',
      'jobTitle',
      'employmentType',
      'salaryType',
      'salaryAmount',
      'experienceInYear',
      'dayPromisedWorkTime',
      'dayRealWorkTime',
      'weekWorkTime',
      'overtimeFrequency',
    ];
    for (const el of order) {
      if (validationStatus[el] && validationStatus[el].shouldSetWarning) {
        return el;
      }
    }
    return null;
  }, [validationStatus]);

  const onSubmit = useCallback(async () => {
    const valid = basicFormCheck(getBasicForm(form));
    const valid2 = salaryFormCheck(getSalaryForm(form));
    const valid3 = timeFormCheck(getTimeForm(form));

    if (valid && valid2 && valid3) {
      localStorage.removeItem(LS_TIME_SALARY_FORM_KEY);
      const ga_user_pseudo_id = await getUserPseudoId(GA_MEASUREMENT_ID);
      const extra = {
        form_type: GA_CATEGORY.SHARE_TIME_SALARY_ONE_PAGE,
        ga_user_pseudo_id,
      };
      const p = dispatch(
        createSalaryWorkTime({
          body: portTimeSalaryFormToRequestFormat(
            getTimeAndSalaryForm(form),
            extra,
          ),
        }),
      );

      return p.then(
        response => {
          ReactGA.event({
            category: GA_CATEGORY.SHARE_TIME_SALARY_ONE_PAGE,
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
                window.location.replace('/salary-work-times/latest');
              }}
            />
          );
        },
        error => {
          ReactGA.event({
            category: GA_CATEGORY.SHARE_TIME_SALARY_ONE_PAGE,
            action: GA_ACTION.UPLOAD_FAIL,
          });

          return ({ buttonClick }) => (
            <FailFeedback info={error.message} buttonClick={buttonClick} />
          );
        },
      );
    }
    setSubmissionCount(submissionCount + 1);
    return Promise.reject();
  }, [dispatch, form, submissionCount]);

  useEffect(() => {
    if (submitted) {
      const topInvalidElement = getTopInvalidElement();
      if (topInvalidElement !== null) {
        scroller.scrollTo(topInvalidElement, {
          duration: 1000,
          delay: 100,
          offset: -100,
          smooth: true,
        });
      }
    }
  }, [submissionCount]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSalaryHint = useCallback(
    (key, value) => {
      let inputSalaryAmount;
      let inputSalaryType;
      if (key === 'salaryType') {
        inputSalaryAmount = salaryAmount;
        inputSalaryType = value;
      } else if (key === 'salaryAmount') {
        inputSalaryAmount = value;
        inputSalaryType = salaryType;
      }
      const { showWarning, hint } = getSalaryHint(
        inputSalaryType,
        inputSalaryAmount,
      );
      setShowSalaryWarning(showWarning);
      setSalaryHint(hint);
    },
    [salaryAmount, salaryType],
  );

  const handleState = useCallback(
    key => {
      return value => {
        const updateState = {
          [key]: value,
        };
        const state = {
          ...form,
          ...updateState,
        };
        setForm(state);
        localStorage.setItem(LS_TIME_SALARY_FORM_KEY, JSON.stringify(state));

        // handle salary hint
        if (['salaryType', 'salaryAmount'].indexOf(key) >= 0) {
          handleSalaryHint(key, value);
        }
      };
    },
    [form, handleSalaryHint],
  );

  useEffect(() => {
    handleState('title')(`${company} 薪資工時分享`);
  }, [company]); // eslint-disable-line react-hooks/exhaustive-deps

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
          handleState={handleState}
          company={company}
          isCurrentlyEmployed={isCurrentlyEmployed}
          jobEndingTimeYear={jobEndingTimeYear}
          jobEndingTimeMonth={jobEndingTimeMonth}
          jobTitle={jobTitle}
          sector={sector}
          employmentType={employmentType}
          gender={gender}
          submitted={submitted}
        />

        <br />

        <SalaryInfo
          handleState={handleState}
          salaryType={salaryType}
          salaryAmount={salaryAmount}
          experienceInYear={experienceInYear}
          showWarning={showSalaryWarning}
          hint={salaryHint}
          validationStatus={validationStatus}
        />

        <TimeInfo
          handleState={handleState}
          dayPromisedWorkTime={dayPromisedWorkTime}
          dayRealWorkTime={dayRealWorkTime}
          weekWorkTime={weekWorkTime}
          overtimeFrequency={overtimeFrequency}
          hasOvertimeSalary={hasOvertimeSalary}
          isOvertimeSalaryLegal={isOvertimeSalaryLegal}
          hasCompensatoryDayoff={hasCompensatoryDayoff}
          validationStatus={validationStatus}
        />
      </IconHeadingBlock>

      <SubmitArea onSubmit={onSubmit} />
    </div>
  );
};

export default TimeSalaryForm;
