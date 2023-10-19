import React, { useCallback, useEffect, useRef, useState } from 'react';
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
import {
  INVALID,
  TIME_SALARY_BASIC_ORDER,
  TIME_SALARY_EXT_ORDER,
} from 'constants/formElements';
import { GA_CATEGORY, GA_ACTION } from 'constants/gaConstants';
import PIXEL_CONTENT_CATEGORY from 'constants/pixelConstants';
import { LS_TIME_SALARY_FORM_KEY } from 'constants/localStorageKey';

import SuccessFeedback from '../common/SuccessFeedback';
import FailFeedback from '../common/FailFeedback';

import { createSalaryWorkTime } from 'actions/timeAndSalary';

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
  const [submitted, setSubmitted] = useState(false);
  const [salaryHint, setSalaryHint] = useState(null);
  const [showSalaryWarning, setShowSalaryWarning] = useState(false);
  const basicElValidationStatus = useRef({});
  const extElValidationStatus = useRef({});

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
  }, [location]);

  const getTopInvalidElement = useCallback(() => {
    const basic = TIME_SALARY_BASIC_ORDER;
    const ext = TIME_SALARY_EXT_ORDER;
    for (let i = 0, el; i <= basic.length; i += 1) {
      el = basic[i];
      if (
        basicElValidationStatus.current[el] &&
        basicElValidationStatus.current[el] === INVALID
      ) {
        return el;
      }
    }
    for (let i = 0, el; i <= ext.length; i += 1) {
      el = ext[i];
      if (
        extElValidationStatus.current[el] &&
        extElValidationStatus.current[el] === INVALID
      ) {
        return el;
      }
    }
    return null;
  }, []);

  const onSubmit = useCallback(() => {
    const valid = basicFormCheck(getBasicForm(form));
    const valid2 = salaryFormCheck(getSalaryForm(form));
    const valid3 = timeFormCheck(getTimeForm(form));

    if (valid && valid2 && valid3) {
      localStorage.removeItem(LS_TIME_SALARY_FORM_KEY);

      const p = dispatch(
        createSalaryWorkTime({
          body: portTimeSalaryFormToRequestFormat(getTimeAndSalaryForm(form)),
        }),
      );

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

          return ({ buttonClick }) => (
            <FailFeedback info={error.message} buttonClick={buttonClick} />
          );
        },
      );
    }
    setSubmitted(true);
    const topInvalidElement = getTopInvalidElement();
    if (topInvalidElement !== null) {
      scroller.scrollTo(topInvalidElement, {
        duration: 1000,
        delay: 100,
        offset: -100,
        smooth: true,
      });
    }
    return Promise.reject();
  }, [dispatch, form, getTopInvalidElement]);

  const changeBasicElValidationStatus = useCallback((elementId, status) => {
    basicElValidationStatus.current[elementId] = status;
  }, []);

  const changeExtElValidationStatus = useCallback((elementId, status) => {
    extElValidationStatus.current[elementId] = status;
  }, []);

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
      dayPromisedWorkTime,
      dayRealWorkTime,
      weekWorkTime,
      overtimeFrequency,
    },
    submitted,
  );

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
          changeValidationStatus={changeBasicElValidationStatus}
        />

        <br />

        <SalaryInfo
          handleState={handleState}
          salaryType={salaryType}
          salaryAmount={salaryAmount}
          experienceInYear={experienceInYear}
          submitted={submitted}
          changeValidationStatus={changeExtElValidationStatus}
          showWarning={showSalaryWarning}
          hint={salaryHint}
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
