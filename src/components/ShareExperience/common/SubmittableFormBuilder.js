import React, { useCallback, Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';

import FormBuilder from 'common/FormBuilder';
import ConfirmModal from 'common/FormBuilder/Modals/ConfirmModal';
import Footer from './TypeFormFooter';
import { useExperienceCount, useSalaryWorkTimeCount } from 'hooks/useCount';

const SubmittableTypeForm = ({
  open,
  questions,
  header,
  onSubmit,
  onSubmitError,
  onClose,
}) => {
  const history = useHistory();
  const [submitStatus, setSubmitStatus] = useState('unsubmitted');
  const [errorMessage, setErrorMessage] = useState('');
  const handleSubmit = useCallback(
    async draft => {
      try {
        if (submitStatus === 'submitting') {
          return;
        }
        setSubmitStatus('submitting');
        await onSubmit(draft);
        setSubmitStatus('success');
      } catch (error) {
        setErrorMessage(error.message);
        setSubmitStatus('error');
        await onSubmitError(error);
      }
    },
    [onSubmit, onSubmitError, submitStatus],
  );

  const experienceCount = useExperienceCount();
  const salaryCount = useSalaryWorkTimeCount();

  const onSuccessClose = useCallback(() => {
    setSubmitStatus('unsubmitted');
    onClose();
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  }, [onClose]);

  const onFailClose = useCallback(() => {
    setSubmitStatus('unsubmitted');
  }, []);

  const onQuit = useCallback(() => {
    setSubmitStatus('unsubmitted');
    onClose();
  }, [onClose]);

  const onResume = useCallback(() => {
    setSubmitStatus('unsubmitted');
  }, []);

  const onGoToShare = useCallback(() => {
    setSubmitStatus('unsubmitted');
    history.push('/share');
  }, [history]);

  return (
    <Fragment>
      <FormBuilder
        open={open}
        onClose={() => setSubmitStatus('quitting')}
        questions={questions}
        header={header}
        footer={<Footer dataNum={salaryCount + experienceCount} />}
        onSubmit={handleSubmit}
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
        close={onFailClose}
        closableOnClickOutside
        actions={[['確定', onFailClose]]}
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
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default SubmittableTypeForm;
