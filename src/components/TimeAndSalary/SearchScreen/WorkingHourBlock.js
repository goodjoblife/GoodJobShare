import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Heading } from 'common/base';

import styles from '../common/WorkingHourBlock.module.css';

class WorkingHourBlock extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    onClickHeader: PropTypes.func,
  };

  render() {
    const { data, onClickHeader } = this.props;
    const { name } = data;
    return (
      <section className={styles.container}>
        <button className={styles.toggleButton} onClick={onClickHeader}>
          <div className={styles.headingWrapper}>
            <Heading size="sl" className={styles.headingBlock}>
              {name}
            </Heading>
            <div className={styles.averageBlock}>
              <span className={styles.averageBlockHeading}>資料數：</span>
              <span className={styles.averageBlockValue}>
                {data.salary_work_time_statistics.count} 筆
              </span>
            </div>
          </div>
        </button>
      </section>
    );
  }
}

export default WorkingHourBlock;
