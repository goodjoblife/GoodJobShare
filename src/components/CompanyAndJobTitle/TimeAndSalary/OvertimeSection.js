import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import OvertimeBlock from '../../TimeAndSalary/common/OvertimeBlock';

import styles from '../../TimeAndSalary/common/WorkingHourBlock.module.css';

const OvertimeSection = ({ statistics }) => {
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
      </div>
    </section>
  );
};

OvertimeSection.propTypes = {
  statistics: PropTypes.object.isRequired,
};

export default OvertimeSection;
