import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import usePermission from 'hooks/usePermission';
import Article from 'components/ExperienceDetail/Article';
import { Wrapper } from 'common/base';
import MessageBoard from '../ExperienceDetail/MessageBoard';
import * as VISIBILITY from 'components/ExperienceDetail/Article/visibility';
import { useTraceEvent } from 'hooks/viewLog';
import { CONTENT_TYPE, ACTION } from 'constants/viewLog';
import { useWindowScroll, useWindowSize } from 'react-use';

const Experience = ({ experience }) => {
  const [, , canViewPublishId] = usePermission();
  const [messageExpanded, setMessageExpanded] = useState(false);

  const traceDetailView = useTraceEvent({
    contentId: experience.id,
    contentType: CONTENT_TYPE.EXPERIENCE,
    action: ACTION.DETAIL_VIEW_ACTION,
  });

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

  return (
    <div ref={ref}>
      <Article
        experience={experience}
        visibility={
          canViewPublishId(experience.id)
            ? VISIBILITY.COLLAPSED
            : VISIBILITY.LOCKED
        }
        onClickMsgButton={() => setMessageExpanded(expended => !expended)}
        onExpand={traceDetailView}
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
