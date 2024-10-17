import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import WorkingHourTable from './WorkingHourTable';

import styles from '../../TimeAndSalary/common/WorkingHourBlock.module.css';

const WorkingHourBlock = ({ data, pageType }) => {
  return (
    <section className={styles.container}>
      <div className={cn(styles.content, styles.expanded)}>
        <WorkingHourTable data={data} pageType={pageType} />
      </div>
    </section>
  );
};

WorkingHourBlock.propTypes = {
  data: PropTypes.array,
  pageType: PropTypes.string,
};

export default WorkingHourBlock;
