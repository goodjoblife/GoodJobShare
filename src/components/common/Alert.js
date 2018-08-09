import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './Alert.module.css';
import Close from '../images/x.svg';

class Alert extends Component {
  static propTypes = {
    children: PropTypes.node,
    closeIn: PropTypes.number,
  };

  static defaultProps = {
    closeIn: 3000,
  };

  constructor() {
    super();
    this.close = this.close.bind(this);
    this.state = {
      isHidden: true,
    };
  }

  show() {
    this.setState(
      {
        isHidden: false,
      },
      () => {
        const closeIn = this.props.closeIn;
        if (!isNaN(closeIn) && closeIn > 0) {
          setTimeout(() => {
            this.setState({
              isHidden: true,
            });
          }, this.props.closeIn);
        }
      }
    );
  }

  close() {
    this.setState({
      isHidden: true,
    });
  }

  render() {
    const { isHidden } = this.state;
    const cnShow = isHidden ? '' : ` ${styles.show}`;

    return (
      <div className={`${styles.alert}${cnShow}`}>
        <div className={styles.closeButton}>
          <Close onClick={this.close} />
        </div>
        <div className={styles.desc}>{this.props.children}</div>
      </div>
    );
  }
}

export default Alert;
