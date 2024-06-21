import React from 'react';
import ThumbImage from './thumb.svg';
import cn from 'classnames';
import styles from './Thumb.module.css';
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

const calculateClipX = ({ rate, element }) => {
  const fraction = Math.round((rate % 1) * 100);
  if (element <= rate) return 100;
  if (rate + 1 > element) return fraction;
  return 0;
};

const RatingThumb = ({ rate, element }) => {
  const clipX = calculateClipX({ rate, element });
  return (
    <div className={styles.thumbContainer}>
      <GrayThumb />
      <YellowThumb style={{ '--clip-x': `${clipX}%` }} />
    </div>
  );
};

RatingThumb.propTypes = {
  element: PropTypes.number.isRequired,
  rate: PropTypes.number.isRequired,
};

const ThumbsContainer = ({ children }) => {
  return <div className={styles.thumbsContainer}>{children}</div>;
};

ThumbsContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const Thumbs = ({ rate, maxRating }) => {
  const thumbs = Array.from({ length: maxRating }, (_, i) => i + 1);
  const renderThumbs = thumbs.map(element => {
    return <RatingThumb key={element} rate={rate} element={element} />;
  });

  return <ThumbsContainer>{renderThumbs}</ThumbsContainer>;
};

Thumbs.propTypes = {
  maxRating: PropTypes.number.isRequired,
  rate: PropTypes.number.isRequired,
};

Thumbs.defaultProps = {
  maxRating: 5,
};

export default Thumbs;
