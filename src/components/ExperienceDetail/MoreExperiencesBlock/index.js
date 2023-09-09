import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import InterviewExperienceEntry from '../../CompanyAndJobTitle/InterviewExperiences/ExperienceEntry';
import WorkExperienceEntry from '../../CompanyAndJobTitle/WorkExperiences/ExperienceEntry';
import { useLocation } from 'react-router';
import usePermission from 'hooks/usePermission';
import { queryRelatedExperiencesOnExperience } from 'actions/experience';
import { relatedExperiencesStateSelector } from 'selectors/experienceSelector';
import { pageType as PAGE_TYPE } from '../../../constants/companyJobTitle';
import Button from '../../common/button/Button';
import styles from './MoreExperiencesBlock.module.css';
import relatedExperiencesSelector from './relatedExperiencesSelector';

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
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(queryRelatedExperiencesOnExperience(experience.id));
  }, [dispatch, experience.id]);

  const relatedExperiencesState = useSelector(relatedExperiencesStateSelector);

  console.log(relatedExperiencesState);

  const location = useLocation();
  const { state: { pageType = PAGE_TYPE.COMPANY } = {} } = location;
  const [, , canView] = usePermission();
  const experiences = useMemo(() => relatedExperiencesSelector(experience), [
    experience,
  ]);
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

MoreExperiencesBlock.propTypes = {
  experience: PropTypes.object.isRequired,
};

export default MoreExperiencesBlock;
