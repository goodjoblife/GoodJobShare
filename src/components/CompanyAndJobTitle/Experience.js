import React from 'react';
import PropTypes from 'prop-types';
import usePermission from 'hooks/usePermission';
import Article from 'components/ExperienceDetail/Article';

const Experience = ({ experience }) => {
  const [, , canViewPublishId] = usePermission();

  return (
    <Article
      experience={experience}
      hideContent={!canViewPublishId(experience.id)}
    />
  );
};

Experience.propTypes = {
  experience: PropTypes.object.isRequired,
};

export default Experience;
