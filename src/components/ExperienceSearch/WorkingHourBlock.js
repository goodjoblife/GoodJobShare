import React, { PropTypes } from 'react';

import Block from '../common/Block';
import styles from './WorkingHourBlock.module.css';

class WorkingHourBlock extends React.Component {
  static propTypes = {
    children: PropTypes.node,
  }

  constructor() {
    super();
    this.state = {
      isExpanded: false,
    };
  }

  render() {
    let cnHeading;
    let cnMore;
    let cnContent;

    if (this.state.isExpanded) {
      cnHeading = `${styles.heading} ${styles.expanded}`;
      cnMore = `${styles.more} ${styles.expanded}`;
      cnContent = `${styles.content} ${styles.expanded}`;
    } else {
      cnHeading = `${styles.heading}`;
      cnMore = styles.more;
      cnContent = styles.content;
    }

    return (
      <Block>
        <button
          className={styles.preview} onClick={() => {
            this.setState({
              isExpanded: !this.state.isExpanded,
            });
          }}
        >
          <div className={cnHeading}>
            {/* this.props.children */}
            <div className="subheadingL">日月光半導體製造股份有限公司</div>
            <div>
              <span className={`pS ${styles.hoursPerWeek}`}>平均一週總工時: </span>
              <span className="pL">50.0 小時</span>
            </div>
          </div>
          <div className={cnMore} />
        </button>

        <div className={cnContent}>
          this is content
        </div>
      </Block>
    );
  }
}

export default WorkingHourBlock;
