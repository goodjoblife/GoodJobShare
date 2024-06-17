import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { Wrapper } from 'common/base';
import ArrowLeft from 'common/icons/ArrowLeft';
import Thumbnails from 'common/icons/Thumbnails';
import { FacebookWrapper } from 'common/facebook';
import { formatCanonicalPath } from 'utils/helmetHelper';
import styles from './Footer.module.css';
import { FACEBOOK_APP_ID } from '../../config';

const Footer = ({ id, prev, next }) => (
  <Wrapper size="m" className={styles.footer}>
    <div className={styles.share}>
      <FacebookWrapper appId={FACEBOOK_APP_ID}>
        <div
          className="fb-like"
          data-href={formatCanonicalPath(`/labor-rights/${id}`)}
          data-layout="button_count"
          data-action="like"
          data-size="large"
          data-show-faces="false"
          data-share="true"
        />
      </FacebookWrapper>
    </div>
    <div className={styles.pagers}>
      <Link to="/labor-rights" className={styles.back}>
        <div>
          <Thumbnails className={styles.icon} />
          <span className="pB">返回列表</span>
        </div>
      </Link>
      <Pager
        className={cn(styles.prev, {
          [styles.active]: prev,
        })}
        {...prev}
      />
      <Pager
        className={cn(styles.next, {
          [styles.active]: next,
        })}
        {...next}
      />
    </div>
  </Wrapper>
);

Footer.propTypes = {
  id: PropTypes.string.isRequired,
  next: PropTypes.object,
  prev: PropTypes.object,
};

const Pager = ({ className, id, title }) => (
  <Link to={`/labor-rights/${id}`} className={cn(styles.pager, className)}>
    <ArrowLeft className={styles.icon} />
    <h3 className={cn('pLBold', styles.title)}>{title}</h3>
  </Link>
);

Pager.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  title: PropTypes.string,
};
Pager.defaultProps = {
  className: '',
  title: '',
};

export default Footer;
