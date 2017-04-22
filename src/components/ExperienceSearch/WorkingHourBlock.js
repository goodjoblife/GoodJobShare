import React, { PropTypes } from 'react';
import cn from 'classnames';

import Block from '../common/Block';
import OvertimeBlock from './OvertimeBlock';

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
    return (
      <Block>
        <button
          className={styles.preview} onClick={() => {
            this.setState({
              isExpanded: !this.state.isExpanded,
            });
          }}
        >
          <div
            className={cn(
              styles.heading,
              this.state.isExpanded ? styles.expanded : ''
            )}
          >
            {/* this.props.children */}
            <div className="subheadingL">日月光半導體製造股份有限公司</div>
            <div>
              <span className={`pS ${styles.hoursPerWeek}`}>平均一週總工時: </span>
              <span className="pL">50.0 小時</span>
            </div>
          </div>
          <div
            className={cn(
              styles.more,
              this.state.isExpanded ? styles.expanded : ''
            )}
          />
        </button>

        <div
          className={cn(
            styles.content,
            this.state.isExpanded ? styles.expanded : ''
          )}
        >
          <div className={styles.overtime}>
            <OvertimeBlock heading="加班有無加班費" />
            <OvertimeBlock noData heading="加班有無補休" />
          </div>
          <div className={`pS ${styles.unit}`}>單位：資料筆數</div>
        </div>
      </Block>
    );
  }
}

export default WorkingHourBlock;
