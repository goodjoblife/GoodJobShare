import React, { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Heading from 'common/base/Heading';
import P from 'common/base/P';
import Button from 'common/button/Button';
import Loader from 'common/Loader';
import { useLogin } from 'hooks/login';
import {
  createExperienceReport,
  createSalaryWorkTimeReport,
} from 'actions/reports';
import ReasonCategory from './ReasonCategory';
import Reason from './Reason';
import styles from './ReportForm.module.css';
import { validReasomForm, validReason, isReasonLimit } from './formCheck';
import {
  salaryReportReasons,
  experienceReportReasons,
  REPORT_TYPE,
} from './constants';

const getReasonCategoryOptions = reportType => {
  return reportType === REPORT_TYPE.SALARY
    ? salaryReportReasons
    : experienceReportReasons;
};

const submitReport = ({ id, reason, reasonCategory, reportType }) => {
  return reportType === REPORT_TYPE.SALARY
    ? createSalaryWorkTimeReport({ id, reason, reasonCategory })
    : createExperienceReport({ id, reason, reasonCategory });
};

const ReportForm = ({ close, onApiError, onSuccess, id, reportType }) => {
  const dispatch = useDispatch();
  const [isLoggedIn, login] = useLogin();
  const reasonCategoryOptions = getReasonCategoryOptions(reportType);

  const [reasonCategory, setReasonCategory] = useState(
    reasonCategoryOptions[0].value,
  );
  const [reason, setReason] = useState('');

  // to show the validation hint
  const [submitted, setSubmitted] = useState(false);
  // to show the progress to user
  const [submitting, setSubmitting] = useState(false);

  const submit = async () => {
    setSubmitted(true);
    setSubmitting(true);

    const valid = validReasomForm({ reason, reasonCategory });

    if (valid) {
      try {
        await dispatch(
          submitReport({ id, reason, reasonCategory, reportType }),
        );
        close();
        onSuccess();
      } catch (e) {
        onApiError({
          message: e.message,
        });
      }
    }

    setSubmitting(false);
  };

  if (submitting) {
    return (
      <Fragment>
        <Heading size="l" marginBottomS center>
          上傳中
        </Heading>
        <Loader size="s" />
      </Fragment>
    );
  }

  return (
    <section>
      <Heading Tag="h2" size="l" marginBottomS center>
        回報此篇文章
      </Heading>
      <ReasonCategory
        reasonCategoryOptions={reasonCategoryOptions}
        reasonCategory={reasonCategory}
        handleReasonCategory={setReasonCategory}
      />
      <Reason
        reason={reason}
        onChange={e => setReason(e.target.value)}
        invalid={
          submitted && !validReason(isReasonLimit(reasonCategory))(reason)
        }
      />
      <P
        size="s"
        style={{
          marginBottom: '16px',
        }}
      >
        回報後，該篇文章將顯示標注，提醒其他求職者須注意正確性。我們也將進行評估，將顯然不合理之資訊移除。
      </P>
      <div className={isLoggedIn ? styles.buttons : styles.notLoginButtons}>
        {isLoggedIn ? (
          <Button
            circleSize="md"
            btnStyle="black"
            style={{
              marginRight: '20px',
            }}
            onClick={submit}
          >
            送出
          </Button>
        ) : (
          <Button circleSize="md" btnStyle="black" onClick={login}>
            登入
          </Button>
        )}
        <Button circleSize="md" btnStyle="grayLine" onClick={close}>
          取消
        </Button>
      </div>
    </section>
  );
};

ReportForm.propTypes = {
  close: PropTypes.func,
  id: PropTypes.string,
  onApiError: PropTypes.func,
  onSuccess: PropTypes.func,
  reportType: PropTypes.string,
};

ReportForm.defaultProps = {
  reportType: REPORT_TYPE.EXPERIENCE,
};

export default ReportForm;
