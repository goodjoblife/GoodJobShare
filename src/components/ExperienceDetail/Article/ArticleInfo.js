import React, { Fragment, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faLock from '@fortawesome/fontawesome-free-solid/faLock';
import { formatSalary, formatSalaryRange } from 'common/formatter';
import styles from './Article.module.css';
import InfoBlock from './InfoBlock';
import WorkInfoGrid from './WorkInfoGrid';
import RateButtons from './RateButtons';
import {
  pageType as PAGE_TYPE,
  generatePageURL,
} from 'constants/companyJobTitle';
import { originalCompanyNameSelector } from '../experienceSelector';
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
      <InfoBlock
        label="公司"
        to={generatePageURL({
          pageType: PAGE_TYPE.COMPANY,
          pageName: experience.company.name,
        })}
      >
        {originalCompanyNameSelector(experience)}
      </InfoBlock>
      <InfoBlock label="面試地區">{experience.region}</InfoBlock>
      <InfoBlock
        label="應徵職稱"
        to={generatePageURL({
          pageType: PAGE_TYPE.JOB_TITLE,
          pageName: experience.job_title.name,
        })}
      >
        {experience.job_title.name}
      </InfoBlock>
      {expInYearText !== null ? (
        <InfoBlock label="相關職務經驗">{expInYearText}</InfoBlock>
      ) : null}
      {experience.education ? (
        <InfoBlock label="最高學歷">{experience.education}</InfoBlock>
      ) : null}
      {experience.interview_time ? (
        <InfoBlock label="面試時間">
          {`${experience.interview_time.year} 年 ${experience.interview_time.month} 月`}
        </InfoBlock>
      ) : null}
      {experience.created_at ? (
        <InfoBlock label="填寫時間">
          {formatDate(new Date(experience.created_at))}
        </InfoBlock>
      ) : null}
      <InfoBlock label="面試結果">{experience.interview_result}</InfoBlock>
      {experience.salary ? (
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
    <WorkInfoGrid>
      <WorkInfoGrid.Item label="地點">
        {experience.region || '未提供'}
      </WorkInfoGrid.Item>

      <WorkInfoGrid.Item label="職務經驗">
        {expInYearText || '未提供'}
      </WorkInfoGrid.Item>

      <WorkInfoGrid.Item label="工時">
        {experience.week_work_time
          ? `${experience.week_work_time}小時/週`
          : '未提供'}
      </WorkInfoGrid.Item>

      <WorkInfoGrid.Item label="薪水">
        {experience.salary ? (
          hideContent ? (
            <React.Fragment>
              <FontAwesomeIcon icon={faLock} className={styles.lock} />
              {formatSalaryRange(experience.salary)}
            </React.Fragment>
          ) : (
            formatSalary(experience.salary)
          )
        ) : (
          '未提供'
        )}
      </WorkInfoGrid.Item>

      <WorkInfoGrid.Item label="最高學歷">
        {experience.education || '未提供'}
      </WorkInfoGrid.Item>

      <WorkInfoGrid.Item label="評分" span={3}>
        <RatingInfo
          rating={experience.averageSectionRating}
          recommend={experience.recommend_to_others}
        />
      </WorkInfoGrid.Item>
    </WorkInfoGrid>
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

const InternBlocks = ({ experience, hideContent }) => (
  <Fragment>
    {experience.region ? (
      <InfoBlock label="實習地區">{experience.region}</InfoBlock>
    ) : null}
    {experience.job_title ? (
      <InfoBlock label="職稱">{experience.job_title.name}</InfoBlock>
    ) : null}
    {experience.education ? (
      <InfoBlock label="最高學歷">{experience.education}</InfoBlock>
    ) : null}
    {experience.starting_year ? (
      <InfoBlock label="實習開始的年份">
        {experience.starting_year} 年
      </InfoBlock>
    ) : null}
    {experience.period ? (
      <InfoBlock label="實習長度">{experience.period} 月</InfoBlock>
    ) : null}
    {experience.week_work_time ? (
      <InfoBlock label="一週工時">{experience.week_work_time}</InfoBlock>
    ) : null}
    {experience.salary ? (
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
    ) : null}
    {experience.overall_rating ? (
      <InfoBlock label="實習整體滿意度">
        <RateButtons rate={experience.overall_rating} />
      </InfoBlock>
    ) : null}
  </Fragment>
);

InternBlocks.propTypes = {
  experience: PropTypes.shape({
    education: PropTypes.string,
    job_title: PropTypes.shape({
      name: PropTypes.string,
    }),
    overall_rating: PropTypes.number,
    period: PropTypes.number,
    region: PropTypes.string,
    salary: PropTypes.shape({
      amount: PropTypes.number,
      type: PropTypes.string,
    }),
    starting_year: PropTypes.number,
    week_work_time: PropTypes.string,
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
  experience: PropTypes.shape({
    type: PropTypes.string.isRequired,
  }).isRequired,
  hideContent: PropTypes.bool,
  originalLink: PropTypes.string,
};

export default Aside;
