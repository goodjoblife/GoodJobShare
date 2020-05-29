import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  string,
  bool,
  func,
  shape,
  oneOf,
  oneOfType,
  element,
  arrayOf,
  any,
} from 'prop-types';
import cn from 'classnames';
import R from 'ramda';

import X from 'common/icons/X';

import QuestionBuilder, { availableTypes } from './QuestionBuilder';
import useDraft from './useDraft';
import ProgressBlock from './ProgressBlock';
import NavigatorBlock from './NavigatorBlock';
import SubmissionBlock from './SubmissionBlock';
import AnimatedPager from './AnimatedPager';
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

const useQuestion = (question, draft) => {
  if (question) {
    const {
      header,
      footer,
      dataKey,
      defaultValue,
      required,
      warning,
      validator,
    } = question;
    return [
      true,
      typeof header === 'function' ? header(draft) : header,
      typeof footer === 'function' ? footer(draft) : footer,
      dataKey,
      findWarningAgainstValue(draft[dataKey], warning, validator),
      !required &&
        R.equals(
          draft[dataKey],
          typeof defaultValue === 'function' ? defaultValue() : defaultValue,
        ),
    ];
  } else {
    return [false];
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
  onSubmit,
  onValidateFail,
  onClose,
}) => {
  const [draft, setDraftValue, resetDraft] = useDraft(questions);
  const handleDraftChange = dataKey => value => {
    if (onChange) onChange({ dataKey, value });
    setDraftValue(dataKey)(value);
  };

  const [page, setPage] = useState(0);
  const hasPrevious = page > 0;
  const hasNext = page < questions.length - 1;

  const [
    shouldRenderQuestion,
    header,
    footer,
    dataKey,
    warning,
    skippable,
  ] = useQuestion(questions[page], draft);

  const [isWarningShown, setWarningShown] = useState(false);

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
      // Reset on close
      setPage(0);
      resetDraft();
      setWarningShown(false);
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
  }, [page]);

  if (!shouldRenderQuestion) {
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
                    if (onNext) onNext();
                    warnBeforeSetPage(i + 1);
                  }
                }}
                warning={isWarningShown ? warning : null}
              />
            </AnimatedPager.Page>
          ))}
        </AnimatedPager>
        <div className={styles.navigationBar}>
          <div>
            <ProgressBlock page={page} totalPages={questions.length} />
          </div>
          <div className={styles.navigator}>
            <NavigatorBlock
              skippable={skippable}
              onPrevious={() => {
                if (onPrev) onPrev();
                setPage(page - 1);
              }}
              onNext={() => {
                if (onNext) onNext();
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
      <div>{footer || commonFooter}</div>
    </div>
  );
};

FormBuilder.propTypes = {
  open: bool.isRequired,
  header: oneOfType([string, element]),
  footer: oneOfType([string, element]),
  questions: arrayOf(
    shape({
      header: oneOfType([string, element, func]),
      footer: oneOfType([string, element, func]),
      title: oneOfType([string, func]).isRequired,
      description: string,
      type: oneOf(availableTypes).isRequired,
      dataKey: string.isRequired,
      defaultValue: oneOfType([func, any]),
      required: bool,
      warning: oneOfType([func, string]),
      validator: func,
      onSelect: func,
      search: func,
      placeholder: string,
      footnote: oneOfType([string, func]),
      options: arrayOf(string),
      ratingLabels: arrayOf(string.isRequired),
      renderCustomizedQuestion: func,
    }),
  ).isRequired,
  onChange: func,
  onPrev: func,
  onNext: func,
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
