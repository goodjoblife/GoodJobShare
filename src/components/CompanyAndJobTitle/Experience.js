import React, { useState } from 'react';
import PropTypes from 'prop-types';
import usePermission from 'hooks/usePermission';
import Article from 'components/ExperienceDetail/Article';
import { Heading, Wrapper } from 'common/base';
import MessageBoard from '../ExperienceDetail/MessageBoard';
import * as VISIBILITY from 'components/ExperienceDetail/Article/visibility';
import styles from './Experience.module.css';

const formatDate = date => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
};

const Experience = ({ experience }) => {
  const [, , canViewPublishId] = usePermission();
  const [messageExpanded, setMessageExpanded] = useState(false);

  return (
    <>
      <Heading size="m" Tag="h2" bold className={styles.title}>
        {experience.title}{' '}
        <span className={styles.timestamp}>
          {formatDate(experience.created_at)}
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
