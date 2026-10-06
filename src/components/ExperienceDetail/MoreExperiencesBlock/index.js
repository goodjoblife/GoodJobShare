import PropTypes from 'prop-types';
import React from 'react';
import ReactGA from 'react-ga4';
import { useLocation } from 'react-router';

import { Heading } from 'common/base';
import Button from 'common/button/Button';
import { PageType } from 'constants/companyJobTitle';
import { GA_ACTION, GA_CATEGORY } from 'constants/gaConstants';
import usePermission from 'hooks/usePermission';

import styles from './MoreExperiencesBlock.module.css';
import useRelatedExperiences from './useRelatedExperiences';
import InterviewExperienceEntry from '../../CompanyAndJobTitle/InterviewExperiences/ExperienceEntry';
import WorkExperienceEntry from '../../CompanyAndJobTitle/WorkExperiences/ExperienceEntry';

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
  const [relatedExperiencesBox, handleLoadMore] = useRelatedExperiences(
    experience.id,
  );

  const location = useLocation();
  const { state: { pageType = PageType.COMPANY } = {} } = location;
  const [, , canViewPublishId] = usePermission();

  // we still want to show data even when Fetching
  if (!relatedExperiencesBox.data) {
    return null;
  }

  const { experiences, hasMore } = relatedExperiencesBox.data;

  if (experiences.length === 0) {
    return null;
  }

  return (
    <div className={styles.container}>
      <Heading className={styles.title} Tag="h2">
        更多{experience.originalCompanyName}、{experience.job_title.name}
        的面試及評價...
      </Heading>
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
