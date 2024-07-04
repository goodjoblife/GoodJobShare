import React from 'react';
import ThumbImage from './thumb.svg';
import cn from 'classnames';
import styles from './Thumbs.module.css';
import PropTypes from 'prop-types';

const GrayThumb = () => {
  return (
    <img
      src={ThumbImage}
      alt="grayThumb"
      className={cn(styles.thumb, styles.grayThumb)}
    />
  );
};

const YellowThumb = ({ style }) => {
  return (
    <img
      src={ThumbImage}
      alt="yellowThumb"
      style={style}
      className={cn(styles.thumb, styles.yellowThumb)}
    />
  );
};

YellowThumb.propTypes = {
  style: PropTypes.object,
};

const calculateClipX = ({ rating, order }) => {
  const fraction = Math.round((rating % 1) * 100);
  if (order <= rating) return 100;
  if (rating + 1 > order) return fraction;
  return 0;
};

const RatingThumb = ({ rating, order }) => {
  const clipX = calculateClipX({ rating, order });
  return (
    <div className={styles.thumbContainer}>
      <GrayThumb />
      <YellowThumb style={{ '--clip-x': `${clipX}%` }} />
    </div>
  );
};

RatingThumb.propTypes = {
  order: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
};

const Thumbs = ({ rating, maxRating }) => {
  const thumbs = Array.from({ length: maxRating }, (_, i) => i + 1);
  const renderThumbs = thumbs.map(order => (
    <RatingThumb key={order} rating={rating} order={order} />
  ));

  return <div className={styles.thumbsContainer}>{renderThumbs}</div>;
};

Thumbs.propTypes = {
  maxRating: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
};

Thumbs.defaultProps = {
  maxRating: 5,
};

export default Thumbs;
