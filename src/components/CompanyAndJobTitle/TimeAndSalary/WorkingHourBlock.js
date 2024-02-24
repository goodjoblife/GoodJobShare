import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import OvertimeBlock from '../../TimeAndSalary/common/OvertimeBlock';
import WorkingHourTable from './WorkingHourTable';

import styles from '../../TimeAndSalary/common/WorkingHourBlock.module.css';

const WorkingHourBlock = ({ data, hideContent, statistics, pageType }) => {
  return (
    <section className={styles.container}>
      <div className={cn(styles.content, styles.expanded)}>
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
    </section>
  );
};

WorkingHourBlock.propTypes = {
  data: PropTypes.array,
  statistics: PropTypes.object,
  pageType: PropTypes.string,
  pageName: PropTypes.string,
  hideContent: PropTypes.bool.isRequired,
};

export default WorkingHourBlock;
