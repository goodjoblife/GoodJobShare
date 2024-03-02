import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import WorkingHourTable from './WorkingHourTable';

import styles from '../../TimeAndSalary/common/WorkingHourBlock.module.css';

const WorkingHourBlock = ({ data, hideContent, pageType }) => {
  return (
    <section className={styles.container}>
      <div className={cn(styles.content, styles.expanded)}>
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
  pageType: PropTypes.string,
  pageName: PropTypes.string,
  hideContent: PropTypes.bool.isRequired,
};

export default WorkingHourBlock;
