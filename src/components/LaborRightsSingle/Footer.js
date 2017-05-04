import React, { PropTypes } from 'react';
import cn from 'classnames';
import { Link } from 'react-router';
import ImmutablePropTypes from 'react-immutable-proptypes';
import i from 'common/icons';
import styles from './Footer.module.css';

const Footer = ({ id, prev, next }) => (
  <div className={cn(styles.footer, 'wrapperM')}>
    <div className={styles.share}>
      <div
        className="fb-like"
        data-href={`https://www.goodjob.life/labor-rights/${id}`}
        data-layout="button_count"
        data-action="like"
        data-size="large"
        data-show-faces="false"
        data-share="true"
      />
    </div>
    <div className={styles.pagers}>
      <Link to="/labor-rights" className={styles.back}>
        <div>
          <i.Thumbnails className={styles.icon} />
          <span className="pB">返回列表</span>
        </div>
      </Link>
      <Pager
        className={cn(styles.prev, {
          [styles.active]: prev,
        })}
        {...prev && prev.toJS()}
      />
      <Pager
        className={cn(styles.next, {
          [styles.active]: next,
        })}
        {...next && next.toJS()}
      />
    </div>
  </div>
);

Footer.propTypes = {
  id: React.PropTypes.string.isRequired,
  prev: ImmutablePropTypes.map,
  next: ImmutablePropTypes.map,
};

const Pager = ({
  className, id, title,
}) => (
  <Link
    to={`/labor-rights/${id}`}
    className={cn(styles.pager, className)}
  >
    <i.ArrowLeft className={styles.icon} />
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
