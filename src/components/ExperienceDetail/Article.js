import React, { PropTypes } from 'react';
import cn from 'classnames';
import { Heading, P } from 'common/base';
import { Good, Bad, Glike } from 'common/icons';
import rateButtonStyles from 'common/button/RateButtonElement.module.css';
import styles from './Article.module.css';
import InfoBlock from './InfoBlock';
import SectionBlock from './SectionBlock';
import QABlock from './QABlock';
import { overallRatingDialogMap } from '../ShareExperience/common/optionMap';
import { MAX_WORDS_IF_HIDDEN } from '../../constants/hideContent';

class Article extends React.Component {

  renderSections = () => {
    const { experience, hideContent } = this.props;
    let toHide = false;
    let currentTotalWords = 0;

    if (hideContent) {
      return (
        <div>
          {experience.sections && (
            experience.sections.map(({ subtitle, content }, idx) => {
              if (toHide) { return null; }
              currentTotalWords += content.length;
              if (currentTotalWords > MAX_WORDS_IF_HIDDEN) {
                toHide = true;
                const showLength = content.length - (currentTotalWords - MAX_WORDS_IF_HIDDEN);
                const newContent = `${content.substring(0, showLength)}...`;
                return (
                  <SectionBlock key={idx} subtitle={subtitle} content={newContent} />
                );
              }
              return (
                <SectionBlock key={idx} subtitle={subtitle} content={content} />
              );
            })
          )}
        </div>
      );
    }
    return (
      <div>
        {experience.sections && (
          experience.sections.map(({ subtitle, content }, idx) => (
            <SectionBlock key={idx} subtitle={subtitle} content={content} />
          ))
        )}
      </div>
    );
  }

  render() {
    const { experience, hideContent } = this.props;
    return (
      <div className={styles.container}>
        <aside className={styles.aside}>
          {experience.type === 'interview' && (
          <ul className={styles.infoList}>
            <InfoBlock label="面試地區">
              {experience.region}
            </InfoBlock>
            <InfoBlock label="應徵職稱">
              {experience.job_title}
            </InfoBlock>
            {
              experience.experience_in_year &&
              <InfoBlock label="自身相關職務工作經驗">
                {experience.experience_in_year} 年
              </InfoBlock>
            }
            {
              experience.education &&
              <InfoBlock label="最高學歷">
                {experience.education}
              </InfoBlock>
            }
            {
              experience.interview_time &&
              <InfoBlock label="面試時間">
                {`${experience.interview_time.year} 年 ${experience.interview_time.month} 月`}
              </InfoBlock>
            }
            <InfoBlock label="面試結果">
              {experience.interview_result}
            </InfoBlock>
            {
              experience.salary &&
              <InfoBlock label="待遇">
                {`${experience.salary.amount} / ${Article.getTimeUnit(experience.salary.type)}`}
              </InfoBlock>
            }
            <InfoBlock label="對公司的面試整體滿意度">
              <div className={styles.ratingContainer}>
                {[1, 2, 3, 4, 5].map(el => (
                  <Glike
                    key={el}
                    className={cn(rateButtonStyles.container, styles.autoCursor, {
                      [rateButtonStyles.active]: (el <= experience.overall_rating),
                    })}
                  />
                ))}
                <div className={`${styles.ratingText} pS`}>
                  {overallRatingDialogMap[experience.overall_rating]}
                </div>
              </div>
            </InfoBlock>
            {
              experience.interview_sensitive_questions && experience.interview_sensitive_questions.length
              ? (<InfoBlock label="有以下特殊問題">
                <ul>
                  {
                    experience.interview_sensitive_questions.map((o, idx) => (
                      <li key={idx}>{o}</li>
                    ))
                  }
                </ul>
              </InfoBlock>)
              : null
            }
          </ul>
          )}

          {experience.type === 'work' && (
          <ul className={styles.infoList}>
            <InfoBlock label="工作地區">
              {experience.region}
            </InfoBlock>
            <InfoBlock label="職稱">
              {experience.job_title}
            </InfoBlock>
            {
              experience.experience_in_year &&
              <InfoBlock label="自身相關職務工作經驗">
                {experience.experience_in_year} 年
              </InfoBlock>
            }
            {
              experience.education &&
              <InfoBlock label="最高學歷">
                {experience.education}
              </InfoBlock>
            }
            {
              experience.week_work_time &&
              <InfoBlock label="一週工時">
                {experience.week_work_time}
              </InfoBlock>
            }
            {
              experience.salary &&
              <InfoBlock label="待遇">
                {`${experience.salary.amount} / ${Article.getTimeUnit(experience.salary.type)}`}
              </InfoBlock>
            }
            {
              experience.recommend_to_others &&
              <InfoBlock label="是否推薦此工作">
                {experience.recommend_to_others === 'yes' ?
                  <div className={styles.recommendIcon}><Good />推</div>
                  : <div className={styles.recommendIcon}><Bad /> 不推</div>
                }
              </InfoBlock>
            }
          </ul>
          )}
        </aside>
        <section className={styles.main}>
          <div className={styles.article}>
            <Heading size="m" className={styles.heading}>{experience.title}</Heading>
            {this.renderSections()}
          </div>
          {(experience.type === 'interview' &&
            experience.interview_qas &&
            experience.interview_qas.length &&
            !hideContent
          ) ?
            (
              <div className={styles.qaWrapper}>
                <P size="l" bold>面試問答</P>
                {experience.interview_qas.map(({ question, answer }, idx) => (
                  <QABlock key={idx} question={question} answer={answer} />
                ))}
              </div>
            ) :
            null
          }
        </section>
      </div>
    );
  }
}

Article.propTypes = {
  experience: PropTypes.object.isRequired,
  hideContent: PropTypes.bool.isRequired,
};

Article.getTimeUnit = type => {
  switch (type) {
    case 'year':
      return '年';
    case 'month':
      return '月';
    case 'day':
      return '日';
    case 'hour':
      return '小時';
    default:
      return '月';
  }
};

export default Article;
