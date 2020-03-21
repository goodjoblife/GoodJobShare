import React, { useEffect, useMemo, useCallback } from 'react';
import {
  string,
  bool,
  func,
  shape,
  oneOfType,
  element,
  arrayOf,
} from 'prop-types';
import cn from 'classnames';
import R from 'ramda';

import X from 'common/icons/X';

import QuestionBuilder from './QuestionBuilder';
import useDraft from './useDraft';
import usePagination from './usePagination';
import ProgressBlock from './ProgressBlock';
import NavigatorBlock from './NavigatorBlock';
import SubmissionBlock from './SubmissionBlock';
import styles from './FormBuilder.module.css';

const findLastRequiredIndex = R.findLastIndex(R.prop('required'));
const findIfQuestionsAcceptDraft = draft =>
  R.all(
    R.ifElse(
      R.has('validator'),
      R.converge(R.call, [
        R.prop('validator'),
        R.compose(
          dataKey => draft[dataKey],
          R.prop('dataKey'),
        ),
      ]),
      R.always(true),
    ),
  );

const FormBuilder = ({
  bodyClassName,
  open,
  title,
  description,
  submitButtonText,
  submitButtonEnabled,
  header: commonHeader,
  footer: commonFooter,
  questions,
  layout,
  onChange,
  onSubmit,
  onValidateFail,
  onNext,
  onPrev,
  onClickAgreement,
  onClose,
  msgModalContent,
  openMsgModal,
  onCloseMsgModal,
  onConfirmMsgModal,
}) => {
  const [draft, setDraftValue, resetDraft] = useDraft(questions);
  const handleDraftChange = dataKey => value => {
    onChange({ dataKey, value });
    setDraftValue(dataKey)(value);
  };

  const [page, setPage] = usePagination();
  const hasPrevious = page > 0;
  const hasNext = page < questions.length - 1;
  const goPrevious = () => setPage(page - 1);
  const goNext = () => setPage(page + 1);

  const showsSubmissionAtIndex = useMemo(
    () => findLastRequiredIndex(questions),
    [questions],
  );
  const showsSubmission = page >= showsSubmissionAtIndex;
  const isSubmittable = useMemo(
    () => findIfQuestionsAcceptDraft(draft)(questions),
    [draft, questions],
  );
  const handleSubmit = useCallback(() => {
    onSubmit(draft);
  }, [onSubmit, draft]);

  useEffect(() => {
    if (!open) {
      // Reset on close
      setPage(0);
      resetDraft();
    }
  }, [open, resetDraft, setPage]);

  const question = questions[page];
  if (!question) {
    return null;
  }

  const { header, footer, ...restOptions } = question;
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button className={styles.closeBtn} onClick={onClose}>
          <X className={styles.icon} />
        </button>
        {header || commonHeader}
      </div>
      <div className={cn(styles.body, bodyClassName)}>
        <div className={styles.question}>
          <div className={styles.scrollable}>
            <QuestionBuilder
              {...restOptions}
              value={draft[restOptions.dataKey]}
              onChange={handleDraftChange(restOptions.dataKey)}
            />
          </div>
        </div>
        <div className={styles.navigationBar}>
          <div>
            <ProgressBlock page={page} totalPages={questions.length} />
          </div>
          <div className={styles.navigator}>
            <NavigatorBlock
              onPrevious={goPrevious}
              onNext={goNext}
              hasPrevious={hasPrevious}
              hasNext={hasNext}
            />
          </div>
        </div>
        <div
          className={cn(styles.submission, {
            [styles.visible]: showsSubmission,
          })}
        >
          <SubmissionBlock
            isSubmittable={isSubmittable}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
      <div>{footer || commonFooter}</div>
    </div>
  );
};

FormBuilder.propTypes = {
  className: string,
  // 表單是否開啟，等於 false 時表單關閉。
  open: bool.isRequired,
  // 問卷頁首 & 頁尾
  header: oneOfType([string, element]),
  footer: oneOfType([string, element]),
  // 上傳按鈕的文字
  submitButtonText: oneOfType([string, element]).isRequired,
  // 上傳按鈕是否可按
  submitButtonEnabled: bool.isRequired,
  // 問題列表
  questions: arrayOf(
    shape({
      header: oneOfType([string, element]),
      footer: oneOfType([string, element]),
      ...QuestionBuilder.propTypes,
    }),
  ).isRequired,
  // 排版方式，目前只有一種，就是 typeform
  layout: string.isRequired,
  // 當使用者填寫內容，此函數會被觸發，且 emit 一個 object，包含被修改欄位的 key & value
  onChange: func.isRequired,
  // 當使用者按下送出鈕，且通過所有 question validator 驗證，此函數會被觸發
  onSubmit: func.isRequired,
  // 當使用者按下送出鈕，但有 question validator 驗證未過，此函數會被觸發
  onValidateFail: func,
  // 點擊下一步可額外觸發的函數 (可用於數據追蹤)
  onNext: func,
  // 點擊上一步考額外觸發的函數 (可用於數據追蹤)
  onPrev: func,
  // 點擊使用者條款 checkbox
  onClickAgreement: func,
  // 關閉表單前觸發的函數
  onClose: func.isRequired,

  // 訊息 Modal 的內容
  msgModalContent: oneOfType([string, element]),
  // 訊息 Modal 是否開啟
  openMsgModal: bool,
  // 使用者點擊 Modal 的關閉按鈕觸發的函數
  onCloseMsgModal: func,
  // 使用者點擊 Modal 的確認按鈕觸發的函數
  onConfirmMsgModal: func,
};

FormBuilder.defaultProps = {
  layout: 'typeform',
  openMsgModal: false,
};

const withBackgroundMask = Modal => props => (
  <div className={cn(styles.backgroundMask, { [styles.hidden]: !props.open })}>
    <Modal {...props} />
  </div>
);

export default withBackgroundMask(FormBuilder);
