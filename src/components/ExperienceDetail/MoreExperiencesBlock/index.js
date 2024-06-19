import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import InterviewExperienceEntry from '../../CompanyAndJobTitle/InterviewExperiences/ExperienceEntry';
import WorkExperienceEntry from '../../CompanyAndJobTitle/WorkExperiences/ExperienceEntry';
import { useLocation } from 'react-router';
import usePermission from 'hooks/usePermission';
import {
  queryRelatedExperiencesOnExperience,
  loadMoreRelatedExperiences,
} from 'actions/experience';
import { relatedExperiencesStateSelector } from 'selectors/experienceSelector';
import { pageType as PAGE_TYPE } from 'constants/companyJobTitle';
import Button from 'common/button/Button';
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

ExperienceEntry.propTypes = {
  data: PropTypes.object.isRequired,
};

const LoadMoreButton = ({ ...props }) => (
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

  const location = useLocation();
  const { state: { pageType = PAGE_TYPE.COMPANY } = {} } = location;
  const [, , canView] = usePermission();
  const handleLoadMore = useCallback(
    () => dispatch(loadMoreRelatedExperiences()),
    [dispatch],
  );

  // we still want to show data even when Fetching
  if (
    !relatedExperiencesState.data ||
    !relatedExperiencesState.data.relatedExperiences
  ) {
    return null;
  }

  const experiences = relatedExperiencesState.data.relatedExperiences;
  const hasMore = relatedExperiencesState.data.hasMore;

  if (experiences.length === 0) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        更多{experience.company.name}、{experience.job_title.name}
        的面試及工作心得...
      </div>
      {experiences.map(e => (
        <ExperienceEntry
          key={e.id}
          pageType={pageType}
          data={e}
          canView={canView}
        />
      ))}
      {hasMore && <LoadMoreButton onClick={handleLoadMore} />}
    </div>
  );
};

MoreExperiencesBlock.propTypes = {
  experience: PropTypes.shape({
    company: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    id: PropTypes.string.isRequired,
    job_title: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    originalCompanyName: PropTypes.string.isRequired,
  }).isRequired,
};

export default MoreExperiencesBlock;
