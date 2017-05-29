import React, { Component, PropTypes } from 'react';

import Block from 'common/Block';
import ThumbsUp from 'common/reaction/ThumbsUp';
import Comment from 'common/reaction/Comment';
import { formatWithCommas } from '../../utils/numberUtil';

import styles from './ExperienceBlock.module.css';

class ExperienceBlock extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
  }

  render() {
    const { data } = this.props;
    const expType = data.type === 'interview' ? '面試' : '工作';
    const date = new Date(Date.parse(data.created_at));
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const { salary } = data;
    const splitter = '　•　';
    let salaryType;
    let salaryAmount;

    if (salary) {
      switch (salary.type) {
        case 'year':
          salaryType = '年';
          break;
        case 'month':
          salaryType = '月';
          break;
        case 'day':
          salaryType = '日';
          break;
        default: // 'hour':
          salaryType = '小時';
      }
      salaryAmount = formatWithCommas(salary.amount);
    }

    return (
      <Block>
        <div className={styles.container}>

          <div className={`pS ${styles.createdDate}`}>
            {`${expType}${splitter}${year} 年 ${month} 月`}
          </div>

          <div className={`headingMBold ${styles.heading}`}>
            {data.title}
          </div>

          <div className={`pSBold ${styles.label}`}>
            <div>{data.company.name}</div>
            <div>{data.job_title}</div>
            <div>{data.region}</div>
            {salary && <div>{`${salaryAmount} / ${salaryType}`}</div>}
          </div>

          <div className={`pM ${styles.content}`}>
            {data.preview} ... (閱讀更多)
          </div>

          <div className={styles.reaction}>
            <ThumbsUp count={data.like_count} />
            <Comment count={data.reply_count} />
          </div>

        </div>
      </Block>
    );
  }
}

export default ExperienceBlock;
