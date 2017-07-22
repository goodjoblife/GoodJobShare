import React, { Component, PropTypes } from 'react';
import cn from 'classnames';

import Block from '../common/Block';
import OvertimeBlock from './OvertimeBlock';
import WorkingHourTable from './WorkingHourTable';

import styles from './WorkingHourBlock.module.css';

class WorkingHourBlock extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
  }

  static hello = () => {
    console.log('hello');
    return <div>hello</div>;
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
      <Block>
        <button
          className={styles.preview} onClick={() => {
            this.setState({
              isExpanded: !this.state.isExpanded,
            });
          }}
        >
          <div
            className={cn(
              styles.heading,
              this.state.isExpanded ? styles.expanded : ''
            )}
          >
            <div className="subheadingL">{company.name}</div>
            <div>
              <span className={`pS ${styles.hoursPerWeek}`}>平均一週總工時：</span>
              <span className="pL">{average.week_work_time.toFixed(1)} 小時</span>
            </div>
          </div>
          <div
            className={cn(
              styles.more,
              this.state.isExpanded ? styles.expanded : ''
            )}
          />
        </button>

        <div
          className={cn(
            styles.content,
            this.state.isExpanded ? styles.expanded : ''
          )}
        >

          <div className={styles.overtime}>
            <div className={styles.overtimeBlockWrapper}>
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
            <div className={styles.unit}>單位：資料筆數</div>
          </div>

          <WorkingHourTable data={data.time_and_salary} />
        </div>
      </Block>
    );
  }
}

export default WorkingHourBlock;
