import React, { Children } from 'react';
import PropTypes from 'prop-types';
import { childrenOfType } from 'airbnb-prop-types';
import cn from 'classnames';

import styles from './Carousel.module.css';

export const CarouselPage = ({ children }) => (
  <div className={styles.pageContainer}>{children}</div>
);

const Carousel = ({ children, selectedIndex, onSelectIndex, className }) => {
  const handleClickPrevBtn = () => {
    onSelectIndex(selectedIndex - 1);
  };

  const handleClickNextBtn = () => {
    onSelectIndex(selectedIndex + 1);
  };

  const handleClickBtnAt = index => () => {
    onSelectIndex(index);
  };

  const isPrevBtnClickable = selectedIndex > 0;
  const isNextBtnClickable = selectedIndex < children.length - 1;

  return (
    <div className={cn(styles.carousel, className)}>
      {Children.map(children, (child, i) => (
        <div
          key={i}
          className={cn(styles.page, { [styles.active]: selectedIndex === i })}
        >
          {selectedIndex === i ? child : null}
        </div>
      ))}
      <div className={styles.nav}>
        <button
          className={cn(styles.prev, { [styles.active]: isPrevBtnClickable })}
          onClick={handleClickPrevBtn}
          disabled={!isPrevBtnClickable}
        >
          &lt;
        </button>
        {Children.map(children, (child, i) => (
          <button
            key={i}
            className={cn(styles.dot, { [styles.active]: selectedIndex === i })}
            onClick={handleClickBtnAt(i)}
          />
        ))}
        <button
          className={cn(styles.next, { [styles.active]: isNextBtnClickable })}
          onClick={handleClickNextBtn}
          disabled={!isNextBtnClickable}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

Carousel.propTypes = {
  children: childrenOfType(CarouselPage).isRequired,
  selectedIndex: PropTypes.number.isRequired,
  onSelectIndex: PropTypes.func.isRequired,
};

export default Carousel;
