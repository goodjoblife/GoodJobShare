import React, { PropTypes } from 'react';
import cn from 'classnames';
import { Element as ScrollElement } from 'react-scroll';

import RateButton from 'common/button/RateButton';

import InputTitle from '../../common/InputTitle';
import styles from './OverallRating.module.css';


import {
  overallRatingDialogMap,
} from '../../common/optionMap';

import { VALID, INVALID, OVERALL_RATING } from '../../../../constants/formElements';

const handleRatingDialog = rating => (
  overallRatingDialogMap[rating] || '點擊作評分'
);

class OverallRating extends React.Component {
  constructor(props) {
    super(props);
    const isValid = props.validator(props.overallRating);
    props.changeValidationStatus(OVERALL_RATING, isValid ? VALID : INVALID);
    this.state = {
      isValid,
    };
  }

  componentWillReceiveProps(nextProps) {
    const isValid = this.props.validator(nextProps.overallRating);
    if (isValid !== this.state.isValid) {
      this.setState({ isValid });
      this.props.changeValidationStatus(OVERALL_RATING, isValid ? VALID : INVALID);
    }
  }

  render() {
    const { overallRating, onChange, submitted } = this.props;
    const isWarning = submitted && !this.state.isValid;
    return (
      <div>
        <ScrollElement name={OVERALL_RATING} />
        <div
          style={{
            marginBottom: '20px',
          }}
        >
          <InputTitle
            text="整體面試滿意程度"
            must
          />
        </div>
        <div
          className={isWarning ? styles.warning : ''}
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <RateButton
            max={5}
            rating={overallRating}
            onChange={onChange}
          />
          <div
            className={styles.dialog}
          >
            <p
              className="pS"
            >
              {handleRatingDialog(overallRating)}
            </p>
          </div>
        </div>
        {
          isWarning ?
            <p
              className={cn(styles.warning__wording, 'pS')}
              style={{
                marginTop: '8px',
              }}
            >
              需選取面試滿意程度
            </p>
            : null
        }
      </div>
    );
  }
}

OverallRating.propTypes = {
  overallRating: PropTypes.number,
  onChange: PropTypes.func,
  validator: PropTypes.func,
  submitted: PropTypes.bool,
  changeValidationStatus: PropTypes.func,
};

export default OverallRating;

