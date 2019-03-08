import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Heading } from 'common/base';
import WorkingHourTable from './WorkingHourTable';

import styles from '../common/WorkingHourBlock.module.css';
import BasicPermissionBlock from '../../../containers/PermissionBlock/BasicPermissionBlockContainer';

class WorkingHourBlock extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
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
        <WorkingHourTable data={data.salary_work_times} />
      </div>
    );
  };

  render() {
    const { data } = this.props;
    const { name } = data;
    return (
      <section className={styles.container}>
        <div className={styles.toggleButton}>
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
