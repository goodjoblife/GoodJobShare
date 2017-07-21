import React, { PropTypes } from 'react';
import { Element as ScrollElement } from 'react-scroll';

import TextInput from 'common/form/TextInput';

import InputTitle from './InputTitle';

import { VALID, INVALID, JOB_TITLE } from '../../../constants/formElements';

class JobTitle extends React.Component {
  constructor(props) {
    super(props);
    const isValid = props.validator(props.jobTitle);
    props.changeValidationStatus(JOB_TITLE, isValid ? VALID : INVALID);
    this.state = {
      isValid,
    };
  }

  componentWillReceiveProps(nextProps) {
    const isValid = this.props.validator(nextProps.jobTitle);
    if (isValid !== this.state.isValid) {
      this.setState({ isValid });
      const status = isValid ? VALID : INVALID;
      this.props.changeValidationStatus(JOB_TITLE, status);
    }
  }

  render() {
    const { inputTitle, jobTitle, onChange, submitted } = this.props;
    return (
      <div>
        <ScrollElement name={JOB_TITLE} />
        <InputTitle
          text={inputTitle}
          must
        />
        <TextInput
          placeholder="硬體工程師"
          value={jobTitle}
          onChange={e => onChange(e.target.value)}
          isWarning={submitted && !this.state.isValid}
          warningWording="需填寫職稱"
        />
      </div>
    );
  }
}

JobTitle.propTypes = {
  inputTitle: PropTypes.string,
  jobTitle: PropTypes.string,
  onChange: PropTypes.func,
  validator: PropTypes.func,
  submitted: PropTypes.bool,
  changeValidationStatus: PropTypes.func,
};

JobTitle.defaultProps = {
  validator: () => {},
};

export default JobTitle;
