import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Heading } from 'common/base';
import OvertimeBlock from '../TimeAndSalary/common/OvertimeBlock';
import WorkingHourTable from './WorkingHourTable';

import styles from '../TimeAndSalary/common/WorkingHourBlock.module.css';

class WorkingHourBlock extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    hideContent: PropTypes.bool.isRequired,
  };

  renderBlockContent = () => {
    const { data, hideContent } = this.props;
    return (
      <div>
        <div className={styles.overtimeBlock}>
          <div className={styles.overtimeBlockInner}>
            <OvertimeBlock
              type="salary"
              heading="加班有無加班費"
              statistics={data.salary_work_time_statistics}
            />
            <OvertimeBlock
              type="dayoff"
              heading="加班有無補休"
              statistics={data.salary_work_time_statistics}
            />
          </div>
          <div className={styles.overtimeBlockUnit}>單位：資料筆數</div>
        </div>
        <WorkingHourTable
          data={data.salary_work_times}
          hideContent={hideContent}
        />
      </div>
    );
  };

  render() {
    const { data } = this.props;
    const { name } = data;
    return (
      <section className={styles.container}>
        <div>
          <div className={cn(styles.headingWrapper, styles.expanded)}>
            <Heading size="sl" className={styles.headingBlock}>
              {name}
            </Heading>
          </div>
        </div>

        <div className={cn(styles.content, styles.expanded)}>
          {this.renderBlockContent()}
        </div>
      </section>
    );
  }
}

export default WorkingHourBlock;
