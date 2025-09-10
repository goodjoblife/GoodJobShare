import React, { Fragment, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faLock from '@fortawesome/fontawesome-free-solid/faLock';
import { formatSalary, formatSalaryRange } from 'common/formatter';
import styles from './Article.module.css';
import InfoBlock, { InfoBlocks } from './InfoBlock';
import RatingInfo from './RatingInfo';
import OverallRating from 'common/OverallRating';
import ExternalLinkIcon from 'common/icons/ExternalLink';
import ReportBadge from 'common/button/ReportBadge';
import ReportZone from '../ReportZone';
import { REPORT_TYPE } from '../ReportZone/ReportForm/constants';
import { useDispatch } from 'react-redux';
import { queryExperience } from 'actions/experience';

const formatDate = date => `${date.getFullYear()} 年 ${date.getMonth() + 1} 月`;
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
      <InfoBlocks>
        <InfoBlock>{experience.region}</InfoBlock>
        <InfoBlock>{experience.interview_result}</InfoBlock>
        {experience.interview_time ? (
          <InfoBlock label="面試時間">
            {`${experience.interview_time.year} 年 ${experience.interview_time.month} 月`}
          </InfoBlock>
        ) : null}
        {expInYearText !== null ? (
          <InfoBlock label="職務經驗">{expInYearText}</InfoBlock>
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
        {experience.averageSectionRating && (
          <InfoBlock label="評分">
            <OverallRating
              rating={experience.averageSectionRating}
              hasRatingLabel
              hasRatingNumber
            />
          </InfoBlock>
        )}
      </InfoBlocks>
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
          <InfoBlock label="工時">{experience.week_work_time}</InfoBlock>
        ) : null}
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
      </InfoBlocks>
      <InfoBlocks>
        {experience.created_at ? (
          <InfoBlock label={formatDate(new Date(experience.created_at))}>
            已離職？N/A
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
