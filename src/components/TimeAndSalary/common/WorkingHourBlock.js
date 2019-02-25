import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Heading } from 'common/base';
import OvertimeBlock from './OvertimeBlock';
import WorkingHourTable from './WorkingHourTable';

import styles from './WorkingHourBlock.module.css';
import BasicPermissionBlock from '../../../containers/PermissionBlock/BasicPermissionBlockContainer';

class WorkingHourBlock extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    groupSortBy: PropTypes.string.isRequired,
    onClickHeader: PropTypes.func,
    isExpanded: PropTypes.bool,
    hideContent: PropTypes.bool.isRequired,
    hasOvertimeBlock: PropTypes.bool,
  };

  static defaultProps = {
    isExpanded: false,
    hasOvertimeBlock: true,
  };

  constructor(props) {
    super(props);
    this.state = {
      isExpanded: props.isExpanded,
    };
  }

  renderBlockContent = () => {
    const { data, hasOvertimeBlock, hideContent } = this.props;
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
        {hasOvertimeBlock && (
          <div className={styles.overtimeBlock}>
            <div className={styles.overtimeBlockInner}>
              <OvertimeBlock
                type="salary"
                heading="加班有無加班費"
                data={data}
              />
              <OvertimeBlock type="dayoff" heading="加班有無補休" data={data} />
            </div>
            <div className={styles.overtimeBlockUnit}>單位：資料筆數</div>
          </div>
        )}{' '}
        <WorkingHourTable data={data.time_and_salary} />
      </div>
    );
  };

  render() {
    const { data, groupSortBy, onClickHeader } = this.props;
    const { average, company } = data;
    const avgVal = average[groupSortBy];
    const avgUnit = groupSortBy === 'week_work_time' ? '小時' : '元';
    return (
      <section className={styles.container}>
        <button className={styles.toggleButton} onClick={onClickHeader}>
          <div
            className={cn(styles.headingWrapper, {
              [styles.expanded]: this.state.isExpanded,
            })}
          >
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

        <div
          className={cn(styles.content, {
            [styles.expanded]: this.state.isExpanded,
          })}
        >
          {this.state.isExpanded ? this.renderBlockContent() : null}
        </div>
      </section>
    );
  }
}

export default WorkingHourBlock;
