import React, { useState, useCallback } from 'react';
import InterviewExperienceEntry from '../../CompanyAndJobTitle/InterviewExperiences/ExperienceEntry';
import WorkExperienceEntry from '../../CompanyAndJobTitle/WorkExperiences/ExperienceEntry';
import { useLocation } from 'react-router';
import usePermission from 'hooks/usePermission';
import { pageType as PAGE_TYPE } from '../../../constants/companyJobTitle';
import Button from '../../common/button/Button';
import styles from './MoreExperiencesBlock.module.css';
import useExperiences from './useExperiences';

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
