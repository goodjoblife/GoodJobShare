import React, { useState } from 'react';
import PropTypes from 'prop-types';
import usePermission from 'hooks/usePermission';
import Article from 'components/ExperienceDetail/Article';
import { Heading, Wrapper } from 'common/base';
import MessageBoard from '../ExperienceDetail/MessageBoard';
import * as VISIBILITY from 'components/ExperienceDetail/Article/visibility';
import styles from './Experience.module.css';
import { formatSimpleDate } from 'utils/dateUtil';

const Experience = ({ experience }) => {
  const [, , canViewPublishId] = usePermission();
  const [messageExpanded, setMessageExpanded] = useState(false);

  return (
    <>
      <Heading size="m" Tag="h2" bold className={styles.title}>
        {experience.title}{' '}
        <span className={styles.timestamp}>
          {formatSimpleDate(new Date(experience.created_at))}
        </span>
      </Heading>
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
