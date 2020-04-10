import React, { useState, useEffect, useMemo, useCallback } from 'react';
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
import TitleBlock from './TitleBlock';
import ProgressBlock from './ProgressBlock';
import NavigatorBlock from './NavigatorBlock';
import SubmissionBlock from './SubmissionBlock';
import AnimatedPager from './AnimatedPager';
import Scrollable from './Scrollable';
import styles from './FormBuilder.module.css';

const findWarningAgainstValue = (value, warning, validator) => {
  if (validator) {
    const isValid = validator(value);
    if (isValid) {
      return null;
    } else {
      if (typeof warning === 'function') {
        return warning(value);
      } else {
        return warning;
      }
    }
  } else {
    return null;
  }
};

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
  header: commonHeader,
  footer: commonFooter,
  questions,
  onChange,
  onSubmit,
  onClose,
}) => {
  const [draft, setDraftValue, resetDraft] = useDraft(questions);
  const handleDraftChange = dataKey => value => {
    onChange({ dataKey, value });
    setDraftValue(dataKey)(value);
  };

  const [page, setPage] = usePagination();
  const hasPrevious = page > 0;
  const hasNext = page < questions.length - 1;

  const indexToShowSubmitButton = useMemo(
    () => findLastRequiredIndex(questions),
    [questions],
  );
  const showsSubmission = page >= indexToShowSubmitButton;
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

  let header;
  let footer;
  let warning;
  let shouldRenderNothing = false;

  const [isWarningShown, setWarningShown] = useState(false);

  const question = questions[page];
  if (question) {
    header = question.header;
    footer = question.footer;
    warning = findWarningAgainstValue(
      draft[question.dataKey],
      question.warning,
      question.validator,
    );
  } else {
    shouldRenderNothing = true;
  }

  const warnBeforeSetPage = useCallback(
    page => {
      setWarningShown(true);
      if (!warning) {
        setPage(page);
      }
    },
    [setPage, warning],
  );

  useEffect(() => {
    setWarningShown(false);
  }, [page]);

  if (shouldRenderNothing) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button className={styles.closeBtn} onClick={onClose}>
          <X className={styles.icon} />
        </button>
        {header || commonHeader}
      </div>
      <div className={cn(styles.body, bodyClassName)}>
        <AnimatedPager className={styles.pager} page={page}>
          {questions.map(({ header, footer, ...restOptions }, i) => (
            <AnimatedPager.Page key={restOptions.dataKey}>
              <div className={styles.question}>
                <div>
                  <TitleBlock
                    page={i}
                    title={restOptions.title}
                    description={restOptions.description}
                    required={restOptions.required}
                  />
                </div>
                <Scrollable className={styles.answer}>
                  <QuestionBuilder
                    {...restOptions}
                    page={i}
                    value={draft[restOptions.dataKey]}
                    onChange={handleDraftChange(restOptions.dataKey)}
                    onConfirm={() => warnBeforeSetPage(i + 1)}
                    warning={isWarningShown ? warning : null}
                  />
                </Scrollable>
              </div>
            </AnimatedPager.Page>
          ))}
        </AnimatedPager>
        <div className={styles.navigationBar}>
          <div>
            <ProgressBlock page={page} totalPages={questions.length} />
          </div>
          <div className={styles.navigator}>
            <NavigatorBlock
              onPrevious={() => setPage(page - 1)}
              onNext={() => warnBeforeSetPage(page + 1)}
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
  // 問題列表
  questions: arrayOf(
    shape({
      ...QuestionBuilder.propTypes,
      // 問卷頁首 & 頁尾，會覆寫共用的頁首 & 頁尾
      header: oneOfType([string, element]),
      footer: oneOfType([string, element]),
      // 驗證內容的函數
      validator: func,
      // 驗證內容失敗時，顯示的警告文字
      warning: oneOfType([func, string]),
    }),
  ).isRequired,
  // 當使用者填寫內容，此函數會被觸發，且 emit 一個 object，包含被修改欄位的 key & value
  onChange: func.isRequired,
  // 當使用者按下送出鈕，且通過所有驗證，此函數會被觸發
  onSubmit: func.isRequired,
  // 關閉表單前觸發的函數
  onClose: func.isRequired,
};

const withBackgroundMask = Modal => props => (
  <div className={cn(styles.backgroundMask, { [styles.hidden]: !props.open })}>
    <Modal {...props} />
  </div>
);

export default withBackgroundMask(FormBuilder);
