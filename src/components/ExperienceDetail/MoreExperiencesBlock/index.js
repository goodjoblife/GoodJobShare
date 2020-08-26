import React, { useState, useEffect, useCallback } from 'react';
import R from 'ramda';
import InterviewExperienceEntry from '../../CompanyAndJobTitle/InterviewExperiences/ExperienceEntry';
import WorkExperienceEntry from '../../CompanyAndJobTitle/WorkExperiences/ExperienceEntry';
import { useLocation } from 'react-router';
import usePermission from 'hooks/usePermission';
import { getCompany } from '../../../apis/company';
import { getJobTitle } from '../../../apis/jobTitle';
import { pageType as PAGE_TYPE } from '../../../constants/companyJobTitle';
import Button from '../../common/button/Button';
import styles from './MoreExperiencesBlock.module.css';

const rejectById = id => R.reject(R.propEq('id', id));

const experienceComparator = ({ companyName, jobTitle }) => (a, b) => {
  // 公司與職稱與文章相同
  if (a.company.name === companyName && a.job_title.name === jobTitle)
    return -1;
  if (b.company.name === companyName && b.job_title.name === jobTitle) return 1;
  // 公司與文章相同
  if (a.company.name === companyName) return -1;
  if (b.company.name === companyName) return 1;
  // 職稱與文章相同
  if (a.job_title.name === jobTitle) return -1;
  if (b.job_title.name === jobTitle) return 1;
  // 公司與職稱皆不相同
  return 0;
};

const filterAndReorderExperiencesBy = ({ companyName, jobTitle }) =>
  R.compose(
    R.sortWith([experienceComparator({ companyName, jobTitle })]),
    R.uniqBy(R.prop('id')),
  );

const search = async x => {
  const { companyName, jobTitle } = x;
  const companyPromise = getCompany(companyName);
  const jobTitlePromise = getJobTitle(jobTitle);

  const [fetchedCompany, fetchedJobTitle] = await Promise.all([
    companyPromise,
    jobTitlePromise,
  ]);
  const [
    {
      interview_experiences: companyInterviewExperiences = [],
      work_experiences: companyWorkExperiences = [],
    } = {},
    {
      interview_experiences: jobTitleInterviewExperiences = [],
      work_experiences: jobTitleWorkExperiences = [],
    } = {},
  ] = [fetchedCompany || {}, fetchedJobTitle || {}];

  const experiences = [
    ...companyInterviewExperiences,
    ...companyWorkExperiences,
    ...jobTitleInterviewExperiences,
    ...jobTitleWorkExperiences,
  ];

  const reorderAndFilterExperiences = filterAndReorderExperiencesBy({
    companyName,
    jobTitle,
  });

  return reorderAndFilterExperiences(experiences);
};

const useExperiences = ({ id, companyName, jobTitle }) => {
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    search({ companyName, jobTitle })
      .then(rejectById(id))
      .then(setExperiences);
  }, [companyName, id, jobTitle]);

  return experiences;
};

const ExperienceEntry = props => {
  switch (props.data.type) {
    case 'interview':
      return <InterviewExperienceEntry {...props} />;
    case 'work':
      return <WorkExperienceEntry {...props} />;
    default:
      return null;
  }
};

const LoadMoreButton = ({ children: _, ...props }) => (
  <Button
    circleSize="md"
    btnStyle="black"
    className={styles.loadMoreButton}
    {...props}
  >
    載入更多
  </Button>
);

const MoreExperiencesBlock = ({ experience }) => {
  const location = useLocation();
  const { state: { pageType = PAGE_TYPE.COMPANY } = {} } = location;
  const [, , canView] = usePermission();
  const experiences = useExperiences({
    id: experience._id,
    companyName: experience.company.name,
    jobTitle: experience.job_title.name,
  });
  const [n, setN] = useState(5);
  const handleLoadMore = useCallback(() => setN(n + 5), [n]);

  if (experiences.length === 0) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        更多{experience.company.name}、{experience.job_title.name}
        的面試及工作心得...
      </div>
      {experiences.slice(0, n).map(e => (
        <ExperienceEntry
          key={e.id}
          pageType={pageType}
          data={e}
          canView={canView}
        />
      ))}
      {n < experiences.length && <LoadMoreButton onClick={handleLoadMore} />}
    </div>
  );
};

export default MoreExperiencesBlock;
