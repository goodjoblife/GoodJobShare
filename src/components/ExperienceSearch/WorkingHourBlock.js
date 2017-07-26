import React, { Component, PropTypes } from 'react';
import cn from 'classnames';
import { Plus, Minus } from 'common/icons';
import { Heading } from 'common/base';
import OvertimeBlock from './OvertimeBlock';
import WorkingHourTable from './WorkingHourTable';

import styles from './WorkingHourBlock.module.css';
import containerStyle from './ExperienceBlock.module.css';

class WorkingHourBlock extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
  }

  constructor() {
    super();
    this.state = {
      isExpanded: false,
    };
  }

  render() {
    const { data } = this.props;
    const { average, company } = data;

    return (
      <section className={containerStyle.container}>
        <button
          className={styles.toggleButton} onClick={() => {
            this.setState({
              isExpanded: !this.state.isExpanded,
            });
          }}
        >
          <div
            className={cn(styles.headingWrapper, {
              [styles.expanded]: this.state.isExpanded,
            })}
          >
            <Heading size="sl" className={styles.headingBlock}>{company.name}</Heading>
            <div className={styles.averageBlock}>
              <span className={styles.averageBlockHeading}>平均一週總工時：</span>
              <span className={styles.averageBlockValue}>{average.week_work_time.toFixed(1)} 小時</span>
            </div>
          </div>
          <div className={styles.expandIcon}>
            { this.state.isExpanded ? <Minus /> : <Plus /> }
          </div>
        </button>

        <div
          className={cn(styles.content, {
            [styles.expanded]: this.state.isExpanded,
          })}
        >

          <div className={styles.overtimeBlock}>
            <div className={styles.overtimeBlockInner}>
              <OvertimeBlock
                type="salary"
                heading="加班有無加班費"
                data={data}
              />
              <OvertimeBlock
                type="dayoff"
                heading="加班有無補休"
                data={data}
              />
            </div>
            <div className={styles.overtimeBlockUnit}>單位：資料筆數</div>
          </div>

          <WorkingHourTable data={data.time_and_salary} />
        </div>
      </section>
    );
  }
}

export default WorkingHourBlock;
