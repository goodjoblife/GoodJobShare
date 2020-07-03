import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faLock from '@fortawesome/fontawesome-free-solid/faLock';
import { formatSalary, formatSalaryRange } from 'common/formatter';
import { Good, Bad } from 'common/icons';
import styles from './Article.module.css';
import InfoBlock from './InfoBlock';
import RateButtons from './RateButtons';

const formatDate = date => `${date.getFullYear()} 年 ${date.getMonth()} 月`;
const formatExperienceInYear = year => {
  if (Number.isInteger(year)) {
    if (year === 0) {
      return '不到 1 年';
    } else {
      return `${year} 年`;
    }
  } else {
    return null;
  }
};

const InterviewInfoBlocks = ({ experience, hideContent }) => {
  const expInYearText = formatExperienceInYear(experience.experience_in_year);
  return (
    <Fragment>
      <div className={styles.date}>
        {formatDate(new Date(experience.created_at))}
      </div>
      <InfoBlock label="面試地區">{experience.region}</InfoBlock>
      <InfoBlock label="應徵職稱">{experience.job_title.name}</InfoBlock>
      {expInYearText !== null ? (
        <InfoBlock label="相關職務工作經驗">{expInYearText}</InfoBlock>
      ) : null}
      {experience.education && (
        <InfoBlock label="最高學歷">{experience.education}</InfoBlock>
      )}
      {experience.interview_time && (
        <InfoBlock label="面試時間">
          {`${experience.interview_time.year} 年 ${experience.interview_time.month} 月`}
        </InfoBlock>
      )}
      <InfoBlock label="面試結果">{experience.interview_result}</InfoBlock>
      {experience.salary && (
        <InfoBlock label="待遇">
          {hideContent ? (
            <React.Fragment>
              <FontAwesomeIcon icon={faLock} className={styles.lock} />
              {formatSalaryRange(experience.salary)}
            </React.Fragment>
          ) : (
            formatSalary(experience.salary)
          )}
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
};

InterviewInfoBlocks.propTypes = {
  experience: PropTypes.object.isRequired,
};

const WorkInfoBlocks = ({ experience, hideContent }) => {
  const expInYearText = formatExperienceInYear(experience.experience_in_year);
  return (
    <Fragment>
      <InfoBlock label="工作地區">{experience.region}</InfoBlock>
      <InfoBlock label="職稱">{experience.job_title.name}</InfoBlock>
      {expInYearText !== null && (
        <InfoBlock label="自身相關職務工作經驗">{expInYearText}</InfoBlock>
      )}
      {experience.education && (
        <InfoBlock label="最高學歷">{experience.education}</InfoBlock>
      )}
      {experience.week_work_time && (
        <InfoBlock label="一週工時">{experience.week_work_time}</InfoBlock>
      )}
      {experience.salary && (
        <InfoBlock label="待遇">
          {hideContent ? (
            <React.Fragment>
              <FontAwesomeIcon icon={faLock} className={styles.lock} />
              {formatSalaryRange(experience.salary)}
            </React.Fragment>
          ) : (
            formatSalary(experience.salary)
          )}
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
};

WorkInfoBlocks.propTypes = {
  experience: PropTypes.object.isRequired,
};

const InternBlocks = ({ experience, hideContent }) => (
  <Fragment>
    {experience.region && (
      <InfoBlock label="實習地區">{experience.region}</InfoBlock>
    )}
    {experience.job_title && (
      <InfoBlock label="職稱">{experience.job_title.name}</InfoBlock>
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
        {hideContent ? (
          <React.Fragment>
            <FontAwesomeIcon icon={faLock} className={styles.lock} />
            {formatSalaryRange(experience.salary)}
          </React.Fragment>
        ) : (
          formatSalary(experience.salary)
        )}
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

const Aside = ({ experience, hideContent }) => {
  const { type } = experience;
  return (
    <div className={styles.info}>
      {type === 'interview' && (
        <ul>
          <InterviewInfoBlocks
            experience={experience}
            hideContent={hideContent}
          />
        </ul>
      )}
      {type === 'work' && (
        <ul>
          <WorkInfoBlocks experience={experience} hideContent={hideContent} />
        </ul>
      )}
      {type === 'intern' && (
        <ul>
          <InternBlocks experience={experience} hideContent={hideContent} />
        </ul>
      )}
    </div>
  );
};

Aside.propTypes = {
  experience: PropTypes.object.isRequired,
};

export default Aside;
