import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import ButtonGroup from 'common/button/ButtonGroup';
import TextInput from 'common/form/TextInput';

import InputTitle from '../../common/InputTitle';
import { interviewResultMap } from '../../common/optionMap';

import styles from './InterviewResult.module.css';

const OTHER_VALUE = '';

const notOtherValueMap = interviewResultMap
  .filter(option => option.value !== OTHER_VALUE)
  .map(option => option.value);

const isNotOther = result =>
  notOtherValueMap.includes(result) || result === null;

const InterviewResult = ({
  interviewResult,
  onChange,
  validator,
  submitted,
}) => {
  const notOther = isNotOther(interviewResult);

  const isWarning = submitted && !validator(interviewResult);
  return (
    <div>
      <InputTitle text="面試結果" must />
      <div className={isWarning ? styles.warning : ''}>
        <ButtonGroup
          value={notOther ? interviewResult : OTHER_VALUE}
          onChange={result => {
            if (notOther || isNotOther(result)) {
              return onChange(result);
            }
            return null;
          }}
          options={interviewResultMap}
        />
        {!notOther ? (
          <section
            style={{
              marginTop: '8px',
            }}
          >
            <TextInput
              value={interviewResult}
              placeholder="輸入面試結果"
              onChange={e => onChange(e.target.value)}
            />
          </section>
        ) : null}
      </div>
      {isWarning ? (
        <p
          className={cn(styles.warning__wording, 'pS')}
          style={{
            marginTop: '8px',
          }}
        >
          需填寫面試結果，或字數少於 100 字。
        </p>
      ) : null}
    </div>
  );
};

InterviewResult.propTypes = {
  interviewResult: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  validator: PropTypes.func,
  submitted: PropTypes.bool,
};

export default InterviewResult;
