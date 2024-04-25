import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  string,
  bool,
  func,
  shape,
  oneOfType,
  element,
  arrayOf,
  any,
  node,
} from 'prop-types';
import cn from 'classnames';
import R from 'ramda';

import X from 'common/icons/X';

import QuestionBuilder, { QuestionTypePropType } from './QuestionBuilder';
import useDraft from './useDraft';
import ProgressBlock from './ProgressBlock';
import NavigatorBlock from './NavigatorBlock';
import SubmissionBlock from './SubmissionBlock';
import AnimatedPager from './AnimatedPager';
import styles from './FormBuilder.module.css';
import { OptionPropType } from './QuestionBuilder/Checkbox/PropTypes';

const findIfQuestionsAcceptDraft = draft =>
  R.all(
    R.ifElse(
      R.has('validateOrWarn'),
      R.compose(
        R.equals(true),
        R.not,
        R.converge(R.call, [
          R.prop('validateOrWarn'),
          R.compose(
            dataKey => draft[dataKey],
            R.prop('dataKey'),
          ),
          R.identity,
        ]),
      ),
      R.always(true),
    ),
  );

const useQuestion = (question, draft) => {
  if (question) {
    const {
      header,
      footer,
      dataKey,
      defaultValue,
      required,
      validateOrWarn,
    } = question;
    return {
      shouldRenderQuestion: true,
      questionHeader: header,
      questionFooter: footer,
      dataKey,
      warning:
        (validateOrWarn && validateOrWarn(draft[dataKey], question)) || null,
      skippable:
        !required &&
        R.equals(
          draft[dataKey],
          typeof defaultValue === 'function' ? defaultValue() : defaultValue,
        ),
    };
  } else {
    return { shouldRenderQuestion: false };
  }
};

const FormBuilder = ({
  open,
  header: commonHeader,
  footer: commonFooter,
  questions,
  onChange,
  onPrev,
  onNext,
  onPageChange,
  onSubmit,
  onValidateFail,
  onClose,
  hideProgressBar,
}) => {
  const [draft, setDraftValue, resetDraft] = useDraft(questions);
  const handleDraftChange = dataKey => value => {
    if (onChange) onChange({ dataKey, value });
    setDraftValue(dataKey)(value);
  };

  const [page, setPage] = useState(-1);
  const hasPrevious = page > 0;
  const hasNext = page < questions.length - 1;

  const {
    shouldRenderQuestion,
    questionHeader,
    questionFooter,
    dataKey,
    warning,
    skippable,
  } = useQuestion(questions[page], draft);

  const [isWarningShown, setWarningShown] = useState(false);
  const [showsNavigation, setShowsNavigation] = useState(true);

  const isSubmittable = useMemo(
    () => findIfQuestionsAcceptDraft(draft)(questions),
    [draft, questions],
  );
  const handleSubmit = useCallback(() => {
    setWarningShown(true);
    if (warning) {
      if (onValidateFail)
        onValidateFail({ dataKey, value: draft[dataKey], warning });
    } else if (isSubmittable) {
      onSubmit(draft);
    } else {
      console.error(`Not submittable`);
    }
  }, [warning, isSubmittable, onValidateFail, dataKey, draft, onSubmit]);

  useEffect(() => {
    if (open) {
      setPage(0);
      resetDraft();
      setWarningShown(false);
    } else {
      setPage(-1);
    }
  }, [open, resetDraft, setPage]);

  const warnBeforeSetPage = useCallback(
    page => {
      setWarningShown(true);
      if (warning) {
        if (onValidateFail)
          onValidateFail({ dataKey, value: draft[dataKey], warning });
      } else {
        setPage(page);
      }
    },
    [dataKey, draft, onValidateFail, setPage, warning],
  );

  useEffect(() => {
    setWarningShown(false);

    if (page >= 0) {
      if (onPageChange) onPageChange(page);
    }
  }, [page]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!shouldRenderQuestion) {
    return null;
  }

  let header = questionHeader || commonHeader;
  if (typeof header === 'function') header = header(draft);

  let footer = questionFooter || commonFooter;
  if (typeof footer === 'function') footer = footer(draft);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button className={styles.closeBtn} onClick={onClose}>
          <X className={styles.icon} />
        </button>
        {header}
      </div>
      <div className={styles.body}>
        <AnimatedPager className={styles.pager} page={page}>
          {questions.map(({ header, footer, ...restOptions }, i) => (
            <AnimatedPager.Page key={restOptions.dataKey}>
              <QuestionBuilder
                {...restOptions}
                page={i}
                title={
                  typeof restOptions.title === 'function'
                    ? restOptions.title(draft)
                    : restOptions.title
                }
                value={draft[restOptions.dataKey]}
                onChange={handleDraftChange(restOptions.dataKey)}
                onConfirm={() => {
                  if (i < questions.length - 1) {
                    if (onNext) onNext(i + 1);
                    warnBeforeSetPage(i + 1);
                  }
                }}
                warning={isWarningShown ? warning : null}
                setShowsNavigation={setShowsNavigation}
              />
            </AnimatedPager.Page>
          ))}
        </AnimatedPager>
        <div
          className={cn(styles.navigationBar, {
            [styles.hidden]: !showsNavigation,
          })}
        >
          {hideProgressBar ? null : (
            <div>
              <ProgressBlock page={page} totalPages={questions.length} />
            </div>
          )}
          <div className={styles.navigator}>
            <NavigatorBlock
              skippable={skippable}
              onPrevious={() => {
                if (onPrev) onPrev(page - 1);
                setPage(page - 1);
              }}
              onNext={() => {
                if (onNext) onNext(page + 1);
                warnBeforeSetPage(page + 1);
              }}
              hasPrevious={hasPrevious}
              hasNext={hasNext}
            />
          </div>
        </div>
        <div
          className={cn(styles.submission, {
            [styles.visible]: !hasNext,
          })}
        >
          <SubmissionBlock onSubmit={handleSubmit} />
        </div>
      </div>
      <div>{footer}</div>
    </div>
  );
};

export const PageEndPropType = oneOfType([string, element, func]);

export const QuestionPropType = shape({
  header: PageEndPropType,
  footer: PageEndPropType,
  title: oneOfType([string, func]).isRequired,
  description: string,
  type: QuestionTypePropType.isRequired,
  dataKey: string.isRequired,
  defaultValue: oneOfType([func, any]),
  required: bool,
  validateOrWarn: func,
  onSelect: func,
  search: func,
  placeholder: string,
  footnote: oneOfType([string, node, func]),
  options: arrayOf(OptionPropType),
  elseOptions: arrayOf(OptionPropType),
  ratingLabels: arrayOf(string.isRequired),
  renderCustomizedQuestion: func,
});

FormBuilder.propTypes = {
  open: bool.isRequired,
  header: PageEndPropType,
  footer: PageEndPropType,
  questions: arrayOf(QuestionPropType).isRequired,
  onChange: func,
  onPrev: func,
  onNext: func,
  onPageChange: func,
  onSubmit: func.isRequired,
  onValidateFail: func,
  onClose: func,
};

FormBuilder.defaultProps = {
  open: false,
  questions: [],
  onSubmit: console.log,
};

const withBackgroundMask = Modal => props => (
  <div className={cn(styles.backgroundMask, { [styles.hidden]: !props.open })}>
    <Modal {...props} />
  </div>
);

export default withBackgroundMask(FormBuilder);
