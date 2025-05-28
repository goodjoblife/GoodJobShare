import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useWindowScroll, useWindowSize } from 'react-use';
import PropTypes from 'prop-types';
import usePermission from 'hooks/usePermission';
import { useTrackEvent } from 'hooks/viewLog';
import Article from 'components/ExperienceDetail/Article';
import { Heading, Wrapper } from 'common/base';
import MessageBoard from '../ExperienceDetail/MessageBoard';
import * as VISIBILITY from 'components/ExperienceDetail/Article/visibility';
import styles from './Experience.module.css';
import { formatSimpleDate } from 'utils/dateUtil';
import { CONTENT_TYPE, ACTION } from 'constants/viewLog';
import {
  pageType as PAGE_TYPE,
  tabType as TAB_TYPE,
  tabTypeDetailTranslation as TAB_TYPE_DETAIL_TRANSLATION,
} from 'constants/companyJobTitle';

const useTracePreviewRef = ({ experience }) => {
  const { height: windowHeight } = useWindowSize();
  const { y: windowY } = useWindowScroll();
  const ref = useRef(null);

  const [hasTracedPreview, setTracedPreview] = useState(false);
  const trackPreview = useTrackEvent();

  useEffect(() => {
    if (hasTracedPreview) return;

    const elementBottom = ref.current.offsetTop + ref.current.scrollHeight;
    if (windowY > elementBottom - windowHeight) {
      trackPreview(ACTION.PREVIEW, experience.id, CONTENT_TYPE.EXPERIENCE);
      setTracedPreview(true);
    }
  }, [windowY, windowHeight, experience.id, trackPreview, hasTracedPreview]);

  return ref;
};

/**
 * If in company's work/interview experience listing page, only show "${job title} ${data type}"
 *  - For example, under 台積電 面試經驗列表，title 僅會顯示 "軟體工程師 面試經驗"
 *
 * If in job title's work/interview experience listing page, only show "${company name} ${data type}"
 *  - For example, under 軟體工程師 面試經驗列表，title 僅會顯示 "台積電 面試經驗"
 */
const useExperienceTitle = ({ experience, pageType, tabType }) =>
  useMemo(() => {
    let str = '';
    if (pageType === PAGE_TYPE.COMPANY && experience?.job_title?.name) {
      str = experience.job_title.name;
    } else if (pageType === PAGE_TYPE.JOB_TITLE && experience?.company?.name) {
      str = experience.company.name;
    } else if (experience?.title) {
      str = experience.title;
    }
    switch (tabType) {
      case TAB_TYPE.INTERVIEW_EXPERIENCE:
      case TAB_TYPE.WORK_EXPERIENCE:
        return `${str} ${TAB_TYPE_DETAIL_TRANSLATION[tabType]}`;
      default:
        return str;
    }
  }, [experience, pageType, tabType]);

const Experience = ({ experience, pageType, tabType, subTitleTag }) => {
  const [, , canViewPublishId] = usePermission();
  const [messageExpanded, setMessageExpanded] = useState(false);
  const ref = useTracePreviewRef({ experience });

  const title = useExperienceTitle({ experience, pageType, tabType });

  return (
    <div ref={ref}>
      <Heading size="m" Tag="h2" bold className={styles.title}>
        {title}{' '}
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
        subTitleTag={subTitleTag}
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
  pageType: PropTypes.string.isRequired,
  subTitleTag: PropTypes.string,
  tabType: PropTypes.string.isRequired,
};

export default Experience;
