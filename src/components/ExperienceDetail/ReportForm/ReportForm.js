import React, { Fragment, useState } from 'react';
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
  const dispatch = useDispatch();
  const [isLoggedIn, login] = useLogin();
  const [formState, setFormState] = useState({
    reasonCategory: reasonCategoryOptions[0].value,
    reason: '',
  });
  // to show the validation hint
  const [submitted, setSubmitted] = useState(false);
  // to show the progress to user
  const [submitting, setSubmitting] = useState(false);

  const submit = async () => {
    setSubmitted(true);
    setSubmitting(true);

    const valid = validReasomForm(formState);

    if (valid) {
      try {
        await dispatch(
          createReport({
            experienceId: id,
            body: handleToApiParams(formState),
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
        reasonCategoryOptions={reasonCategoryOptions}
        reasonCategory={formState.reasonCategory}
        handleReasonCategory={reasonCategory =>
          setFormState(state => ({
            ...state,
            reasonCategory,
          }))
        }
      />
      <Reason
        reason={formState.reason}
        onChange={e => {
          const reason = e.target.value;
          setFormState(state => ({
            ...state,
            reasonCategory: '其他',
            reason,
          }));
        }}
        invalid={
          submitted &&
          !validReason(isReasonLimit(formState.reasonCategory))(
            formState.reason,
          )
        }
      />
      <P
        size="s"
        style={{
          marginBottom: '16px',
        }}
      >
        請盡量詳細說明為何這則內容不妥或不實，以供我們評估，您也可以在被檢舉的內容下方留言，
        讓其他使用者知道您的不同意見。
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
