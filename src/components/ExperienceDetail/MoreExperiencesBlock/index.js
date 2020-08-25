import React from 'react';
import InterviewExperienceEntry from '../../CompanyAndJobTitle/InterviewExperiences/ExperienceEntry';
import WorkExperienceEntry from '../../CompanyAndJobTitle/WorkExperiences/ExperienceEntry';
import { useLocation } from 'react-router';
import usePermission from 'hooks/usePermission';
import { pageType as PAGE_TYPE } from '../../../constants/companyJobTitle';
import styles from './MoreExperiencesBlock.module.css';

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

const MoreExperiencesBlock = ({ experience }) => {
  const location = useLocation();
  const { state: { pageType = PAGE_TYPE.COMPANY } = {} } = location;
  const [, , canView] = usePermission();

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        更多{experience.company.name}、{experience.job_title.name}
        的面試及工作心得...
      </div>
      <ExperienceEntry
        pageType={pageType}
        data={{ ...experience, id: experience._id }}
        canView={canView}
      />
    </div>
  );
};

export default MoreExperiencesBlock;
