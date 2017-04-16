import React, { PropTypes } from 'react';

import styles from './Preview.module.css';

class Preview extends React.Component {
  static propTypes = {
    children: PropTypes.node,
  }

  // static defaultProps = {
  //   closeIn: 3000,
  // }

  constructor() {
    super();
    this.state = {
      isExpanded: false,
    };
  }

  render() {
    const cnMore = this.state.isExpanded
      ? `${styles.more} ${styles.expanded}`
      : `${styles.more}`;
    return (
      <button
        className={styles.preview} onClick={() => {
          this.setState({
            isExpanded: !this.state.isExpanded,
          });
        }}
      >
        <div className={styles.heading}>
          {this.props.children}
        </div>
        <div className={cnMore} />
      </button>
    );
  }
}

export default Preview;
