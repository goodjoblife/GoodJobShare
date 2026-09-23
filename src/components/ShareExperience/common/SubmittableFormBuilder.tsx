import React, { Fragment, useCallback, useState } from 'react';
import { useHistory } from 'react-router';

import FormBuilder from 'common/FormBuilder';
import ConfirmModal from 'common/FormBuilder/Modals/ConfirmModal';
import { ER0018, ERROR_CODE_MSG } from 'constants/errorCodeMsg';
import { useExperienceCount, useSalaryWorkTimeCount } from 'hooks/useCount';
import rollbar from 'utils/rollbar';

import Footer from './TypeFormFooter';

type Draft = Record<string, unknown>;

type SubmitStatus =
  | 'unsubmitted'
  | 'submitting'
  | 'success'
  | 'error'
  | 'quitting';

type Pathname = string | ((result: unknown, draft: Draft) => string);

// TODO: replace with a proper Question type; the shape is still only described
// by QuestionPropType in common/FormBuilder
type Question = unknown;

// TODO: the function form should be (draft: Draft) => ReactNode, matching
// PageEndPropType. It is any because PolicyForm/TypeForm passes a narrower
// param type ({ companyName, jobTitle }), which strictFunctionTypes rejects.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PageEnd = React.ReactNode | ((draft: any) => React.ReactNode);

type Props = {
  open: boolean;
  questions: Question[];
  header?: PageEnd;
  onSubmit: (draft: Draft) => unknown;
  onSubmitError: (error: unknown) => void | Promise<void>;
  onClose: () => void;
  redirectPathnameOnSuccess: Pathname;
  redirectPathnameOnQuit?: Pathname | null;
  hideProgressBar?: boolean;
  successSubtitle?: string;
  successDescription?: string;
  onSuccessContinue?: ((result: unknown, draft: Draft) => void) | null;
};

const SubmittableTypeForm = ({
  open,
  questions,
  header,
  onSubmit,
  onSubmitError,
  onClose,
  redirectPathnameOnSuccess,
  redirectPathnameOnQuit = null,
  hideProgressBar,
  successSubtitle = '你已解鎖全站資訊囉！',
  successDescription = '感謝你分享你的資訊，台灣的職場因為有你而變得更好！',
  onSuccessContinue = null,
}: Props): React.ReactElement => {
  const history = useHistory();
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('unsubmitted');
  const [submittedDraft, setSubmittedDraft] = useState<Draft | null>(null);
  const [submitResult, setSubmitResult] = useState<unknown>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const handleSubmit = useCallback(
    async (draft: Draft) => {
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
          error as Error,
        );
        setErrorMessage((error as Error).message);
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
    (pathname: Pathname) => {
      if (typeof window === 'undefined') return;
      window.location.replace(
        typeof pathname === 'function'
          ? pathname(submitResult, submittedDraft as Draft)
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
    if (onSuccessContinue)
      onSuccessContinue(submitResult, submittedDraft as Draft);
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
            ? [
                ['繼續', onSuccessContinueClick],
                ['完成', onSuccessClose, 'white'],
              ]
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

export default SubmittableTypeForm;
