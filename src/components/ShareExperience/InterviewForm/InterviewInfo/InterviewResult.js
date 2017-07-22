import React, { PropTypes } from 'react';
import cn from 'classnames';
import { Element as ScrollElement } from 'react-scroll';

import ButtonGroup from 'common/button/ButtonGroup';
import TextInput from 'common/form/TextInput';

import InputTitle from '../../common/InputTitle';
import {
  interviewResultMap,
} from '../../common/optionMap';

import styles from './InterviewResult.module.css';

import { VALID, INVALID, INTERVIEW_RESULT } from '../../../../constants/formElements';

const OTHER_VALUE = '';

const notOtherValueMap = interviewResultMap.filter(option =>
  option.value !== OTHER_VALUE
).map(option =>
  option.value
);

const isNotOther = result =>
  notOtherValueMap.includes(result) || result === null;

class InterviewResult extends React.Component {
  constructor(props) {
    super(props);
    const isValid = props.validator(props.interviewResult);
    props.changeValidationStatus(INTERVIEW_RESULT, isValid ? VALID : INVALID);
    this.state = {
      isValid,
    };
  }

  componentWillReceiveProps(nextProps) {
    const isValid = this.props.validator(nextProps.interviewResult);
    if (isValid !== this.state.isValid) {
      this.setState({ isValid });
      this.props.changeValidationStatus(INTERVIEW_RESULT, isValid ? VALID : INVALID);
    }
  }

  render() {
    const { interviewResult, onChange, submitted } = this.props;
    const notOther = isNotOther(interviewResult);
    const isWarning = submitted && !this.state.isValid;
    return (
      <div>
        <ScrollElement name={INTERVIEW_RESULT} />
        <InputTitle
          text="面試結果"
          must
        />
        <div
          className={isWarning ? styles.warning : ''}
        >
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
                  placeholder="輸入面試結果..."
                  onChange={e => onChange(e.target.value)}
                />
              </section> :
              null
          }
        </div>
        {
          isWarning ?
            <p
              className={cn(styles.warning__wording, 'pS')}
              style={{
                marginTop: '8px',
              }}
            >
              需填寫面試結果
            </p>
            : null
        }
      </div>
    );
  }
}

InterviewResult.propTypes = {
  interviewResult: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  onChange: PropTypes.func,
  validator: PropTypes.func,
  submitted: PropTypes.bool,
  changeValidationStatus: PropTypes.func,
};

export default InterviewResult;
