import React, { useState } from 'react';
import PropTypes from 'prop-types';
import usePermission from 'hooks/usePermission';
import Article from 'components/ExperienceDetail/Article';
import { Wrapper } from 'common/base';
import MessageBoard from '../ExperienceDetail/MessageBoard';

const Experience = ({ experience }) => {
  const [, , canViewPublishId] = usePermission();
  const [messageExpanded, setMessageExpanded] = useState(false);

  return (
    <>
      <Article
        experience={experience}
        hideContent={!canViewPublishId(experience.id)}
        onClickMsgButton={() => setMessageExpanded(expended => !expended)}
        originalLink={`/experiences/${experience.id}`}
      />
      {messageExpanded && (
        <Wrapper size="s">
          <MessageBoard experienceId={experience.id} />
        </Wrapper>
      )}
    </>
  );
};

Experience.propTypes = {
  experience: PropTypes.object.isRequired,
};

export default Experience;
