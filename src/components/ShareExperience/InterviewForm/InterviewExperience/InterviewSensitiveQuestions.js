import React from 'react';
import PropTypes from 'prop-types';

import ButtonGroup from 'common/button/ButtonGroup';
import TextInput from 'common/form/TextInput';

import InputTitle from '../../common/InputTitle';

import { interviewSensitiveQuestionsMap } from '../../common/optionMap';

const OTHER_VALUE = '其他';

const notOtherValueMap = interviewSensitiveQuestionsMap
  .filter(option => option.value !== OTHER_VALUE)
  .map(option => option.value);

const hasOtherFunc = results =>
  results.filter(result => !notOtherValueMap.includes(result)).length > 0;

const notOtherFunc = results =>
  results.filter(result => notOtherValueMap.includes(result));

const getOtherValue = results =>
  results.find(result => !notOtherValueMap.includes(result));

const InterviewSensitiveQuestions = ({
  interviewSensitiveQuestions,
  onChange,
}) => {
  const hasOther = hasOtherFunc(interviewSensitiveQuestions);
  const resultsBesidesOther = notOtherFunc(interviewSensitiveQuestions);
  const otherValue = getOtherValue(interviewSensitiveQuestions);

  const resultsForButtonGroup = hasOther
    ? [...resultsBesidesOther, OTHER_VALUE]
    : [...resultsBesidesOther];

  return (
    <div>
      <div
        style={{
          display: 'flex',
          marginBottom: '15px',
        }}
      >
        <InputTitle text="是否有以下特殊問題" />
        <p
          style={{
            color: '#6E6E6E',
            fontSize: '0.85em',
            paddingTop: '3px',
          }}
        >
          都沒有請留空
        </p>
      </div>
      {
        <ButtonGroup
          value={resultsForButtonGroup}
          options={interviewSensitiveQuestionsMap}
          onChange={v => {
            const indexOfOther = v.indexOf(OTHER_VALUE);
            if (indexOfOther === -1) {
              return onChange(v);
            }

            const result = [...v];
            result[indexOfOther] = otherValue;
            return onChange(result);
          }}
        />
      }
      {hasOther ? (
        <section
          style={{
            marginTop: '8px',
          }}
        >
          <TextInput
            value={otherValue || ''}
            onChange={e => onChange([...resultsBesidesOther, e.target.value])}
            placeholder="輸入敏感問題"
            warningWording="請輸入20個字以內"
          />
        </section>
      ) : null}
    </div>
  );
};

InterviewSensitiveQuestions.propTypes = {
  interviewSensitiveQuestions: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func,
};

export default InterviewSensitiveQuestions;
