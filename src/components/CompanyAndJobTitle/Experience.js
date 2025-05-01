import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import usePermission from 'hooks/usePermission';
import Article from 'components/ExperienceDetail/Article';
import { Heading, Wrapper } from 'common/base';
import MessageBoard from '../ExperienceDetail/MessageBoard';
import * as VISIBILITY from 'components/ExperienceDetail/Article/visibility';
import { useTraceEvent } from 'hooks/viewLog';
import { CONTENT_TYPE, ACTION } from 'constants/viewLog';
import { useWindowScroll, useWindowSize } from 'react-use';
import styles from './Experience.module.css';
import { formatSimpleDate } from 'utils/dateUtil';

const useTracePreviewRef = ({ experience }) => {
  const { height: windowHeight } = useWindowSize();
  const { y: windowY } = useWindowScroll();
  const ref = useRef(null);

  const [hasTracedPreview, setTracedPreview] = useState(false);
  const tracePreview = useTraceEvent({
    contentId: experience.id,
    contentType: CONTENT_TYPE.EXPERIENCE,
    action: ACTION.PREVIEW_ACTION,
  });

  useEffect(() => {
    if (hasTracedPreview) return;

    const elementBottom = ref.current.offsetTop + ref.current.scrollHeight;
    if (windowY > elementBottom - windowHeight) {
      tracePreview();
      setTracedPreview(true);
    }
  }, [windowY, windowHeight, experience.id, tracePreview, hasTracedPreview]);

  return ref;
};

const Experience = ({ experience }) => {
  const [, , canViewPublishId] = usePermission();
  const [messageExpanded, setMessageExpanded] = useState(false);
  const ref = useTracePreviewRef({ experience });

  return (
    <div ref={ref}>
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
    </div>
  );
};

Experience.propTypes = {
  experience: PropTypes.object.isRequired,
};

export default Experience;
