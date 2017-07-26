import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import cn from 'classnames';

import { Heading, P } from 'common/base';
import i from 'common/icons';
import ThumbsUp from 'common/reaction/ThumbsUp';
import Comment from 'common/reaction/Comment';
import { formatWithCommas } from '../../utils/numberUtil';
import styles from './ExperienceBlock.module.css';

const Label = ({ Icon, text, className }) => (
  <div className={cn(styles.label, className)}>
    <Icon />
    <P Tag="span" size="m" bold>{text}</P>
  </div>
);
Label.propTypes = {
  Icon: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
};

const ExperienceBlock = ({ data, size }) => {
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
    <Link to={`/experiences/${data._id}`} className={cn(styles.container, styles[size])}>
      <section className={styles.contentWrapper}>
        <P size="s">
          {`${expType}${splitter}${year} 年 ${month} 月`}
        </P>

        <Heading
          Tag="h2"
          size={size === 'l' ? 'sl' : 'sm'}
          className={styles.heading}
        >
          {data.title}
        </Heading>

        <div className={styles.labels}>
          <Label text={data.company.name} Icon={i.Company} className={styles.company} />
          <Label text={data.job_title} Icon={i.User} className={styles.position} />
          <Label text={data.region} Icon={i.Location} className={styles.location} />
          {salary && <Label text={`${salaryAmount} / ${salaryType}`} Icon={i.Coin} className={styles.salary} />}
        </div>

        <P size="m">
          {data.preview} ... ... <span className={styles.more}>閱讀更多</span>
        </P>
      </section>
      <div className={styles.reaction}>
        <ThumbsUp count={data.like_count} />
        <Comment count={data.reply_count} />
      </div>
    </Link>
  );
};
ExperienceBlock.propTypes = {
  data: PropTypes.object.isRequired,
  size: PropTypes.oneOf(['s', 'm', 'l']),
};
ExperienceBlock.defaultProps = {
  size: 'm',
};

export default ExperienceBlock;
