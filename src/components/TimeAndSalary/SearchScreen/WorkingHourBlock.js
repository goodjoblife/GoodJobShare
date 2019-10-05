import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Heading } from 'common/base';
import { Link } from 'react-router-dom';

import styles from './WorkingHourBlock.module.css';
import {
  pageTypeTranslation,
  pageType,
} from '../../../constants/companyJobTitle';

class WorkingHourBlock extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    to: PropTypes.string.isRequired,
  };

  render() {
    const { data, to } = this.props;
    const { name } = data;
    return (
      <section className={styles.container}>
        <Link className={styles.linkBlock} to={to}>
          <div className={styles.headingWrapper}>
            <div className={styles.pageTypeBlock}>
              <span className={styles.pageTypeBadge}>
                {/* TODO: page type of data */}
                {pageTypeTranslation[pageType.COMPANY]}
              </span>
            </div>
            <Heading size="sm" className={styles.headingBlock}>
              {name}
            </Heading>
            <div className={styles.averageBlock}>
              <span className={styles.averageBlockValue}>
                {data.salary_work_time_statistics.count} 筆資訊
              </span>
            </div>
          </div>
        </Link>
      </section>
    );
  }
}

export default WorkingHourBlock;
