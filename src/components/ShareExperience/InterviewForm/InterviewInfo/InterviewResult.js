import React, { PropTypes } from 'react';

import ButtonGroup from 'common/button/ButtonGroup';
import TextInput from 'common/form/TextInput';

import * as formCheck from '../formCheck';

import InputTitle from '../../common/InputTitle';
import {
  interviewResultMap,
} from '../../common/optionMap';


const OTHER_VALUE = '';

const notOtherValueMap = interviewResultMap.filter(option =>
  option.value !== OTHER_VALUE
).map(option =>
  option.value
);

const isNotOther = result =>
  notOtherValueMap.includes(result) || result === null;

const InterviewResult = ({ interviewResult, onChange }) => {
  const notOther = isNotOther(interviewResult);
  return (
    <div>
      <InputTitle
        text="面試結果"
        must
      />
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
      {
        !notOther ?
          <section
            style={{
              marginTop: '20px',
            }}
          >
            <TextInput
              value={interviewResult}
              placeholder="輸入面試結果"
              onChange={e => onChange(e.target.value)}
              isWarning={!formCheck.interviewResult(interviewResult)}
              warningWording="請輸入10個字以內"
            />
          </section> :
          null
      }
    </div>
  );
};

InterviewResult.propTypes = {
  interviewResult: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  onChange: PropTypes.func,
};

export default InterviewResult;
