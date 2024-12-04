import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import InterviewExperienceEntry from '../../CompanyAndJobTitle/InterviewExperiences/ExperienceEntry';
import WorkExperienceEntry from '../../CompanyAndJobTitle/WorkExperiences/ExperienceEntry';
import { useLocation } from 'react-router';
import ReactGA from 'react-ga4';
import usePermission from 'hooks/usePermission';
import {
  queryRelatedExperiencesOnExperience,
  loadMoreRelatedExperiences,
} from 'actions/experience';
import { relatedExperiencesStateSelector } from 'selectors/experienceSelector';
import { pageType as PAGE_TYPE } from 'constants/companyJobTitle';
import { GA_CATEGORY, GA_ACTION } from 'constants/gaConstants';
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
  const [, , canViewPublishId] = usePermission();
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
        更多{experience.originalCompanyName}、{experience.job_title.name}
        的面試及評價...
      </div>
      {experiences.map(e => (
        <ExperienceEntry
          key={e.id}
          pageType={pageType}
          data={e}
          canView={canViewPublishId(e.id)}
          onClick={() => {
            ReactGA.event({
              category: GA_CATEGORY.READ_MORE,
              action: GA_ACTION.CLICK_READ_MORE_EXPERIENCE,
            });
          }}
        />
      ))}
      {hasMore && <LoadMoreButton onClick={handleLoadMore} />}
    </div>
  );
};

MoreExperiencesBlock.propTypes = {
  experience: PropTypes.shape({
    id: PropTypes.string.isRequired,
    job_title: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    originalCompanyName: PropTypes.string.isRequired,
  }).isRequired,
};

export default MoreExperiencesBlock;
