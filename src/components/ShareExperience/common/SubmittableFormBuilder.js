import React, { useCallback, Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';

import FormBuilder, {
  PageEndPropType,
  QuestionPropType,
} from 'common/FormBuilder';
import ConfirmModal from 'common/FormBuilder/Modals/ConfirmModal';
import Footer from './TypeFormFooter';
import { useExperienceCount, useSalaryWorkTimeCount } from 'hooks/useCount';
import rollbar from 'utils/rollbar';
import * as ERROR_CODE from 'constants/errorCodeMsg';
import { ERROR_CODE_MSG } from 'constants/errorCodeMsg';

const SubmittableTypeForm = ({
  open,
  questions,
  header,
  onSubmit,
  onSubmitError,
  onClose,
  redirectPathnameOnSuccess,
  hideProgressBar,
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
        const errorCode = ERROR_CODE.ER0018;
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

  const onSuccessClose = useCallback(() => {
    setSubmitStatus('unsubmitted');
    onClose();
    if (typeof window !== 'undefined' && redirectPathnameOnSuccess) {
      let pathname = redirectPathnameOnSuccess;
      if (typeof pathname === 'function')
        pathname = pathname(submitResult, submittedDraft);
      window.location.replace(pathname);
    }
  }, [onClose, redirectPathnameOnSuccess, submittedDraft, submitResult]);

  const onResume = useCallback(() => {
    setSubmitStatus('unsubmitted');
  }, []);

  const onQuit = useCallback(() => {
    setSubmitStatus('unsubmitted');
    onClose();
  }, [onClose]);

  const onGoToShare = useCallback(() => {
    setSubmitStatus('unsubmitted');
    history.push('/share');
  }, [history]);

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
        subtitle="你已解鎖全站資訊囉！"
        description="感謝你分享你的資訊，台灣的職場因為有你而變得更好！"
        close={onSuccessClose}
        closableOnClickOutside
        actions={[['確定', onSuccessClose]]}
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
  open: PropTypes.bool.isRequired,
  questions: PropTypes.arrayOf(QuestionPropType).isRequired,
  redirectPathnameOnSuccess: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
  ]).isRequired,
};

export default SubmittableTypeForm;
