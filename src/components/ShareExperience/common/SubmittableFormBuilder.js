import PropTypes from 'prop-types';
import React, { Fragment, useCallback, useState } from 'react';
import { useHistory } from 'react-router';

import FormBuilder, {
  PageEndPropType,
  QuestionPropType,
} from 'common/FormBuilder';
import ConfirmModal from 'common/FormBuilder/Modals/ConfirmModal';
import { ER0018, ERROR_CODE_MSG } from 'constants/errorCodeMsg';
import { useExperienceCount, useSalaryWorkTimeCount } from 'hooks/useCount';
import rollbar from 'utils/rollbar';

import Footer from './TypeFormFooter';

const NO_REDIRECT = /** @type {string | (() => string) | null} */ (null);

const SubmittableTypeForm = ({
  open,
  questions,
  header,
  onSubmit,
  onSubmitError,
  onClose,
  redirectPathnameOnSuccess,
  redirectPathnameOnQuit = NO_REDIRECT,
  hideProgressBar,
  successSubtitle = '你已解鎖全站資訊囉！',
  successDescription = '感謝你分享你的資訊，台灣的職場因為有你而變得更好！',
  onSuccessContinue = null,
}) => {
  const history = useHistory();
  const [submitStatus, setSubmitStatus] = useState('unsubmitted');
  const [submittedDraft, setSubmittedDraft] = useState(null);
  const [submitResult, setSubmitResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const handleSubmit = useCallback(
    async draft => {
      try {
        if (submitStatus === 'submitting') {
          return;
        }
        setSubmitStatus('submitting');
        setSubmitResult(await onSubmit(draft));
        setSubmittedDraft(draft);
        setSubmitStatus('success');
      } catch (error) {
        const errorCode = ER0018;
        rollbar.error(
          `[${errorCode}] ${ERROR_CODE_MSG[errorCode].internal} ${error}`,
          error,
        );
        setErrorMessage(error.message);
        setSubmitStatus('error');
        await onSubmitError(error);
      }
    },
    [onSubmit, onSubmitError, submitStatus],
  );

  const experienceCount = useExperienceCount();
  const salaryCount = useSalaryWorkTimeCount();

  const onTryClosing = useCallback(() => {
    setSubmitStatus('quitting');
  }, []);

  const redirectTo = useCallback(
    pathname => {
      if (typeof window === 'undefined') return;
      window.location.replace(
        typeof pathname === 'function'
          ? pathname(submitResult, submittedDraft)
          : pathname,
      );
    },
    [submittedDraft, submitResult],
  );

  const onSuccessClose = useCallback(() => {
    setSubmitStatus('unsubmitted');
    onClose();
    if (redirectPathnameOnSuccess) redirectTo(redirectPathnameOnSuccess);
  }, [onClose, redirectTo, redirectPathnameOnSuccess]);

  const onSuccessContinueClick = useCallback(() => {
    setSubmitStatus('unsubmitted');
    onClose();
    onSuccessContinue(submitResult, submittedDraft);
  }, [onClose, onSuccessContinue, submitResult, submittedDraft]);

  const onResume = useCallback(() => {
    setSubmitStatus('unsubmitted');
  }, []);

  const onQuit = useCallback(() => {
    setSubmitStatus('unsubmitted');
    onClose();
    if (redirectPathnameOnQuit) redirectTo(redirectPathnameOnQuit);
  }, [onClose, redirectTo, redirectPathnameOnQuit]);

  const onGoToShare = useCallback(() => {
    setSubmitStatus('unsubmitted');
    onClose();
    history.push('/share');
  }, [history, onClose]);

  return (
    <Fragment>
      <FormBuilder
        open={open}
        onClose={onTryClosing}
        questions={questions}
        header={header}
        footer={<Footer dataNum={salaryCount + experienceCount} />}
        onSubmit={handleSubmit}
        hideProgressBar={hideProgressBar}
      />
      <ConfirmModal
        isOpen={submitStatus === 'success'}
        title="上傳成功"
        subtitle={successSubtitle}
        description={successDescription}
        close={onSuccessClose}
        closableOnClickOutside
        actions={
          onSuccessContinue
            ? [['繼續', onSuccessContinueClick], ['完成', onSuccessClose]]
            : [['確定', onSuccessClose]]
        }
      />
      <ConfirmModal
        isOpen={submitStatus === 'error'}
        title="上傳失敗"
        description={errorMessage}
        close={onResume}
        closableOnClickOutside
        actions={[['確定', onResume]]}
      />
      <ConfirmModal
        isOpen={submitStatus === 'quitting'}
        title="確定要離開？"
        description="離開之後資訊將會消失"
        close={onResume}
        closableOnClickOutside
        actions={[
          ['確定離開', onQuit],
          ['分享其他資訊', onGoToShare],
          ['取消', onResume],
        ]}
      />
    </Fragment>
  );
};

SubmittableTypeForm.propTypes = {
  header: PageEndPropType,
  hideProgressBar: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onSubmitError: PropTypes.func.isRequired,
  onSuccessContinue: PropTypes.func,
  open: PropTypes.bool.isRequired,
  questions: PropTypes.arrayOf(QuestionPropType).isRequired,
  redirectPathnameOnQuit: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]),
  redirectPathnameOnSuccess: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]).isRequired,
  successDescription: PropTypes.string,
  successSubtitle: PropTypes.string,
};

export default SubmittableTypeForm;
