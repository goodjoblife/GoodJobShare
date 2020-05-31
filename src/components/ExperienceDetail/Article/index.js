import React from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';

import { P } from 'common/base';
import GradientMask from 'common/GradientMask';
import PrivateMessageButton from 'common/button/PrivateMessageButton';
import { useShareLink } from 'hooks/experiments';
import { formatCommaSeparatedNumber } from 'utils/stringUtil';
import styles from './Article.module.css';
import ArticleInfo from './ArticleInfo';
import SectionBlock from './SectionBlock';
import QABlock from './QABlock';
import BasicPermissionBlock from '../../../containers/PermissionBlock/BasicPermissionBlockContainer';
import { MAX_WORDS_IF_HIDDEN } from '../../../constants/hideContent';

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

const Article = ({
  experience,
  hideContent,

  onClickMsgButton,
}) => {
  // Get share link object according to Google Optimize parameters
  const shareLink = useShareLink();

  const renderSections = () => {
    let toHide = false;
    let currentTotalWords = 0;
    const totalWords = countSectionWords(experience.sections);

    if (hideContent) {
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
                    childrenOnMaskBottom={`總共 ${formatCommaSeparatedNumber(
                      totalWords,
                    )} 字`}
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
          experience.sections.map(({ subtitle, content }, idx) => (
            <SectionBlock key={idx} subtitle={subtitle} content={content} />
          ))}
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <ArticleInfo experience={experience} hideContent={hideContent} />
      <section className={styles.main}>
        <div className={styles.article}>{renderSections()}</div>
        <div>
          {experience.type === 'interview' &&
          experience.interview_qas &&
          experience.interview_qas.length &&
          !hideContent ? (
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
        {hideContent && (
          <BasicPermissionBlock
            to={shareLink}
            rootClassName={styles.permissionBlockArticle}
          />
        )}
        {!hideContent && (
          <div className={styles.btmMsgBtnContainer}>
            <PrivateMessageButton onClick={onClickMsgButton} />
          </div>
        )}
      </section>
    </div>
  );
};

Article.propTypes = {
  experience: PropTypes.object.isRequired,
  hideContent: PropTypes.bool.isRequired,
};

export default Article;
