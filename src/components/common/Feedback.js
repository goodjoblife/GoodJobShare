import React from 'react';
import PropTypes from 'prop-types';

import { P, Heading } from 'common/base';
import Warning from 'common/icons/Warning';
import Button from 'common/button/Button';

import styles from './Feedback.module.css';

const Feedback = ({ buttonClick, heading, info, buttonText, Icon }) => (
  <div style={{ textAlign: 'center' }}>
    <Icon className={styles.icon} />
    <Heading size="l" marginBottomS center>
      {heading}
    </Heading>
    <P size="l">{info}</P>
    <div className={styles.button}>
      <Button btnStyle="black" circleSize="md" onClick={buttonClick}>
        {buttonText}
      </Button>
    </div>
  </div>
);

Feedback.propTypes = {
  Icon: PropTypes.func,
  buttonClick: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  info: PropTypes.string,
};
Feedback.defaultProps = {
  Icon: Warning,
};

export default Feedback;
