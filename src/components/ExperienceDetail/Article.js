import React, { PropTypes } from 'react';
import styles from './Article.module.css';
import InfoBlock from './InfoBlock';
import SectionBlock from './SectionBlock';
import QABlock from './QABlock';

const Article = ({ experience }) => (
  <div className={styles.container}>
    <aside className={styles.aside}>
      {experience.type === 'interview' && (
      <ul>
        <InfoBlock label="面試地區">
          {experience.region}
        </InfoBlock>
        <InfoBlock label="應徵職稱">
          {experience.job_title}
        </InfoBlock>
        {
          experience.experience_in_year &&
          <InfoBlock label="相關職務工作經驗">
            {experience.experience_in_year} 年
          </InfoBlock>
        }
        {
          experience.education &&
          <InfoBlock label="最高學歷">
            {experience.education}
          </InfoBlock>
        }
        {
          experience.interview_time &&
          <InfoBlock label="面試時間">
            {`${experience.interview_time.year} 年 ${experience.interview_time.month} 月`}
          </InfoBlock>
        }
        <InfoBlock label="面試結果">
          {experience.interview_result}
        </InfoBlock>
        {
          experience.salary &&
          <InfoBlock label="待遇">
            {`${experience.salary.amount} / ${Article.getTimeUnit(experience.salary.type)}`}
          </InfoBlock>
        }
        <InfoBlock label="面試整體滿意度">
          {experience.overall_rating}
        </InfoBlock>
        <InfoBlock label="有以下特殊問題">
          <ul>
            {experience.interview_sensitive_questions && (
              experience.interview_sensitive_questions.map((o, idx) => (
                <li key={idx}>{o.question}</li>
              ))
            )}
          </ul>
        </InfoBlock>
      </ul>
      )}

      {experience.type === 'work' && (
      <ul>
        <InfoBlock label="工作地區">
          {experience.region}
        </InfoBlock>
        <InfoBlock label="應徵職稱">
          {experience.job_title}
        </InfoBlock>
        {
          experience.experience_in_year &&
          <InfoBlock label="相關職務工作經驗">
            {experience.experience_in_year} 年
          </InfoBlock>
        }
        {
          experience.education &&
          <InfoBlock label="最高學歷">
            {experience.education}
          </InfoBlock>
        }
        {
          experience.week_work_time &&
          <InfoBlock label="一週工時">
            {experience.week_work_time}
          </InfoBlock>
        }
        {
          experience.salary &&
          <InfoBlock label="待遇">
            {`${experience.salary.amount} / ${Article.getTimeUnit(experience.salary.type)}`}
          </InfoBlock>
        }
        {
          experience.recommend_to_others &&
          <InfoBlock label="是否推薦此工作">
            {experience.recommend_to_others === 'yes' ? '是' : '否'}
          </InfoBlock>
        }
      </ul>
      )}
    </aside>
    <div className={styles.main}>
      <h2 className="headingMBold">{experience.title}</h2>
      <br />
      {experience.sections && (
        experience.sections.map((o, idx) => (
          <SectionBlock key={idx} section={o} />
        ))
      )}

      {(experience.type === 'interview' && experience.interview_qas
        && experience.interview_qas.length) ?
        (
          <div>
            <h3 className="pLBold">面試問答</h3>
            {experience.interview_qas.map((o, idx) => (
              <QABlock key={idx} qa={o} />
            ))}
          </div>
        ) :
        null
      }
    </div>
  </div>
);

Article.propTypes = {
  experience: PropTypes.object.isRequired,
};

Article.getTimeUnit = type => {
  switch (type) {
    case 'year':
      return '年';
    case 'month':
      return '月';
    case 'day':
      return '日';
    case 'hour':
      return '小時';
    default:
      return '月';
  }
};

export default Article;
