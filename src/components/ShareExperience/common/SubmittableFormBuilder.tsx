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

type RedirectLocation = string | { pathname: string; state?: unknown };

type Submission<Result> = { result: Result; draft: Draft };

const replaceLocation = (location: RedirectLocation): void => {
  if (typeof window === 'undefined') return;
  if (typeof location === 'string') {
    window.location.replace(location);
    return;
  }
  // react-router's BrowserHistory restores location.state from
  // window.history.state on load, so the state survives the reload
  window.history.replaceState({ state: location.state }, '', location.pathname);
  window.location.reload();
};

// TODO: replace with a proper Question type; the shape is still only described
// by QuestionPropType in common/FormBuilder
type Question = unknown;

// TODO: the function form should be (draft: Draft) => ReactNode, matching
// PageEndPropType. It is any because PolicyForm/TypeForm passes a narrower
// param type ({ companyName, jobTitle }), which strictFunctionTypes rejects.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PageEnd = React.ReactNode | ((draft: any) => React.ReactNode);

type Props<Result> = {
  open: boolean;
  questions: Question[];
  header?: PageEnd;
  onSubmit: (draft: Draft) => Result | Promise<Result>;
  onSubmitError: (error: unknown) => void | Promise<void>;
  onClose: () => void;
  redirectPathnameOnSuccess:
    | RedirectLocation
    | ((result: Result, draft: Draft) => RedirectLocation);
  redirectPathnameOnQuit?: RedirectLocation | (() => RedirectLocation) | null;
  hideProgressBar?: boolean;
  successSubtitle?: string;
  successDescription?: string;
  onSuccessContinue?: ((result: Result, draft: Draft) => void) | null;
};

const SubmittableTypeForm = <Result,>({
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
}: Props<Result>): React.ReactElement => {
  const history = useHistory();
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('unsubmitted');
  const [submission, setSubmission] = useState<Submission<Result> | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const handleSubmit = useCallback(
    async (draft: Draft) => {
      try {
        if (submitStatus === 'submitting') {
          return;
        }
        setSubmitStatus('submitting');
        setSubmission({ result: await onSubmit(draft), draft });
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

  const onSuccessClose = useCallback(() => {
    setSubmitStatus('unsubmitted');
    onClose();
    if (!redirectPathnameOnSuccess || !submission) return;
    replaceLocation(
      typeof redirectPathnameOnSuccess === 'function'
        ? redirectPathnameOnSuccess(submission.result, submission.draft)
        : redirectPathnameOnSuccess,
    );
  }, [onClose, redirectPathnameOnSuccess, submission]);

  const onSuccessContinueClick = useCallback(() => {
    setSubmitStatus('unsubmitted');
    onClose();
    if (onSuccessContinue && submission)
      onSuccessContinue(submission.result, submission.draft);
  }, [onClose, onSuccessContinue, submission]);

  const onResume = useCallback(() => {
    setSubmitStatus('unsubmitted');
  }, []);

  const onQuit = useCallback(() => {
    setSubmitStatus('unsubmitted');
    onClose();
    if (!redirectPathnameOnQuit) return;
    replaceLocation(
      typeof redirectPathnameOnQuit === 'function'
        ? redirectPathnameOnQuit()
        : redirectPathnameOnQuit,
    );
  }, [onClose, redirectPathnameOnQuit]);

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
