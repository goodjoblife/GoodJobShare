import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { formatSalaryType } from 'common/formatter';
import { Good, Bad } from 'common/icons';
import styles from './Article.module.css';
import InfoBlock from './InfoBlock';
import RateButtons from './RateButtons';

const InterviewInfoBlocks = ({ experience }) => (
  <Fragment>
    <InfoBlock label="面試地區">{experience.region}</InfoBlock>
    <InfoBlock label="應徵職稱">{experience.job_title}</InfoBlock>
    {experience.experience_in_year && (
      <InfoBlock label="相關職務工作經驗">
        {experience.experience_in_year} 年
      </InfoBlock>
    )}
    {experience.education && (
      <InfoBlock label="最高學歷">{experience.education}</InfoBlock>
    )}
    {experience.interview_time && (
      <InfoBlock label="面試時間">
        {`${experience.interview_time.year} 年 ${
          experience.interview_time.month
        } 月`}
      </InfoBlock>
    )}
    <InfoBlock label="面試結果">{experience.interview_result}</InfoBlock>
    {experience.salary && (
      <InfoBlock label="待遇">
        {`${experience.salary.amount} / ${formatSalaryType(
          experience.salary.type,
        )}`}
      </InfoBlock>
    )}
    <InfoBlock label="整體面試滿意度">
      <RateButtons rate={experience.overall_rating} />
    </InfoBlock>
    {experience.interview_sensitive_questions &&
    experience.interview_sensitive_questions.length ? (
      <InfoBlock label="有以下特殊問題">
        <ul>
          {experience.interview_sensitive_questions.map((o, idx) => (
            <li key={idx}>{o}</li>
          ))}
        </ul>
      </InfoBlock>
    ) : null}
  </Fragment>
);

InterviewInfoBlocks.propTypes = {
  experience: PropTypes.object.isRequired,
};

const WorkInfoBlocks = ({ experience }) => (
  <Fragment>
    <InfoBlock label="工作地區">{experience.region}</InfoBlock>
    <InfoBlock label="職稱">{experience.job_title}</InfoBlock>
    {experience.experience_in_year && (
      <InfoBlock label="自身相關職務工作經驗">
        {experience.experience_in_year} 年
      </InfoBlock>
    )}
    {experience.education && (
      <InfoBlock label="最高學歷">{experience.education}</InfoBlock>
    )}
    {experience.week_work_time && (
      <InfoBlock label="一週工時">{experience.week_work_time}</InfoBlock>
    )}
    {experience.salary && (
      <InfoBlock label="待遇">
        {`${experience.salary.amount} / ${formatSalaryType(
          experience.salary.type,
        )}`}
      </InfoBlock>
    )}
    {experience.recommend_to_others && (
      <InfoBlock label="是否推薦此工作">
        {experience.recommend_to_others === 'yes' ? (
          <div className={styles.recommendIcon}>
            <Good />推
          </div>
        ) : (
          <div className={styles.recommendIcon}>
            <Bad /> 不推
          </div>
        )}
      </InfoBlock>
    )}
  </Fragment>
);

WorkInfoBlocks.propTypes = {
  experience: PropTypes.object.isRequired,
};

const InternBlocks = ({ experience }) => (
  <Fragment>
    {experience.region && (
      <InfoBlock label="實習地區">{experience.region}</InfoBlock>
    )}
    {experience.job_title && (
      <InfoBlock label="職稱">{experience.job_title}</InfoBlock>
    )}
    {experience.education && (
      <InfoBlock label="最高學歷">{experience.education}</InfoBlock>
    )}
    {experience.starting_year && (
      <InfoBlock label="實習開始的年份">
        {experience.starting_year} 年
      </InfoBlock>
    )}
    {experience.period && (
      <InfoBlock label="實習長度">{experience.period} 月</InfoBlock>
    )}
    {experience.week_work_time && (
      <InfoBlock label="一週工時">{experience.week_work_time}</InfoBlock>
    )}
    {experience.salary && (
      <InfoBlock label="實習薪資">
        {`${experience.salary.amount} / ${formatSalaryType(
          experience.salary.type,
        )}`}
      </InfoBlock>
    )}
    {experience.overall_rating && (
      <InfoBlock label="實習整體滿意度">
        <RateButtons rate={experience.overall_rating} />
      </InfoBlock>
    )}
  </Fragment>
);

InternBlocks.propTypes = {
  experience: PropTypes.object.isRequired,
};

const Aside = ({ experience }) => {
  const { type } = experience;
  return (
    <aside className={styles.aside}>
      {type === 'interview' && (
        <ul className={styles.infoList}>
          <InterviewInfoBlocks experience={experience} />
        </ul>
      )}
      {type === 'work' && (
        <ul className={styles.infoList}>
          <WorkInfoBlocks experience={experience} />
        </ul>
      )}
      {type === 'intern' && (
        <ul className={styles.infoList}>
          <InternBlocks experience={experience} />
        </ul>
      )}
    </aside>
  );
};

Aside.propTypes = {
  experience: PropTypes.object.isRequired,
};

export default Aside;
