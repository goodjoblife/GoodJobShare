import React, { PropTypes } from 'react';

import ButtonGroup from 'common/button/ButtonGroup';
import InputTitle from '../../common/InputTitle';

import {
  interviewResultMap,
} from '../../common/optionMap';

const InterviewResult = ({ interviewResult, onChange }) => (
  <div>
    <InputTitle
      text="面試結果"
      must
    />
    <ButtonGroup
      value={interviewResult}
      onChange={onChange}
      options={interviewResultMap}
    />
  </div>
);

InterviewResult.propTypes = {
  interviewResult: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  onChange: PropTypes.func,
};

export default InterviewResult;
