import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { formatSalaryType } from 'common/formatter';
import { Good, Bad, Glike } from 'common/icons';
import rateButtonStyles from 'common/button/RateButtonElement.module.css';
import styles from './Article.module.css';
import InfoBlock from './InfoBlock';
import { overallRatingDialogMap } from '../../ShareExperience/common/optionMap';

const InterviewInfoBlocks = ({ experience }) =>
  (
    <Fragment>
      <InfoBlock label="面試地區">
        {experience.region}
      </InfoBlock>
      <InfoBlock label="應徵職稱">
        {experience.job_title}
      </InfoBlock>
      {
        experience.experience_in_year &&
        <InfoBlock label="自身相關職務工作經驗">
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
          {`${experience.salary.amount} / ${formatSalaryType(experience.salary.type)}`}
        </InfoBlock>
      }
      <InfoBlock label="對公司的面試整體滿意度">
        <div className={styles.ratingContainer}>
          {[1, 2, 3, 4, 5].map(el => (
            <Glike
              key={el}
              className={cn(rateButtonStyles.container, styles.autoCursor, {
                [rateButtonStyles.active]: (el <= experience.overall_rating),
              })}
            />
          ))}
          <div className={`${styles.ratingText} pS`}>
            {overallRatingDialogMap[experience.overall_rating]}
          </div>
        </div>
      </InfoBlock>
      {
        experience.interview_sensitive_questions && experience.interview_sensitive_questions.length
        ? (<InfoBlock label="有以下特殊問題">
          <ul>
            {
              experience.interview_sensitive_questions.map((o, idx) => (
                <li key={idx}>{o}</li>
              ))
            }
          </ul>
        </InfoBlock>)
        : null
      }
    </Fragment>
  );

InterviewInfoBlocks.propTypes = {
  experience: PropTypes.object.isRequired,
};

const WorkInfoBlocks = ({ experience }) =>
  (
    <Fragment>
      <InfoBlock label="工作地區">
        {experience.region}
      </InfoBlock>
      <InfoBlock label="職稱">
        {experience.job_title}
      </InfoBlock>
      {
        experience.experience_in_year &&
        <InfoBlock label="自身相關職務工作經驗">
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
          {`${experience.salary.amount} / ${formatSalaryType(experience.salary.type)}`}
        </InfoBlock>
      }
      {
        experience.recommend_to_others &&
        <InfoBlock label="是否推薦此工作">
          {experience.recommend_to_others === 'yes' ?
            <div className={styles.recommendIcon}><Good />推</div>
            : <div className={styles.recommendIcon}><Bad /> 不推</div>
          }
        </InfoBlock>
      }
    </Fragment>
  );

WorkInfoBlocks.propTypes = {
  experience: PropTypes.object.isRequired,
};

const Aside = ({ experience }) => {
  const {
    type,
  } = experience;
  return (
    <aside className={styles.aside}>
      {
        type === 'interview' && (
          <ul className={styles.infoList}>
            <InterviewInfoBlocks experience={experience} />
          </ul>
        )
      }
      {
        type === 'work' && (
          <ul className={styles.infoList}>
            <WorkInfoBlocks experience={experience} />
          </ul>
        )
      }
    </aside>
  );
};

Aside.propTypes = {
  experience: PropTypes.object.isRequired,
};

export default Aside;
