import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import { Heading, P } from 'common/base';
import i from 'common/icons';
import ThumbsUp from 'common/reaction/ThumbsUp';
import Comment from 'common/reaction/Comment';
import { formatWithCommas } from '../../utils/numberUtil';
import styles from './ExperienceBlock.module.css';

const Label = ({ Icon, text }) => (
  <div className={styles.label}>
    <Icon />
    <P Tag="span" size="m" bold>{text}</P>
  </div>
);
Label.propTypes = {
  Icon: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

class ExperienceBlock extends Component {
  static propTypes = {
    to: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired,
  }

  render() {
    const { data, to } = this.props;
    const expType = data.type === 'interview' ? '面試' : '工作';
    const date = new Date(Date.parse(data.created_at));
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const { salary } = data;
    const splitter = ' ・ ';
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
      <Link to={to} className={styles.container}>
        <section>
          <P size="s">
            {`${expType}${splitter}${year} 年 ${month} 月`}
          </P>

          <Heading Tag="h2" size="sl" bold className={styles.heading}>
            {data.title}
          </Heading>

          <div className={styles.labels}>
            <Label text={data.company.name} Icon={i.Company} />
            <Label text={data.job_title} Icon={i.User} />
            <Label text={data.region} Icon={i.Location} />
            {salary && <Label text={`${salaryAmount} / ${salaryType}`} Icon={i.Coin} />}
          </div>

          <P size="m" className={styles.content}>
            {data.preview} ... ... <span className={styles.more}>閱讀更多</span>
          </P>

          <div className={styles.reaction}>
            <ThumbsUp count={data.like_count} />
            <Comment count={data.reply_count} />
          </div>
        </section>
      </Link>
    );
  }
}

export default ExperienceBlock;
