import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Link } from 'react-router';

import { Bookmark } from 'common/icons';
import { Heading, P } from 'common/base';
import styles from './ShareBlockElement.module.css';

const ShareBlock = ({
  options,
  type,
  heading,
  to,
  position,
  comment,
  disabled,
  publishHandler,
}) => (
  <section
    className={cn(styles.block, {
      [styles.disabled]: disabled,
    })}
  >
    <div className={styles.type}>
      <span className={styles.badge}>{type}</span>
    </div>
    <div className={styles.content}>
      {type === '留言' ?
        <div>
          <P size="l" Tag="h3">
            {comment}
          </P>
          {heading &&
          (<P size="l" bold className={styles.articleLink}>
            <Bookmark />
            <Link to={{ pathname: to, query: { backable: true }, state: options }} title="檢視文章" className="hoverBlue">
              {heading}
            </Link>
          </P>)
          }
        </div>
        :
        <Heading size="sl" Tag="h3">
          {type === '薪時' ?
            <Link
              to={`/time-and-salary/company/${encodeURIComponent(to)}/work-time-dashboard`}
              title="檢視薪時"
              className="hoverBlue"
            >
              {heading}{position && <span> - {position}</span>}
            </Link>
            :
            <Link to={to} title="檢視文章" className="hoverBlue">
              {heading}{position && <span> - {position}</span>}
            </Link>
          }
        </Heading>
      }
    </div>
    <div className={styles.buttons}>
      <button
        className="buttonCircleS buttonBlack2"
        onClick={publishHandler}
      >
        {disabled ? '重新發佈' : '隱藏'}
      </button>
    </div>
  </section>
);
ShareBlock.propTypes = {
  options: PropTypes.object,
  type: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  position: PropTypes.string,
  comment: PropTypes.string,
  disabled: PropTypes.bool,
  publishHandler: PropTypes.func.isRequired,
};

export default ShareBlock;
