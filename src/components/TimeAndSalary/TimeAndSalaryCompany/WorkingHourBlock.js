import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Heading } from 'common/base';
import OvertimeBlock from '../common/OvertimeBlock';
import WorkingHourTable from './WorkingHourTable';

import styles from '../common/WorkingHourBlock.module.css';
import BasicPermissionBlock from '../../../containers/PermissionBlock/BasicPermissionBlockContainer';

class WorkingHourBlock extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    groupSortBy: PropTypes.string.isRequired,
    hideContent: PropTypes.bool.isRequired,
  };

  renderBlockContent = () => {
    const { data, hideContent } = this.props;
    if (hideContent) {
      return (
        <div className={styles.overtimeBlock}>
          <div className={styles.overtimeBlockInner}>
            <BasicPermissionBlock
              rootClassName={styles.permissionBlockWorkingHour}
            />
          </div>
        </div>
      );
    }
    return (
      <div>
        <div className={styles.overtimeBlock}>
          <div className={styles.overtimeBlockInner}>
            <OvertimeBlock type="salary" heading="加班有無加班費" data={data} />
            <OvertimeBlock type="dayoff" heading="加班有無補休" data={data} />
          </div>
          <div className={styles.overtimeBlockUnit}>單位：資料筆數</div>
        </div>
        <WorkingHourTable data={data.time_and_salary} />
      </div>
    );
  };

  render() {
    const { data, groupSortBy } = this.props;
    const { average, company } = data;
    const avgVal = average[groupSortBy];
    const avgUnit = groupSortBy === 'week_work_time' ? '小時' : '元';
    return (
      <section className={styles.container}>
        <div className={styles.toggleButton}>
          <div className={cn(styles.headingWrapper, styles.expanded)}>
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
        </div>

        <div className={cn(styles.content, styles.expanded)}>
          {this.renderBlockContent()}
        </div>
      </section>
    );
  }
}

export default WorkingHourBlock;
