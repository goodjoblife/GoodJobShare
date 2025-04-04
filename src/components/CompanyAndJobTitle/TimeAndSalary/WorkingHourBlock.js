import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import WorkingHourTable from './WorkingHourTable';

import styles from '../../TimeAndSalary/common/WorkingHourBlock.module.css';

const WorkingHourBlock = ({ data, pageType, onCloseReport }) => {
  return (
    <section className={styles.container}>
      <div className={cn(styles.content, styles.expanded)}>
        <WorkingHourTable
          data={data}
          pageType={pageType}
          onCloseReport={onCloseReport}
        />
      </div>
    </section>
  );
};

WorkingHourBlock.propTypes = {
  data: PropTypes.array,
  onCloseReport: PropTypes.func.isRequired,
  pageType: PropTypes.string,
};

export default WorkingHourBlock;
