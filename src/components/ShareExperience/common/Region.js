import React, { PropTypes } from 'react';
import { Element as ScrollElement } from 'react-scroll';

import Select from 'common/form/Select';
import InputTitle from './InputTitle';

import styles from './Region.module.css';

import {
  regionOptions,
} from './optionMap';

import { VALID, INVALID, REGION } from '../../../constants/formElements';

class Region extends React.Component {
  constructor(props) {
    super(props);
    const isValid = props.validator(props.region);
    props.changeValidationStatus(REGION, isValid ? VALID : INVALID);
    this.state = {
      isValid,
    };
  }

  componentWillReceiveProps(nextProps) {
    const isValid = this.props.validator(nextProps.region);
    if (isValid !== this.state.isValid) {
      this.setState({ isValid });
      const status = isValid ? VALID : INVALID;
      this.props.changeValidationStatus(REGION, status);
    }
  }

  render() {
    const { region, onChange, submitted } = this.props;
    const isWarning = submitted && !this.state.isValid;
    return (
      <div>
        <ScrollElement name={REGION} />
        <InputTitle
          text="面試地區"
          must
        />
        <div
          className={isWarning ? styles.warning : null}
          style={{
            width: '320px',
            position: 'relative',
          }}
        >
          <Select
            options={regionOptions}
            value={region}
            onChange={
              e => onChange(e.target.value)
            }
          />
          {
            isWarning ?
              <div
                style={{
                  position: 'absolute',
                  bottom: '0',
                  transform: 'translateY(150%)',
                }}
              >
                <p
                  className={`pS ${styles.warning__wording}`}
                >
                  需填寫面試地區
              </p>
              </div>
              : null
          }
        </div>
      </div>
    );
  }
}

Region.propTypes = {
  region: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  onChange: PropTypes.func,
  validator: PropTypes.func,
  // eslint-disable-next-line react/no-unused-prop-types
  submitted: PropTypes.bool,
  changeValidationStatus: PropTypes.func,
};

Region.defaultProps = {
  validator: () => {},
};

export default Region;
