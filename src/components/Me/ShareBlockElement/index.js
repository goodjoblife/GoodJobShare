import React, { PropTypes } from 'react';
import cn from 'classnames';
import { Link } from 'react-router';

import { Bookmark } from 'common/icons';
import { Heading, P } from 'common/base';
import styles from './ShareBlockElement.module.css';

const ShareBlock = ({
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
          <P size="l" bold className={styles.articleLink}>
            <Bookmark />
            <Link to={to} title="檢視文章" className="hoverBlue">
              {heading}
            </Link>
          </P>
        </div>
        :
        <Heading size="sl" Tag="h3">
          <Link to={to} title="檢視文章" className="hoverBlue">
            {heading}{position && <span> - {position}</span>}
          </Link>
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
  type: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  position: PropTypes.string,
  comment: PropTypes.string,
  disabled: PropTypes.bool,
  publishHandler: PropTypes.func.isRequired,
};

export default ShareBlock;
