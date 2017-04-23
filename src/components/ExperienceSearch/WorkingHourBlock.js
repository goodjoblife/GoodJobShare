import React, { Component, PropTypes } from 'react';
import cn from 'classnames';

import Block from '../common/Block';
import OvertimeBlock from './OvertimeBlock';
import WorkingHourTable from './WorkingHourTable';

import styles from './WorkingHourBlock.module.css';

class WorkingHourBlock extends Component {
  static propTypes = {
    children: PropTypes.node,
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
    const mock = [{
      company: {
        id: '97176270',
        name: '台灣大哥大股份有限公司',
      },
      created_at: '2017-04-20T15:38:39.321Z',
      data_time: {
        year: 2017,
        month: 3,
      },
      estimated_hourly_wage: 389.00414937759336,
      job_title: '資深工程師',
      overtime_frequency: 0,
      salary: {
        type: 'year',
        amount: 750000,
      },
      sector: '電子服務技術處',
      week_work_time: 40,
      _id: '58f8d5ffd5435b00049e4a18',
    }, {
      company: {
        id: '17176270',
        name: '測試有限公司',
      },
      created_at: '2017-04-20T15:38:39.321Z',
      data_time: {
        year: 2017,
        month: 11,
      },
      estimated_hourly_wage: 201.999,
      job_title: '資深工程師',
      overtime_frequency: 1,
      salary: {
        type: 'month',
        amount: 59000,
      },
      sector: '電子服務技術處',
      week_work_time: 80,
      _id: '18f8d5ffd5435b00049e4a18',
    }];

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
            {/* this.props.children */}
            <div className="subheadingL">日月光半導體製造股份有限公司</div>
            <div>
              <span className={`pS ${styles.hoursPerWeek}`}>平均一週總工時: </span>
              <span className="pL">50.0 小時</span>
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
            <OvertimeBlock heading="加班有無加班費" />
            <OvertimeBlock noData heading="加班有無補休" />
          </div>
          <div className={`pS ${styles.unit}`}>單位：資料筆數</div>

          <WorkingHourTable data={mock} />
        </div>
      </Block>
    );
  }
}

export default WorkingHourBlock;
