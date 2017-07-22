import React, { PropTypes } from 'react';
import { Element as ScrollElement } from 'react-scroll';

import TextInput from 'common/form/TextInput';

import InputTitle from './InputTitle';

import { VALID, INVALID, TITLE } from '../../../constants/formElements';

class Title extends React.Component {
  constructor(props) {
    super(props);
    const isValid = props.validator(props.title);
    props.changeValidationStatus(TITLE, isValid ? VALID : INVALID);
    this.state = {
      isValid,
    };
  }

  componentWillReceiveProps(nextProps) {
    const isValid = this.props.validator(nextProps.title);
    if (isValid !== this.state.isValid) {
      this.setState({ isValid });
      this.props.changeValidationStatus(TITLE, isValid ? VALID : INVALID);
    }
  }

  render() {
    const { title, onChange, placeholder, validator, submitted } = this.props;
    return (
      <div>
        <ScrollElement name={TITLE} />
        <InputTitle
          text="標題"
          must
        />
        <TextInput
          value={title}
          placeholder={placeholder}
          onChange={e => onChange(e.target.value)}
          isWarning={submitted && !validator(title)}
          warningWording="需輸入 1 ~ 25 字"
        />
      </div>
    );
  }
}

Title.propTypes = {
  title: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  validator: PropTypes.func,
  submitted: PropTypes.bool,
  changeValidationStatus: PropTypes.func,
};

export default Title;
