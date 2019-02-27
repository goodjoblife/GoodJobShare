import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Heading } from 'common/base';

import styles from '../common/WorkingHourBlock.module.css';

class WorkingHourBlock extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    groupSortBy: PropTypes.string.isRequired,
    onClickHeader: PropTypes.func,
  };

  render() {
    const { data, groupSortBy, onClickHeader } = this.props;
    const { average, company } = data;
    const avgVal = average[groupSortBy];
    const avgUnit = groupSortBy === 'week_work_time' ? '小時' : '元';
    return (
      <section className={styles.container}>
        <button className={styles.toggleButton} onClick={onClickHeader}>
          <div className={styles.headingWrapper}>
            <Heading size="sl" className={styles.headingBlock}>
              {company.name}
            </Heading>
            <div className={styles.averageBlock}>
              <span className={styles.averageBlockHeading}>
                平均一週總工時：
              </span>
              <span className={styles.averageBlockValue}>
                {avgVal ? avgVal.toFixed(1) : '-'} {avgUnit}
              </span>
            </div>
          </div>
        </button>
      </section>
    );
  }
}

export default WorkingHourBlock;
