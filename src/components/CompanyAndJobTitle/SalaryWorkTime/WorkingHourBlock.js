import cn from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './WorkingHourBlock.module.css';
import WorkingHourTable from './WorkingHourTable';

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
