import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';

import { P } from 'common/base';
import GradientMask from 'common/GradientMask';
import { useShareLink } from 'hooks/experiments';
import { useTrackEvent } from 'hooks/viewLog';
import { formatCommaSeparatedNumber } from 'utils/stringUtil';
import styles from './Article.module.css';
import ArticleInfo from './ArticleInfo';
import SectionBlock from './SectionBlock';
import QABlock from './QABlock';
import ReactionZone from './ReactionZone';
import { BasicPermissionBlock } from 'common/PermissionBlock';
import { MAX_WORDS_IF_HIDDEN } from 'constants/hideContent';
import { CONTENT_TYPE, ACTION } from 'constants/viewLog';
import * as VISIBILITY from './visibility';
import Button from 'common/button/Button';
import Card from 'common/Card';

const countSectionWords = sections =>
  R.reduce(
    (accu, curr) => {
      return (
        accu +
        R.pathOr(0, ['subtitle', 'length'], curr) +
        R.pathOr(0, ['content', 'length'], curr)
      );
    },
    0,
    sections,
  );

const ChildrenOnMaskBottom = ({ visibility, totalWords, onExpand }) => {
  switch (visibility) {
    case VISIBILITY.LOCKED:
      return `總共 ${formatCommaSeparatedNumber(totalWords)} 字`;

    case VISIBILITY.COLLAPSED:
      return (
        <Button circleSize="md" btnStyle="black" onClick={onExpand}>
          查看詳細
        </Button>
      );

    default:
      return null;
  }
};

ChildrenOnMaskBottom.propTypes = {
  onExpand: PropTypes.func.isRequired,
  totalWords: PropTypes.number.isRequired,
  visibility: PropTypes.string.isRequired,
};

const Sections = ({ experience, visibility, onExpand }) => {
  let toHide = false;
  let currentTotalWords = 0;
  const totalWords = countSectionWords(experience.sections);
  const [hasExpanded, setExpanded] = useState(false);
  const handleExpand = useCallback(() => {
    setExpanded(true);
    onExpand();
  }, [onExpand]);

  if (visibility !== VISIBILITY.VISIBLE && !hasExpanded) {
    return (
      <div>
        {experience.sections &&
          experience.sections.map(({ subtitle, content }, idx) => {
            if (toHide) {
              return null;
            }
            currentTotalWords += content.length + subtitle.length;
            if (currentTotalWords > MAX_WORDS_IF_HIDDEN) {
              toHide = true;
              const showLength =
                content.length - (currentTotalWords - MAX_WORDS_IF_HIDDEN);
              const newContent = `${content.substring(0, showLength)}...`;
              return (
                <GradientMask
                  key={idx}
                  childrenOnMaskBottom={
                    <ChildrenOnMaskBottom
                      visibility={visibility}
                      totalWords={totalWords}
                      onExpand={handleExpand}
                    />
                  }
                >
                  <SectionBlock subtitle={subtitle} content={newContent} />
                </GradientMask>
              );
            }
            return (
              <SectionBlock key={idx} subtitle={subtitle} content={content} />
            );
          })}
      </div>
    );
  }
  return (
    <div>
      {experience.sections &&
        experience.sections.map(({ subtitle, content, rating }, idx) => (
          <SectionBlock
            key={idx}
            subtitle={subtitle}
            content={content}
            rating={rating}
          />
        ))}
    </div>
  );
};

Sections.propTypes = {
  experience: PropTypes.object.isRequired,
  onExpand: PropTypes.func.isRequired,
  visibility: PropTypes.string.isRequired,
};

const Article = ({
  experience,
  visibility,
  onClickMsgButton,
  originalLink,
}) => {
  // Get share link object according to Google Optimize parameters
  const shareLink = useShareLink();

  const trackDetailView = useTrackEvent();
  const handleExpand = useCallback(() => {
    trackDetailView(ACTION.DETAIL_VIEW, experience.id, CONTENT_TYPE.EXPERIENCE);
  }, [experience.id, trackDetailView]);

  return (
    <>
      <Card className={styles.container}>
        <ArticleInfo
          experience={experience}
          visibility={visibility}
          originalLink={originalLink}
        />
        <section className={styles.main}>
          <div className={styles.article}>
            <Sections
              experience={experience}
              visibility={visibility}
              onExpand={handleExpand}
            />
          </div>
          <div>
            {experience.type === 'interview' &&
            experience.interview_qas &&
            experience.interview_qas.length &&
            visibility === VISIBILITY.VISIBLE ? (
              <div className={styles.qaWrapper}>
                <P size="l" bold>
                  面試問答
                </P>
                {experience.interview_qas.map(({ question, answer }, idx) => (
                  <QABlock key={idx} question={question} answer={answer} />
                ))}
              </div>
            ) : null}
          </div>

          {visibility === VISIBILITY.LOCKED && (
            <BasicPermissionBlock
              to={shareLink}
              rootClassName={styles.permissionBlockArticle}
            />
          )}
        </section>
        <ReactionZone
          experienceId={experience.id}
          onClickMsgButton={onClickMsgButton}
          reportCount={experience.reportCount}
          reports={experience.reports}
        />
      </Card>
    </>
  );
};

Article.propTypes = {
  experience: PropTypes.object.isRequired,
  onClickMsgButton: PropTypes.func.isRequired,
  originalLink: PropTypes.string,
  visibility: PropTypes.string.isRequired,
};

export default Article;
