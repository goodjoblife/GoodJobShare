import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import OvertimeBlock from '../../TimeAndSalary/common/OvertimeBlock';
import WorkingHourTable from './WorkingHourTable';

import styles from '../../TimeAndSalary/common/WorkingHourBlock.module.css';

class WorkingHourBlock extends Component {
  static propTypes = {
    data: PropTypes.array,
    statistics: PropTypes.object,
    pageType: PropTypes.string,
    pageName: PropTypes.string,
    hideContent: PropTypes.bool.isRequired,
  };

  renderBlockContent = () => {
    const { data, hideContent, statistics, pageType } = this.props;
    return (
      <div>
        <div className={styles.overtimeBlock}>
          <div className={styles.overtimeBlockInner}>
            <OvertimeBlock
              type="salary"
              heading="加班有無加班費"
              statistics={statistics}
            />
            <OvertimeBlock
              type="dayoff"
              heading="加班有無補休"
              statistics={statistics}
            />
          </div>
          <div className={styles.overtimeBlockUnit}>單位：資料筆數</div>
        </div>
        <WorkingHourTable
          data={data}
          hideContent={hideContent}
          pageType={pageType}
        />
      </div>
    );
  };

  render() {
    return (
      <section className={styles.container}>
        <div className={cn(styles.content, styles.expanded)}>
          {this.renderBlockContent()}
        </div>
      </section>
    );
  }
}

export default WorkingHourBlock;
