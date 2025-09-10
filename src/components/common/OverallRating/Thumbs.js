import React from 'react';
import ThumbImage from 'common/icons/thumb.svg';
import cn from 'classnames';
import styles from './Thumbs.module.css';
import PropTypes from 'prop-types';

const GrayThumb = ({ className }) => {
  return (
    <img
      src={ThumbImage}
      alt="grayThumb"
      className={cn(styles.thumb, styles.grayThumb, className)}
    />
  );
};

GrayThumb.propTypes = {
  className: PropTypes.string,
};

const YellowThumb = ({ className, style }) => {
  return (
    <img
      src={ThumbImage}
      alt="yellowThumb"
      style={style}
      className={cn(styles.thumb, styles.yellowThumb, className)}
    />
  );
};

YellowThumb.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
};

const calculateClipX = ({ rating, order }) => {
  const fraction = Math.round((rating % 1) * 100);
  if (order <= rating) return 100;
  if (rating + 1 > order) return fraction;
  return 0;
};

const RatingThumb = ({ className, rating, order }) => {
  const clipX = calculateClipX({ rating, order });
  return (
    <div className={styles.thumbContainer}>
      <GrayThumb className={className} />
      <YellowThumb className={className} style={{ '--clip-x': `${clipX}%` }} />
    </div>
  );
};

RatingThumb.propTypes = {
  className: PropTypes.string,
  order: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
};

const Thumbs = ({ rating, maxRating, size, className }) => {
  const thumbs = Array.from({ length: maxRating }, (_, i) => i + 1);
  const renderThumbs = thumbs.map(order => (
    <RatingThumb
      key={order}
      className={styles[size]}
      rating={rating}
      order={order}
    />
  ));

  return (
    <div className={cn(styles.thumbsContainer, className)}>{renderThumbs}</div>
  );
};

Thumbs.propTypes = {
  className: PropTypes.string,
  maxRating: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
  size: PropTypes.oneOf(['s', 'm']).isRequired,
};

Thumbs.defaultProps = {
  maxRating: 5,
  size: 'm',
};

export default Thumbs;
