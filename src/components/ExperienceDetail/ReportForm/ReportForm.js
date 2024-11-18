import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Heading from 'common/base/Heading';
import P from 'common/base/P';
import Button from 'common/button/Button';
import Loader from 'common/Loader';
import { useLogin } from 'hooks/login';
import { createReport } from 'actions/reports';

import ReasonCategory from './ReasonCategory';
import Reason from './Reason';
import styles from './ReportForm.module.css';
import { handleToApiParams } from './helper';
import { validReasomForm, validReason, isReasonLimit } from './formCheck';
import { useLocation, useHistory, useParams } from 'react-router-dom';
import { experienceReportReasons } from './constants';
import { formatCreatedAt } from 'components/LandingPage/ExperienceBlock/helper';

export const reasonCategoryOptions = [
  {
    label: '這是廣告或垃圾訊息',
    value: '這是廣告或垃圾訊息',
  },
  {
    label: '我認為這篇文章涉及人身攻擊、誹謗',
    value: '我認為這篇文章涉及人身攻擊、誹謗',
  },
  {
    label: '我認為這篇文章內容不實',
    value: '我認為這篇文章內容不實',
  },
  {
    label: '其他',
    value: '其他',
  },
];

const ReportForm = ({ close, onApiError, onSuccess, id }) => {
  const location = useLocation();
  const history = useHistory();
  const params = useParams();
  const pathname = location.pathname;
  console.log('pathname', pathname);
  const dispatch = useDispatch();
  const [isLoggedIn, login] = useLogin();

  const [reasonCategory, setReasonCategory] = useState(
    experienceReportReasons[0].value,
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
          createReport({
            experienceId: id,
            body: handleToApiParams({ reason, reasonCategory }),
          }),
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
        檢舉此篇文章
      </Heading>
      <ReasonCategory
        reasonCategoryOptions={experienceReportReasons}
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
};

export default ReportForm;
