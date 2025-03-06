import React, { useState } from 'react';
import PropTypes from 'prop-types';
import usePermission from 'hooks/usePermission';
import Article from 'components/ExperienceDetail/Article';
import { Wrapper } from 'common/base';
import MessageBoard from '../ExperienceDetail/MessageBoard';
import * as VISIBILITY from 'components/ExperienceDetail/Article/visibility';

const Experience = ({ experience }) => {
  const [, , canViewPublishId] = usePermission();
  const [messageExpanded, setMessageExpanded] = useState(false);

  return (
    <>
      <Article
        experience={experience}
        visibility={
          canViewPublishId(experience.id)
            ? VISIBILITY.COLLAPSED
            : VISIBILITY.LOCKED
        }
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
