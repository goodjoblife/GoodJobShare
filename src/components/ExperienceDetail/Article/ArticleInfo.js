import React, { Fragment, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faLock from '@fortawesome/fontawesome-free-solid/faLock';
import { formatSalary, formatSalaryRange } from 'common/formatter';
import styles from './Article.module.css';
import InfoBlock, { InfoBlocks } from './InfoBlock';
import RatingInfo from './RatingInfo';
import ExternalLinkIcon from 'common/icons/ExternalLink';
import ReportBadge from 'common/button/ReportBadge';
import ReportZone from '../ReportZone';
import { REPORT_TYPE } from '../ReportZone/ReportForm/constants';
import { useDispatch } from 'react-redux';
import { queryExperience } from 'actions/experience';

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

const getInterviewResultStyle = interviewResult => {
  switch (interviewResult) {
    case '錄取':
      return styles.passed;
    case '未錄取':
      return styles.failed;
    default:
      return null;
  }
};

const InterviewInfoBlocks = ({ experience, hideContent }) => {
  const expInYearText = formatExperienceInYear(experience.experience_in_year);
  const rows = [];

  // First row columns
  const firstRow = [];
  if (experience.region) {
    firstRow.push(<InfoBlock key="region">{experience.region}</InfoBlock>);
  }
  if (experience.interview_result) {
    firstRow.push(
      <InfoBlock
        className={getInterviewResultStyle(experience.interview_result)}
        key="interview_result"
      >
        {experience.interview_result}
      </InfoBlock>,
    );
  }
  if (experience.interview_time) {
    firstRow.push(
      <InfoBlock key="interview_time" label="面試時間">
        {`${experience.interview_time.year}.${String(
          experience.interview_time.month,
        ).padStart(2, '0')}`}
      </InfoBlock>,
    );
  }
  if (expInYearText !== null) {
    firstRow.push(
      <InfoBlock key="exp_in_year" label="職務經驗">
        {expInYearText}
      </InfoBlock>,
    );
  }
  if (firstRow.length > 0) {
    rows.push(firstRow);
  }

  // Second row columns
  const secondRow = [];
  if (experience.salary) {
    secondRow.push(
      <InfoBlock key="salary" label="薪水">
        {hideContent ? (
          <React.Fragment>
            <FontAwesomeIcon icon={faLock} className={styles.lock} />
            {formatSalaryRange(experience.salary)}
          </React.Fragment>
        ) : (
          formatSalary(experience.salary)
        )}
      </InfoBlock>,
    );
  }
  if (experience.averageSectionRating) {
    secondRow.push(
      <InfoBlock key="averageSectionRating" label="評分">
        {experience.averageSectionRating.toFixed(1)}分
      </InfoBlock>,
    );
  }
  if (secondRow.length > 0) {
    rows.push(secondRow);
  }

  return (
    <Fragment>
      {rows.map((cols, idx) => (
        <InfoBlocks key={idx}>{cols}</InfoBlocks>
      ))}
    </Fragment>
  );
};

InterviewInfoBlocks.propTypes = {
  experience: PropTypes.shape({
    averageSectionRating: PropTypes.number,
    company: PropTypes.shape({
      name: PropTypes.string,
    }),
    created_at: PropTypes.string,
    education: PropTypes.string,
    experience_in_year: PropTypes.number,
    id: PropTypes.string.isRequired,
    interview_result: PropTypes.string,
    interview_sensitive_questions: PropTypes.arrayOf(PropTypes.string),
    interview_time: PropTypes.shape({
      month: PropTypes.number,
      year: PropTypes.number,
    }),
    job_title: PropTypes.shape({
      name: PropTypes.string,
    }),
    originalCompanyName: PropTypes.string.isRequired,
    overall_rating: PropTypes.number,
    region: PropTypes.string,
    reportCount: PropTypes.number.isRequired,
    reports: PropTypes.arrayOf(PropTypes.object),
    salary: PropTypes.shape({
      amount: PropTypes.number,
      type: PropTypes.string,
    }),
  }).isRequired,
  hideContent: PropTypes.bool,
};

const WorkInfoBlocks = ({ experience, hideContent }) => {
  const expInYearText = formatExperienceInYear(experience.experience_in_year);
  return (
    <Fragment>
      <InfoBlocks>
        <InfoBlock label="地點">{experience.region}</InfoBlock>
        {expInYearText ? (
          <InfoBlock label="職務經驗">{expInYearText}</InfoBlock>
        ) : null}
        {experience.week_work_time ? (
          <InfoBlock label="工時">
            {experience.week_work_time} 小時/週
          </InfoBlock>
        ) : null}
      </InfoBlocks>
      <InfoBlocks>
        {experience.salary ? (
          <InfoBlock label="薪水">
            {hideContent ? (
              <React.Fragment>
                <FontAwesomeIcon icon={faLock} className={styles.lock} />
                {formatSalaryRange(experience.salary)}
              </React.Fragment>
            ) : (
              formatSalary(experience.salary)
            )}
          </InfoBlock>
        ) : null}
        <RatingInfo
          rating={experience.averageSectionRating}
          recommend={experience.recommend_to_others}
        />
      </InfoBlocks>
    </Fragment>
  );
};

WorkInfoBlocks.propTypes = {
  experience: PropTypes.shape({
    averageSectionRating: PropTypes.number,
    company: PropTypes.shape({
      name: PropTypes.string,
    }),
    created_at: PropTypes.string,
    education: PropTypes.string,
    experience_in_year: PropTypes.number,
    id: PropTypes.string.isRequired,
    job_title: PropTypes.shape({
      name: PropTypes.string,
    }),
    originalCompanyName: PropTypes.string.isRequired,
    recommend_to_others: PropTypes.string,
    region: PropTypes.string,
    reportCount: PropTypes.number.isRequired,
    reports: PropTypes.arrayOf(PropTypes.object),
    salary: PropTypes.shape({
      amount: PropTypes.number,
      type: PropTypes.string,
    }),
    week_work_time: PropTypes.number,
  }).isRequired,
  hideContent: PropTypes.bool,
};

const InfoCorner = ({ experience, originalLink }) => {
  const dispatch = useDispatch();
  const onCloseReport = useCallback(() => {
    dispatch(queryExperience(experience.id));
  }, [experience.id, dispatch]);

  return (
    <div className={styles.infoCorner}>
      {experience.reportCount > 0 && (
        <ReportZone
          id={experience.id}
          reportType={REPORT_TYPE.EXPERIENCE}
          reports={experience.reports}
          reportCount={experience.reportCount}
          onCloseReport={onCloseReport}
        >
          <ReportBadge
            reportCount={experience.reportCount}
            reportText="有使用者回報"
          />
        </ReportZone>
      )}
      {originalLink && (
        <Link className={styles.originalLink} to={originalLink}>
          <span role="img" aria-label="link">
            <ExternalLinkIcon />
          </span>
        </Link>
      )}
    </div>
  );
};

InfoCorner.propTypes = {
  experience: PropTypes.shape({
    id: PropTypes.string.isRequired,
    reportCount: PropTypes.number.isRequired,
    reports: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
  originalLink: PropTypes.string,
};

const Aside = ({ experience, hideContent, originalLink }) => {
  const { type } = experience;
  return (
    <div className={styles.info}>
      <InfoCorner experience={experience} originalLink={originalLink} />
      {type === 'interview' && (
        <InterviewInfoBlocks
          experience={experience}
          hideContent={hideContent}
        />
      )}
      {type === 'work' && (
        <WorkInfoBlocks experience={experience} hideContent={hideContent} />
      )}
    </div>
  );
};

Aside.propTypes = {
  experience: PropTypes.shape({
    type: PropTypes.string.isRequired,
  }).isRequired,
  hideContent: PropTypes.bool,
  originalLink: PropTypes.string,
};

export default Aside;
